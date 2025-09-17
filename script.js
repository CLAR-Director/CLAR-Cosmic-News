const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles"; // Free space news API

const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");

async function fetchNews() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    displayNews(data.results);
  } catch (err) {
    newsContainer.innerHTML = "<p>⚠️ Could not load space news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.image_url || 'fallback.jpg'}" alt="News Image">
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <a href="${article.url}" target="_blank">Read more →</a>
    `;

    newsContainer.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".news-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term) ? "block" : "none";
  });
});

// Fetch news on load
fetchNews();
