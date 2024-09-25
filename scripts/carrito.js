function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItemsDiv = document.getElementById("carrito-items");
    let total = 0;

    carritoItemsDiv.innerHTML = "";

    carrito.forEach((item, index) => {
      const subtotal = item.oferta.precio * item.cantidad;
      total += subtotal;

      const productoHtml = `
        <div class="carrito-item">
          <p><strong>${item.producto}</strong> - $${item.oferta.precio}</p>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
      `;
      carritoItemsDiv.innerHTML += productoHtml;
    });

    document.getElementById("total-carrito").innerText = total.toFixed(2);
  }

  document.getElementById('vaciar-carrito').addEventListener('click', () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('carrito');
        cargarCarrito();
        Swal.fire('Vacío', 'El carrito ha sido vaciado.', 'success');
      }
    });
  });

  document.getElementById('simular-pago').addEventListener('click', () => {
    Swal.fire({
      title: '¿No se te olvida nada?',
      text: '¿Quieres culminar tu compra y proceder al pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero pagar',
      cancelButtonText: 'Me faltó algo, ya vuelvo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Pago realizado con éxito', 'El pago ha sido simulado y el carrito ha sido vaciado.', 'success');
        localStorage.removeItem('carrito');
        cargarCarrito();
      }
    });
  });

  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    new Notify({
      text: 'Producto eliminado del carrito',
      type: 'error',
      timeout: 2000
    }).show();
  }

  window.onload = cargarCarrito;

  function cargarCarrito() {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoItemsDiv = document.getElementById("carrito-items");
let total = 0;

carritoItemsDiv.innerHTML = "";

carrito.forEach((item, index) => {
  const subtotal = item.oferta.precio;
  total += subtotal;

  const productoHtml = `
    <div class="carrito-item">
      <p><strong>${item.producto}</strong> - $${item.oferta.precio.toFixed(2)}</p>
      <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
    </div>
  `;
  carritoItemsDiv.innerHTML += productoHtml;
});

document.getElementById("total-carrito").innerText = total.toFixed(2);
}

function eliminarProducto(index) {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
carrito.splice(index, 1);
localStorage.setItem('carrito', JSON.stringify(carrito));
cargarCarrito();
new Noty({
  text: 'Producto eliminado del carrito',
  type: 'error',
  timeout: 2000
}).show();
}
