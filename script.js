// ===== PLANETS DATA =====
const planets = [
  { name: "Sun", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys8.jpg", desc: "The star at the center of our solar system." },
  { name: "Mercury", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", desc: "Smallest planet, closest to the Sun." },
  { name: "Venus", img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", desc: "Earth’s twin with extreme heat." },
  { name: "Earth", img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", desc: "Our home planet with life." },
  { name: "Mars", img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", desc: "The Red Planet with exploration rovers." },
  { name: "Jupiter", img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg", desc: "Gas giant with the Great Red Spot." },
  { name: "Saturn", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", desc: "Known for its stunning rings." },
  { name: "Uranus", img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", desc: "Ice giant with a tilted axis." },
  { name: "Neptune", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", desc: "Farthest planet with supersonic winds." }
];

const planetsContainer = document.getElementById("planets-container");
planets.forEach(p => {
  planetsContainer.innerHTML += `
    <div class="card searchable" data-text="${p.name} ${p.desc}">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
    </div>`;
});

// ===== MISSIONS DATA =====
const missions = [
  { name: "Apollo 11", year: "1969", img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Apollo_11_insignia.png", desc: "First human Moon landing." },
  { name: "Voyager 1", year: "1977", img: "https://upload.wikimedia.org/wikipedia/commons/d/df/Voyager_insignia.png", desc: "Exploring interstellar space." },
  { name: "Curiosity Rover", year: "2011", img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg", desc: "Mars rover studying the Red Planet." }
];

const missionsContainer = document.getElementById("missions-container");
missions.forEach(m => {
  missionsContainer.innerHTML += `
    <div class="card searchable" data-text="${m.name} ${m.desc} ${m.year}">
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name} (${m.year})</h3>
      <p>${m.desc}</p>
    </div>`;
});

// ===== SPACE NEWS (API) =====
async function loadNews() {
  try {
    const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=8");
    const data = await res.json();
    const newsContainer = document.getElementById("news-container");

    data.results.forEach(article => {
      newsContainer.innerHTML += `
        <div class="card searchable" data-text="${article.title} ${article.summary}">
          <img src="${article.image_url}" alt="News Image">
          <h3>${article.title}</h3>
          <p>${new Date(article.published_at).toLocaleString()}</p>
          <a href="${article.url}" target="_blank">Read More →</a>
        </div>`;
    });
  } catch (err) {
    document.getElementById("news-container").innerHTML = "<p>⚠️ Could not load space news.</p>";
  }
}
loadNews();

// ===== SEARCH FUNCTION =====
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".searchable").forEach(card => {
    const text = card.getAttribute("data-text").toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
});
