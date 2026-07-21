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

  ## API used
 
[Free Dictionary API](https://dictionaryapi.dev/) — no API key required.
 
```
GET https://api.dictionaryapi.dev/api/v2/entries/en/<word>
```
## Features (mapped to the rubric)
 
- **Search functionality** — form submission triggers a `fetch` call; input is
  trimmed/lowercased before the request.
- **Data display** — headword, phonetic spelling, part of speech, up to 3
  definitions per meaning, example sentences, and synonyms.
- **Form & event handling** — `submit` and `click` (save, remove) listeners
  all update the DOM without a reload.
- **DOM manipulation** — result panel and favorites list are built and
  updated dynamically via `createElement`/`textContent`, not `innerHTML`
  string concatenation (aside from one small synonyms line).
- **Fetch API usage** — `async/await` with a `try/catch/finally`, separate
  handling for "word not found" (404) vs. network failure (`TypeError`).
- **Error handling** — inline status message replaces the result panel on
  failure; loading state shown while the request is in flight.
- **Styling & UX** — dictionary-page visual treatment (serif headword, guide-word
  red rule, monospace phonetics); layout is responsive down to mobile.

## Possible next steps
 
- Debounce search-as-you-type instead of requiring form submission.
- Cache recent lookups to avoid re-fetching the same word.
- Add a "part of speech" filter for words with many meanings.
- Add pronunciation audio playback and a light/dark theme toggle.
 