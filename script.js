const camionAncho = 244; // Ancho del camión en cm
const camionLargo = 1360; // Largo del camión en cm
let palets = [];
let ocupacion = []; // Malla de ocupación (ancho x largo)

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

    // Inicializamos la malla de ocupación
    ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false));

    let y = 0; // Coordenada y en cm (fila)
    
    // Ordenamos los palets de mayor a menor tamaño (para intentar colocar los grandes primero)
    palets.sort((a, b) => (b.ancho * b.largo) - (a.ancho * a.largo));

    // Procesamos cada palet
    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            let placed = false;

            // Intentamos colocar el palet en el camión
            for (let yPos = 0; yPos < camionLargo - largo; yPos++) {
                if (placed) break; // Si ya lo colocamos, salimos del bucle
                
                for (let xPos = 0; xPos <= camionAncho - ancho; xPos++) {
                    // Comprobamos si el espacio está libre
                    let canPlace = true;
                    for (let x = xPos; x < xPos + ancho; x++) {
                        for (let y = yPos; y < yPos + largo; y++) {
                            if (ocupacion[y][x]) { // Si alguna posición está ocupada
                                canPlace = false;
                                break;
                            }
                        }
                        if (!canPlace) break;
                    }

                    // Si encontramos un espacio libre, colocamos el palet
                    if (canPlace) {
                        // Marcar el espacio como ocupado
                        for (let x = xPos; x < xPos + ancho; x++) {
                            for (let y = yPos; y < yPos + largo; y++) {
                                ocupacion[y][x] = true;
                            }
                        }

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
                        break;
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

