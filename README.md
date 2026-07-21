# wordly
an online language learning platform, wants to improve its user experience by providing an interactive dictionary feature.
## Files
 
- `index.html` — page structure (search form, result panel, favorites sidebar)
- `style.css` — dictionary-page-inspired styling
- `script.js` — all app logic, organized into commented steps:
  1. DOM references
  2. State (favorites array, backed by `localStorage`)
  3. Rendering helpers (`renderEntry`, `renderMeanings`, `renderFavorites`)
  4. Fetch logic (`lookUpWord`, `normalizeEntry`)
  5. Event listeners (search submit, save, favorites clicks)
  6. Init