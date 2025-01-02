let palets = [];  // Array para almacenar los palets

// Función para agregar un palet al formulario
function agregarPalet() {
    const formPalets = document.getElementById('formPalets');

    const index = formPalets.childElementCount;  // Para saber el índice del palet

    formPalets.innerHTML += `
        <div id="palet${index}">
            <h3>Palet ${index + 1}</h3>
            <label for="largo${index}">Largo (en centímetros):</label>
            <input type="number" id="largo${index}" placeholder="Largo del palet (cm)" required>

            <label for="ancho${index}">Ancho (en centímetros):</label>
            <input type="number" id="ancho${index}" placeholder="Ancho del palet (cm)" required>

            <label for="cantidad${index}">Cantidad:</label>
            <input type="number" id="cantidad${index}" value="1" min="1" required>

            <button onclick="removerPalet(${index})">Eliminar</button>
        </div>
    `;
}

// Función para remover un palet
function removerPalet(index) {
    document.getElementById(`palet${index}`).remove();
}

// Función para calcular el espacio total
function calcularEspacio() {
    const camionLargo = 1360;  // Largo del camión en centímetros (13.6 metros)
    const camionAncho = 244;   // Ancho del camión en centímetros (2.44 metros)

    let espacioOcupado = 0;
    let totalPalets = 0;
    let totalMetrosLineales = 0;
    let filaActual = 0;
    let xPos = 0;
    let yPos = 0;

    // Recoger los datos de los palets y calcular el espacio ocupado
    palets = [];  // Reiniciar el array de palets

    const formPalets = document.getElementById('formPalets').children;

    for (let i = 0; i < formPalets.length; i++) {
        const largoPalet = parseFloat(document.getElementById(`largo${i}`).value);
        const anchoPalet = parseFloat(document.getElementById(`ancho${i}`).value);
        const cantidadPalet = parseInt(document.getElementById(`cantidad${i}`).value);

        // Validar que los campos no estén vacíos
        if (isNaN(largoPalet) || isNaN(anchoPalet) || isNaN(cantidadPalet)) {
            alert('Por favor ingresa todos los datos correctamente');
            return;
        }

        // Agregar el palet al array
        for (let j = 0; j < cantidadPalet; j++) {
            palets.push({
                largo: largoPalet,
                ancho: anchoPalet,
                cantidad: cantidadPalet,
                color: obtenerColorAleatorio()
            });
        }

        // Calcular los metros lineales
        espacioOcupado += largoPalet * cantidadPalet; // Se suma el largo por cantidad
        totalPalets += cantidadPalet;
        totalMetrosLineales += (largoPalet * cantidadPalet) / 100;  // Convertir a metros
    }

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El espacio ocupado por ${totalPalets} palets es ${totalMetrosLineales.toFixed(2)} metros lineales de los ${camionLargo / 100} metros disponibles en el camión.`;

    // Mostrar los palets dentro del camión
    dibujarCamion(palets);
}

// Función para dibujar los palets dentro del camión
function dibujarCamion(palets) {
    const camionDiv = document.getElementById('camion');
    camionDiv.innerHTML = ''; // Limpiar antes de dibujar

    let xPos = 0;
    let yPos = 0;

    // Dibujar los palets en el camión
    for (let i = 0; i < palets.length; i++) {
        const largoPalet = palets[i].largo;
        const anchoPalet = palets[i].ancho;
        const cantidadPalet = palets[i].cantidad;
        const colorPalet = palets[i].color;

        for (let j = 0; j < cantidadPalet; j++) {
            const paletDiv = document.createElement('div');
            paletDiv.classList.add('palet');
            paletDiv.style.width = `${largoPalet}px`; // Usar centímetros convertidos directamente a píxeles
            paletDiv.style.height = `${anchoPalet}px`; // Usar centímetros convertidos directamente a píxeles
            paletDiv.style.backgroundColor = colorPalet; // Asignar color aleatorio
            paletDiv.style.left = `${xPos * largoPalet}px`;
            paletDiv.style.top = `${yPos * anchoPalet}px`;

            camionDiv.appendChild(paletDiv);

            // Ajustar la posición para el siguiente palet
            xPos++;
            if (xPos * largoPalet > 1360) {  // Si el palet se sale del camión, empezar nueva fila
                xPos = 0;
                yPos++;
            }
        }
    }
}

// Función para obtener un color aleatorio
function obtenerColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}
