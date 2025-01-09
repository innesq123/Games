// Symbole
const symbols = ["🇧🇦", "🥃", "💎", "🚼", "1️⃣6️⃣"];
let balance = 1000;
let freeSpins = 0;
let multiplier = 1;
let selectedBet = 5;

// Hintergrundmusik
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.05;
backgroundMusic.play();

// Gewinne anzeigen
function displayWinningLines(lines) {
    const winningLinesContainer = document.querySelector(".winning-lines");
    winningLinesContainer.innerHTML = "";

    lines.forEach((line) => {
        const lineElement = document.createElement("div");
        lineElement.classList.add("line");
        lineElement.style.top = `${line.top}%`;
        lineElement.style.left = `${line.left}%`;
        lineElement.style.height = `${line.height}px`;
        lineElement.style.width = `${line.width}px`;
        winningLinesContainer.appendChild(lineElement);
    });
}

// Funktion: Gewinne überprüfen
function checkWins(reels) {
    const lines = [];
    const winnings = 0;

    // Beispiel: Horizontale Linienprüfung
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        winnings += selectedBet * 10; // 10x Gewinn für 3 gleiche Symbole
    }

    // Weitere Gewinnlogik hier einfügen ...

    displayWinningLines(lines);
    return winnings;
}

// Spin-Funktion
function spinReels() {
    const reels = [];

    for (let i = 0; i < 6; i++) {
        reels.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    document.getElementById("reel1").textContent = reels[0];
    document.getElementById("reel2").textContent = reels[1];
    document.getElementById("reel3").textContent = reels[2];
    document.getElementById("reel4").textContent = reels[3];
    document.getElementById("reel5").textContent = reels[4];
    document.getElementById("reel6").textContent = reels[5];

    const winnings = checkWins(reels);
    balance += winnings;
    document.getElementById("balance").textContent = `Guthaben: ${balance}`;
}

// Event-Listener für Spin
document.getElementById("spinButton").addEventListener("click", spinReels);
