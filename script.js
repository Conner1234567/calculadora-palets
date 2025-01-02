let palets = [];  // Array para almacenar los palets

// Función para agregar un palet al formulario
function agregarPalet() {
    const formPalets = document.getElementById('formPalets');
    const index = formPalets.childElementCount;

    formPalets.innerHTML += `
        <div id="palet${index}">
            <h3>Palet ${index + 1}</h3>
            <label for="largo${index}">Largo (cm):</label>
            <input type="number" id="largo${index}" placeholder="Largo (cm)" required>

            <label for="ancho${index}">Ancho (cm):</label>
            <input type="number" id="ancho${index}" placeholder="Ancho (cm)" required>

            <label for="cantidad${index}">Cantidad:</label>
            <input type="number" id="cantidad${index}" value="1" min="1" required>

            <button onclick="removerPalet(${index})">Eliminar</button>
        </div>
    `;
}

// Función para eliminar un palet
function removerPalet(index) {
    document.getElementById(`palet${index}`).remove();
}

// Función para calcular el espacio ocupado en el camión
function calcularEspacio() {
    const camionLargo = 1360;  // Largo del camión en centímetros (13.6 metros)
    const camionAncho = 244;   // Ancho del camión en centímetros (2.44 metros)

    let espacioOcupado = 0;
    let totalPalets = 0;
    let totalMetrosLineales = 0;
    let filaActual = 0;
    let xPos = 0;
    let yPos = 0;
    let camionArea = camionLargo * camionAncho;

    palets = [];  // Limpiar los palets

    // Recoger datos y agregar palets
    const formPalets = document.getElementById('formPalets').children;

    for (let i = 0; i < formPalets.length; i++) {
        const largoPalet = parseFloat(document.getElementById(`largo${i}`).value);
        const anchoPalet = parseFloat(document.getElementById(`ancho${i}`).value);
        const cantidadPalet = parseInt(document.getElementById(`cantidad${i}`).value);

        // Validar datos
        if (isNaN(largoPalet) || isNaN(anchoPalet) || isNaN(cantidadPalet)) {
            alert('Por favor, ingresa todos los datos correctamente.');
            return;
        }

        // Añadir palets al array
        for (let j = 0; j < cantidadPalet; j++) {
            const colorPalet = obtenerColorAleatorio();
            palets.push({ largo: largoPalet, ancho: anchoPalet, color: colorPalet });
        }

        espacioOcupado += largoPalet * cantidadPalet;  // Cálculo de espacio total
        totalPalets += cantidadPalet;
        totalMetrosLineales += (largoPalet * cantidadPalet) / 100;
    }

    // Mostrar resultado en metros lineales
    document.getElementById('resultado').textContent = `El espacio ocupado por ${totalPalets} palets es ${totalMetrosLineales.toFixed(2)} metros lineales.`;

    // Dibujar los palets dentro del camión
    dibujarCamion(palets, camionLargo, camionAncho);
}

// Función para dibujar los palets dentro del camión
function dibujarCamion(palets, camionLargo, camionAncho) {
    const camionDiv = document.getElementById('camion');
    camionDiv.innerHTML = '';  // Limpiar antes de dibujar

    let xPos = 0;  // Posición inicial en X
    let yPos = 0;  // Posición inicial en Y

    for (let i = 0; i < palets.length; i++) {
        const largoPalet = palets[i].largo;
        const anchoPalet = palets[i].ancho;
        const colorPalet = palets[i].color;

        // Verificar si el palet cabe en la fila actual
        if (xPos + largoPalet <= camionLargo) {
            // Dibujar palet
            const paletDiv = document.createElement('div');
            paletDiv.classList.add('palet');
            paletDiv.style.width = `${largoPalet}px`;
            paletDiv.style.height = `${anchoPalet}px`;
            paletDiv.style.backgroundColor = colorPalet;
            paletDiv.style.left = `${xPos}px`;
            paletDiv.style.top = `${yPos}px`;

            camionDiv.appendChild(paletDiv);

            // Actualizar posición en X para el siguiente palet
            xPos += largoPalet;
        } else if (yPos + anchoPalet <= camionAncho) {
            // Si no cabe en la fila, mover a la siguiente fila
            yPos += anchoPalet;
            xPos = largoPalet;  // Comenzar la nueva fila con el siguiente palet

            // Dibujar en la nueva fila
            const paletDiv = document.createElement('div');
            paletDiv.classList.add('palet');
            paletDiv.style.width = `${largoPalet}px`;
            paletDiv.style.height = `${anchoPalet}px`;
            paletDiv.style.backgroundColor = colorPalet;
            paletDiv.style.left = `${xPos - largoPalet}px`;
            paletDiv.style.top = `${yPos}px`;

            camionDiv.appendChild(paletDiv);

            // Actualizar posición en X para el siguiente palet
            xPos += largoPalet;
        } else {
            // Si no cabe, advertir que los palets exceden el espacio disponible
            alert("Los palets exceden el espacio del camión.");
            return;
        }
    }
}

// Función para obtener un color aleatorio para los palets
function obtenerColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

