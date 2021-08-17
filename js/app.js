const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", prueba)
});

function prueba(e){
    e.preventDefault();
    const busqueda = document.querySelector("#busqueda").value;
    console.log("aprestaste buscar")

    const key = "b42adafc";
    const url = `http://www.omdbapi.com/?t=${busqueda}&apikey=${key}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => console.log(resultado))
}