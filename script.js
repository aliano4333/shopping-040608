const items = [
  {
    id: "bread",
    name: "Bread",
    image: "images/Bread.jpg"
  },
  {
    id: "chicken",
    name: "Chicken",
    image: "images/Chicken.jpg"
  },
  {
    id: "eggs",
    name: "Eggs",
    image: "images/Eggs.jpg"
  },
  {
    id: "milk",
    name: "Milk",
    image: "images/Milk.jpg"
  },
  {
    id: "soda",
    name: "Soda",
    image: "images/Soda.jpg"
  },
  {
    id: "rice",
    name: "Rice",
    image: "images/Rice.jpg"
  },
  {
    id: "laundry",
    name: "Laundry Detergent",
    image: "images/Laundy.jpg"
  },
  {
    id: "flour",
    name: "Flour",
    image: "images/Flour.jpg"
  },
  {
    id: "onion",
    name: "Onion",
    image: "images/Onion.jpg"
  },
  {
    id: "apples",
    name: "Apples",
    image: "images/Apples.jpg"
  },
  {
    id: "cheese",
    name: "Cheese",
    image: "images/Cheese.jpg"
  },
  {
    id: "kinder",
    name: "Kinder",
    image: "images/Kinder.jpg"
  },
  {
    id: "lays",
    name: "Lays",
    image: "images/Lays.jpg"
  },
  {
    id: "oreo",
    name: "Oreo",
    image: "images/Oreo.jpg"
  }
];
const list = document.getElementById("list");

function getSavedStatus(itemId) {
  const saved = localStorage.getItem(`item-${itemId}`);
  return saved === null ? true : saved === "true";
}

function saveStatus(itemId, checked) {
  localStorage.setItem(`item-${itemId}`, checked);
}

function renderList() {
  list.innerHTML = "";

  items.forEach((item) => {
    const checked = getSavedStatus(item.id);

    const card = document.createElement("div");
    card.className = "item";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <h2>${item.name}</h2>
        <div class="status ${checked ? "have" : "need"}">
          ${checked ? "Have it" : "Need to buy"}
        </div>
      </div>
      <input type="checkbox" ${checked ? "checked" : ""}>
    `;

    const checkbox = card.querySelector("input");
    const status = card.querySelector(".status");

    checkbox.addEventListener("change", () => {
      saveStatus(item.id, checkbox.checked);

      status.textContent = checkbox.checked ? "Have it" : "Need to buy";
      status.className = `status ${checkbox.checked ? "have" : "need"}`;
    });

    list.appendChild(card);
  });
}

renderList();