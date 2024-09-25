
let supermercados = [];
const selloBaratoUrl = '../assets/Fotos/Mejor\ precio.png';

function cargarPrecios() {
  fetch('../categorias.json')
    .then(response => response.json())
    .then(data => {
      supermercados = data.categorias.supermercados;
      mostrarPrecios(supermercados);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function mostrarPrecios(productos) {
  const tablaBody = document.querySelector("#tabla-precios tbody");
  tablaBody.innerHTML = "";

  productos.forEach((producto, index) => {
    const precios = producto.empresas.map(empresa => parseFloat(empresa.precio));
    const precioMinimo = Math.min(...precios); // Identificar el precio más bajo

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.producto}</td>
      ${producto.empresas.map((empresa, empresaIndex) => `
        <td>
          ${empresa.precio}
          ${parseFloat(empresa.precio) === precioMinimo ? `<img src="${selloBaratoUrl}" class="sello-barato" alt="Sello más barato">` : ''}
          <div class="btn-group">
            <button class="btn btn-add btn-action" onclick="agregarAlCarrito(${index}, ${empresaIndex})">+</button>
            <button id="remove-${index}-${empresaIndex}" class="btn btn-remove btn-action" onclick="eliminarDelCarrito(${index}, ${empresaIndex})" disabled>Eliminar</button>
            <button class="btn btn-favorite btn-action" onclick="agregarAFavoritos(${index}, ${empresaIndex})">❤️</button>
          </div>
        </td>
      `).join('')}
    `;
    tablaBody.appendChild(fila);
  });
}

function filtrarPrecios() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const productosFiltrados = supermercados.filter(producto =>
    producto.producto.toLowerCase().includes(query)
  );
  mostrarPrecios(productosFiltrados);
}

function agregarAlCarrito(index, supermercadoIndex) {
  const producto = supermercados[index];
  const oferta = producto.empresas[supermercadoIndex];
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push({ producto: producto.producto, oferta });
  localStorage.setItem

  localStorage.setItem('carrito', JSON.stringify(carrito));
document.querySelector(`#remove-${index}-${supermercadoIndex}`).disabled = false;
new Noty({
text: 'Producto agregado al carrito!',
type: 'success',
timeout: 2000
}).show();
}

function eliminarDelCarrito(index, supermercadoIndex) {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
carrito = carrito.filter(item => !(item.producto === supermercados[index].producto && item.oferta.precio === supermercados[index].empresas[supermercadoIndex].precio));
localStorage.setItem('carrito', JSON.stringify(carrito));
document.querySelector(`#remove-${index}-${supermercadoIndex}`).disabled = true;
new Noty({
text: 'Producto eliminado del carrito!',
type: 'error',
timeout: 2000
}).show();
}

function agregarAFavoritos(index, supermercadoIndex) {
const producto = supermercados[index];
const oferta = producto.empresas[supermercadoIndex];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
if (!favoritos.some(item => item.producto === producto.producto && item.oferta.precio === oferta.precio)) {
favoritos.push({ producto: producto.producto, oferta });
localStorage.setItem('favoritos', JSON.stringify(favoritos));
new Noty({
text: 'Producto añadido a favoritos!',
type: 'success',
timeout: 2000
}).show();
} else {
new Noty({
text: 'El producto ya está en favoritos!',
type: 'info',
timeout: 2000
}).show();
}
}

document.getElementById("searchInput").addEventListener("input", filtrarPrecios);

window.onload = cargarPrecios;
