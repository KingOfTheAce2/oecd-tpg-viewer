# OECD TPG Viewer & NACE Code Finder

This repository contains a small static website with two tools:

1. **OECD Transfer Pricing Guidelines Viewer** – a searchable viewer for paragraphs from the OECD Transfer Pricing Guidelines.
2. **NACE Rev. 2.1 Code Finder** – an interface for searching activities in the NACE classification.

The site is contained entirely in the `docs/` directory and can be used locally or hosted on any static web server.

## Usage

No build step is required. Open `docs/index.html` in a web browser. From there you can navigate to:

* `oecd.html` – provides a search box that filters paragraphs in real time. Data is loaded dynamically from the `assets/oecd/<language>/<chapter>.json` files.
  Supported language folders include `en`, `es`, `fr`, `de`, `ja`, and `sk`.
* `nace.html` – loads `assets/nace/nace-app.js` which renders the NACE code finder using React.

## File Layout

```
/docs
  index.html          # Landing page linking to the two apps
  oecd.html           # OECD TPG Viewer page
  nace.html           # NACE Code Finder page
  /assets
    style.css            # Shared styles
    /oecd
      OECD-TPG-EN-2022.js  # Original dataset
      index.js             # Logic for the OECD viewer
      /en
        1.json             # Chapter 1 paragraphs (English)
        10.json            # Chapter 10 paragraphs (English)
      ...language folders for es/fr/de/ja/sk
        # e.g., docs/assets/oecd/sk/ for Slovenian
    /nace
      nace_data.json       # Dataset of NACE codes
      nace-app.js          # React app for the NACE finder
```

## Notes

The data files included in `docs/assets` are provided for convenience and are relatively small in this demo. They can be replaced or updated by editing the corresponding files.

## Citation

When using the OECD Transfer Pricing Guidelines data please cite:

```
OECD (2022), OECD Transfer Pricing Guidelines for Multinational Enterprises and Tax Administrations 2022, OECD Publishing, Paris.
```

## PDF Extraction

The repository includes a small Python script that can extract paragraph numbers
and text from OECD TPG PDF files. Drop PDFs into the `data/` directory and run:

```bash
pip install -r requirements.txt

python scripts/extract_tpg.py
```

The script outputs JSON files to `output/<year>/` with empty `title` and
`explanation` fields so they can be filled in manually later. A GitHub Action
(`.github/workflows/run_extract.yml`) is provided to run the script automatically
whenever new PDFs are pushed to the `data/` folder.

Note: During extraction `pdfplumber` may display warnings like `CropBox missing
from /Page`; these are harmless. The updated script also joins lines until the
next paragraph ID so multi-line paragraphs are captured correctly.
=======
