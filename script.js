const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

const sortSelect = document.getElementById("sortSelect");

let items = [
  {
    id: 0,
    name: "Apples",
    price: 1.5,
  },
  {
    id: 1,
    name: "Bananas",
    price: 1.2,
  },
  {
    id: 2,
    name: "Oranges",
    price: 1.8,
  },
  {
    id: 3,
    name: "Strawberries",
    price: 3.5,
  },
  {
    id: 4,
    name: "Grapes",
    price: 2.5,
  },
  {
    id: 5,
    name: "Pineapple",
    price: 2.0,
  },
  {
    id: 6,
    name: "Kiwi",
    price: 0.3,
  },
  {
    id: 7,
    name: "Blueberries",
    price: 4.0,
  },
  {
    id: 8,
    name: "Watermelon",
    price: 0.8,
  },
  {
    id: 9,
    name: "Lemons",
    price: 1.0,
  },
  {
    id: 10,
    name: "Pears",
    price: 1.8,
  },
  {
    id: 11,
    name: "Peaches",
    price: 2.5,
  },
  {
    id: 12,
    name: "Mangoes",
    price: 2.5,
  },
  {
    id: 13,
    name: "Raspberries",
    price: 4.0,
  },
  {
    id: 14,
    name: "Cherries",
    price: 3.5,
  },
  {
    id: 15,
    name: "Plums",
    price: 2.0,
  },
];

let cart = [];

// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
  const existingItems = document.querySelectorAll(".item");
  existingItems.forEach((item) => {
    item.remove();
  });

  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="img/fruits/${item.name}.jpg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onClick=addToCart(${
              item.id
            }) data-id="${item.id}">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
}

function addToCart(itemId) {
  let item = items.find((v) => v.id === itemId);
  cart.push(item);
  refreshCart();
  refreshCartButton();
}

function removeFromCart(itemId) {
  let item = cart.find((v) => v.id === itemId);
  cart.splice(cart.indexOf(item), 1);
  refreshCart();
  refreshCartButton();
}

function refreshCartButton() {
  cartBadge.innerHTML = cart.length;
}

function refreshCart() {
  cartItemsList.innerHTML = "";
  cart.forEach((v) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <h3 class="product-details">${v.name}</h3>
            <p class="product-details">$${v.price.toFixed(2)}</p>
            <button class="remove-from-cart-btn add-to-cart-btn" onClick=removeFromCart(${
              v.id
            }) data-id="${v.id}">Remove</button>
        `;
    cartItemsList.appendChild(cartItem);
  });
  let total = 0.0;
  cart.forEach((i) => (total += i.price));
  cartTotal.innerHTML = `$${total.toFixed(2)}`;
  cart.forEach((i) => (totalItems = i++));
}

sortSelect.addEventListener("change", () => {
  if (sortSelect.value == "popular") {
    items.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else if (sortSelect.value == "notPopular") {
    items.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  if (sortSelect.value == "lowest")
    items.sort((a, b) => (a.price > b.price ? 1 : -1));
  else if (sortSelect.value == "highest")
    items.sort((a, b) => (a.price > b.price ? -1 : 1));

  fillItemsGrid();
});

function buyItems() {
  if (cart.length === 0) {
    alert("Your cart is empty! Try adding something!");
  } else {
    cart = [];
    refreshCart();
    refreshCartButton();
    alert("Your order was successfull!");
  }
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle("show-modal");
}

// Call fillItemsGrid function when page loads
fillItemsGrid();

// Example of DOM methods for adding event handling
cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
buyButton.addEventListener("click", buyItems);
