// scripts/webrtc.js
import { sendSignal } from './signaling.js';
import { showProgress, updateProgress, hideProgress } from './ui.js';
import { logTransfer } from './utils.js';
import { renderHistory } from './ui.js';

logTransfer({ name: file.name, size: file.size, direction: 'send', peerId });
renderHistory();
// Before sending:
showProgress("Sending...", "Preparing file");

// On each chunk:
updateProgress(percent, "Sending chunks...");

// On complete:
updateProgress(100, "Transfer complete!");
setTimeout(hideProgress, 1000);
export function createPeerConnection(socket, myId, peerId, onSignal) {
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    let dataChannel;
    let receiveBuffer = [];
    let receivedSize = 0;
    let expectedSize = 0;
    let onComplete;

    pc.onicecandidate = event => {
        if (event.candidate) {
            sendSignal(socket, peerId, { type: 'ice', candidate: event.candidate });
        }
    };

    pc.ondatachannel = event => {
        dataChannel = event.channel;
        setupReceiveChannel();
    };

    async function handleSignal(data) {
        if (data.type === 'offer') {
            await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            sendSignal(socket, peerId, { type: 'answer', sdp: answer });
            expectedSize = data.filesize;
        } else if (data.type === 'answer') {
            await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        } else if (data.type === 'ice') {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    }

    function setupReceiveChannel() {
        dataChannel.onmessage = event => {
            receiveBuffer.push(event.data);
            receivedSize += event.data.byteLength;
            if (receivedSize === expectedSize && onComplete) {
                const blob = new Blob(receiveBuffer);
                onComplete(blob);
            }
        };
    }

    function sendOffer(fileMeta) {
        dataChannel = pc.createDataChannel('file');
        const { name, size } = fileMeta;
        dataChannel.binaryType = 'arraybuffer';

        dataChannel.onopen = () => {
            sendSignal(socket, peerId, {
                type: 'offer',
                sdp: pc.localDescription,
                filename: name,
                filesize: size
            });
        };

        dataChannel.onclose = () => console.log('Data channel closed');
    }

    return {
        handleSignal,
        sendOffer,
        sendData: buffer => dataChannel?.send(buffer),
        setOnComplete: cb => (onComplete = cb),
    };
}

export function sendFileToPeer(peer, file) {
    const chunkSize = 16384;
    let offset = 0;

    const reader = new FileReader();
    reader.onload = e => {
        peer.sendData(e.target.result);
        offset += e.target.result.byteLength;
        if (offset < file.size) readSlice();
    };

    function readSlice() {
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsArrayBuffer(slice);
    }

    peer.sendOffer(file);
    readSlice();
}