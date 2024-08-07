document.addEventListener("DOMContentLoaded", function() {
    var images = document.querySelectorAll(".image-container img");
    var index = 0; // Asegúrate de declarar e inicializar la variable index

    // Mostrar la primera imagen inicialmente
    images.forEach(function(image) {
        image.style.display = "none"; // Oculta todas las imágenes
    });
    images[index].style.display = "block"; // Muestra la primera imagen

    setInterval(function() {
        images.forEach(function(image) {
            image.style.display = "none"; // Oculta todas las imágenes
        });

        images[index].style.display = "block"; // Muestra la siguiente imagen

        index = (index + 1) % images.length; // Incrementa el índice, volviendo al inicio si es necesario
    }, 2000); // Cambia la imagen cada 2 segundos
});
