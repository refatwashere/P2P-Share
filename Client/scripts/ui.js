// scripts/ui.js
import { getDeviceName, validateFile } from './utils.js';
import { sendFile } from './main.js';

// Add to scripts/ui.js
let modal;
let progressBar;
let progressText;
let statusLabel;

export function initProgressModal() {
    modal = document.getElementById('progress-modal');
    progressBar = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    statusLabel = document.getElementById('progress-status');
}

export function showProgress(title = 'Transferring...', status = 'Initializing...') {
    if (!modal) return;
    modal.querySelector('h2').textContent = title;
    statusLabel.textContent = status;
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    modal.classList.remove('hidden');
}

export function updateProgress(percent, status = null) {
    if (!modal) return;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;
    if (status) statusLabel.textContent = status;
}

export function hideProgress() {
    modal?.classList.add('hidden');
}
const devicesList = document.getElementById('devices-list');

export function renderDevices(peers) {
    devicesList.innerHTML = '';

    Object.keys(peers).forEach(deviceId => {
        const name = getDeviceName(deviceId);
        const card = document.createElement('div');
        card.className = 'device-card bg-gray-700 p-4 rounded-lg mb-2 flex justify-between items-center dropzone';
        card.innerHTML = `
            <div>
                <p class="text-white font-bold">${name}</p>
                <p class="text-xs text-gray-400 font-mono">${deviceId}</p>
            </div>
            <button class="send-btn bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">Send File</button>
        `;

        const button = card.querySelector('.send-btn');
        button.onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = () => {
                const file = input.files[0];
                const result = validateFile(file);
                if (!result.valid) return alert(result.reason);
                sendFile(deviceId, file);
            };
            input.click();
        };

        // Drag & Drop support
        card.addEventListener('dragover', e => e.preventDefault());
        card.addEventListener('dragenter', () => card.classList.add('bg-gray-600'));
        card.addEventListener('dragleave', () => card.classList.remove('bg-gray-600'));
        card.addEventListener('drop', e => {
            e.preventDefault();
            card.classList.remove('bg-gray-600');
            const file = e.dataTransfer.files[0];
            const result = validateFile(file);
            if (!result.valid) return alert(result.reason);
            sendFile(deviceId, file);
        });

        devicesList.appendChild(card);
    });
}

export function showQR(myId) {
    const modal = document.getElementById('qr-modal');
    const qrContainer = document.getElementById('qrcode');
    const idLabel = document.getElementById('qr-device-id');

    qrContainer.innerHTML = '';
    idLabel.textContent = myId;

    new QRCode(qrContainer, {
        text: myId,
        width: 180,
        height: 180,
        correctLevel: QRCode.CorrectLevel.H
    });

    modal.classList.remove('hidden');

    document.getElementById('close-qr-btn').onclick = () => {
        modal.classList.add('hidden');
    };
}