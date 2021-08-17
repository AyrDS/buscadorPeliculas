const formulario = document.querySelector("#formulario");
const buscador = document.querySelector("#buscador");
const resultadoContenedor = document.querySelector("#resultado");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();


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
    const url = `http://www.omdbapi.com/?t=${nombre}&y=${year}&apikey=${key}&page=5`;
    mostrarSpiner();
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
        divMensaje.classList.add("alert", "alert-danger", "text-center", "mt-3", "fw-bold", "error");
        divMensaje.textContent = mensaje;

        buscador.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    };
}

function limpiarHTML() {
    while (resultadoContenedor.firstChild) {
        resultadoContenedor.removeChild(resultadoContenedor.firstChild);
    };
}

function mostrarPelicula(pelicula) {
    limpiarHTML();
    console.log(pelicula.Response)
    if (pelicula.Response === "True") {
        const { Title, Director, Genre, Poster, Runtime, Actors, Year, imdbRating } = pelicula;

        template.querySelector("img").src = Poster;
        template.querySelector("h2").textContent = Title;
        template.querySelector(".actores").textContent = Actors;
        template.querySelector(".director").textContent = Director;
        template.querySelector(".genero").textContent = Genre;
        template.querySelector(".year").textContent = Year;
        template.querySelector(".duracion").textContent = Runtime;
        template.querySelector(".rating").textContent = imdbRating;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone)
        resultadoContenedor.appendChild(fragment)
    } else {
        mostrarMensaje("Película no encontrada");
    }
}

function mostrarSpiner() {
    limpiarHTML();

    const spinner = document.createElement("div")
    spinner.classList.add("sk-fading-circle");

    spinner.innerHTML += `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultadoContenedor.appendChild(spinner);
}