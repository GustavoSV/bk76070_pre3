import { createImage } from "./createImage.js";

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // Obtener el contenedor de productos         
            const productsContainer = document.getElementById('productsList');
            
            // Crear las filas de productos
            for (let i = 0; i < products.length; i += 2) {
                // Crear una nueva fila para cada par de productos
                const row = document.createElement('div');
                row.className = 'row';
                
                // Primer producto de la fila
                const col1 = createProductCard(products[i]);
                row.appendChild(col1);
                
                // Segundo producto de la fila (si existe)
                if (i + 1 < products.length) {
                    const col2 = createProductCard(products[i + 1]);
                    row.appendChild(col2);
                }
                
                productsContainer.appendChild(row);
            }
        })
        .catch(error => console.error('Error:', error));
});

function createProductCard(product) {
    // Crear columna
    const col = document.createElement('div');
    col.className = 'col s12 m6';
    
    // Crear card
    const card = document.createElement('div');
    card.className = 'card horizontal';

    // Crear sección de imagen
    const src = (product.thumbnails && product.thumbnails.length > 0) 
            ? product.thumbnails[0] 
            : '/img/Mazda6e.jpg';
    const cardImage = createImage('div', src, product.title, '200px');

    // const cardImage = document.createElement('div');
    // cardImage.className = 'card-image';
    // const img = document.createElement('img');
    
    // // Usar el primer thumbnail si existe, sino usar imagen por defecto
    // img.src = (product.thumbnails && product.thumbnails.length > 0) 
    //     ? product.thumbnails[0] 
    //     : '/img/Mazda6e.jpg';
    
    // img.alt = product.title;
    // img.style.maxWidth = '200px';  // Limitar tamaño de imagen
    // img.style.objectFit = 'cover'; // Asegurar que la imagen cubra el espacio
    // cardImage.appendChild(img);
    
    // Crear contenido de la card
    const cardStacked = document.createElement('div');
    cardStacked.className = 'card-stacked';
    
    // Crear contenido de la card
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    
    // Título del producto
    const title = document.createElement('h4');
    title.className = 'card-title teal-text';
    title.textContent = product.title;
    
    // Descripción
    const description = document.createElement('p');
    description.textContent = product.description;
    
    // Precio
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price}`;
    
    // Agregar elementos a la card
    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardContent.appendChild(price);

    cardStacked.appendChild(cardContent);

    card.appendChild(cardImage);
    card.appendChild(cardStacked);

    col.appendChild(card);
    
    return col;
}