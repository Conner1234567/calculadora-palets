const camionAncho = 244; // Ancho del camión en cm
const camionLargo = 1360; // Largo del camión en cm
let palets = [];

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
    camionArea.innerHTML = "";

    let x = 0; // Coordenada x en cm
    let y = 0; // Coordenada y en cm
    let filaLargo = 0; // Largo total utilizado en la fila actual

    // Ordenar los palets por su área (de mayor a menor)
    palets.sort((a, b) => (b.ancho * b.largo) - (a.ancho * a.largo));

    // Crear un array para registrar el espacio disponible por columna en cada fila
    let fila = new Array(camionAncho).fill(0); // Cada celda representa el ancho del camión en cm

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            let placed = false;

            // Buscar un espacio libre en la fila donde el palet pueda caber
            for (let startX = 0; startX <= camionAncho - ancho; startX++) {
                let canPlace = true;

                // Verificar si el palet cabe en el espacio seleccionado
                for (let j = startX; j < startX + ancho; j++) {
                    if (fila[j] > 0) {  // Hay algo en esta posición
                        canPlace = false;
                        break;
                    }
                }

                // Si el palet cabe, lo colocamos
                if (canPlace) {
                    for (let j = startX; j < startX + ancho; j++) {
                        fila[j] = largo; // Ocupamos el espacio con el largo del palet
                    }

                    // Crear el div del palet en la pantalla
                    const paletDiv = document.createElement("div");
                    paletDiv.classList.add("palet");
                    paletDiv.style.width = `${ancho}px`;
                    paletDiv.style.height = `${largo}px`;
                    paletDiv.style.backgroundColor = getColor(index);
                    paletDiv.style.left = `${startX}px`;
                    paletDiv.style.top = `${y}px`;
                    camionArea.appendChild(paletDiv);

                    placed = true;
                    break;
                }
            }

            // Si no se pudo colocar en la fila actual, mover a la siguiente fila
            if (!placed) {
                y += filaLargo; // Mover hacia abajo según el largo utilizado en la fila anterior
                if (y + largo > camionLargo) {
                    alert("El camión está lleno, no caben más palets.");
                    return;
                }

                // Resetear la fila y colocar el palet en la nueva fila
                fila = new Array(camionAncho).fill(0);
                placed = false;

                for (let startX = 0; startX <= camionAncho - ancho; startX++) {
                    let canPlace = true;

                    for (let j = startX; j < startX + ancho; j++) {
                        if (fila[j] > 0) { // Comprobar si el palet cabe
                            canPlace = false;
                            break;
                        }
                    }

                    if (canPlace) {
                        for (let j = startX; j < startX + ancho; j++) {
                            fila[j] = largo;
                        }

                        const paletDiv = document.createElement("div");
                        paletDiv.classList.add("palet");
                        paletDiv.style.width = `${ancho}px`;
                        paletDiv.style.height = `${largo}px`;
                        paletDiv.style.backgroundColor = getColor(index);
                        paletDiv.style.left = `${startX}px`;
                        paletDiv.style.top = `${y}px`;
                        camionArea.appendChild(paletDiv);

                        placed = true;
                        break;
                    }
                }

                if (!placed) {
                    alert("El camión está lleno, no caben más palets.");
                    return;
                }
            }

            filaLargo = Math.max(filaLargo, largo); // Actualizar el largo máximo de la fila
        }
    });
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


