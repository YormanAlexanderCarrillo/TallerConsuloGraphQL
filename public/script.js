document.addEventListener('DOMContentLoaded', function () {
    const cardContainers = document.querySelectorAll('.card-body');

    cardContainers.forEach((container) => {
        const truncatedText = container.querySelector('.truncated-text');
        const readMoreButton = container.querySelector('.read-more');
        const readLessButton = container.querySelector('.read-less');

        if (truncatedText) {
            if (truncatedText.scrollHeight > truncatedText.clientHeight) {
                readMoreButton.style.display = 'block';
                readLessButton.style.display = 'none';

                readMoreButton.addEventListener('click', function () {
                    truncatedText.style.webkitLineClamp = 'unset';
                    readMoreButton.style.display = 'none';
                    readLessButton.style.display = 'block';
                });

                readLessButton.addEventListener('click', function () {
                    truncatedText.style.webkitLineClamp = '2'; // Vuelve a recortar el texto a 2 líneas o el valor que desees
                    readMoreButton.style.display = 'block';
                    readLessButton.style.display = 'none';
                });
            } else {
                readMoreButton.style.display = 'none';
                readLessButton.style.display = 'none';
            }
        } else {
            readMoreButton.style.display = 'none';
            readLessButton.style.display = 'none';
        }
    });
});

function toggleInput(inputId) {
    var input = document.getElementById(inputId);inputNameCommon
    var editButton = input.nextElementSibling;

    if (input.disabled) {
        input.disabled = false;
        editButton.textContent = 'Save';
        editButton.classList.remove('btn-secondary');
        editButton.classList.add('btn-primary');
    } else {
        input.disabled = true;
        editButton.textContent = 'Edit';
        editButton.classList.remove('btn-primary');
        editButton.classList.add('btn-secondary');
    }
}

function enableAllInputs() {
    var inputs = document.querySelectorAll('input[disabled]');
    inputs.forEach(function(input) {
        input.disabled = false;
    });
}