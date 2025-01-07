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

function renderPalets() {
    const camionArea = document.getElementById("camion-area");
    camionArea.innerHTML = ""; // Limpiar la representación visual del camión

    // Resetear la malla de ocupación
    ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false));

    let totalLDM = 0;

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);

                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${ancho}px`;
                paletDiv.style.height = `${largo}px`;
                paletDiv.style.backgroundColor = getColor(index);
                paletDiv.style.left = `${x}px`;
                paletDiv.style.top = `${y}px`;
                camionArea.appendChild(paletDiv);

                totalLDM += (ancho * largo) / 100;
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo ${index + 1}`);
                return;
            }
        }
    });

    // Actualizar el total LDM ocupado
    document.getElementById("ldm-ocupados").textContent = totalLDM.toFixed(2);
}

function encontrarEspacio(ancho, largo) {
    const huecos = [];
    for (let y = 0; y <= camionLargo - largo; y++) {
        for (let x = 0; x <= camionAncho - ancho; x++) {
            if (canPlacePalet(x, y, ancho, largo)) {
                huecos.push({ x, y });
            }
        }
    }

    return huecos.length > 0 ? huecos[0] : null;
}

function canPlacePalet(x, y, ancho, largo) {
    for (let row = y; row < y + largo; row++) {
        for (let col = x; col < x + ancho; col++) {
            if (row >= camionLargo || col >= camionAncho || ocupacion[row][col]) {
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

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107"];
    return colors[index % colors.length];
}
