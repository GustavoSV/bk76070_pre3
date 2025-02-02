import { createImage } from "./createImage.js";

const socket = io();

socket.on('init', (products) => { 
  const productsList = document.getElementById('productsList');

  const table = document.createElement('table');
  table.className = 'striped';
  const thead = document.createElement('thead');
  const trThead = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Name';
  const th2 = document.createElement('th');
  th2.textContent = 'Item Name';
  const th3 = document.createElement('th');
  th3.textContent = 'Item Price';
  trThead.appendChild(th1);
  trThead.appendChild(th2);
  trThead.appendChild(th3);
  thead.appendChild(trThead);

  const tbody = document.createElement('tbody');

  products.forEach(product => {
    const productItem = createProductItem(product);
    tbody.appendChild(productItem);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  productsList.appendChild(table);
  
});

function createProductItem(product) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const strong = document.createElement('strong');
  strong.textContent = product.title;
  td1.appendChild(strong);
  tr.appendChild(td1);
  const td2 = document.createElement('td');
  const span = document.createElement('span');
  span.textContent = product.description;
  td2.appendChild(span);
  tr.appendChild(td2);
  const td3 = document.createElement('td');
  td3.textContent = `$${product.price}`;
  tr.appendChild(td3);

  const src = (product.thumbnails && product.thumbnails.length > 0) 
        ? product.thumbnails[0] 
        : '/img/Mazda6e.jpg';
  const cardImage = createImage('td', src, product.title, '80px');
  tr.appendChild(cardImage);

  return tr;
}
