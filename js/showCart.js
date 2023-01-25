// Funciones para expandir el carrito
document.querySelector("#btn").addEventListener("click", show_cart);
document.querySelector(".container-phone-menu").addEventListener("click", hide_cart);

const showCart = document.querySelector(".cart__table");
const backgroundCart = document.querySelector(".container-phone-menu");

function show_cart(){
    showCart.style.right = "0px";
    backgroundCart.style.display = "block";
}

function hide_cart(){
    showCart.style.right = "-620px";
    backgroundCart.style.display = "none";
}