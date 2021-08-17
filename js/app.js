const formulario = document.querySelector("#formulario");
const contenedorBuscador = document.querySelector("#contenedorBuscador");

document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", validarFormulario)
});

function validarFormulario(e) {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const year = document.querySelector("#year").value;

    if (nombre === "") {
        mostrarMensaje("El título de la película es obligatorio");

        return;
    }

    consultarAPI(nombre, year);
}

async function consultarAPI(nombre, year) {
    const key = "b42adafc";
    const url = `http://www.omdbapi.com/?t=${nombre}&y=${year}&apikey=${key}`;
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado)
        mostrarPelicula(resultado);
    } catch (error) {
        console.log(error);
        mostrarMensaje("Error de conexión")
    }
}

function mostrarMensaje(mensaje) {
    const existeAlerta = document.querySelector(".error");

    if (!existeAlerta) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("alert", "alert-danger", "text-center", "mt-3", "mt-lg-0", "fw-bold", "error");
        divMensaje.textContent = mensaje;

        contenedorBuscador.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    };
}

function limpiarHTML() {
    while (contenedorBuscador.firstChild) {
        contenedorBuscador.removeChild(contenedorBuscador.firstChild);
    };
}

function mostrarPelicula(pelicula) {
    limpiarHTML();

    if (pelicula.Response) {
        pelicula.forEach(peli => {
            const { Title, Director, Genre, Poster, Released, Runtime, Actors, Year, imdbRating } = peli;
        });
    } else {
        mostrarMensaje("Película no encontrada");
    }
}