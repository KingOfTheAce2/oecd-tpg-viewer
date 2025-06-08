import re
import json
from pathlib import Path

import pdfplumber

DATA_DIR = Path('data')
OUTPUT_DIR = Path('output')

# Regex to match lines starting with paragraph number like 1.43
PARA_RE = re.compile(r'^(\d+\.\d+)\s+(.*)$')


def extract_paragraphs(pdf_path: Path):
    """Extract paragraphs from a PDF file."""
    paragraphs = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ''
            for line in text.splitlines():
                match = PARA_RE.match(line.strip())
                if match:
                    paragraphs.append(
                        {
                            "id": match.group(1),
                            "title": "",
                            "text": match.group(2).strip(),
                            "explanation": "",
                        }
                    )
    return paragraphs


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for pdf_file in DATA_DIR.glob('*.pdf'):
        year_match = re.search(r'(\d{4})', pdf_file.name)
        year = year_match.group(1) if year_match else 'unknown'
        out_dir = OUTPUT_DIR / year
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{pdf_file.stem}.json"

        data = extract_paragraphs(pdf_file)
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Wrote {out_file}")


if __name__ == '__main__':
    main()
