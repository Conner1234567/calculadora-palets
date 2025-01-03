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

    let y = 0; // Coordenada y en cm (fila)
    let fila = new Array(camionAncho).fill(0); // Espacio vacío de la fila actual

    // Ordenar los palets por su área (de mayor a menor) para intentar colocar los grandes primero
    palets.sort((a, b) => (b.ancho * b.largo) - (a.ancho * a.largo));

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            let placed = false;

            // Intentar colocar el palet en la fila
            for (let startX = 0; startX <= camionAncho - ancho; startX++) {
                let canPlace = true;

                // Comprobar si el palet cabe en el espacio disponible
                for (let j = startX; j < startX + ancho; j++) {
                    if (fila[j] > 0) {  // Ya hay algo en esa posición
                        canPlace = false;
                        break;
                    }
                }

                // Si el palet cabe, colocarlo en la fila
                if (canPlace) {
                    for (let j = startX; j < startX + ancho; j++) {
                        fila[j] = largo;  // Ocupamos el espacio con el largo del palet
                    }

                    // Crear el div del palet
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

            // Si no se pudo colocar en la fila, pasar a la siguiente fila
            if (!placed) {
                y += Math.max(...fila); // Actualizamos el y según el largo de la fila anterior
                if (y + largo > camionLargo) {
                    alert("El camión está lleno, no caben más palets.");
                    return;
                }

                // Resetear la fila y colocar el palet en la nueva fila
                fila = new Array(camionAncho).fill(0);
                placed = false;

                for (let startX = 0; startX <= camionAncho - ancho; startX++) {
                    let canPlace = true;

                    // Verificar si el palet cabe en el espacio disponible
                    for (let j = startX; j < startX + ancho; j++) {
                        if (fila[j] > 0) {
                            canPlace = false;
                            break;
                        }
                    }

                    // Si cabe, colocamos el palet en la nueva fila
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

