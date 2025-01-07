const camionAncho = 244; // Ancho real del camión en cm
const camionLargo = 1360; // Largo real del camión en cm
const escalaVisual = 816 / camionLargo; // Escala visual basada en el largo del camión

// Dimensiones visuales del camión
const camionArea = document.getElementById("camion-area");
camionArea.style.width = `${816}px`; // El ancho visual del camión
camionArea.style.height = `${244 * escalaVisual}px`; // El alto visual del camión ajustado a la escala

let palets = [];
let largoOcupado = 0; // Para llevar cuenta de cuanto del largo se ha ocupado
let anchoOcupado = 0; // Para llevar cuenta de cuanto del ancho se ha ocupado

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
    camionArea.innerHTML = ""; // Limpiar la representación visual del camión
    largoOcupado = 0; // Resetear el largo ocupado
    anchoOcupado = 0; // Resetear el ancho ocupado

    let currentX = 0; // Posición en el eje X (largo del camión)
    let currentY = 0; // Posición en el eje Y (ancho del camión)

    palets.forEach((grupo, grupoIndex) => {
        const { ancho, largo, cantidad } = grupo;

        for (let i = 0; i < cantidad; i++) {
            // Escalar dimensiones de los palets
            const paletAnchoVisual = ancho * escalaVisual;
            const paletLargoVisual = largo * escalaVisual;

            // Verificar si el palet cabe dentro del camión en el eje X (largo)
            if (currentX + paletLargoVisual > 816) { // Si no cabe horizontalmente, pasar a la siguiente fila
                currentX = 0; // Reiniciar la posición en X
                currentY += ancho * escalaVisual; // Mover a la siguiente fila (Y)
                
                // Verificar si el palet cabe en el eje Y (ancho)
                if (currentY + paletAnchoVisual > (244 * escalaVisual)) { // Si no cabe verticalmente
                    alert("El camión está lleno. No se pueden agregar más palets.");
                    return;
                }
            }

            // Crear el div visual del palet
            const paletDiv = document.createElement("div");
            paletDiv.classList.add("palet");
            paletDiv.style.width = `${paletLargoVisual}px`; // Escalar el largo visual
            paletDiv.style.height = `${paletAnchoVisual}px`; // Escalar el ancho visual
            paletDiv.style.backgroundColor = getColor(grupoIndex); // Color único para cada grupo
            paletDiv.style.left = `${currentX}px`; // Posición X visual
            paletDiv.style.top = `${currentY}px`; // Posición Y visual
            camionArea.appendChild(paletDiv);

            // Actualizar el largo ocupado
            largoOcupado += largo / 100; // Sumar el largo ocupado en LDM

            // Avanzar en la dirección del largo (X)
            currentX += paletLargoVisual;
        }
    });

    document.getElementById("ldm-ocupados").textContent = largoOcupado.toFixed(2); // Mostrar el total LDM ocupado
}

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107", "#9C27B0", "#3F51B5"];
    return colors[index % colors.length];
}

