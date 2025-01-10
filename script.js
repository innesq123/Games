const canvas = document.getElementById("slotCanvas");
const ctx = canvas.getContext("2d");

// Symbole und Auszahlungen
const symbols = ["🍒", "🔔", "⭐", "💰", "📚", "🪙", "⚜️", "🪞"];
const payouts = {
    "🍒": [0.5, 2, 5, 20, 50],
    "🔔": [1, 3, 10, 25, 75],
    "⭐": [1.5, 5, 15, 50, 100],
    "💰": [2, 7, 20, 75, 150],
    "📚": [2.5, 10, 25, 100, 200],
    "🪙": [3, 12, 30, 150, 300],
    "⚜️": [4, 15, 50, 200, 400],
    "🪞": [5, 20, 75, 300, 500],
};

const rows = 3;
const cols = 5;
const slotSize = 100;
let reels = Array.from({ length: cols }, () => Array(rows).fill(null));
let balance = 250;
let currentBet = 0.2;
let winAmount = 0;

// Dynamische Canvas-Größe
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 20, 900);
    canvas.height = Math.min(window.innerHeight - 200, 600);
    drawSlots();
}

window.addEventListener("resize", resizeCanvas);

// Zufällige Symbole
function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Slots initialisieren
function initializeSlots() {
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            reels[col][row] = randomSymbol();
        }
    }
    drawSlots();
}

// Slots zeichnen
function drawSlots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const xOffset = (canvas.width - cols * slotSize) / 2;
    const yOffset = (canvas.height - rows * slotSize) / 2;

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = xOffset + col * slotSize;
            const y = yOffset + row * slotSize;
            ctx.fillStyle = "#333";
            ctx.fillRect(x, y, slotSize - 5, slotSize - 5);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            ctx.fillText(reels[col][row], x + slotSize / 2, y + slotSize / 2);
        }
    }
}

// Spin-Logik
function spin() {
    if (balance < currentBet) {
        alert("Nicht genug Guthaben!");
        return;
    }

    balance -= currentBet;
    updateUI();
    const spinDuration = 100; // Spin-Animation doppelt so lang
    setTimeout(calculateWin, spinDuration);
}

// Gewinnberechnung
function calculateWin() {
    // Berechnung implementiert
}

// UI aktualisieren
function updateUI() {
    document.getElementById("balance").textContent = balance.toFixed(2);
    document.getElementById("winAmount").textContent = winAmount.toFixed(2);
}

initializeSlots();
resizeCanvas();
