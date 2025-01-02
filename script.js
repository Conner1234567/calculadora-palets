function calcularDistribucion() {
    camionArea.innerHTML = ''; // Limpiar área del camión
    let ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false)); // Ocupación en cm
    let totalLdm = 0;

    palets.forEach(palet => {
        const { largo, ancho, cantidad } = palet;
        let colocado = 0;

        while (colocado < cantidad) {
            let posicion = encontrarEspacioDisponible(largo, ancho, ocupacion); // Buscar espacio para el palet
            if (!posicion) {
                alert(`No hay suficiente espacio para un palet de ${largo}x${ancho} cm.`);
                break;
            }

            // Marcar ocupación
            ocuparEspacio(posicion, largo, ancho, ocupacion);

            // Dibujar el palet
            let color = obtenerColorParaPalet(largo, ancho);
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${ancho}px`;
            paletElemento.style.height = `${largo}px`;
            paletElemento.style.backgroundColor = color;
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${posicion.y}px`; // Prioriza el ancho
            paletElemento.style.top = `${posicion.x}px`; // Luego el largo
            camionArea.appendChild(paletElemento);

            colocado++;
        }
    });

    // Calcular metros lineales ocupados
    for (let x = 0; x < camionLargo; x++) {
        if (ocupacion[x].some(celda => celda)) {
            totalLdm += 1; // Cada fila con ocupación suma 1 cm
        }
    }
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${(totalLdm / 100).toFixed(2)} m`;
}

function encontrarEspacioDisponible(largo, ancho, ocupacion) {
    for (let y = 0; y <= camionAncho - ancho; y++) { // Limita al ancho disponible del camión
        for (let x = 0; x <= camionLargo - largo; x++) {
            if (esEspacioLibre(x, y, largo, ancho, ocupacion)) {
                return { x, y };
            }
        }
    }
    return null; // No hay espacio disponible
}

function esEspacioLibre(x, y, largo, ancho, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            if (ocupacion[x + i] && ocupacion[x + i][y + j]) {
                return false;
            }
        }
    }
    return true;
}

function ocuparEspacio(posicion, largo, ancho, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            ocupacion[posicion.x + i][posicion.y + j] = true;
        }
    }
}
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
    let columnasOcupadas = 0;

    palets.forEach(palet => {
        const { largo, ancho, cantidad } = palet;
        let colocado = 0;

        while (colocado < cantidad) {
            let posicion = encontrarEspacioDisponible(largo, ancho, ocupacion); // Buscar espacio para el palet
            if (!posicion) {
                alert(`No hay suficiente espacio para un palet de ${largo}x${ancho} cm.`);
                break;
            }

            // Marcar ocupación
            ocuparEspacio(posicion, largo, ancho, ocupacion);

            // Dibujar el palet
            let color = obtenerColorParaPalet(largo, ancho);
            let paletElemento = document.createElement('div');
            paletElemento.classList.add('palet');
            paletElemento.style.width = `${ancho}px`;
            paletElemento.style.height = `${largo}px`;
            paletElemento.style.backgroundColor = color;
            paletElemento.style.position = 'absolute';
            paletElemento.style.left = `${posicion.y}px`; // Prioriza el ancho
            paletElemento.style.top = `${posicion.x}px`; // Luego el largo
            camionArea.appendChild(paletElemento);

            colocado++;
        }
    });

    // Calcular metros lineales ocupados
    for (let x = 0; x < camionLargo; x++) {
        if (ocupacion[x].some(celda => celda)) {
            totalLdm += 1; // Cada fila con ocupación suma 1 cm
        }
    }
    resultadoDiv.innerHTML = `Total de metros lineales ocupados: ${(totalLdm / 100).toFixed(2)} m`;
}

function encontrarEspacioDisponible(largo, ancho, ocupacion) {
    for (let y = 0; y <= camionAncho - ancho; y++) {
        for (let x = 0; x <= camionLargo - largo; x++) {
            if (esEspacioLibre(x, y, largo, ancho, ocupacion)) {
                return { x, y };
            }
        }
    }
    return null; // No hay espacio disponible
}

function esEspacioLibre(x, y, largo, ancho, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            if (ocupacion[x + i] && ocupacion[x + i][y + j]) {
                return false;
            }
        }
    }
    return true;
}

function ocuparEspacio(posicion, largo, ancho, ocupacion) {
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




