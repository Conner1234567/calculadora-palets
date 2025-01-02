function calcularEspacio() {
    // Obtener los valores del formulario
    const numeroPalets = parseFloat(document.getElementById('palets').value);
    const largoPalet = parseFloat(document.getElementById('largo').value);
    const anchoPalet = parseFloat(document.getElementById('ancho').value);

    // Dimensiones del camión (en metros)
    const largoCamion = 13.6;
    const anchoCamion = 2.44;

    // Validar que los campos no estén vacíos
    if (isNaN(numeroPalets) || isNaN(largoPalet) || isNaN(anchoPalet)) {
        document.getElementById('resultado').textContent = "Por favor, ingresa todos los datos correctamente.";
        return;
    }

    // Convertir las dimensiones del palet de metros a píxeles
    const largoPaletPx = largoPalet * 100; // 1 metro = 100 px (puedes ajustar esto según el tamaño)
    const anchoPaletPx = anchoPalet * 100; // 1 metro = 100 px (puedes ajustar esto según el tamaño)

    // Calcular el volumen de un palet en metros cuadrados (sin considerar altura)
    const volumenPalet = largoPalet * anchoPalet;

    // Calcular cuántos palets caben en el camión (largo y ancho del camión)
    const espacioDisponible = largoCamion * anchoCamion; // metros cuadrados
    const espacioOcupado = volumenPalet * numeroPalets; // metros cuadrados

    // Calcular el espacio ocupado
    document.getElementById('resultado').textContent = `El espacio ocupado por ${numeroPalets} palets es ${espacioOcupado.toFixed(2)} metros cuadrados de los ${espacioDisponible.toFixed(2)} disponibles en el camión.`;

    // Mostrar visualmente los palets ocupando el espacio del camión
    const camionDiv = document.getElementById('camion');
    camionDiv.innerHTML = ""; // Limpiar el camión antes de dibujar los nuevos palets

    let xPos = 0;
    let yPos = 0;
    const maxPaletsPorFila = Math.floor(largoCamion / largoPalet);
    const maxFilas = Math.floor(anchoCamion / anchoPalet);

    // Dibujar los palets
    for (let i = 0; i < numeroPalets; i++) {
        const paletDiv = document.createElement('div');
        paletDiv.classList.add('palet');
        paletDiv.style.width = `${largoPaletPx}px`;
        paletDiv.style.height = `${anchoPaletPx}px`;
        paletDiv.style.left = `${xPos * largoPaletPx}px`;
        paletDiv.style.top = `${yPos * anchoPaletPx}px`;

        camionDiv.appendChild(paletDiv);

        // Ajustar la posición para el siguiente palet
        xPos++;
        if (xPos >= maxPaletsPorFila) {
            xPos = 0;
            yPos++;
        }

        // Si hemos dibujado todos los palets posibles, terminamos
        if (yPos >= maxFilas) break;
    }
}
