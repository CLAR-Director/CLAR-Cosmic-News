const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles";

const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");

async function fetchNews() {
  try {
    console.log("Fetching news from API..."); // Debug
    const res = await fetch(apiUrl);
    console.log("Response status:", res.status); // Debug
    
    const data = await res.json();
    console.log("Data received:", data); // Debug

    displayNews(data.results);
  } catch (err) {
    console.error("Error fetching news:", err);
    newsContainer.innerHTML = "<p>⚠️ Could not load space news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No space news available right now.</p>";
    return;
  }

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

searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".news-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term) ? "block" : "none";
  });
});

fetchNews();
