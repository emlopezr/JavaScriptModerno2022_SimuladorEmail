// VARIABLES

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const spinner = document.querySelector('#spinner');

// Inputs
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Regex de verificación de emails -> Tomado de https://emailregex.com
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// LISTENERS

cargarListeners();
function cargarListeners() {
    // Arranque de la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Validar campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar el formulario
    formulario.addEventListener('submit', enviarEmail);

    // Reiniciar el formulario
    btnReset.addEventListener('click', resetearFormulario);
}

// FUNCIONES

function iniciarApp() {
    // Deshabilitar el botón de envío por defecto
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); // Clases de Tailwind
}

function validarFormulario(e) {
    // Verificar que si haya algo escrito
    if (e.target.value.length > 0) {
        // Cambiar el borde del input
        e.target.classList.remove('border', 'border-red-500'); // Eliminar esta si ya está
        e.target.classList.add('border', 'border-green-500'); // Clases de Tailwind

        // Eliminar los mensajes de error
        const error = document.querySelector('p.error');

        if (error) {
            error.remove();
        }

    } else {
        // Cambiar el borde del input
        e.target.classList.remove('border', 'border-green-500'); // Eliminar esta si ya está
        e.target.classList.add('border', 'border-red-500'); // Clases de Tailwind

        // Mostrar mensaje de error
        mostrarError('Todos los campos son obligatorios');
    }

    // Caso especial de validación para los emails
    if (e.target.type === 'email') {
        // Verificar si es email con un RegEx
        if (regex.test(e.target.value)) {
            // Cambiar el borde del input
            e.target.classList.remove('border', 'border-red-500'); // Eliminar esta si ya está
            e.target.classList.add('border', 'border-green-500'); // Clases de Tailwind

            // Eliminar los mensajes de error
            const error = document.querySelector('p.error');

            if (error) {
                error.remove();
            }

        } else {
            // Cambiar el borde del input
            e.target.classList.remove('border', 'border-green-500'); // Eliminar esta si ya está
            e.target.classList.add('border', 'border-red-500'); // Clases de Tailwind

            // Mostrar mensaje de error
            mostrarError('El Email no es válido');
        }
    }

    // Verificar que todo sea válido y habilitar el botón
    if (regex.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        // Habilitar el botón de envío
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); // Clases de Tailwind
    }
}

function mostrarError(mensaje) {
    // Crear el mensaje de error HTML
    const msgError = document.createElement('P');
    msgError.textContent = mensaje;
    msgError.classList.add('border', 'border-red-500', 'bg-red-500', 'text-white', 'font-bold', 'p-3', 'mb-10', 'text-center', 'uppercase', 'error');  // Clases de Tailwind

    // Comprobar cuantos mensajes de error hay -> SI no hay ninguno, ponerlo
    const erores = document.querySelectorAll('.error');

    if (erores.length === 0) {
        formulario.insertBefore(msgError, spinner);
    }
}

function enviarEmail(e) {
    e.preventDefault(); // Prevenir acción predeterminada del botón

    // Deshabilitar el botón de reiniciar
    btnReset.disabled = true;
    btnReset.classList.add('cursor-not-allowed', 'opacity-50'); // Clases de Tailwind

    // Mostrar el spinner
    spinner.style.display = 'flex';

    // Ocultar el spinner luego de 2seg y mostrar mensaje de "Enviado"
    setTimeout(() => {
        // Ocultar el spinner
        spinner.style.display = 'none';

        // Mostrar mensaje de "Enviado"
        const msgEnviado = document.createElement('P');
        msgEnviado.textContent = 'El mensaje se envió correctamente';
        msgEnviado.classList.add('border', 'border-green-500', 'bg-green-500', 'text-white', 'font-bold', 'p-3', 'mb-10', 'text-center', 'uppercase');  // Clases de Tailwind
        formulario.insertBefore(msgEnviado, spinner);

        // Elimiar el mensaje de "Enviado" luego de 3s y borrar todo
        setTimeout(() => {
            msgEnviado.remove();
            resetearFormulario();

            // Habilitar el botón de reiniciar
            btnReset.disabled = false;
            btnReset.classList.remove('cursor-not-allowed', 'opacity-50'); // Clases de Tailwind
        }, 3000);

    }, 2000);
}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();

    // Borrar bordes de los inputs
    const inputs = [email, asunto, mensaje];
    inputs.forEach(input => input.classList.remove('border', 'border-green-500'));
}