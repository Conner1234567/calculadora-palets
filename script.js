// script.js
const truckWidth = 1360; // 13.6m en cm
const truckHeight = 244; // 2.44m en cm
let pallets = [];
const clientColors = {
    'Cliente 1': '#1abc9c', // Color para Cliente 1
    'Cliente 2': '#3498db', // Color para Cliente 2
    'Cliente 3': '#9b59b6', // Color para Cliente 3
};
let currentClient = 'Cliente 1'; // Cliente inicial

// Obtener cliente seleccionado
document.getElementById('client-select').addEventListener('change', function() {
    currentClient = this.value; // Cambiar el cliente actual
});

function addPallets() {
    const palletWidth = parseInt(document.getElementById('pallet-width').value);
    const palletLength = parseInt(document.getElementById('pallet-length').value);
    const palletQuantity = parseInt(document.getElementById('pallet-quantity').value);

    if (isNaN(palletWidth) || isNaN(palletLength) || isNaN(palletQuantity)) {
        alert('Por favor, introduce valores válidos.');
        return;
    }

    const groupColor = clientColors[currentClient]; // Asignar color según el cliente

    for (let i = 0; i < palletQuantity; i++) {
        pallets.push({ width: palletWidth, length: palletLength, color: groupColor, client: currentClient });
    }

    renderTruck();
}

function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = '';
    let x = 0, y = 0, totalLinearMeters = 0;

    pallets.forEach((pallet, index) => {
        if (y + pallet.width > truckHeight) {
            y = 0; // Reiniciar la posición vertical al inicio de la siguiente fila
            x += pallet.length; // Mover a la siguiente columna
        }

        if (x + pallet.length > truckWidth) {
            alert('No caben más palets en el camión.');
            return;
        }

        const palletDiv = document.createElement('div');
        palletDiv.className = 'pallet';
        palletDiv.style.width = `${pallet.length}px`;
        palletDiv.style.height = `${pallet.width}px`;
        palletDiv.style.left = `${x}px`;
        palletDiv.style.top = `${y}px`;
        palletDiv.style.backgroundColor = pallet.color;
        palletDiv.textContent = `${index + 1} (${pallet.client})`;
        truck.appendChild(palletDiv);

        y += pallet.width; // Incrementar la posición vertical para el próximo palet en la misma fila
        totalLinearMeters = Math.max(totalLinearMeters, (x + pallet.length) / 100); // Convertimos a metros
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}
