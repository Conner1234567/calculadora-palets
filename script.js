const camionAncho = 244; // Ancho real del camión en cm
const camionLargo = 1360; // Largo real del camión en cm
const escalaVisual = 816 / camionLargo; // Escala visual basada en el largo del camión
let palets = [];
let ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false)); // Malla de ocupación
let largoTotalOcupado = 0; // Para llevar cuenta de cuanto del largo se ha ocupado

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
    largoTotalOcupado = 0; // Resetear el largo ocupado

    let largoOcupadoActual = 0; // Largo ocupado en la fila actual
    let currentX = 0; // Posición en el eje X para los palets

    palets.forEach((grupo, grupoIndex) => {
        const { ancho, largo, cantidad } = grupo;

        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo, currentX);

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

                // Actualizar el largo ocupado solo considerando lo largo total que ocupan los palets
                largoOcupadoActual += largo / 100; // Sumar el largo ocupado en LDM

                // Actualizar el largo total ocupado
                if (currentX + largo > camionLargo) {
                    alert("El camión está lleno. No se pueden agregar más palets.");
                    return;
                }
                currentX += largo; // Avanzar en la dirección del largo
            } else {
                alert(`No hay espacio suficiente para el palet ${i + 1} del grupo ${grupoIndex + 1}.`);
                break;
            }
        }
    });

    document.getElementById("ldm-ocupados").textContent = largoOcupadoActual.toFixed(2); // Mostrar el total LDM ocupado
}

function encontrarEspacio(ancho, largo, currentX) {
    // Solo permite colocar los palets a lo largo (eje X)
    if (currentX + largo > camionLargo) return null; // No cabe si excede el largo del camión

    return { x: currentX, y: 0 }; // Coloca los palets en la posición actual
}

function placePalet(x, y, ancho, largo) {
    // Marca la malla de ocupación
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


