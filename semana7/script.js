const productos = [
    {
        nombre: "Laptop HP Pavilion",
        precio: 750.00,
        descripcion: "Intel Core i5, 8GB RAM, SSD 512GB."
    },
    {
        nombre: "Mouse Logitech",
        precio: 25.50,
        descripcion: "Ergonómico, Bluetooth y batería de larga duración."
    },
    {
        nombre: "Monitor Samsung 24''",
        precio: 180.00,
        descripcion: "Full HD con panel IPS."
    }
];

const listaProductos = document.getElementById('lista-productos');
const btnAgregar = document.getElementById('btn-agregar');

// Renderiza un item usando template strings
function renderizarProducto(producto) {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="price">Precio: $${producto.precio.toFixed(2)}</p>
    `;

    listaProductos.appendChild(li);
}

function cargarLista() {
    listaProductos.innerHTML = '';
    productos.forEach(renderizarProducto);
}

// Evento para simular nuevo producto
btnAgregar.addEventListener('click', () => {
    const nuevo = {
        nombre: `Producto Nuevo ${productos.length + 1}`,
        precio: Math.floor(Math.random() * 100) + 10,
        descripcion: "Descripción generada dinámicamente."
    };

    productos.push(nuevo);
    renderizarProducto(nuevo);
});

// Init
cargarLista();