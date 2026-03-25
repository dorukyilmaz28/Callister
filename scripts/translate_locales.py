"""One-off: fill mk.json and vi.json from en.json with Google Translate (deep_translator)."""
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ROOT / "src" / "data" / "locales"
EN_PATH = LOCALES / "en.json"
MK_PATH = LOCALES / "mk.json"
VI_PATH = LOCALES / "vi.json"

PH_RE = re.compile(r"\{(\w+)\}")


def protect(s: str) -> tuple[str, list[str]]:
    parts: list[str] = []
    out = []
    last = 0
    for m in PH_RE.finditer(s):
        out.append(s[last : m.start()])
        parts.append(m.group(0))
        out.append(f"⟦{len(parts) - 1}⟧")
        last = m.end()
    out.append(s[last:])
    return "".join(out), parts


def restore(s: str, parts: list[str]) -> str:
    for i, p in enumerate(parts):
        s = s.replace(f"⟦{i}⟧", p)
    return s


def translate_unique(text: str, target: str, cache: dict, translator: GoogleTranslator) -> str:
    if not text or not text.strip():
        return text
    key = (target, text)
    if key in cache:
        return cache[key]
    protected, parts = protect(text)
    try:
        out = translator.translate(protected)
        if not out:
            out = text
        out = restore(str(out), parts)
    except Exception as e:
        print(f"translate fail ({target}): {e!r} :: {text[:60]}...")
        out = text
    cache[key] = out
    time.sleep(0.06)
    return out


def walk(obj, target: str, cache: dict, translator: GoogleTranslator):
    if isinstance(obj, dict):
        return {k: walk(v, target, cache, translator) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk(v, target, cache, translator) for v in obj]
    if isinstance(obj, str):
        return translate_unique(obj, target, cache, translator)
    return obj


def main():
    en_data = json.loads(EN_PATH.read_text(encoding="utf-8"))
    mk_cache: dict = {}
    vi_cache: dict = {}
    mk_tr = GoogleTranslator(source="en", target="mk")
    vi_tr = GoogleTranslator(source="en", target="vi")
    print("Translating to Macedonian...")
    mk_data = walk(en_data, "mk", mk_cache, mk_tr)
    print("Translating to Vietnamese...")
    vi_data = walk(en_data, "vi", vi_cache, vi_tr)
    MK_PATH.write_text(json.dumps(mk_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    VI_PATH.write_text(json.dumps(vi_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MK_PATH} and {VI_PATH}")


if __name__ == "__main__":
    main()
