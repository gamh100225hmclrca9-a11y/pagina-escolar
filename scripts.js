document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formResenas");
    const listaResenas = document.getElementById("listaResenas");

    // Cargar reseñas guardadas en el navegador
    let resenas = JSON.parse(localStorage.getItem("resenasCECYTEM")) || [];

    function mostrarResenas() {

        if (!listaResenas) return;

        listaResenas.innerHTML = "";

        if (resenas.length === 0) {
            listaResenas.innerHTML =
                '<p class="sin-resenas">¡Sé el primero en compartir tu experiencia!</p>';
            return;
        }

        resenas.forEach(function (resena) {

            const tarjeta = document.createElement("div");
            tarjeta.className = "resena-card";

            const nombre = document.createElement("h4");
            nombre.textContent = "🎄 " + resena.nombre;

            const carrera = document.createElement("p");
            carrera.textContent = "Especialidad: " + resena.carrera;

            const estrellas = document.createElement("div");
            estrellas.className = "estrellas";
            estrellas.textContent = "⭐".repeat(resena.calificacion);

            const comentario = document.createElement("p");
            comentario.textContent = resena.comentario;

            tarjeta.appendChild(nombre);
            tarjeta.appendChild(carrera);
            tarjeta.appendChild(estrellas);
            tarjeta.appendChild(comentario);

            listaResenas.appendChild(tarjeta);
        });
    }

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const carrera = document.getElementById("carrera").value.trim();
            const calificacion = Number(document.getElementById("calificacion").value);
            const comentario = document.getElementById("comentario").value.trim();

            if (!nombre || !carrera || !comentario || calificacion < 1 || calificacion > 5) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const nuevaResena = {
                nombre: nombre,
                carrera: carrera,
                calificacion: calificacion,
                comentario: comentario
            };

            resenas.unshift(nuevaResena);

            localStorage.setItem(
                "resenasCECYTEM",
                JSON.stringify(resenas)
            );

            mostrarResenas();

            formulario.reset();

            alert("¡Tu reseña se publicó correctamente! 💚🎄");
        });
    }

    mostrarResenas();

});
