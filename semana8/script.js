document.addEventListener('DOMContentLoaded', function() {
    
    // --- FUNCIONALIDAD 1: BOTÓN DE ALERTA ---
    const btnAlerta = document.getElementById('btnAlerta');
    
    if(btnAlerta) {
        btnAlerta.addEventListener('click', function() {
            // Usamos alert() estándar, pero podrías usar SweetAlert si quisieras algo más avanzado
            alert('¡Hola! Has activado correctamente la interacción con JavaScript.\n\nFecha actual: ' + new Date().toLocaleDateString());
        });
    }

    // --- FUNCIONALIDAD 2: VALIDACIÓN DEL FORMULARIO ---
    const formulario = document.getElementById('formularioContacto');
    const mensajeExito = document.getElementById('mensajeExito');

    if(formulario) {
        formulario.addEventListener('submit', function(event) {
            // Detener el envío por defecto para validar primero
            event.preventDefault();
            event.stopPropagation();

            // Verificar si el formulario es válido según reglas HTML5 (required, type="email")
            if (formulario.checkValidity()) {
                // Si es válido, mostrar mensaje de éxito y limpiar
                mensajeExito.classList.remove('d-none');
                formulario.reset();
                formulario.classList.remove('was-validated');
                
                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    mensajeExito.classList.add('d-none');
                }, 4000);
            } else {
                // Si no es válido, ocultar mensaje de éxito (si estaba visible)
                mensajeExito.classList.add('d-none');
            }

            // Añadir clase de Bootstrap para mostrar estilos de validación (verde/rojo)
            formulario.classList.add('was-validated');
        });
    }
});