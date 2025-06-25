// Detect system preference or saved setting
const userPref = localStorage.getItem('theme');
const systemPref = window.matchMedia('(prefers-color-scheme: light)').matches;

if (userPref === 'light' || (!userPref && systemPref)) {
  document.body.classList.add('light-mode');
  document.getElementById('mode-toggle').textContent = 'Dark Mode';
}
// scripts/main.js

import { initSignaling } from './signaling.js';
import { createPeerConnection, sendFileToPeer } from './webrtc.js';
import { renderDevices } from './ui.js';
import { showQR } from './ui.js';

document.getElementById('share-qr-btn').onclick = () => showQR(myId);
const myId = crypto.randomUUID();
let peers = {};

const socket = initSignaling(myId, handleSignal);

function handleSignal({ from, data }) {
    if (!peers[from]) {
        peers[from] = createPeerConnection(socket, myId, from, handleSignal);
    }
    peers[from].handleSignal(data);
}
const toggleBtn = document.getElementById('mode-toggle');
toggleBtn.onclick = () => {
  const isLight = document.body.classList.toggle('light-mode');
  toggleBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
};
// UI event: toggle dark mode
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('✅ Service worker registered'))
      .catch(err => console.error('⚠️ Service worker failed:', err));
  });
}

// UI event: send file
export function sendFile(deviceId, file) {
    if (peers[deviceId]) {
        sendFileToPeer(peers[deviceId], file);
    }
}