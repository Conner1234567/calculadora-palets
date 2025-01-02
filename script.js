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
                <label for="largo${i}">Largo (en centímetros):</label>
                <input type="number" id="largo${i}" placeholder="Largo del palet (cm)" required>

                <label for="ancho${i}">Ancho (en centímetros):</label>
                <input type="number" id="ancho${i}" placeholder="Ancho del palet (cm)" required>
            </div>
        `;
    }
}

// Función para calcular el espacio total
function calcularEspacio() {
    const camionLargo = 1360;  // Largo del camión en centímetros (13.6 metros)
    const camionAncho = 244;   // Ancho del camión en centímetros (2.44 metros)

    let espacioOcupado = 0;
    let totalPalets = 0;
    const camionArea = camionLargo * camionAncho;

    // Recoger los datos de los palets y calcular el espacio ocupado
    palets = [];  // Reiniciar el array de palets

    for (let i = 0; i < document.getElementById('numPalets').value; i++) {
        const largoPalet = parseFloat(document.getElementById(`largo${i}`).value);
        const anchoPalet = parseFloat(document.getElementById(`ancho${i}`).value);

        // Validar que los campos no estén vacíos
        if (isNaN(largoPalet) || isNaN(anchoPalet)) {
            alert('Por favor ingresa todos los datos correctamente');
            return;
        }

        const areaPalet = largoPalet * anchoPalet;
        palets.push({ largo: largoPalet, ancho: anchoPalet, color: obtenerColorAleatorio() });  // Guardar el palet con color aleatorio
        espacioOcupado += areaPalet;
        totalPalets++;
    }

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El espacio ocupado por ${totalPalets} palets es ${espacioOcupado.toFixed(2)} centímetros cuadrados de los ${camionArea.toFixed(2)} disponibles en el camión.`;

    // Mostrar los palets dentro del camión
    dibujarCamion(palets);
}

// Función para dibujar los palets dentro del camión
function dibujarCamion(palets) {
    const camionDiv = document.getElementById('camion');
    camionDiv.innerHTML = ''; // Limpiar antes de dibujar

    let xPos = 0;
    let yPos = 0;

    // Dibujar los palets en el camión
    for (let i = 0; i < palets.length; i++) {
        const largoPalet = palets[i].largo;
        const anchoPalet = palets[i].ancho;
        const colorPalet = palets[i].color;

        const paletDiv = document.createElement('div');
        paletDiv.classList.add('palet');
        paletDiv.style.width = `${largoPalet}px`; // Usar centímetros convertidos directamente a píxeles
        paletDiv.style.height = `${anchoPalet}px`; // Usar centímetros convertidos directamente a píxeles
        paletDiv.style.backgroundColor = colorPalet; // Asignar color aleatorio
        paletDiv.style.left = `${xPos * largoPalet}px`;
        paletDiv.style.top = `${yPos * anchoPalet}px`;

        camionDiv.appendChild(paletDiv);

        // Ajustar la posición para el siguiente palet
        xPos++;
        if (xPos * largoPalet > 1360) {  // Si el palet se sale del camión, empezar nueva fila
            xPos = 0;
            yPos++;
        }
    }
}

// Función para obtener un color aleatorio
function obtenerColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

