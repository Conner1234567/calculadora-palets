const camionAncho = 244; // Ancho real del camión en cm
const camionLargo = 1360; // Largo real del camión en cm
const escalaVisual = 800 / camionLargo; // Escala basada en el largo del camión
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

    ocupacion = Array.from({ length: camionAncho }, () => Array(camionLargo).fill(false));

    let totalLDM = 0;

    palets.forEach((grupo, grupoIndex) => {
        const { ancho, largo, cantidad } = grupo;

        for (let i = 0; i < cantidad; i++) {
            const espacio = encontrarEspacio(ancho, largo);

            if (espacio) {
                const { x, y } = espacio;
                placePalet(x, y, ancho, largo);

                const paletDiv = document.createElement("div");
                paletDiv.classList.add("palet");
                paletDiv.style.width = `${largo * escalaVisual}px`; // Escalar el largo visual
                paletDiv.style.height = `${ancho * escalaVisual}px`; // Escalar el ancho visual
                paletDiv.style.backgroundColor = getColor(grupoIndex); // Color único para cada grupo
                paletDiv.style.lef

