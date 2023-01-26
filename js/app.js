////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Seleccionar elementos

const productsEl = document.querySelector(".products");
const CartItemsElements = document.querySelector("#cart-items tbody");
const subtotalElements = document.querySelector(".buttonCheckout");
const totalItemsInCartCount = document.querySelector("#contador-productos");

// Array carrito

// recupero el valor de la key ó un array vacio
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Mostrar productos
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
        <div class="card-products">
            <img src="${product.imgSrc}" class="imagen-producto">
                <div class="info-card">
                <h4 class="card-title">${product.name}</h4>
                <p class="precio">$${product.price}</p>
                <img src="../img/heart-card.png" alt="añadir al carrito" class="add-cart" onclick="addToCart(${product.id})">
                </div>
        </div>
        `;
  });
}
renderProducts();

const titleSneakers = document.querySelector('.title')

titleSneakers.innerHTML = `
          <h2 class="title__h2-snkrs" id="title-h2-snkr">${products.length} Productos</h2>
` 

// Añadir al carrito

function addToCart(id) {
  // Verifico si "product" ya existe en el carrito
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const itemJacket = jackets.find((product) => product.id === id);
    const item = products.find((product) => product.id === id);
    cart.push({
      ...itemJacket,
      ...item,
      numberOfItems: 1,
    });
  }
  // mostrar alerta cuando se agreguen productos al carrito
  const Toast = Swal.mixin({
    background: "#1b1b1b",
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
  });

  Toast.fire({
    width: "310px",
    color: "#fff",
    title: "Product added successfully",
  });
  updateCart();
}

// Actualizar carrito

function updateCart() {
  renderCartItems();
  renderSubTotal();

  // LocalStorage con key y value
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calcular y mostrar el subtotal

function renderSubTotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice = totalPrice + item.price * item.numberOfItems;
    totalItems = totalItems + item.numberOfItems;
  });
  subtotalElements.innerHTML = `
        Subtotal (${totalItems} items): $${totalPrice.toFixed(2)} | Checkout
    `;
  totalItemsInCartCount.innerText = totalItems;
  console.log(totalPrice);
}

// mostrar los items en el carrito
function renderCartItems() {
  CartItemsElements.innerHTML = ""; // limpiar HTML
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>  
            <img class="item-img-src ss" src="${item.imgSrc}">
        </td>
            <div class="container-carrito-items">
                <div class="carrito-titulo">${item.name}</div>
                <div class="carrito-precio">$${item.price}</div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})"> - </div>
                     <div class="number">${item.numberOfItems}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})"> + </div>
                </div>
        </div>
        <td>
            <i class="fa-solid fa-trash-can delete-item" onclick="removeItemFromCart(${item.id})"></i>
        </td>
        `;
    CartItemsElements.appendChild(row);
  });
}

//  Eliminar item del carrito
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();

  // si el carrito esta vacio mostrará este msj
  if (!cart.length) {
    subtotalElements.innerHTML = `
            <a href="sneakers.html" class="cart-empty">Cart is empty, go to buy!</a>
        `;
  }
}
// cambiar el numero de items para un item

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfItems = item.numberOfItems;

    if (item.id === id) {
      if (action === "minus" && numberOfItems > 1) {
        numberOfItems--;
      } else if (action === "plus" && numberOfItems < item.instock) {
        numberOfItems++;
      }
      // numberOfItems no puede ser < a 1 producto
      // numberOfItems no puede ser > a item.instock
    }
    return {
      ...item,
      numberOfItems,
    };
  });
  updateCart();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
