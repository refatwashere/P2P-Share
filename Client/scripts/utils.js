// scripts/utils.js

// 🎨 Random name generator from user ID
export function getDeviceName(id) {
    const adjectives = ["Swift", "Bold", "Clever", "Lucky", "Silent"];
    const nouns = ["Jaguar", "Falcon", "Wolf", "Otter", "Panther"];
    const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${adjectives[hash % adjectives.length]} ${nouns[hash % nouns.length]}`;
}

// 🔐 File validation
export function validateFile(file, maxSizeMB = 50, allowedTypes = []) {
    if (!file) return { valid: false, reason: "No file selected" };
    if (file.size > maxSizeMB * 1024 * 1024) {
        return { valid: false, reason: `File exceeds ${maxSizeMB}MB limit` };
    }
    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
        return { valid: false, reason: "Invalid file type" };
    }
    return { valid: true };
}

// 📋 Copy text to clipboard
export function copyToClipboard(text) {
    navigator.clipboard?.writeText(text).catch(() => {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    });
}

export function logTransfer({ name, size, direction, peerId }) {
  const history = JSON.parse(localStorage.getItem('transferHistory')) || [];
  history.push({
    name,
    size,
    direction,
    peerId,
    date: Date.now()
  });
  localStorage.setItem('transferHistory', JSON.stringify(history));
}

export function getTransferHistory() {
  return JSON.parse(localStorage.getItem('transferHistory')) || [];
}
import { getDeviceName } from './utils.js';

export function renderHistory(history = []) {
  const container = document.getElementById('history-list');
  container.innerHTML = '';

  if (!history.length) {
    container.innerHTML = `<li class="text-gray-500">No transfers yet.</li>`;
    return;
  }

  history.slice().reverse().forEach(entry => {
    const li = document.createElement('li');
    const date = new Date(entry.date).toLocaleString();
    const label = entry.direction === 'send' ? '⬆️ Sent' : '⬇️ Received';
    const peer = getDeviceName(entry.peerId);
    li.innerHTML = `${label} <strong>${entry.name}</strong> (${(entry.size / 1024).toFixed(1)} KB) with ${peer} on ${date}`;
    container.appendChild(li);
  });
}