const truckWidth = 1360; // 13.6m en cm
const truckHeight = 244; // 2.44m en cm
let pallets = [];
let currentGroup = 1;
let colorGroups = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f'];

function addPallets() {
    const palletWidth = parseInt(document.getElementById('pallet-width').value);
    const palletLength = parseInt(document.getElementById('pallet-length').value);
    const palletQuantity = parseInt(document.getElementById('pallet-quantity').value);

    if (isNaN(palletWidth) || isNaN(palletLength) || isNaN(palletQuantity)) {
        alert('Por favor, introduce valores válidos.');
        return;
    }

    const groupColor = colorGroups[(currentGroup - 1) % colorGroups.length];

    for (let i = 0; i < palletQuantity; i++) {
        pallets.push({ width: palletWidth, length: palletLength, color: groupColor, group: currentGroup });
    }

    currentGroup++; // Cambia al siguiente grupo
    renderTruck();
}

function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = ''; // Limpiar el camión antes de volver a renderizar
    let x = 0, y = 0, totalLinearMeters = 0, rowHeight = 0;

    pallets.forEach((pallet, index) => {
        // Si no cabe el palet en la fila actual, pasamos a la siguiente fila
        if (x + pallet.length > truckWidth) {
            x = 0; // Resetear el eje x
            y += rowHeight; // Pasar a la siguiente fila
            rowHeight = 0; // Resetear la altura de la fila
        }

        // Si no cabe el palet en el camión verticalmente, detiene la inserción
        if (y + pallet.width > truckHeight) {
            alert('No caben más palets en el camión.');
            return;
        }

        // Crear el div para el palet
        const palletDiv = document.createElement('div');
        palletDiv.className = 'pallet';
        palletDiv.style.width = `${pallet.length}px`;
        palletDiv.style.height = `${pallet.width}px`;
        palletDiv.style.left = `${x}px`;
        palletDiv.style.top = `${y}px`;
        palletDiv.style.backgroundColor = pallet.color;
        palletDiv.textContent = `Grupo ${pallet.group} - ${index + 1}`;
        truck.appendChild(palletDiv);

        // Ajustar la posición para el siguiente palet
        x += pallet.length;
        rowHeight = Math.max(rowHeight, pallet.width); // Establecer la altura de la fila más alta
        totalLinearMeters = Math.max(totalLinearMeters, (x + pallet.length) / 100); // Convertimos a metros
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}

function finalizeGroup() {
    renderTruck();
}
