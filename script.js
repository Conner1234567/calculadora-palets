const camionAncho = 244; // Ancho del camión en cm
const camionLargo = 1360; // Largo del camión en cm
let palets = [];
let ocupacion = Array(camionLargo).fill().map(() => Array(camionAncho).fill(false)); // Malla de ocupación

document.getElementById("agregarPalet").addEventListener("click", () => {
    const ancho = parseInt(document.getElementById("ancho").value);
    const largo = parseInt(document.getElementById("largo").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (isNaN(ancho) || isNaN(largo) || isNaN(cantidad) || ancho <= 0 || largo <= 0 || cantidad <= 0) {
        alert("Por favor, ingrese valores válidos para ancho, largo y cantidad.");
        return;
    }

    palets.push({ ancho, largo, cantidad });
    renderPalets();
});

document.getElementById("calcular").addEventListener("click", () => {
    const metrosLineales = calcularMetrosLineales();
    document.getElementById("resultado").innerText = `Metros lineales ocupados: ${metrosLineales.toFixed(2)} m`;
});

function renderPalets() {
    const camionArea = document.getElementById("camion-area");
    camionArea.innerHTML = ""; // Limpiar la representación visual del camión

    // Resetear la malla de ocupación
    ocupacion = Array(camionLargo).fill().map(() => Array(camionAncho).fill(false));

    // Ordenamos los palets de mayor a menor tamaño para intentar colocar los grandes primero
    palets.sort((a, b) => (b.ancho * b.largo) - (a.ancho * a.largo));

    // Intentamos colocar los palets
    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            let placed = false;

            // Intentamos colocar el palet
            for (let yPos = 0; yPos < camionLargo - largo; yPos++) {
                if (placed) break;

                for (let xPos = 0; xPos < camionAncho - ancho; xPos++) {
                    // Comprobamos si el espacio está libre para colocar el palet
                    if (canPlacePalet(xPos, yPos, ancho, largo)) {
                        // Colocar el palet
                        placePalet(xPos, yPos, ancho, largo);

                        // Crear el div del palet
                        const paletDiv = document.createElement("div");
                        paletDiv.classList.add("palet");
                        paletDiv.style.width = `${ancho}px`;
                        paletDiv.style.height = `${largo}px`;
                        paletDiv.style.backgroundColor = getColor(index);
                        paletDiv.style.left = `${xPos}px`;
                        paletDiv.style.top = `${yPos}px`;
                        camionArea.appendChild(paletDiv);

                        placed = true;
                        break; // Salimos del bucle de búsqueda de espacio una vez colocado
                    }
                }
            }

            // Si no se pudo colocar el palet, alertar
            if (!placed) {
                alert("El camión está lleno, no caben más palets.");
                return;
            }
        }
    });
}

function canPlacePalet(xPos, yPos, ancho, largo) {
    // Comprobamos si el área que ocuparía el palet está libre
    for (let y = yPos; y < yPos + largo; y++) {
        for (let x = xPos; x < xPos + ancho; x++) {
            if (ocupacion[y][x]) { // Si alguna posición está ocupada
                return false;
            }
        }
    }
    return true; // Si todas las posiciones están libres
}

function placePalet(xPos, yPos, ancho, largo) {
    // Marcar el espacio como ocupado
    for (let y = yPos; y < yPos + largo; y++) {
        for (let x = xPos; x < xPos + ancho; x++) {
            ocupacion[y][x] = true; // Marcar como ocupado
        }
    }
}

function calcularMetrosLineales() {
    let metrosLineales = 0;
    let ocupadoAncho = 0;

    palets.forEach(({ ancho, largo, cantidad }) => {
        let paletsRestantes = cantidad;

        while (paletsRestantes > 0) {
            if (ocupadoAncho + ancho > camionAncho) {
                ocupadoAncho = 0;
                metrosLineales += largo / 100; // Convertir a metros
            }

            ocupadoAncho += ancho;
            paletsRestantes--;
        }

        if (ocupadoAncho > 0) {
            metrosLineales += largo / 100; // Agregar última fila ocupada
        }
    });

    return metrosLineales;
}

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107"];
    return colors[index % colors.length];
}

