let palets = [];
let camionAncho = 244; // Ancho del camión en cm (2.44 metros)
let camionLargo = 1360; // Largo del camión en cm (13.6 metros)
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
    // Limpiar el área del camión y la lista de palets
    camionArea.innerHTML = '';
    palets = [];
    
    // Recoger los datos de los inputs
    const inputs = document.querySelectorAll('.palet-input');
    inputs.forEach(input => {
        const largo = parseInt(input.querySelector('.largo').value);
        const ancho = parseInt(input.querySelector('.ancho').value);
        
        if (largo && ancho) {
            palets.push({ largo, ancho });
        }
    });

    // Organizar los palets en el camión optimizando el espacio
    let currentX = 0; // Posición actual en el eje X (horizontal)
    let currentY = 0; // Posición actual en el eje Y (vertical)
    let maxHeightInRow = 0; // Para controlar la altura máxima en cada fila
    let totalLdm = 0; // Total de metros lineales ocupados

    palets.forEach(palet => {
        if (currentX + palet.largo <= camionLargo) {
            // El palet cabe en la fila actual (horizontal)
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar la posición para el próximo palet en la misma fila
            currentX += palet.largo;
            maxHeightInRow = Math.max(maxHeightInRow, palet.ancho); // Guardar la altura máxima
        } else {
            // El palet no cabe en la fila, ir a la siguiente fila
            currentX = palet.largo; // Iniciar la nueva fila
            currentY += maxHeightInRow; // Moverse hacia abajo según la altura de la fila
            maxHeightInRow = palet.ancho; // Establecer la nueva altura máxima

            // Colocar el palet en la nueva fila
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = getRandomColor();
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `0px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar la posición para el próximo palet
            currentX = palet.largo;
        }

        // Sumar los metros lineales ocupados
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


