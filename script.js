// Spielfunktionen und Gewinnlogik
const symbols = ["🇧🇦", "🥃", "💎", "🚼", "1️⃣6️⃣"];
let balance = 1000;
let freeSpins = 0;
let multiplier = 1;

// Sound: Hintergrundmusik
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.05; // Leiser als Gewinnsounds
backgroundMusic.play();

// Sound: Gewinnton
function playWinSound(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
}

// Zufälliges Symbol auswählen
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Gewinn überprüfen
function checkWin(reels, bet) {
    const resultText = document.getElementById("result");
    let win = 0;

    // Gewinnlogik für horizontale und V-Form-Gewinne
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        if (reels[0] === "1️⃣6️⃣") {
            freeSpins += 16;
            multiplier = 3;
            resultText.textContent = `du bist nach wien gefahren für eine 16 jährige 16FREISPIELE FÜR DICH!`;
        } else if (reels[0] === "🥃") {
            freeSpins += 1;
            multiplier = 0.1;
            resultText.textContent = `OH NEIN du hast im Bogart zu viel Jacky Bull getrunken und eine Volljährige angebaggert 1 strafrunde mit x0,1!`;
        } else {
            win = bet * 10;
            resultText.textContent = `JACKPOT! du kannst nun deinen DPF tauschen! ${win}`;
        }
    } else if (reels[0] === reels[1] || reels[1] === reels[2]) {
        win = bet * 2;
        resultText.textContent = `Kleiner Gewinn! "das sind 3 gratis vodka bull wenn man das so rechnet! ${win}`;
    } else {
        resultText.textContent = "Kein Gewinn du bastard.";
    }

    balance += win * multiplier;
    document.getElementById("balance").textContent = `Guthaben: ${balance}`;
    return win > 0;
}

// Spin-Funktion
function spinReels() {
    if (balance <= 0) {
        document.getElementById("result").textContent = "Kein Guthaben mehr! Du musst styropor zermalmen mit Rade!";
        return;
    }

    const bet = parseInt(document.getElementById("bet").value);
    if (bet > balance) {
        document.getElementById("result").textContent = "Nicht genug Guthaben! du musst Jaruska oder deine Oma um geld bitten";
        return;
    }

    balance -= bet;
    document.getElementById("balance").textContent = `Guthaben: ${balance}`;

    const reels = [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
    ];

    document.getElementById("reel1").textContent = reels[0];
    document.getElementById("reel2").textContent = reels[1];
    document.getElementById("reel3").textContent = reels[2];
    document.getElementById("reel4").textContent = reels[3];
    document.getElementById("reel5").textContent = reels[4];
    document.getElementById("reel6").textContent = reels[5];

    // Gewinne überprüfen
    checkWin([reels[0], reels[1], reels[2]], bet);
}

// Button-Event
document.getElementById("spinButton").addEventListener("click", spinReels);
