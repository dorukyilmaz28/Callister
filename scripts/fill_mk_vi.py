import json
import re
import time
from pathlib import Path

from deep_translator import MyMemoryTranslator

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ROOT / "src" / "data" / "locales"

EN_PATH = LOCALES / "en.json"
MK_PATH = LOCALES / "mk.json"
VI_PATH = LOCALES / "vi.json"

PH_RE = re.compile(r"\{(\w+)\}")
DOT_SPLIT_RE = re.compile(r"\.(?![^\[]*\])")


def is_ok_same_as_en(text: str) -> bool:
    """Some values are expected to stay the same across locales."""
    t = text.strip()
    if not t:
        return True
    # prices / currency
    if re.fullmatch(r"\$[\d\.]+(\+)?", t):
        return True
    # common placeholders / phone / email
    if t in {"example@email.com", "info@callisterfrc.com"}:
        return True
    if re.fullmatch(r"\+90\s*\(\d+\)\s*X+\s*X+\s*X+", t):
        return True
    # proper nouns / brands / acronyms
    if t in {"YAGSL", "Callister AI", "Reefspeech"}:
        return True
    return False


def protect(text: str) -> tuple[str, list[str]]:
    """Protect {placeholder} tokens from translation."""
    parts: list[str] = []
    out: list[str] = []
    last = 0
    for m in PH_RE.finditer(text):
        out.append(text[last:m.start()])
        parts.append(m.group(0))
        out.append(f"⟦{len(parts)-1}⟧")
        last = m.end()
    out.append(text[last:])
    return "".join(out), parts


def restore(text: str, parts: list[str]) -> str:
    for i, p in enumerate(parts):
        text = text.replace(f"⟦{i}⟧", p)
    return text


def translate_unique(text: str, translator, cache: dict) -> str:
    if text in cache:
        return cache[text]
    # Skip translating pure placeholders.
    if PH_RE.fullmatch(text.strip()):
        cache[text] = text
        return text
    protected, parts = protect(text)
    # MyMemoryTranslator has a hard limit (~500 chars). If exceeded, translate in chunks
    # while keeping placeholder tokens intact.
    MAX_LEN = 450
    if len(protected) <= 500:
        out = translator.translate(protected)
        out = restore(out, parts)
        cache[text] = out
        time.sleep(0.03)
        return out

    # Split protected text into token-safe chunks: tokens like ⟦0⟧ must not be broken.
    # MyMemoryTranslator has a max input size (~500 chars), so ensure each chunk <= MAX_LEN.
    token_re = re.compile(r"(⟦\d+⟧)")
    segments = token_re.split(protected)

    chunks: list[str] = []
    current = ""

    def push_current():
        nonlocal current
        if current:
            chunks.append(current)
            current = ""

    for seg in segments:
        if not seg:
            continue

        # Tokens are atomic.
        if token_re.fullmatch(seg):
            if len(current) + len(seg) > MAX_LEN:
                push_current()
            current += seg
            continue

        # Text segment: split into MAX_LEN pieces if needed.
        i = 0
        while i < len(seg):
            part = seg[i : i + MAX_LEN]
            i += MAX_LEN
            if len(current) + len(part) > MAX_LEN:
                push_current()
            current += part
    push_current()

    out_parts: list[str] = []
    for ch in chunks:
        out_chunk = translator.translate(ch)
        out_parts.append(restore(out_chunk, parts))
        time.sleep(0.02)

    out = "".join(out_parts)
    cache[text] = out
    return out


def walk_update(en_node, cur_node, en_source_node, translator, cache):
    """
    Update cur_node in place by translating only strings that are still identical to en_node.
    """
    if isinstance(en_node, dict):
        for k, v in en_node.items():
            if isinstance(en_source_node, dict) and k in en_source_node:
                en_val = en_node[k]
                cur_node[k] = walk_update(en_val, cur_node[k], en_source_node[k], translator, cache)
        return cur_node
    if isinstance(en_node, list):
        for i in range(min(len(en_node), len(cur_node))):
            cur_node[i] = walk_update(en_node[i], cur_node[i], en_source_node[i], translator, cache)
        return cur_node

    if isinstance(en_node, str):
        # Translate only when still identical to English and not an allowed "same" value.
        if cur_node == en_node and not is_ok_same_as_en(en_node):
            return translate_unique(en_node, translator, cache)
        return cur_node

    return cur_node


def main():
    en_data = json.loads(EN_PATH.read_text(encoding="utf-8"))
    mk_data = json.loads(MK_PATH.read_text(encoding="utf-8"))
    vi_data = json.loads(VI_PATH.read_text(encoding="utf-8"))

    mk_tr = MyMemoryTranslator(source="english", target="macedonian")
    vi_tr = MyMemoryTranslator(source="english", target="vietnamese")

    mk_cache: dict[str, str] = {}
    vi_cache: dict[str, str] = {}

    print("Filling mk.json ...")
    mk_data = walk_update(en_data, mk_data, en_data, mk_tr, mk_cache)
    print("Filling vi.json ...")
    vi_data = walk_update(en_data, vi_data, en_data, vi_tr, vi_cache)

    MK_PATH.write_text(json.dumps(mk_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    VI_PATH.write_text(json.dumps(vi_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Done.")


if __name__ == "__main__":
    main()

