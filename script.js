const camionAncho = 244; // Ancho del camión en cm
const camionLargo = 1360; // Largo del camión en cm
let palets = [];

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

    // Ordenar los palets por su tamaño (de mayor a menor)
    palets.sort((a, b) => (b.ancho * b.largo) - (a.ancho * a.largo));

    let x = 0; // Coordenada x en cm
    let y = 0; // Coordenada y en cm
    let filaLargo = 0; // Largo total utilizado en la fila actual

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            // Si no cabe en la fila actual, pasar a la siguiente fila
            if (x + ancho > camionAncho) {
                // Verificar si se puede mover a la siguiente fila sin sobrepasar el largo del camión
                if (y + filaLargo + largo > camionLargo) {
                    alert("El camión está lleno, no caben más palets.");
                    return;
                }
                // Colocar los palets en la siguiente fila
                x = 0;
                y += filaLargo;  // Usar el largo de la fila actual
                filaLargo = 0;  // Reiniciar el largo utilizado de la fila
            }

            // Colocar el palet
            const paletDiv = document.createElement("div");
            paletDiv.classList.add("palet");
            paletDiv.style.width = `${ancho}px`;
            paletDiv.style.height = `${largo}px`;
            paletDiv.style.backgroundColor = getColor(index);
            paletDiv.style.left = `${x}px`;
            paletDiv.style.top = `${y}px`;
            camionArea.appendChild(paletDiv);

            // Actualizar las coordenadas de la fila
            x += ancho;
            filaLargo = Math.max(filaLargo, largo);  // Mantener el largo máximo de la fila
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
