import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUeAAHkaJU1877y-VDq9CzlWnEiLXrErs",
  authDomain: "shoppinglist-3f9ce.firebaseapp.com",
  databaseURL: "https://shoppinglist-3f9ce-default-rtdb.firebaseio.com",
  projectId: "shoppinglist-3f9ce",
  storageBucket: "shoppinglist-3f9ce.firebasestorage.app",
  messagingSenderId: "818016858856",
  appId: "1:818016858856:web:eeb7bcd158ad954c898f5d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const items = [
  { id: "bread", name: "Bread", image: "images/Bread.jpg" },
  { id: "chicken", name: "Chicken", image: "images/Chicken.jpg" },
  { id: "eggs", name: "Eggs", image: "images/Eggs.jpg" },
  { id: "milk", name: "Milk", image: "images/Milk.jpg" },
  { id: "soda", name: "Soda", image: "images/Soda.jpg" },
  { id: "rice", name: "Rice", image: "images/Rice.jpg" },
  { id: "laundry", name: "Laundry Detergent", image: "images/Laundy.jpg" },
  { id: "flour", name: "Flour", image: "images/Flour.jpg" },
  { id: "onion", name: "Onion", image: "images/Onion.jpg" },
  { id: "apples", name: "Apples", image: "images/Apples.jpg" },
  { id: "cheese", name: "Cheese", image: "images/Cheese.jpg" },
  { id: "kinder", name: "Kinder", image: "images/Kinder.jpg" },
  { id: "lays", name: "Lays", image: "images/Lays.jpg" },
  { id: "oreo", name: "Oreo", image: "images/Oreo.jpg" }
];

const list = document.getElementById("list");
const statusRef = ref(db, "shoppingStatus");

function renderList(statusData = {}) {
  list.innerHTML = "";

  items.forEach((item) => {
    const checked = statusData[item.id] ?? true;

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

    checkbox.addEventListener("change", () => {
      update(statusRef, {
        [item.id]: checkbox.checked
      });
    });

    list.appendChild(card);
  });
}

onValue(statusRef, (snapshot) => {
  const data = snapshot.val() || {};
  renderList(data);
});
