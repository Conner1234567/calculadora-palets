const truckWidth = 1360; // 13.6m en cm
const truckHeight = 244; // 2.44m en cm
let pallets = [];

// Función para añadir palets
function addPallets() {
    const palletWidth = parseInt(document.getElementById('pallet-width').value);
    const palletLength = parseInt(document.getElementById('pallet-length').value);
    const palletQuantity = parseInt(document.getElementById('pallet-quantity').value);

    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; // Ocultar mensaje de error

    if (isNaN(palletWidth) || isNaN(palletLength) || isNaN(palletQuantity)) {
        errorMessage.textContent = 'Por favor, introduce valores válidos.';
        errorMessage.style.display = 'block';
        return;
    }

    // Añadir los palets a la lista
    for (let i = 0; i < palletQuantity; i++) {
        pallets.push({ width: palletWidth, length: palletLength });
    }

    // Renderizar el camión con los palets
    renderTruck();
}

// Función para renderizar los palets en el camión
function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = '';

    let positions = []; 
    let x = 0, y = 0, maxX = 0, totalLinearMeters = 0;

    pallets.forEach((pallet, index) => {
        let placed = false;

        // Buscar un lugar disponible para el palet
        for (let i = 0; i <= truckWidth - pallet.length; i++) {
            for (let j = 0; j <= truckHeight - pallet.width; j++) {
                if (isPositionAvailable(i, j, pallet, positions)) {
                    x = i;
                    y = j;
                    placed = true;
                    break;
                }
            }
            if (placed) break;
        }

        if (!placed) {
            alert('No caben más palets en el camión.');
            return;
        }

        positions.push({ x, y, width: pallet.width, length: pallet.length });

        const palletDiv = document.createElement('div');
        palletDiv.className = 'pallet';
        palletDiv.style.width = `${pallet.length}px`;
        palletDiv.style.height = `${pallet.width}px`;
        palletDiv.style.left = `${x}px`;
        palletDiv.style.top = `${y}px`;
        palletDiv.textContent = `${index + 1}`;
        
        // Animación para que los palets aparezcan con un efecto
        palletDiv.style.opacity = 0;
        palletDiv.style.transition = 'opacity 1s ease-in-out';
        truck.appendChild(palletDiv);

        // Actualizar el cálculo de metros lineales
        maxX = Math.max(maxX, x + pallet.length);
        totalLinearMeters = maxX / 100;

        // Hacer visible el palet después de un breve retraso
        setTimeout(() => {
            palletDiv.style.opacity = 1;
        }, 100);
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}

// Función para verificar si la posición está libre
function isPositionAvailable(x, y, pallet, positions) {
    return !positions.some(pos => 
        x < pos.x + pos.length &&
        x + pallet.length > pos.x &&
        y < pos.y + pos.width &&
        y + pallet.width > pos.y
    );
}

