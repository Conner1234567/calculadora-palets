function renderTruck() {
    const truck = document.getElementById('truck');
    truck.innerHTML = '';

    let positions = []; 
    let x = 0, y = 0, maxX = 0, totalLinearMeters = 0;

    pallets.forEach((pallet, index) => {
        let placed = false;

        // Encuentra un lugar disponible para el pallet
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

        // Actualiza el cálculo de metros lineales
        maxX = Math.max(maxX, x + pallet.length);
        totalLinearMeters = maxX / 100;

        // Después de que el div es añadido, lo hacemos visible
        setTimeout(() => {
            palletDiv.style.opacity = 1;
        }, 100);
    });

    document.getElementById('result').textContent = `Metros lineales ocupados: ${totalLinearMeters.toFixed(2)} m`;
}

