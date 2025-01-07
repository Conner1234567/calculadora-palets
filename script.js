const camionAncho = 244; // Ancho real del camión en cm
const camionLargo = 1360; // Largo real del camión en cm
const escalaVisual = 816 / camionLargo; // Escala visual basada en el largo del camión
let palets = [];
let largoOcupado = 0; // Para llevar cuenta de cuanto del largo se ha ocupado

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

    largoOcupado = 0; // Resetear el largo ocupado

    let currentX = 0; // Posición en el eje X para los palets

    palets.forEach((grupo, grupoIndex) => {
        const { ancho, largo, cantidad } = grupo;

        for (let i = 0; i < cantidad; i++) {
            if (currentX + largo > camionLargo) {
                alert("El camión está lleno. No se pueden agregar más palets.");
                return;
            }

            // Crear el div visual del palet
            const paletDiv = document.createElement("div");
            paletDiv.classList.add("palet");
            paletDiv.style.width = `${largo * escalaVisual}px`; // Escalar el largo visual
            paletDiv.style.height = `${ancho * escalaVisual}px`; // Escalar el ancho visual
            paletDiv.style.backgroundColor = getColor(grupoIndex); // Color único para cada grupo
            paletDiv.style.left = `${currentX * escalaVisual}px`;
            paletDiv.style.top = `0px`; // Los palets están alineados horizontalmente en el camión
            camionArea.appendChild(paletDiv);

            // Actualizar el largo ocupado solo considerando el largo que ocupa el palet
            largoOcupado += largo / 100; // Sumar el largo ocupado en LDM

            // Avanzar en la dirección del largo
            currentX += largo;
        }
    });

    document.getElementById("ldm-ocupados").textContent = largoOcupado.toFixed(2); // Mostrar el total LDM ocupado
}

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107", "#9C27B0", "#3F51B5"];
    return colors[index % colors.length];
}

