const camionAncho = 244; // Ancho del camión en cm
const camionLargo = 1360; // Largo del camión en cm
let palets = [];
let ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false)); // Malla de ocupación

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
    ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false));

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            let placed = false;

            for (let y = 0; y <= camionLargo - largo; y++) {
                if (placed) break;

                for (let x = 0; x <= camionAncho - ancho; x++) {
                    if (canPlacePalet(x, y, ancho, largo)) {
                        placePalet(x, y, ancho, largo);

                        const paletDiv = document.createElement("div");
                        paletDiv.classList.add("palet");
                        paletDiv.style.width = `${ancho}px`;
                        paletDiv.style.height = `${largo}px`;
                        paletDiv.style.backgroundColor = getColor(index);
                        paletDiv.style.left = `${x}px`;
                        paletDiv.style.top = `${y}px`;
                        camionArea.appendChild(paletDiv);

                        placed = true;
                        break;
                    }
                }
            }

            if (!placed) {
                alert("El camión está lleno, no caben más palets.");
                return;
            }
        }
    });
}

function canPlacePalet(x, y, ancho, largo) {
    for (let row = y; row < y + largo; row++) {
        for (let col = x; col < x + ancho; col++) {
            if (ocupacion[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function placePalet(x, y, ancho, largo) {
    for (let row = y; row < y + largo; row++) {
        for (let col = x; col < x + ancho; col++) {
            ocupacion[row][col] = true;
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




