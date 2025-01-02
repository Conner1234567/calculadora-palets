let palets = []; // Array para almacenar los palets

// Función para agregar un palet al formulario
function agregarPalet() {
    const numPalets = document.getElementById('numPalets').value;
    const formPalets = document.getElementById('formPalets');
    formPalets.innerHTML = ''; // Limpiar antes de agregar

    // Generar los campos para ingresar las dimensiones de cada palet
    for (let i = 0; i < numPalets; i++) {
        formPalets.innerHTML += `
            <div>
                <h3>Palet ${i + 1}</h3>
                <label for="largo${i}">Largo (en metros):</label>
                <input type="number" id="largo${i}" placeholder="Largo del palet (m)" required>

                <label for="ancho${i}">Ancho (en metros):</label>
                <input type="number" id="ancho${i}" placeholder="Ancho del palet (m)" required>
            </div>
        `;
    }
}

// Función para calcular el espacio total
function calcularEspacio() {
    const camionLargo = 13.6;  // Largo del camión en metros
    const camionAncho = 2.44;  // Ancho del camión en metros

    let espacioOcupado = 0;
    let totalPalets = 0;
    const camionArea = camionLargo * camionAncho;

    // Recoger los datos de los palets y calcular el espacio ocupado
    for (let i = 0; i < palets.length; i++) {
        const largoPalet = parseFloat(document.getElementById(`largo${i}`).value);
        const anchoPalet = parseFloat(document.getElementById(`ancho${i}`).value);

        // Validar que los campos no estén vacíos
        if (isNaN(largoPalet) || isNaN(anchoPalet)) {
            alert('Por favor ingresa todos los datos correctamente');
            return;
        }

        const areaPalet = largoPalet * anchoPalet;
        espacioOcupado += areaPalet;
        totalPalets++;
    }

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El espacio ocupado por ${totalPalets} palets es ${espacioOcupado.toFixed(2)} metros cuadrados de los ${camionArea.toFixed(2)} disponibles en el camión.`;

    // Mostrar los palets dentro del camión
    dibujarCamion(palets, espacioOcupado);
}

// Función para dibujar los palets dentro del camión
function dibujarCamion(palets, espacioOcupado) {
    const camionDiv = document.getElementById('camion');
    camionDiv.innerHTML = ''; // Limpiar antes de dibujar

    let xPos = 0;
    let yPos = 0;

    // Dibujar los palets en el camión
    for (let i = 0; i < palets.length; i++) {
        const largoPalet = parseFloat(document.getElementById(`largo${i}`).value);
        const anchoPalet = parseFloat(document.getElementById(`ancho${i}`).value);

        const paletDiv = document.createElement('div');
        paletDiv.classList.add('palet');
        paletDiv.style.width = `${largoPalet * 100}px`; // Convertir a píxeles
        paletDiv.style.height = `${anchoPalet * 100}px`; // Convertir a píxeles
        paletDiv.style.left = `${xPos * largoPalet * 100}px`;
        paletDiv.style.top = `${yPos * anchoPalet * 100}px`;

        camionDiv.appendChild(paletDiv);

        // Ajustar la posición para el siguiente palet
        xPos++;
        if (xPos * largoPalet > 13.6) {  // Si el palet se sale del camión, empezar nueva fila
            xPos = 0;
            yPos++;
        }
    }
}

