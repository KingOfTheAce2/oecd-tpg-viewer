# OECD TPG Viewer & NACE Code Finder

This repository contains a small static website with two tools:

1. **OECD Transfer Pricing Guidelines Viewer** – a searchable viewer for paragraphs from the OECD Transfer Pricing Guidelines.
2. **NACE Rev. 2.1 Code Finder** – an interface for searching activities in the NACE classification.

The site is contained entirely in the `docs/` directory and can be used locally or hosted on any static web server.

## Usage

No build step is required. Open `docs/index.html` in a web browser. From there you can navigate to:

* `oecd.html` – provides a search box that filters paragraphs in real time. Data is loaded dynamically from the `assets/oecd/<language>/<chapter>.json` files.
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
      ...language folders for es/fr/de/ja/sl
    /nace
      nace_data.json       # Dataset of NACE codes
      nace-app.js          # React app for the NACE finder
```

## Notes

The data files included in `docs/assets` are provided for convenience and are relatively small in this demo. They can be replaced or updated by editing the corresponding files.
