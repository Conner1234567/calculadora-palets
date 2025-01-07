const camionAncho = 244; // Alto del camión (en cm)
const camionLargo = 1360; // Largo del camión (en cm)
let palets = [];
let ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false)); // Malla de ocupación

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

function renderPalets() {
    const camionArea = document.getElementById("camion-area");
    camionArea.innerHTML = ""; // Limpiar la representación visual del camión

    // Resetear la malla de ocupación
    ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false));

    let totalLDM = 0;

    for (let grupo of palets) {
        const { ancho, largo, cantidad } = grupo;
        let paletsColocados = 0;

        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);

                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${(largo / camionLargo) * 800}px`; // Escalar al tamaño visual del camión
                paletDiv.style.height = `${(ancho / camionAncho) * 144}px`; // Escalar al tamaño visual del camión
                paletDiv.style.backgroundColor = getColor(paletsColocados);
                paletDiv.style.left = `${(x / camionLargo) * 800}px`;
                paletDiv.style.top = `${(y / camionAncho) * 144}px`;
                camionArea.appendChild(paletDiv);

                paletsColocados++;
                totalLDM += largo / 100; // Calcular LDM correctamente
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo actual.`);
                break;
            }
        }
    }

    document.getElementById("ldm-ocupados").textContent = totalLDM.toFixed(2);
}

function encontrarEspacio(ancho, largo) {
    for (let y = 0; y <= camionAncho - ancho; y++) {
        for (let x = 0; x <= camionLargo - largo; x++) {
            if (puedeColocarPalet(x, y, ancho, largo)) {
                return { x, y };
            }
        }
    }
    return null;
}

function puedeColocarPalet(x, y, ancho, largo) {
    for (let row = y; row < y + ancho; row++) {
        for (let col = x; col < x + largo; col++) {
            if (row >= camionAncho || col >= camionLargo || ocupacion[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function placePalet(x, y, ancho, largo) {
    for (let row = y; row < y + ancho; row++) {
        for (let col = x; col < x + largo; col++) {
            ocupacion[row][col] = true;
        }
    }
}

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107"];
    return colors[index % colors.length];
}
