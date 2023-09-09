document.addEventListener('DOMContentLoaded', function () {
    const cardContainers = document.querySelectorAll('.card-body');

    cardContainers.forEach((container) => {
        const truncatedText = container.querySelector('.truncated-text');
        const readMoreButton = container.querySelector('.read-more');
        const readLessButton = container.querySelector('.read-less');

        if (truncatedText) {
            // Verifica si el texto está recortado
            if (truncatedText.scrollHeight > truncatedText.clientHeight) {
                readMoreButton.style.display = 'block';
                readLessButton.style.display = 'none';

                // Agrega un evento de clic al botón "Ver más"
                readMoreButton.addEventListener('click', function () {
                    truncatedText.style.webkitLineClamp = 'unset';
                    readMoreButton.style.display = 'none';
                    readLessButton.style.display = 'block';
                });

                // Agrega un evento de clic al botón "Ver menos"
                readLessButton.addEventListener('click', function () {
                    truncatedText.style.webkitLineClamp = '2'; // Vuelve a recortar el texto a 2 líneas o el valor que desees
                    readMoreButton.style.display = 'block';
                    readLessButton.style.display = 'none';
                });
            } else {
                // Si no hay texto recortado, oculta ambos botones
                readMoreButton.style.display = 'none';
                readLessButton.style.display = 'none';
            }
        } else {
            // Si no se encuentra el elemento .truncated-text, oculta ambos botones
            readMoreButton.style.display = 'none';
            readLessButton.style.display = 'none';
        }
    });
});
