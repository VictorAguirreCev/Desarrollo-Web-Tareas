document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos del DOM
    const form = document.getElementById('registroForm');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const edad = document.getElementById('edad');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnReset = document.getElementById('btnReset');

    // Objeto para rastrear el estado de validez de cada campo
    const fieldsStatus = {
        nombre: false,
        correo: false,
        edad: false,
        password: false,
        confirmPassword: false
    };

    // Expresiones regulares y reglas
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato estándar email
    // Mínimo 8 caracteres, al menos 1 número y 1 carácter especial
    const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; 

    // Función general para validar inputs
    const validateField = (input, isValid, msgError) => {
        const errorSpan = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        
        if (isValid) {
            input.classList.remove('input-error');
            input.classList.add('input-success');
            errorSpan.textContent = '';
            fieldsStatus[input.id] = true;
        } else {
            input.classList.remove('input-success');
            input.classList.add('input-error');
            errorSpan.textContent = msgError;
            fieldsStatus[input.id] = false;
        }
        toggleSubmitBtn();
    };

    // --- Event Listeners para validación en tiempo real ---

    // 1. Validar Nombre
    nombre.addEventListener('input', () => {
        const isValid = nombre.value.trim().length >= 3;
        validateField(nombre, isValid, 'El nombre debe tener al menos 3 caracteres.');
    });

    // 2. Validar Correo
    correo.addEventListener('input', () => {
        const isValid = regexEmail.test(correo.value.trim());
        validateField(correo, isValid, 'Ingresa un correo electrónico válido.');
    });

    // 3. Validar Edad
    edad.addEventListener('input', () => {
        const valor = parseInt(edad.value);
        const isValid = !isNaN(valor) && valor >= 18;
        validateField(edad, isValid, 'Debes ser mayor de 18 años.');
    });

    // 4. Validar Contraseña
    password.addEventListener('input', () => {
        const isValid = regexPass.test(password.value);
        validateField(password, isValid, 'Mínimo 8 caracteres, 1 número y 1 carácter especial.');
        
        // Si ya hay algo escrito en confirmar, revalidar la coincidencia
        if (confirmPassword.value !== '') {
            checkMatch();
        }
    });

    // 5. Validar Confirmación de Contraseña
    confirmPassword.addEventListener('input', () => {
        checkMatch();
    });

    const checkMatch = () => {
        const isValid = confirmPassword.value === password.value && confirmPassword.value !== '';
        validateField(confirmPassword, isValid, 'Las contraseñas no coinciden.');
    };

    // Habilitar/Deshabilitar botón de envío
    const toggleSubmitBtn = () => {
        // Verifica si TODOS los valores en fieldsStatus son true
        const allValid = Object.values(fieldsStatus).every(status => status === true);
        btnSubmit.disabled = !allValid;
    };

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el recargo de la página
        if (!btnSubmit.disabled) {
            alert('¡Formulario enviado con éxito! Todos los datos son válidos.');
            form.reset();
            resetStyles();
        }
    });

    // Botón de Reiniciar
    btnReset.addEventListener('click', () => {
        form.reset();
        resetStyles();
    });

    // Función para limpiar estilos visuales
    const resetStyles = () => {
        const inputs = document.querySelectorAll('input');
        const errors = document.querySelectorAll('.error-msg');
        
        inputs.forEach(input => {
            input.classList.remove('input-error', 'input-success');
            fieldsStatus[input.id] = false;
        });
        
        errors.forEach(error => error.textContent = '');
        toggleSubmitBtn();
    };
});