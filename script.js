let palets = [];
let camionAncho = 244; // Ancho del camión en cm
let camionLargo = 1360; // Largo del camión en cm
let camionArea = document.getElementById('camionArea');
let resultadoDiv = document.getElementById('resultado');
let paletListDiv = document.getElementById('palet-list');

// Colores asignados a cada tipo de palet
let coloresAsignados = {};

function agregarPalets() {
    const largo = parseInt(document.getElementById('largo').value);
    const ancho = parseInt(document.getElementById('ancho').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (largo && ancho && cantidad) {
        // Guardar palets en la lista
        palets.push({ largo, ancho, cantidad });

        // Actualizar lista visual
        actualizarListaPalets();
        actualizarCamion();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function actualizarListaPalets() {
    paletListDiv.innerHTML = '<ul>';
    palets.forEach((palet, index) => {
        paletListDiv.innerHTML += `
            <li>
                ${palet.cantidad} palets de ${palet.largo}x${palet.ancho} cm
                <button onclick="eliminarPalet(${index})">Eliminar</button>
            </li>
        `;
    });
    paletListDiv.innerHTML += '</ul>';
}

function eliminarPalet(index) {
    palets.splice(index, 1);
    actualizarListaPalets();
    actualizarCamion();
}

function actualizarCamion() {
    camionArea.innerHTML = '';  // Limpiar el área del camión
    let totalLdm = 0;
    let currentX = 0; // Posición horizontal
    let currentY = 0; // Posición vertical

    palets.forEach(palet => {
        const { largo, ancho, cantidad } = palet;

        for (let i = 0; i < cantidad; i++) {
            if (currentX + largo > camionLargo) {
                currentY += ancho;
                currentX = 0; // Reiniciar posición horizontal
            }

            if (currentY + ancho <= camionAncho) {
                let color = obtenerColorParaPalet(largo, ancho);
                let paletElemento = document.createElement('div');
                paletElemento.classList.add('palet');
                paletElemento.style.width = `${largo}px`;
                paletElemento.style.height = `${ancho}px`;
                paletElemento.style.backgroundColor = color;
                paletElemento.style.left = `${currentX}px`;
                paletElemento.style.top = `${currentY}px`;
                camionArea.appendChild(paletElemento);

                currentX += largo; // Actualizar posición horizontal
            } else {
                alert('No hay espacio suficiente para agregar más palets.');
                break;
            }
        }

        totalLdm += Math.ceil(currentX / 100); // Actualizar metros lineales
    });

    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${totalLdm.toFixed(2)} m`;
}

function obtenerColorParaPalet(largo, ancho) {
    const key = `${largo}x${ancho}`;
    if (!coloresAsignados[key]) {
        coloresAsignados[key] = getRandomColor();
    }
    return coloresAsignados[key];
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




