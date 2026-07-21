// dom references

const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading-message");
const resultEl = document.getElementById("result");
const wordEl = document.getElementById("word");
const phoneticEl = document.getElementById("phonetic");
const meaningsEl = document.getElementById("meanings");
const sourceLink = document.getElementById("source-link");
const saveWordBtn = document.getElementById("save-word");
const saveIcon = document.getElementById("save-icon");
const saveLabel = document.getElementById("save-label");
const favoritesList = document.getElementById("favorites-list");
const favoritesEmpty = document.getElementById("favorites-empty");

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";
const FAVORITES_KEY = "wordly:favorites";

let currentEntry = null;
let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

//Rendering

function showLoading(isLoading) {
  loadingMessage.hidden = !isLoading;
  if (isLoading) { errorMessage.hidden = true; resultEl.hidden = true; }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  resultEl.hidden = true;
}

function renderMeanings(meanings) {
  meaningsEl.innerHTML = "";
  meanings.forEach((meaning) => {
    const block = document.createElement("div");
    block.className = "meaning";
 
    const pos = document.createElement("span");
    pos.className = "meaning__pos";
    pos.textContent = meaning.partOfSpeech || "unknown";
    block.appendChild(pos);
 
    const list = document.createElement("ol");
    list.className = "meaning__list";
    meaning.definitions.slice(0, 3).forEach((def) => {
      const li = document.createElement("li");
      li.textContent = def.definition;
      if (def.example) {
        const ex = document.createElement("div");
        ex.className = "meaning__example";
        ex.textContent = `“${def.example}”`;
        li.appendChild(ex);
      }
      list.appendChild(li);
    });
    block.appendChild(list);
 
    if (meaning.synonyms && meaning.synonyms.length) {
      const syn = document.createElement("p");
      syn.className = "meaning__synonyms";
      syn.innerHTML = `Synonyms: <span>${meaning.synonyms.slice(0, 6).join(", ")}</span>`;
      block.appendChild(syn);
    }
 
    meaningsEl.appendChild(block);
  });
}

function updateSaveButton() {
  if (!currentEntry) return;
  const isSaved = favorites.some((f) => f.word === currentEntry.word);
  saveWordBtn.classList.toggle("is-saved", isSaved);
  saveIcon.textContent = isSaved ? "★" : "☆";
  saveLabel.textContent = isSaved ? "Saved" : "Save";
}

function renderEntry(entry) {
  currentEntry = entry;
  wordEl.textContent = entry.word;
  phoneticEl.textContent = entry.phonetic || "";
  sourceLink.href = entry.sourceUrl || "#";
  renderMeanings(entry.meanings);
  updateSaveButton();
  resultEl.hidden = false;
  errorMessage.hidden = true;
}

function renderFavorites() {
  favoritesList.innerHTML = "";
  favoritesEmpty.hidden = favorites.length > 0;
  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.className = "favorite-item";
 
    const wordBtn = document.createElement("button");
    wordBtn.className = "favorite-item__word";
    wordBtn.type = "button";
    wordBtn.textContent = fav.word;
    wordBtn.addEventListener("click", () => lookUpWord(fav.word));
 
    const removeBtn = document.createElement("button");
    removeBtn.className = "favorite-item__remove";
    removeBtn.type = "button";
    removeBtn.textContent = "✕";
    removeBtn.setAttribute("aria-label", `Remove ${fav.word}`);
    removeBtn.addEventListener("click", () => removeFavorite(fav.word));
 
    li.append(wordBtn, removeBtn);
    favoritesList.appendChild(li);
  });
}

function removeFavorite(word) {
  favorites = favorites.filter((f) => f.word !== word);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  renderFavorites();
  updateSaveButton();
}

//fetch process

function normalizeEntry(data) {
  const first = data[0];
  const phoneticObj = first.phonetics.find((p) => p.text) || first.phonetics[0];
  return {
    word: first.word,
    phonetic: first.phonetic || phoneticObj?.text || "",
    sourceUrl: first.sourceUrls?.[0] || `${API_BASE}/${first.word}`,
    meanings: first.meanings,
  };
}

async function lookUpWord(rawWord) {
  const word = rawWord.trim().toLowerCase();
  if (!word) return showError("Type a word to look it up.");
 
  showLoading(true);
  try {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(word)}`);
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? `No entry found for “${word}.” Check the spelling and try again.`
          : "The dictionary service ran into a problem. Please try again."
      );
    }
    renderEntry(normalizeEntry(await response.json()));
    wordInput.value = "";
  } catch (err) {
    showError(
      err instanceof TypeError
        ? "Couldn’t reach the dictionary service. Check your connection and try again."
        : err.message
    );
  } finally {
    showLoading(false);
  }
}