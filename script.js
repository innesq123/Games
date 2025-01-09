// Array mit Symbolen
const symbols = ["🍒", "⭐", "🖕🏼", "🇧🇦", "🎰"];

// Spielerstatus
let balance = 2009;

// Sound-Effekte erstellen
function playSound(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frequenz in Hz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200); // 200 ms Sound
}

// Funktion für zufällige Symbole
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Rollen-Animation und Spielmechanik
function spinReels() {
    const betInput = document.getElementById("bet");
    const resultText = document.getElementById("result");
    const bet = parseInt(betInput.value);

    // Überprüfen, ob der Einsatz gültig ist
    if (bet > balance) {
        resultText.textContent = "Nicht genügend Guthaben! du musst dein Vater um Geld bitten";
        return;
    }

    // Guthaben reduzieren
    balance -= bet;
    document.getElementById("balance").textContent = `Guthaben: ${balance}`;

    // Setze zufällige Symbole
    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");

    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    // Animation und Symbole aktualisieren
    reel1.textContent = "?";
    reel2.textContent = "?";
    reel3.textContent = "?";

    setTimeout(() => {
        reel1.textContent = result1;
        reel2.textContent = result2;
        reel3.textContent = result3;

        // Überprüfe Gewinn
        checkWin(result1, result2, result3, bet);
    }, 500);

    // Sound für den Spin
    playSound(300);
}

// Gewinnprüfung
function checkWin(r1, r2, r3, bet) {
    const resultText = document.getElementById("result");
    let win = 0;

    if (r1 === r2 && r2 === r3) {
        win = bet * 10; // Jackpot: 10x Einsatz
        resultText.textContent = "JACKPOT! du kannst teile für deine e klasse kaufen " + win;
        playSound(600);
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        win = bet * 2; // 2x Einsatz
        resultText.textContent = "Kleiner Gewinn! Du kannst dir in bogart ein jacky bull kaufen " + win;
        playSound(400);
    } else {
        resultText.textContent = "Kein Gewinn. Du PIC!";
    }

    // Guthaben aktualisieren
    balance += win;
    document.getElementById("balance").textContent = `Guthaben: ${balance}`;
}

// Spin-Button Event-Listener
document.getElementById("spinButton").addEventListener("click", spinReels);
