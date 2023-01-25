const productsJackets = document.querySelector(".products-jackets");

function renderJackets() {
    jackets.forEach((jacket) => {
      productsJackets.innerHTML += `
          <div class="card-products">
              <img src="${jacket.imgSrc}" class="imagen-jackets">
                  <div class="info-card">
                  <h4 class="card-title">${jacket.name}</h4>
                  <p class="precio">$${jacket.price}</p>
                  <img src="../img/heart-card.png" alt="añadir al carrito" class="add-cart" onclick="addToCart(${jacket.id})">
                  </div>
          </div>
          `;
    });
  }
  renderJackets();

  const titleJackets = document.querySelector('.title')

  titleJackets.innerHTML = `
            <h2 class="title__h2-snkrs" id="title-h2-snkr">Jackets ${jackets.length} productos</h2>
  ` 
