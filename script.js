let palets = [];
let camionAncho = 244; // Ancho del camión en cm
let camionLargo = 1360; // Largo del camión en cm
let camionArea = document.getElementById('camionArea');
let resultadoDiv = document.getElementById('resultado');

function agregarPalets() {
    const largo = parseInt(document.getElementById('largo').value);
    const ancho = parseInt(document.getElementById('ancho').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (largo && ancho && cantidad) {
        // Generar la cantidad de palets con las mismas medidas
        for (let i = 0; i < cantidad; i++) {
            palets.push({ largo, ancho });
        }
        actualizarCamion();
    } else {
        alert('Por favor, ingresa las medidas y la cantidad de los palets.');
    }
}

function actualizarCamion() {
    camionArea.innerHTML = '';  // Limpiar el área del camión y la lista de palets
    let totalLdm = 0;
    let currentX = 0; // Posición horizontal para colocar los palets
    let currentY = 0; // Posición vertical para la siguiente columna
    let maxHeightInColumn = 0; // Altura máxima de los palets en la columna

    // Recorremos todos los palets
    palets.forEach(palet => {
        // Si el palet cabe dentro del ancho del camión, añádelo
        if (currentX + palet.largo <= camionLargo) {
            // Colocar el palet en el camión
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar el espacio ocupado en el camión
            currentX += palet.largo; // Avanzamos en la dirección horizontal
        } else {
            // Si el palet no cabe en la fila actual, pasamos a la siguiente fila
            currentY += palet.ancho; // Mover al siguiente nivel
            currentX = 0; // Reiniciar la posición horizontal

            // Colocar el palet en la nueva fila
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar el espacio ocupado
            currentX += palet.largo; // Avanzamos en la dirección horizontal
        }
    });

    // Cálculo de los metros lineales ocupados
    totalLdm = currentY / 100; // Total de metros lineales ocupados
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${totalLdm.toFixed(2)} m`;
}

// Función para generar colores aleatorios
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



