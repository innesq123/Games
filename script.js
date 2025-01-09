// Spiellogik
const symbols = ["🇧🇦", "🥃", "💎", "🚼", "1️⃣6️⃣"];
let balance = 1000;
let selectedBet = 0;

// HTML-Elemente
const balanceDisplay = document.getElementById("balance");
const resultDisplay = document.getElementById("result");
const spinButton = document.getElementById("spinButton");
const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5"),
    document.getElementById("reel6"),
];

// Einsatz wählen
document.querySelectorAll(".bet-selector button").forEach((button) => {
    button.addEventListener("click", () => {
        selectedBet = parseInt(button.getAttribute("data-bet"));
        resultDisplay.textContent = `Einsatz: ${selectedBet}`;
        spinButton.disabled = false;
    });
});

// Symbole zufällig auswählen
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Gewinnlogik überprüfen
function checkWins(reelResults) {
    let win = 0;
    const topRow = [reelResults[0], reelResults[1], reelResults[2]];
    const bottomRow = [reelResults[3], reelResults[4], reelResults[5]];

    // Top-Reihe prüfen
    if (topRow[0] === topRow[1] && topRow[1] === topRow[2]) {
        win = selectedBet * 10;
    }

    // Bottom-Reihe prüfen
    if (bottomRow[0] === bottomRow[1] && bottomRow[1] === bottomRow[2]) {
        win = selectedBet * 5;
    }

    return win;
}

// Rollen drehen
function spinReels() {
    if (balance < selectedBet) {
        resultDisplay.textContent = "Nicht genug Guthaben!";
        return;
    }

    balance -= selectedBet;
    balanceDisplay.textContent = `Guthaben: ${balance}`;

    const reelResults = reels.map(() => getRandomSymbol());

    reels.forEach((reel, index) => {
        reel.textContent = reelResults[index];
    });

    const win = checkWins(reelResults);

    if (win > 0) {
        balance += win;
        resultDisplay.textContent = `Gewinn: ${win}`;
    } else {
        resultDisplay.textContent = "Kein Gewinn!";
    }

    balanceDisplay.textContent = `Guthaben: ${balance}`;
}

// Spin-Button
spinButton.addEventListener("click", spinReels);
