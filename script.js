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
  "Idle",
  "Horror"
];

const categoryKeywords = {
  racing: ["race", "racing", "drift", "speed", "moto", "turbo", "car", "road", "track", "stunt"],
  horror: ["horror", "scary", "dark", "ghost", "monster", "night", "shadow", "zombie", "creepy", "haunted", "terror"],
  action: ["action", "battle", "fight", "arena", "boss", "attack", "combat", "slash", "strike"],
  adventure: ["adventure", "quest", "explore", "journey", "world", "castle", "kingdom", "missions", "epic"],
  puzzle: ["puzzle", "maze", "logic", "brain", "memory", "match", "tiles", "solve", "challenge"],
  sports: ["sports", "soccer", "basketball", "football", "tennis", "golf", "goal", "stadium", "cup"],
  shooter: ["shooter", "aim", "shoot", "laser", "gun", "sniper", "target", "battlefield", "turret"],
  platformer: ["platform", "jump", "runner", "bounce", "climb", "dodge", "spring"],
  simulation: ["sim", "simulator", "builder", "city", "farm", "craft", "tycoon", "life", "vehicle"],
  music: ["music", "rhythm", "beat", "dance", "song", "notes", "groove"],
  idle: ["idle", "clicker", "tap", "upgrade", "incremental", "resource", "progress"],
  arcade: ["arcade", "coin", "classic", "quick", "retro", "space", "neon"]
};

const titleParts = {
  prefix: [
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
    "Solar",
    "Midnight",
    "Desert",
    "Jungle",
    "Forest",
    "Frozen",
    "Cyber",
    "Metal",
    "Glitch",
    "Electric",
    "Night",
    "Thunder",
    "Lunar"
  ],
  noun: [
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
    "Planet",
    "Warden",
    "Guardian",
    "Treasure",
    "Maze",
    "Marauder",
    "Crusader",
    "Talon",
    "Pulse",
    "Vector",
    "Hawk",
    "Titan",
    "Saber",
    "Rogue"
  ],
  suffix: [
    "",
    "2",
    "3D",
    "Rush",
    "X",
    "Deluxe",
    "World",
    "Remix",
    "Max",
    "Infinity",
    "Challenge",
    "DX",
    "Go",
    "Arena",
    "League",
    "Survival",
    "Trials",
    "Rush"
  ]
};

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

function generateGameLibrary(count = 2500) {
  const games = [];

  for (let i = 0; i < count; i++) {
    const prefix = titleParts.prefix[i % titleParts.prefix.length];
    const noun = titleParts.noun[(i * 3) % titleParts.noun.length];
    const suffix = titleParts.suffix[(i * 5) % titleParts.suffix.length];
    const category = gameCategories[i % gameCategories.length];
    const title = `${prefix} ${noun}${suffix}`.trim();

    const keywords = categoryKeywords[category.toLowerCase()] || [category.toLowerCase()];
    const searchText = `${title} ${category} ${keywords.join(" ")}`.toLowerCase();

    games.push({
      id: i + 1,
      title,
      genre: category,
      rating: (Math.random() * 1.2 + 4.0).toFixed(1),
      difficulty: ["Easy", "Medium", "Hard"][i % 3],
      status: "Unblocked",
      tags: keywords,
      searchText
    });
  }

  return games;
}

const gameLibrary = generateGameLibrary(2500);
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

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getBestMatchScore(game, query) {
  const normQuery = normalizeText(query);
  if (!normQuery) return 0;

  let score = 0;
  const title = normalizeText(game.title);
  const tags = game.tags.map((tag) => normalizeText(tag));
  const genre = normalizeText(game.genre);

  if (title.includes(normQuery)) score += 20;
  if (genre.includes(normQuery)) score += 18;
  tags.forEach((tag) => {
    if (tag.includes(normQuery)) score += 12;
    if (normQuery.includes(tag)) score += 6;
  });

  const queryWords = normQuery.split(/\s+/).filter(Boolean);
  queryWords.forEach((word) => {
    if (title.includes(word)) score += 8;
    if (genre.includes(word)) score += 7;
    if (tags.some((tag) => tag.includes(word))) score += 5;
  });

  return score;
}

function getRecommendedGames(query = "") {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) {
    return shuffleGames(gameLibrary).slice(0, 12);
  }

  const scored = gameLibrary
    .map((game) => ({
      game,
      score: getBestMatchScore(game, cleanQuery)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((entry) => entry.game);

  if (scored.length) return scored;

  const fallback = gameLibrary.filter((game) => {
    const haystack = `${game.title} ${game.genre} ${game.tags.join(" ")}`.toLowerCase();
    return haystack.includes(cleanQuery.split(" ")[0]);
  });

  return shuffleGames(fallback.length ? fallback : gameLibrary).slice(0, 12);
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

  const cleanQuery = normalizeText(query);

  if (!cleanQuery) {
    searchResults.innerHTML = "";
    return;
  }

  const matches = siteLinks.filter((item) => {
    const haystack = `${item.name} ${item.slug} ${item.description}`.toLowerCase();
    return haystack.includes(cleanQuery);
  });

  const recommendedGames = getRecommendedGames(cleanQuery);

  const gameCards = recommendedGames
    .slice(0, 6)
    .map(
      (game) => `
        <div class="result-card game-search-card">
          <div>
            <p class="result-kind">Game match</p>
            <h3>${game.title}</h3>
            <p>${game.genre} • ${game.difficulty}</p>
          </div>
          <a href="#" target="_blank" rel="noreferrer">Play</a>
        </div>
      `
    )
    .join("");

  const siteCards = matches.length
    ? matches
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
        .join("")
    : "";

  searchResults.innerHTML = `
    ${siteCards || ""}
    ${gameCards || ""}
    ${!siteCards && !gameCards ? `<div class="result-card empty"><h3>No results found for "${query}"</h3><p>Try racing, horror, puzzle, sports, arcade, or action.</p></div>` : ""}
  `;

  if (recommendedGames.length) {
    renderGames(recommendedGames);
  }
}

function loadGames() {
  renderGames(shuffleGames(gameLibrary).slice(0, 12));
}

if (button) {
  button.addEventListener("click", () => {
    const query = searchInput ? searchInput.value : "";
    if (query.trim()) {
      renderSearchResults(query);
    } else {
      loadGames();
    }
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
