// --- Cosmic News ---
async function getNews() {
  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=5');
    const data = await response.json();
    const newsList = document.getElementById('news-list');

    data.results.forEach(article => {
      const div = document.createElement('div');
      div.className = 'card';
      // Use image from article or fallback space image
      const imgSrc = article.imageUrl || "https://images.unsplash.com/photo-1470163395405-d2a3a92f4df0?fit=crop&w=800";
      div.innerHTML = `
        <img src="${imgSrc}" alt="Cosmic News">
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsList.appendChild(div);
    });
  } catch (err) {
    console.error("News fetch error:", err);
  }
}

// --- Planets & Stars ---
async function getPlanetData() {
  try {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    const data = await response.json();
    const planets = data.bodies.filter(body => body.isPlanet);
    const container = document.getElementById('planet-list');

    planets.forEach(planet => {
      const div = document.createElement('div');
      div.className = 'card';
      // Fetch image dynamically from Wikipedia or Unsplash API (fallback image)
      const planetImg = `https://source.unsplash.com/400x300/?${planet.englishName},planet,space`;
      div.innerHTML = `
        <img src="${planetImg}" alt="${planet.englishName}">
        <h3>${planet.englishName}</h3>
        <p>Mass: ${planet.mass.massValue} x10^${planet.mass.massExponent} kg</p>
        <p>Radius: ${planet.meanRadius} km</p>
        <p>Gravity: ${planet.gravity} m/s²</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Planet fetch error:", err);
  }
}

// --- Space Missions ---
async function getMissions() {
  try {
    const response = await fetch('https://api.spacexdata.com/v4/launches/past?limit=5');
    const data = await response.json();
    const missionsList = document.getElementById('missions-list');

    data.forEach(mission => {
      const div = document.createElement('div');
      div.className = 'card';
      // Dynamic rocket image from Unsplash
      const rocketImg = `https://source.unsplash.com/400x300/?rocket,${mission.name}`;
      div.innerHTML = `
        <img src="${rocketImg}" alt="${mission.name}">
        <h3>${mission.name}</h3>
        <p>Date: ${new Date(mission.date_utc).toDateString()}</p>
        <p>Rocket: ${mission.rocket}</p>
      `;
      missionsList.appendChild(div);
    });
  } catch (err) {
    console.error("Missions fetch error:", err);
  }
}

// --- Initialize ---
getNews();
getPlanetData();
getMissions();
