const canvas = document.getElementById("slotCanvas");
const ctx = canvas.getContext("2d");

// Symbole und Auszahlungen
const symbols = ["🍒", "🔔", "⭐", "💰", "📚", "🪙", "⚜️", "🪞"];
const payouts = {
    "🍒": [0.5, 2, 5],
    "🔔": [1, 3, 10],
    "⭐": [1.5, 5, 15],
    "💰": [2, 7, 20],
    "📚": [2.5, 10, 25],
    "🪙": [3, 12, 30],
    "⚜️": [4, 15, 50],
    "🪞": [5, 20, 75],
};

// Slot-Grid-Konfiguration
const rows = 3;
const cols = 5;
const slotSize = 100;
let reels = Array.from({ length: cols }, () => Array(rows).fill(null));
let balance = 250;
let currentBet = 0.2;
let winAmount = 0;

// Größe des Canvas dynamisch anpassen
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 20, 900);
    canvas.height = Math.min(window.innerHeight - 200, 600);
    drawSlots();
}

window.addEventListener("resize", resizeCanvas);

// Zufällige Symbole generieren
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

            // Slot-Hintergrund
            ctx.fillStyle = "#333";
            ctx.fillRect(x, y, slotSize - 5, slotSize - 5);

            // Symbol
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(reels[col][row], x + (slotSize - 5) / 2, y + (slotSize - 5) / 2);
        }
    }

    // Titel
    ctx.fillStyle = "gold";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🥃 BOOK OF IGOR 🥃", canvas.width / 2, 50);
}

// Spin-Logik
function spin() {
    if (balance < currentBet) {
        alert("Nicht genug Guthaben!");
        return;
    }

    balance -= currentBet;
    updateUI();

    let frame = 0;
    const spinInterval = setInterval(() => {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                reels[col][row] = randomSymbol();
            }
        }
        drawSlots();

        frame++;
        if (frame > 20) {
            clearInterval(spinInterval);
            calculateWin();
        }
    }, 50);
}

// Gewinnberechnung
function calculateWin() {
    const symbolCounts = {};

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const symbol = reels[col][row];
            symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
        }
    }

    winAmount = 0;
    for (const [symbol, count] of Object.entries(symbolCounts)) {
        if (count >= 3) {
            const payout = payouts[symbol][count - 3] * currentBet;
            winAmount += payout;
        }
    }

    balance += winAmount;
    updateUI();
}

// UI aktualisieren
function updateUI() {
    document.getElementById("balance").textContent = balance.toFixed(2);
    document.getElementById("winAmount").textContent = winAmount.toFixed(2);
}

// Einsatz ändern
document.getElementById("betAmount").addEventListener("change", (e) => {
    currentBet = parseFloat(e.target.value);
});

// Spin-Button
document.getElementById("spinButton").addEventListener("click", spin);

// Start
resizeCanvas();
initializeSlots();
