const gameLibrary = [
  { title: "Slope", genre: "Speed", rating: "4.8", difficulty: "Hard" },
  { title: "Run 3", genre: "Runner", rating: "4.9", difficulty: "Medium" },
  { title: "Cookie Clicker", genre: "Idle", rating: "4.7", difficulty: "Easy" },
  { title: "Tank Trouble", genre: "Action", rating: "4.6", difficulty: "Hard" },
  { title: "Basket Random", genre: "Sports", rating: "4.5", difficulty: "Easy" },
  { title: "FNF", genre: "Music", rating: "4.8", difficulty: "Medium" },
  { title: "Bloons TD", genre: "Strategy", rating: "4.9", difficulty: "Medium" },
  { title: "House of Hazards", genre: "Party", rating: "4.4", difficulty: "Easy" },
  { title: "Fireboy and Watergirl", genre: "Puzzle", rating: "4.7", difficulty: "Medium" },
  { title: "Drift Hunters", genre: "Racing", rating: "4.9", difficulty: "Medium" },
  { title: "Papa's Pizzeria", genre: "Cooking", rating: "4.6", difficulty: "Easy" },
  { title: "Super Mario 64", genre: "Adventure", rating: "5.0", difficulty: "Medium" },
  { title: "Skibidi Bounce", genre: "Arcade", rating: "4.5", difficulty: "Easy" },
  { title: "Slope 2", genre: "Speed", rating: "4.7", difficulty: "Hard" },
  { title: "Moto X3M", genre: "Racing", rating: "4.8", difficulty: "Hard" },
  { title: "Snow Rider 3D", genre: "Winter", rating: "4.6", difficulty: "Medium" },
  { title: "A Small World Cup", genre: "Sports", rating: "4.5", difficulty: "Easy" }
];

const grid = document.getElementById("gameGrid");
const button = document.getElementById("findGamesBtn");
const availableCount = document.getElementById("availableCount");
const gameCountLabel = document.getElementById("gameCountLabel");

function shuffleGames(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderGames(selectedGames) {
  grid.innerHTML = selectedGames
    .map(
      (game, index) => `
        <article class="game-card" style="animation-delay:${index * 60}ms">
          <div class="card-art" aria-hidden="true"></div>
          <div class="genre-row">
            <span class="genre-tag">${game.genre}</span>
            <span class="rating">★ ${game.rating}</span>
          </div>
          <h3>${game.title}</h3>
          <div class="card-meta">
            <span>${game.difficulty}</span>
            <span><span class="status-dot"></span>Unblocked</span>
          </div>
          <div class="card-actions">
            <a href="#" target="_blank" rel="noreferrer">Play now</a>
            <button type="button" aria-label="Save ${game.title}">Save</button>
          </div>
        </article>
      `
    )
    .join("");

  availableCount.textContent = String(selectedGames.length);
  gameCountLabel.textContent = `${selectedGames.length} games loaded`;
}

button.addEventListener("click", () => {
  const randomSelection = shuffleGames(gameLibrary).slice(0, 6);
  renderGames(randomSelection);
});

renderGames(shuffleGames(gameLibrary).slice(0, 6));
