// Solar system data
const planets = [
  { name: "Sun", type: "Star", radius: "695,700 km", info: "The center of our solar system, providing light and heat.", img: "images/sun.jpg" },
  { name: "Mercury", type: "Planet", radius: "2,439 km", info: "Smallest planet, closest to the Sun.", img: "images/mercury.jpg" },
  { name: "Venus", type: "Planet", radius: "6,052 km", info: "Hottest planet due to thick CO2 atmosphere.", img: "images/venus.jpg" },
  { name: "Earth", type: "Planet", radius: "6,371 km", info: "Our home, the only known planet with life.", img: "images/earth.jpg" },
  { name: "Mars", type: "Planet", radius: "3,390 km", info: "The red planet, explored by many rovers.", img: "images/mars.jpg" },
  { name: "Jupiter", type: "Planet", radius: "69,911 km", info: "Largest planet with a giant red storm.", img: "images/jupiter.jpg" },
  { name: "Saturn", type: "Planet", radius: "58,232 km", info: "Famous for its beautiful rings.", img: "images/saturn.jpg" },
  { name: "Uranus", type: "Planet", radius: "25,362 km", info: "An ice giant that rotates on its side.", img: "images/uranus.jpg" },
  { name: "Neptune", type: "Planet", radius: "24,622 km", info: "Deep blue ice giant with strong winds.", img: "images/neptune.jpg" }
];

// Historical missions
const missions = [
  { name: "Apollo 11", date: "July 20, 1969", info: "First human landing on the Moon.", img: "images/apollo11.jpg" },
  { name: "Voyager 1", date: "September 5, 1977", info: "Farthest spacecraft from Earth, still sending data.", img: "images/voyager1.jpg" },
  { name: "Hubble Telescope", date: "April 24, 1990", info: "Revolutionized astronomy with deep space images.", img: "images/hubble.jpg" },
  { name: "Mars Rover Perseverance", date: "February 18, 2021", info: "NASA rover exploring Jezero Crater.", img: "images/perseverance.jpg" }
];

// Space news API
const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles";

// Insert planets
const planetsContainer = document.getElementById("planets-container");
planets.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p><strong>Type:</strong> ${p.type}</p>
    <p><strong>Radius:</strong> ${p.radius}</p>
    <p>${p.info}</p>
  `;
  planetsContainer.appendChild(card);
});

// Insert missions
const missionsContainer = document.getElementById("missions-container");
missions.forEach(m => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${m.img}" alt="${m.name}">
    <h3>${m.name}</h3>
    <p><strong>Date:</strong> ${m.date}</p>
    <p>${m.info}</p>
  `;
  missionsContainer.appendChild(card);
});

// Fetch space news
const newsContainer = document.getElementById("news-container");

async function fetchNews() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    newsContainer.innerHTML = "";
    data.results.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${article.image_url || 'images/fallback.jpg'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <a href="${article.url}" target="_blank">Read more →</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    newsContainer.innerHTML = "<p>⚠️ Failed to load space news.</p>";
  }
}

fetchNews();

// Sidebar search filter
document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(term) ? "block" : "none";
  });
});
