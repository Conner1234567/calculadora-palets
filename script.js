const truckWidth = 244; // 13.6m en cm
const truckHeight = 1360; // 2.44m en cm
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

    currentGroup++; // Cambiar al siguiente grupo
    renderTruck();
}

function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = ''; // Limpiar el camión antes de volver a renderizar
    let x = 0, y = 0, totalLinearMeters = 0, columnWidth = 0;

    pallets.forEach((pallet, index) => {
        // Si el palet no cabe en la columna actual, moverlo a la siguiente columna
        if (y + pallet.width > truckHeight) {
            y = 0; // Reiniciamos la posición vertical
            x += columnWidth; // Pasamos a la siguiente columna
            columnWidth = 0; // Reiniciamos la anchura de la columna
        }

        // Verificar si el palet cabe en el camión horizontalmente
        if (x + pallet.length > truckWidth) {
            alert('No caben más palets en el camión.');
            return;
        }

        // Crear el div para el palet
        const palletDiv = document.createElement('div');
        palletDiv.className = 'pallet';
        palletDiv.style.width = `${pallet.length}px`; // Establecer el largo del palet
        palletDiv.style.height = `${pallet.width}px`; // Establecer el ancho del palet
        palletDiv.style.left = `${x}px`; // Establecer la posición horizontal
        palletDiv.style.top = `${y}px`; // Establecer la posición vertical
        palletDiv.style.backgroundColor = pallet.color;
        palletDiv.textContent = `Grupo ${pallet.group} - ${index + 1}`;
        truck.appendChild(palletDiv);

        // Ajustar la posición para el siguiente palet
        y += pallet.width; // Aumentamos el valor de y para la siguiente posición en la columna
        columnWidth = Math.max(columnWidth, pallet.length); // Actualizamos el ancho de la columna
        totalLinearMeters = Math.max(totalLinearMeters, (x + columnWidth) / 100); // Convertimos a metros
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}

