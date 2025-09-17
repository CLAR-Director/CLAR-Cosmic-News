const grid = document.getElementById("grid");
const search = document.getElementById("search");

// Fetch JSON data
async function fetchData() {
  const response = await fetch("data.json");
  const items = await response.json();
  renderItems(items);

  // Search filter
  search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(value) ||
      item.type.toLowerCase().includes(value)
    );
    renderItems(filtered);
  });
}

// Render items
function renderItems(items) {
  grid.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.type}</p>
    `;
    grid.appendChild(card);
  });
}

// Initial fetch
fetchData();
