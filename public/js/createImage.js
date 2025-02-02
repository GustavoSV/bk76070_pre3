export function createImage(element, src, alt, maxWidth = '50px') {
  // Crear sección de imagen
  const cardImage = document.createElement(element);
  cardImage.className = 'card-image';
  const img = document.createElement('img');
  
  // Usar el primer thumbnail si existe, sino usar imagen por defecto
  img.src = src;
  
  img.alt = alt;
  img.style.maxWidth = maxWidth;  // Limitar tamaño de imagen
  img.style.objectFit = 'cover'; // Asegurar que la imagen cubra el espacio
  cardImage.appendChild(img);

  return cardImage;
}