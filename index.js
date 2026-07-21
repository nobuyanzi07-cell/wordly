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
 