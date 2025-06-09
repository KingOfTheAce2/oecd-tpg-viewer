import re
import json
from pathlib import Path
from docx import Document

DATA_DIR = Path("data")
OUTPUT_DIR = Path("output")

PARA_RE = re.compile(r"^(\d+\.\d+)\s+(.*)$")

def extract_paragraphs(docx_path: Path):
    """Extract paragraphs from a DOCX file."""
    doc = Document(str(docx_path))
    paragraphs = []
    current = None

    for para in doc.paragraphs:
        line = para.text.strip()
        match = PARA_RE.match(line)
        if match:
            if current:
                current["text"] = " ".join(current.pop("_lines")).strip()
                paragraphs.append(current)
            current = {
                "id": match.group(1),
                "title": "",
                "_lines": [match.group(2).strip()],
                "explanation": "",
            }
        else:
            if current:
                current.setdefault("_lines", []).append(line)

    if current:
        current["text"] = " ".join(current.pop("_lines")).strip()
        paragraphs.append(current)

    return paragraphs

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for docx_file in DATA_DIR.glob("*.docx"):
        year_match = re.search(r"(\d{4})", docx_file.name)
        year = year_match.group(1) if year_match else "unknown"
        out_dir = OUTPUT_DIR / year
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{docx_file.stem}.json"
        data = extract_paragraphs(docx_file)
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Wrote {out_file}")

if __name__ == "__main__":
    main()
