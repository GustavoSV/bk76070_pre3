import { createImage } from "./createImage.js";

let currentPage = 1;
let currentCategory = '';

document.addEventListener("DOMContentLoaded", () => {
  // Cargar productos iniciales
  loadProducts(currentPage, currentCategory);

  // Configurar listener para filtros de categoría
  setupCategoryFilters();
});

function setupCategoryFilters() {
  const categoryFilters = document.querySelectorAll("#dropdown-menu li a");
  categoryFilters.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      event.preventDefault();
      currentCategory = event.target.textContent === 'Todos' ? '' : event.target.textContent; //event.target.productsset.category;
      currentPage = 1;
      loadProducts(currentPage, currentCategory);
    });
  });
}

function loadProducts(page, category) {
  let url = `/api/products?page=${page}&limit=6`;
  if (category) {
    url += `&category=${category}`;
  }
  // Obtener los productos de la API
  fetch(url)
  .then((response) => response.json())
  .then((products) => {
    // Obtener el contenedor de productos
    const productsContainer = document.getElementById("productsList");
    productsContainer.innerHTML = "";

    // Crear las filas de productos
    for (let i = 0; i < products.data.length; i += 2) {
      // Crear una nueva fila para cada par de productos
      const row = document.createElement("div");
      row.className = "row";

      // Primer producto de la fila
      const col1 = createProductCard(products.data[i]);
      row.appendChild(col1);

      // Segundo producto de la fila (si existe)
      if (i + 1 < products.data.length) {
        const col2 = createProductCard(products.data[i + 1]);
        row.appendChild(col2);
      }

      productsContainer.appendChild(row);
    }
    // Actualizar paginación
    updatePagination(products);
})
.catch((error) => console.error("Error:", error));
};

function createProductCard(product) {
  // // Crear columna
  // const col = document.createElement("div");
  // col.className = "col s12 m6";  // 12 columnas en dispositivos pequeños, 6 en medianos

  // // Crear card
  // const card = document.createElement("div");
  // card.className = "card horizontal";
  // // card.style.margin = "0 10px"; // Reducir márgenes laterales

  // // Crear sección de imagen
  // const src =
  //   product.thumbnails && product.thumbnails.length > 0
  //     ? product.thumbnails[0]
  //     : "/img/Imagen por defecto.jpg";
  // const cardImage = createImage("div", src, product.title, "200px");

  // // Crear contenido de la card
  // const cardStacked = document.createElement("div");
  // cardStacked.className = "card-stacked";

  // // Crear contenido de la card
  // const cardContent = document.createElement("div");
  // cardContent.className = "card-content";

  // // Título del producto
  // const title = document.createElement("h4");
  // title.className = "card-title teal-text";
  // title.textContent = product.title;

  // // Autor del producto
  // const author = document.createElement("p");
  // author.textContent = product.author;

  // // Precio
  // const price = document.createElement("p");
  // price.className = "price";
  // price.textContent = `$${product.price}`;

  // // Agregar elementos a la card
  // cardContent.appendChild(title);
  // cardContent.appendChild(author);
  // cardContent.appendChild(price);

  // cardStacked.appendChild(cardContent);

  // card.appendChild(cardImage);
  // card.appendChild(cardStacked);

  // col.appendChild(card);

  // return col;


  const col = document.createElement("div");
  col.className = "col s12 m6";

  const card = document.createElement("div");
  card.className = "card horizontal hoverable";
  card.style.cursor = "pointer"; // cambia el cursor a pointer para indicar que es clickeable

  // Agregar event listener para el click
  card.addEventListener('click', () => {
    window.location.href = `/products/${product._id}`; // Redirigir a la página del producto
  });
  
  // Ajustar estilos de la card
  card.style.display = "flex";
  card.style.flexDirection = "row";
  card.style.margin = "10px 0";
  
  // Ajustar la imagen
  const src = product.thumbnails?.length > 0 ? product.thumbnails[0] : "/img/Imagen por defecto.jpg";
  const cardImage = createImage("div", src, product.title, "130px");
  cardImage.style.minWidth = "130px";
  cardImage.style.margin = "10px";
  
  // Ajustar el contenido
  const cardStacked = document.createElement("div");
  cardStacked.className = "card-stacked";
  cardStacked.style.flex = "1";
  cardStacked.style.minWidth = "0"; // Importante para el texto largo
  
  const cardContent = document.createElement("div");
  cardContent.className = "card-content";
  cardContent.style.padding = "15px";
  
  const title = document.createElement("h4");
  title.className = "card-title teal-text";
  title.textContent = product.title;
  title.style.fontSize = "1.5rem";
  title.style.marginTop = "0";
  title.style.wordWrap = "break-word";
  title.style.overflow = "hidden";
  title.style.textOverflow = "ellipsis";
  
  const author = document.createElement("p");
  author.textContent = product.author;
  author.style.marginBottom = "5px";
  
  const price = document.createElement("p");
  price.className = "price";
  price.textContent = `$${product.price}`;
  price.style.fontWeight = "bold";
  
  cardContent.appendChild(title);
  cardContent.appendChild(author);
  cardContent.appendChild(price);
  cardStacked.appendChild(cardContent);
  card.appendChild(cardImage);
  card.appendChild(cardStacked);
  col.appendChild(card);
  
  return col;
}

function updatePagination(products) {
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const currentPageInput = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');

  // Actualizar número de página actual y total
  currentPageInput.value = products.page;
  totalPagesSpan.textContent = products.totalPages;

  // Habilitar/deshabilitar botones según corresponda
  prevButton.disabled = !products.hasPrevPage;
  nextButton.disabled = !products.hasNextPage;

  // Configurar event listeners
  prevButton.onclick = () => products.hasPrevPage && loadProducts(products.prevPage, currentCategory);
  nextButton.onclick = () => products.hasNextPage && loadProducts(products.nextPage, currentCategory);

  // Manejar cambio manual de página
  currentPageInput.onchange = (e) => {
    let newPage = parseInt(e.target.value);
    
    // Validar que el número de página sea válido
    if (newPage < 1) newPage = 1;
    if (newPage > products.totalPages) newPage = products.totalPages;
    
    loadProducts(newPage, currentCategory);
  };
}