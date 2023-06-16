const enCarrito = [];
const productos = [
  { id: 1, nombre: "Lapices para esribir", precio: 150 },
  { id: 2, nombre: "Lapices para colorear", precio: 300 },
  { id: 3, nombre: "Lapicera", precio: 200 },
  { id: 4, nombre: "Sacapuntas", precio: 250 },
  { id: 5, nombre: "Crayones", precio: 500 },
  { id: 6, nombre: "Block de hojas", precio: 1100 }
];

const containerProductos = document.getElementById("productos");
containerProductos.className = ("container")

productos.forEach(producto => {
  const cadaProducto = document.createElement("div");
  cadaProducto.className = "producto";
  cadaProducto.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button id="btnProducto${producto.id}">Agregar al carrito</button>
  `;

  cadaProducto.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });

  containerProductos.appendChild(cadaProducto); 
});

function agregarAlCarrito(idProducto) {
  const productoEncontrado = productos.find(producto => producto.id === idProducto);
  if (productoEncontrado) {
    const productoEnCarrito = enCarrito.find(p => p.id === idProducto);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
    } else {
      enCarrito.push({ ...productoEncontrado, cantidad: 1 });
    }
    renderizarCarrito();
  }
}

function eliminarDelCarrito(indice) {
  enCarrito.splice(indice, 1);
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";

  let total = 0;
  for (let i = 0; i < enCarrito.length; i++) {
    const productoEnCarrito = enCarrito[i];
    const cadaProducto = document.createElement("div");
    cadaProducto.innerHTML = `${productoEnCarrito.nombre} (Cantidad: ${productoEnCarrito.cantidad}) - $${productoEnCarrito.precio * productoEnCarrito.cantidad}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(i);
    });

    cadaProducto.appendChild(botonEliminar);
    contenedorCarrito.appendChild(cadaProducto);
    total += productoEnCarrito.precio * productoEnCarrito.cantidad;
  }

  const cadaTotal = document.createElement("p");
  cadaTotal.innerHTML = `Total: $${total}`;
  contenedorCarrito.appendChild(cadaTotal);
}
