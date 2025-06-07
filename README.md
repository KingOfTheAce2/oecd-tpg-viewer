# OECD TPG Viewer & NACE Code Finder

This repository contains a small static website with two tools:

1. **OECD Transfer Pricing Guidelines Viewer** – a searchable viewer for paragraphs from the OECD Transfer Pricing Guidelines.
2. **NACE Rev. 2.1 Code Finder** – an interface for searching activities in the NACE classification.

The site is contained entirely in the `docs/` directory and can be used locally or hosted on any static web server.

## Usage

No build step is required. Open `docs/index.html` in a web browser. From there you can navigate to:

* `oecd.html` – provides a search box that filters paragraphs in real time using the dataset from `assets/OECD-TPG-EN-2022.js`.
* `nace.html` – loads `assets/nace-app.jsx` which renders the NACE code finder using React.

## File Layout

```
/docs
  index.html          # Landing page linking to the two apps
  oecd.html           # OECD TPG Viewer page
  nace.html           # NACE Code Finder page
  /assets
    OECD-TPG-EN-2022.js  # Dataset of OECD TPG paragraphs
    nace_data.json       # Dataset of NACE codes
    index.js             # Logic for the OECD viewer
    nace-app.jsx         # React app for the NACE finder
    style.css            # Shared styles
```

## Notes

The data files included in `docs/assets` are provided for convenience and are relatively large. They can be replaced or updated by editing the corresponding files.
