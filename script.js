document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const volumen = largo * ancho * altura;

    document.getElementById('resultado').innerText = `El volumen del palet es ${volumen} cm³`;
});
