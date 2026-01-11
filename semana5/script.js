// REFERENCIAS AL DOM
const inputUrl = document.getElementById('imgUrl');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('fullImage');
const closeBtn = document.querySelector('.close');

// 1. FUNCIÓN PRINCIPAL: CREAR IMAGEN
function crearImagen(url) {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'gallery-img';
    
    // Evento al hacer clic en la imagen
    img.addEventListener('click', () => {
        // A) Seleccionar (Borde Verde)
        document.querySelectorAll('.selected').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        
        // B) Abrir Modal (Ver grande)
        abrirModal(url);
    });

    gallery.appendChild(img);
}

// 2. BOTÓN AGREGAR MANUAL
document.getElementById('addBtn').addEventListener('click', () => {
    const url = inputUrl.value.trim();
    if (url) {
        crearImagen(url);
        inputUrl.value = ''; // Limpiar
    } else {
        alert("Escribe una URL válida");
    }
});

// 3. BOTÓN ALEATORIO (API Picsum)
document.getElementById('autoBtn').addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 1000);
    crearImagen(`https://picsum.photos/id/${randomId}/500/500`);
});

// 4. BOTÓN ELIMINAR
document.getElementById('delBtn').addEventListener('click', () => {
    const seleccionada = document.querySelector('.selected');
    if (seleccionada) {
        seleccionada.remove();
        // Si el modal está abierto con esa imagen, lo cerramos
        if(modal.style.display === 'flex') cerrarModal();
    } else {
        alert("Selecciona una imagen primero (haz clic en ella)");
    }
});

// 5. FUNCIONES DEL MODAL
function abrirModal(url) {
    modal.style.display = "flex";
    modalImg.src = url;
}

function cerrarModal() {
    modal.style.display = "none";
    modalImg.src = "";
}

// Cerrar con la X
closeBtn.addEventListener('click', cerrarModal);

// Cerrar clickeando fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

// Cargar 3 imágenes al iniciar
window.onload = () => {
    document.getElementById('autoBtn').click();
    document.getElementById('autoBtn').click();
    document.getElementById('autoBtn').click();
};