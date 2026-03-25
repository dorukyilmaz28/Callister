import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ROOT / "src" / "data" / "locales"

en = json.loads((LOCALES / "en.json").read_text(encoding="utf-8"))
mk = json.loads((LOCALES / "mk.json").read_text(encoding="utf-8"))
vi = json.loads((LOCALES / "vi.json").read_text(encoding="utf-8"))


def walk_en(d, path=""):
  if isinstance(d, dict):
    for k, v in d.items():
      p = f"{path}.{k}" if path else k
      yield from walk_en(v, p)
  elif isinstance(d, list):
    for i, v in enumerate(d):
      p = f"{path}[{i}]"
      yield from walk_en(v, p)
  else:
    yield path, d


def get_by_path(d, path):
  cur = d
  # Split by dots but keep [i] parts.
  parts = path.split(".")
  for part in parts:
    if "[" in part:
      name, rest = part.split("[", 1)
      name = name if name else None
      if name:
        cur = cur[name]
      idx = int(rest.split("]")[0])
      cur = cur[idx]
    else:
      cur = cur[part]
  return cur


mk_missing = []
vi_missing = []

for path, v in walk_en(en):
  if not isinstance(v, str):
    continue
  try:
    mk_v = get_by_path(mk, path)
    vi_v = get_by_path(vi, path)
  except Exception:
    continue
  if mk_v == v:
    mk_missing.append((path, v))
  if vi_v == v:
    vi_missing.append((path, v))

print("mk_missing_count:", len(mk_missing))
for p, v in mk_missing[:80]:
  print("MK", p, "=>", v)

print("\nvi_missing_count:", len(vi_missing))
for p, v in vi_missing[:80]:
  print("VI", p, "=>", v)

