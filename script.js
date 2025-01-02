let palets = [];
let camionAncho = 244; // Ancho del camión en cm
let camionLargo = 1360; // Largo del camión en cm
let camionArea = document.getElementById('camionArea');
let resultadoDiv = document.getElementById('resultado');

// Variable para llevar el control de colores asignados a los tamaños de los palets
let coloresAsignados = {};

function agregarPalets() {
    const largo = parseInt(document.getElementById('largo').value);
    const ancho = parseInt(document.getElementById('ancho').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (largo && ancho && cantidad) {
        // Agregar los palets con las medidas ingresadas y la cantidad especificada
        for (let i = 0; i < cantidad; i++) {
            palets.push({ largo, ancho });
        }

        actualizarCamion();
    } else {
        alert('Por favor, ingresa las medidas y la cantidad de los palets.');
    }
}

function actualizarCamion() {
    camionArea.innerHTML = '';  // Limpiar el área del camión
    let totalLdm = 0;
    let currentX = 0; // Posición horizontal para colocar los palets
    let currentY = 0; // Posición vertical para la siguiente fila

    // Recorremos todos los palets
    palets.forEach(palet => {
        // Verificamos si el palet cabe en la fila actual
        if (currentX + palet.largo <= camionLargo) {
            // Asignar un color único para cada tamaño de palet
            let color = obtenerColorParaPalet(palet.largo, palet.ancho);

            // Colocar el palet en el camión
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = color;
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizamos la posición horizontal para el siguiente palet
            currentX += palet.largo;
        } else {
            // Si no cabe, movemos a la siguiente fila
            currentY += palet.ancho;
            currentX = 0; // Reiniciar la posición horizontal

            // Asignar un color único para cada tamaño de palet
            let color = obtenerColorParaPalet(palet.largo, palet.ancho);

            // Colocar el palet en la nueva fila
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${palet.largo}px`;
            paletElemento.style.height = `${palet.ancho}px`;
            paletElemento.style.backgroundColor = color;
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${currentX}px`;
            paletElemento.style.top = `${currentY}px`;
            camionArea.appendChild(paletElemento);

            // Actualizamos la posición horizontal
            currentX += palet.largo;
        }
    });

    // Cálculo de los metros lineales ocupados
    totalLdm = currentY / 100; // Total de metros lineales ocupados
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${totalLdm.toFixed(2)} m`;
}

// Función para obtener un color único para cada tamaño de palet
function obtenerColorParaPalet(largo, ancho) {
    let key = `${largo}x${ancho}`;
    if (!coloresAsignados[key]) {
        coloresAsignados[key] = getRandomColor();
    }
    return coloresAsignados[key];
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




