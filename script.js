let palets = [];
let camionAncho = 244; // Ancho del camión en cm
let camionLargo = 1360; // Largo del camión en cm
let camionArea = document.getElementById('camionArea');
let resultadoDiv = document.getElementById('resultado');

function agregarPalet() {
    const formPalets = document.getElementById('formPalets');
    const paletDiv = document.createElement('div');
    paletDiv.classList.add('palet-input');
    
    paletDiv.innerHTML = `
        <label for="largo">Largo del palet (cm):</label>
        <input type="number" class="largo" placeholder="Largo" required />
        <label for="ancho">Ancho del palet (cm):</label>
        <input type="number" class="ancho" placeholder="Ancho" required />
        <button type="button" onclick="eliminarPalet(this)">Eliminar</button>
    `;
    
    formPalets.appendChild(paletDiv);
}

function eliminarPalet(button) {
    button.parentElement.remove();
    palets = palets.filter(palet => palet.div !== button.parentElement);
    actualizarCamion();
}

function calcularEspacio() {
    camionArea.innerHTML = '';  // Limpiar el área del camión y la lista de palets
    palets = [];
    
    const inputs = document.querySelectorAll('.palet-input');
    inputs.forEach(input => {
        const largo = parseInt(input.querySelector('.largo').value);
        const ancho = parseInt(input.querySelector('.ancho').value);
        
        if (largo && ancho) {
            palets.push({ largo, ancho });
        }
    });

    let totalLdm = 0;
    let currentX = 0; // Posición horizontal para colocar los palets
    let currentY = 0; // Posición vertical para la siguiente columna
    let maxHeightInColumn = 0; // Altura máxima de los palets en la columna
    let colWidth = 0; // El ancho total de la columna en cada paso
    
    palets.forEach(palet => {
        if (currentY + palet.ancho <= camionAncho) {
            // Si el palet cabe en la columna actual, añadirlo
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar el recorrido vertical y ancho de la columna
            currentY += palet.ancho;
            maxHeightInColumn = Math.max(maxHeightInColumn, palet.largo);
        } else {
            // Si el palet no cabe en la columna, mover a la siguiente columna
            currentX += maxHeightInColumn; // Mover horizontalmente
            currentY = 0; // Reiniciar la posición vertical

            // Colocar el palet en la nueva columna
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);
            
            // Actualizar la posición para el siguiente palet
            currentY += palet.ancho;
            maxHeightInColumn = palet.largo; // Cambio de la altura máxima de la columna
        }

        // Calcular los metros lineales ocupados
        totalLdm = Math.max(totalLdm, currentX / 100); // Convertir a metros
    });

    // Mostrar el resultado
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${totalLdm.toFixed(2)} m`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


