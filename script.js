const camionLargo = 1360; // Ahora el largo del camión es el ancho (horizontal)
const camionAncho = 244;  // El ancho del camión ahora es la altura
let palets = [];
let ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false)); // Malla de ocupación
let ldmOcupados = 0; // Variable para almacenar los LDM ocupados

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
    ldmOcupados = 0; // Resetear los LDM ocupados al renderizar

    // Resetear la malla de ocupación
    ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false));

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);
                ldmOcupados += largo / 100; // Incrementar LDM ocupados en metros

                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${ancho}px`; // Ancho visual del palet
                paletDiv.style.height = `${largo}px`; // Largo visual del palet
                paletDiv.style.backgroundColor = getColor(index);
                paletDiv.style.left = `${x}px`;
                paletDiv.style.top = `${y}px`;
                paletDiv.innerText = `${ancho}x${largo}`;
                camionArea.appendChild(paletDiv);
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo ${index + 1}`);
                return;
            }
        }
    });

    mostrarLDM(); // Mostrar LDM ocupados
}

function encontrarEspacio(ancho, largo) {
    for (let y = 0; y <= camionAncho - largo; y++) {
        for (let x = 0; x <= camionLargo - ancho; x++) {
            if (canPlacePalet(x, y, ancho, largo)) {
                return { x, y };
            }
        }
    }

    return null; // No hay espacio suficiente
}

function canPlacePalet(x, y, ancho, largo) {
    // Verificar si el palet cabe dentro del área del camión
    if (x + ancho > camionLargo || y + largo > camionAncho) {
        return false; // El palet se sale del camión
    }

    for (let row = y; row < y + largo; row++) {
        for (let col = x; col < x + ancho; col++) {
            if (ocupacion[row][col]) {
                return false; // El espacio ya está ocupado
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

function mostrarLDM() {
    const ldmElement = document.getElementById("ldm");
    ldmElement.innerText = `Total LDM ocupados: ${ldmOcupados.toFixed(2)} m`;
}
