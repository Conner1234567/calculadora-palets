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

    let x = 0; // Coordenada x en cm
    let y = 0; // Coordenada y en cm

    palets.forEach(({ ancho, largo, cantidad }, index) => {
        for (let i = 0; i < cantidad; i++) {
            if (x + ancho > camionAncho) {
                x = 0;
                y += largo;
            }

            if (y + largo > camionLargo) {
                alert("El camión está lleno, no caben más palets.");
                return;
            }

            const paletDiv = document.createElement("div");
            paletDiv.classList.add("palet");
            paletDiv.style.width = `${ancho}px`;
            paletDiv.style.height = `${largo}px`;
            paletDiv.style.backgroundColor = getColor(index);
            paletDiv.style.left = `${x}px`;
            paletDiv.style.top = `${y}px`;
            camionArea.appendChild(paletDiv);

            x += ancho;
        }
        x = 0; // Reiniciar fila para un nuevo tipo de palet
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
            ocupadoAncho = 0;
        }
    });

    return metrosLineales;
}

function getColor(index) {
    const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#FFC107"];
    return colors[index % colors.length];
}
            }
        }
    }
    return true;
}

function ocuparEspacio(posicion, ancho, largo, ocupacion) {
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < ancho; j++) {
            ocupacion[posicion.x + i][posicion.y + j] = true;
        }
    }
}

function obtenerColorParaPalet(ancho, largo) {
    const colores = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#FFC107'];
    return colores[(ancho + largo) % colores.length];
}




