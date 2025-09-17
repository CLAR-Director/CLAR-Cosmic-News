// ✅ Planets data
const planets = [
  { name: "Sun", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys8.jpg", details: "The star at the center of our solar system." },
  { name: "Mercury", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", details: "Smallest planet, closest to the Sun." },
  { name: "Venus", img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", details: "Hot and cloudy planet." },
  { name: "Earth", img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", details: "Our home planet." },
  { name: "Mars", img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", details: "The Red Planet." },
  { name: "Jupiter", img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg", details: "Largest planet in the solar system." },
  { name: "Saturn", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", details: "Known for its rings." },
  { name: "Uranus", img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", details: "An ice giant tilted on its side." },
  { name: "Neptune", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", details: "The windiest planet." }
];

const planetGrid = document.getElementById("planetGrid");
planets.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${p.img}" alt="${p.name}"/><h3>${p.name}</h3><p>${p.details}</p>`;
  planetGrid.appendChild(card);
});

// ✅ Historic Missions
const missions = [
  { name: "Apollo 11", date: "1969-07-20", img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Apollo_11_Lunar_Module_on_the_Moon.jpg", details: "First Moon landing." },
  { name: "Voyager 1", date: "1977-09-05", img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Voyager.jpg", details: "Farthest human-made object." },
  { name: "Hubble Telescope", date: "1990-04-24", img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Hubble_Space_Telescope_imaged_by_STS-82.jpg", details: "Revolutionary space telescope." }
];

const missionGrid = document.getElementById("missionGrid");
missions.forEach(m => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${m.img}" alt="${m.name}"/><h3>${m.name}</h3><small>${m.date}</small><p>${m.details}</p>`;
  missionGrid.appendChild(card);
});

// ✅ Space News (NASA API proxy example with placeholder)
const newsContainer = document.getElementById("newsContainer");
async function fetchNews() {
  const res = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
  const data = await res.json();
  data.slice(0, 5).forEach(n => {
    const article = document.createElement("article");
    article.innerHTML = `<h3>${n.title}</h3><small>${new Date(n.publishedAt).toLocaleString()}</small><p>${n.summary}</p><a href="${n.url}" target="_blank">Read more</a>`;
    newsContainer.appendChild(article);
  });
}
fetchNews();

// ✅ Search bar filter
document.getElementById("searchBar").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(term) ? "block" : "none";
  });
});
