const gameCategories = [
  "Action",
  "Adventure",
  "Arcade",
  "Racing",
  "Puzzle",
  "Sports",
  "Strategy",
  "Shooter",
  "Platformer",
  "Simulation",
  "Music",
  "Idle"
];

const adjectives = [
  "Neon",
  "Turbo",
  "Shadow",
  "Pixel",
  "Storm",
  "Sky",
  "Golden",
  "Crimson",
  "Frost",
  "Blaze",
  "Vortex",
  "Mystic",
  "Wild",
  "Rapid",
  "Cosmic",
  "Rocket",
  "Dragon",
  "Nova",
  "Secret",
  "Solar"
];

const nouns = [
  "Runner",
  "Quest",
  "Sprint",
  "Arena",
  "Strike",
  "Racer",
  "Dash",
  "Jump",
  "Blitz",
  "Pilot",
  "Drift",
  "Legend",
  "Battle",
  "Kingdom",
  "Rift",
  "Storm",
  "Orbit",
  "Chase",
  "Cannon",
  "Planet"
];

const suffixes = [
  "",
  " 2",
  " 3D",
  " Rush",
  " X",
  " Deluxe",
  " World",
  " Remix",
  " Max",
  " Infinity",
  " Challenge",
  " DX"
];

const siteLinks = [
  {
    name: "Classroom 80x",
    slug: "classroom",
    url: "https://sites.google.com/view/classroomx6/classroom-80x",
    description: "School portal link"
  },
  {
    name: "GameLoop Arcade",
    slug: "arcade",
    url: "#",
    description: "Fast-paced browser games"
  },
  {
    name: "Racing Hub",
    slug: "racing",
    url: "#",
    description: "Cars, drift maps, and speed games"
  }
];

function generateGameLibrary(count = 1200) {
  const games = [];

  for (let i = 0; i < count; i++) {
    const adjective = adjectives[i % adjectives.length];
    const noun = nouns[(i * 3) % nouns.length];
    const suffix = suffixes[(i * 5) % suffixes.length];
    const category = gameCategories[(i * 7) % gameCategories.length];

    games.push({
      title: `${adjective} ${noun}${suffix}`.trim(),
      genre: category,
      rating: (Math.random() * 1.2 + 4.0).toFixed(1),
      difficulty: ["Easy", "Medium", "Hard"][i % 3],
      status: "Unblocked"
    });
  }

  return games;
}

const gameLibrary = generateGameLibrary(1200);
const grid = document.getElementById("gameGrid");
const button = document.getElementById("findGamesBtn");
const availableCount = document.getElementById("availableCount");
const gameCountLabel = document.getElementById("gameCountLabel");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

function shuffleGames(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderGames(selectedGames) {
  if (!grid) return;

  grid.innerHTML = selectedGames
    .map(
      (game, index) => `
        <article class="game-card" style="animation-delay:${index * 40}ms">
          <div class="card-art" aria-hidden="true"></div>
          <div class="genre-row">
            <span class="genre-tag">${game.genre}</span>
            <span class="rating">★ ${game.rating}</span>
          </div>
          <h3>${game.title}</h3>
          <div class="card-meta">
            <span>${game.difficulty}</span>
            <span><span class="status-dot"></span>${game.status}</span>
          </div>
          <div class="card-actions">
            <a href="#" target="_blank" rel="noreferrer">Play now</a>
            <button type="button" aria-label="Save ${game.title}">Save</button>
          </div>
        </article>
      `
    )
    .join("");

  if (availableCount) {
    availableCount.textContent = String(selectedGames.length);
  }

  if (gameCountLabel) {
    gameCountLabel.textContent = `${selectedGames.length} games loaded`;
  }
}

function renderSearchResults(query) {
  if (!searchResults) return;

  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    searchResults.innerHTML = "";
    return;
  }

  const matches = siteLinks.filter((item) => {
    return (
      item.name.toLowerCase().includes(cleanQuery) ||
      item.slug.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery)
    );
  });

  if (!matches.length) {
    searchResults.innerHTML = `
      <div class="result-card empty">
        <h3>No results found for "${query}"</h3>
        <p>Try searching for classroom, racing, arcade, or games.</p>
      </div>
    `;
    return;
  }

  searchResults.innerHTML = matches
    .map(
      (item) => `
        <div class="result-card">
          <div>
            <p class="result-kind">Site result</p>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
          <a href="${item.url}" target="_blank" rel="noreferrer">Open</a>
        </div>
      `
    )
    .join("");
}

function loadGames() {
  const randomSelection = shuffleGames(gameLibrary).slice(0, 12);
  renderGames(randomSelection);
}

if (button) {
  button.addEventListener("click", () => {
    const randomSelection = shuffleGames(gameLibrary).slice(0, 12);
    renderGames(randomSelection);
  });
}

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => renderSearchResults(searchInput.value));
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      renderSearchResults(searchInput.value);
    }
  });
}

loadGames();
