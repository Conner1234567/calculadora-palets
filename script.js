const camionAncho = 244; // Ancho real del camión en cm
const camionLargo = 1360; // Largo real del camión en cm
const escalaVisual = 816 / camionLargo; // Escala visual basada en el largo del camión
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

    ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false)); // Limpiar la malla de ocupación

    let totalLDM = 0; // Total LDM ocupado en metros

    palets.forEach((grupo, grupoIndex) => {
        const { ancho, largo, cantidad } = grupo;

        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);

                // Crear el div visual del palet
                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${largo * escalaVisual}px`; // Escalar el largo visual
                paletDiv.style.height = `${ancho * escalaVisual}px`; // Escalar el ancho visual
                paletDiv.style.backgroundColor = getColor(grupoIndex); // Color único para cada grupo
                paletDiv.style.left = `${x * escalaVisual}px`;
                paletDiv.style.top = `${y * escalaVisual}px`;
                camionArea.appendChild(paletDiv);

                // Calcular LDM ocupado por el palet, considerando el largo de cada palet (1,20 metros)
                totalLDM += largo / 100; // Convertir el largo de cada palet a metros
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo ${grupoIndex + 1}.`);
                break;
            }
        }
    });

    document.getElementById("ldm-ocupados").textContent = totalLDM.toFixed(2);
}

function encontrarEspacio(ancho, largo) {
    for (let x = 0; x <= camionLargo - largo; x++) {
        for (let y = 0; y <= camionAncho - ancho; y++) {
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
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107", "#9C27B0", "#3F51B5"];
    return colors[index % colors.length];
}
