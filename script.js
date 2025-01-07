const camionAncho = 244; // Ancho del camión en cm (de izquierda a derecha)
const camionLargo = 1360; // Largo del camión en cm (de arriba a abajo)
let palets = [];
let ocupacion = Array.from({ length: camionLargo }, () => Array(camionAncho).fill(false)); // Malla de ocupación
let metrosLinealesOcupados = 0;

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
    metrosLinealesOcupados = 0;

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);

                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${largo}px`; // Largo se usa como ancho visual
                paletDiv.style.height = `${ancho}px`; // Ancho se usa como altura visual
                paletDiv.style.backgroundColor = getColor(index);
                paletDiv.style.left = `${x}px`;
                paletDiv.style.top = `${y}px`;
                paletDiv.innerText = `${ancho}x${largo}`;
                camionArea.appendChild(paletDiv);

                metrosLinealesOcupados += largo / 100; // Sumar LDM
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo ${index + 1}`);
                return;
            }
        }
    });

    actualizarLDM(); // Actualizar el LDM ocupado
}

function actualizarLDM() {
    document.getElementById("ldm").innerText = `Metros lineales ocupados: ${metrosLinealesOcupados.toFixed(2)} LDM`;
}

function encontrarEspacio(ancho, largo) {
    // Primero intentamos colocar los palets a lo largo del camión, ocupando el ancho
    for (let y = 0; y <= camionLargo - largo; y++) {
        for (let x = 0; x <= camionAncho - ancho; x++) {
            if (canPlacePalet(x, y, ancho, largo)) {
                return { x, y };
            }
        }
    }

    // Si no hay espacio en el ancho, intentamos colocar a lo largo del camión (de arriba hacia abajo)
    for (let y = 0; y <= camionLargo - largo; y++) {
        for (let x = 0; x <= camionAncho - ancho; x++) {
            if (canPlacePalet(x, y, ancho, largo)) {
                return { x, y };
            }
        }
    }

    return null; // No hay espacio disponible
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

