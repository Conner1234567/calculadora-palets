let palets = [];
let camionAncho = 244; // Ancho del camión en cm
let camionLargo = 1360; // Largo del camión en cm
let camionArea = document.getElementById('camionArea');
let resultadoDiv = document.getElementById('resultado');
let paletListDiv = document.getElementById('palet-list');

// Colores asignados para cada tipo de palet
let coloresAsignados = {};

function agregarPalets() {
    const largo = parseInt(document.getElementById('largo').value);
    const ancho = parseInt(document.getElementById('ancho').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (largo > 0 && ancho > 0 && cantidad > 0) {
        palets.push({ largo, ancho, cantidad });
        actualizarListaPalets();
        calcularDistribucion();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
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
    calcularDistribucion();
}

function calcularDistribucion() {
    camionArea.innerHTML = ''; // Limpiar área del camión
    let ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false)); // Ocupación en cm
    let totalLdm = 0;
    let filasOcupadas = 0;

    palets.forEach(palet => {
        const { largo, ancho, cantidad } = palet;

        for (let i = 0; i < cantidad; i++) {
            let posicion = encontrarEspacioDisponible(ancho, largo, ocupacion); // Buscar espacio para el palet
            if (!posicion) {
                alert(`No hay suficiente espacio para un palet de ${largo}x${ancho} cm.`);
                break;
            }

            // Marcar ocupación
            ocuparEspacio(posicion, ancho, largo, ocupacion);

            // Dibujar el palet
            let color = obtenerColorParaPalet(largo, ancho);
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${ancho}px`;
            paletElemento.style.height = `${largo}px`;
            paletElemento.style.backgroundColor = color;
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${posicion.x}px`;
            paletElemento.style.top = `${posicion.y}px`;
            camionArea.appendChild(paletElemento);

            // Actualizar metros lineales ocupados
            filasOcupadas = Math.max(filasOcupadas, Math.ceil((posicion.y + largo) / 100));
        }
    });

    totalLdm = filasOcupadas * (palets.length > 0 ? palets[0].largo / 100 : 0); // Calcular metros lineales
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${totalLdm.toFixed(2)} m`;
}

function encontrarEspacioDisponible(ancho, largo, ocupacion) {
    for (let x = 0; x <= camionLargo - largo; x++) {
        for (let y = 0; y <= camionAncho - ancho; y++) {
            if (esEspacioLibre(x, y, ancho, largo, ocupacion)) {
                return { x, y };
            }
        }
    }
    return null; // No hay espacio disponible
}

function esEspacioLibre(x, y, ancho, largo, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            if (ocupacion[x + i] && ocupacion[x + i][y + j]) {
                return false;
            }
        }
    }
    return true;
}

function ocuparEspacio(posicion, ancho, largo, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            ocupacion[posicion.x + i][posicion.y + j] = true;
        }
    }
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





