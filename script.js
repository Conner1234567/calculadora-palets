const truckWidth = 1360; // 13.6m en cm
const truckHeight = 244; // 2.44m en cm
let pallets = [];
let colorGroups = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f'];
let currentGroup = '';

function addPallets() {
    const palletWidth = parseInt(document.getElementById('pallet-width').value);
    const palletLength = parseInt(document.getElementById('pallet-length').value);
    const palletQuantity = parseInt(document.getElementById('pallet-quantity').value);
    const groupName = document.getElementById('group-name').value.trim();

    if (isNaN(palletWidth) || isNaN(palletLength) || isNaN(palletQuantity) || groupName === '') {
        alert('Por favor, introduce valores válidos y un nombre para el grupo.');
        return;
    }

    // Si no se ha introducido un nombre para el grupo, lo usamos como "Grupo X"
    if (!currentGroup) {
        currentGroup = groupName;
    }

    const groupColor = colorGroups[pallets.length % colorGroups.length];

    for (let i = 0; i < palletQuantity; i++) {
        pallets.push({ width: palletWidth, length: palletLength, color: groupColor, group: groupName });
    }

    renderTruck();
}

function finalizeGroup() {
    // Reseteamos el nombre del grupo para el siguiente
    currentGroup = '';
}

function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = '';
    let x = 0, y = 0, totalLinearMeters = 0;

    pallets.forEach((pallet, index) => {
        if (y + pallet.width > truckHeight) {
            y = 0;
            x += pallet.length;
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
        palletDiv.textContent = `${index + 1}`;
        truck.appendChild(palletDiv);

        y += pallet.width;
        totalLinearMeters = Math.max(totalLinearMeters, (x + pallet.length) / 100); // Convertimos a metros
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}

