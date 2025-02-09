import { createImage } from "./createImage.js";

const socket = io();

socket.on('init', (products) => { 
  const productsList = document.getElementById('productsList');

  const table = document.createElement('table');
  table.className = 'striped';
  const thead = document.createElement('thead');
  const trThead = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Title';
  const th2 = document.createElement('th');
  th2.textContent = 'Author';
  const th3 = document.createElement('th');
  th3.textContent = 'Category';
  const th4 = document.createElement('th');
  th4.textContent = 'Item Price';
  trThead.appendChild(th1);
  trThead.appendChild(th2);
  trThead.appendChild(th3);
  trThead.appendChild(th4);
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
  const span2 = document.createElement('span');
  span2.textContent = product.author;
  td2.appendChild(span2);
  tr.appendChild(td2);

  const td3 = document.createElement('td');
  const span3 = document.createElement('span');
  span3.textContent = product.category;
  td3.appendChild(span3);
  tr.appendChild(td3);

  const td4 = document.createElement('td');
  td4.textContent = `$${product.price}`;
  tr.appendChild(td4);

  const src = (product.thumbnails && product.thumbnails.length > 0) 
        ? product.thumbnails[0] 
        : '/img/Mazda6e.jpg';
  const cardImage = createImage('td', src, product.title, '80px');
  tr.appendChild(cardImage);

  return tr;
}
