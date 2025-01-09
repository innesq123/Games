const symbols = ["🇧🇦", "🥃", "💎", "🚼", "1️⃣6️⃣"];
let balance = 1000;
let selectedBet = 0;

// Dynamische Erstellung der Kästen
const reelsContainer = document.getElementById("reelsContainer");
for (let i = 0; i < 20; i++) {
    const reel = document.createElement("div");
    reel.classList.add("reel");
    reelsContainer.appendChild(reel);
}

// Info-Overlay
const infoButton = document.getElementById("infoButton");
const infoContainer = document.getElementById("infoContainer");
const overlay = document.getElementById("overlay");
const closeInfo = document.getElementById("closeInfo");

infoButton.addEventListener("click", () => {
    infoContainer.style.display = "block";
    overlay.style.display = "block";
});

closeInfo.addEventListener("click", () => {
    infoContainer.style.display = "none";
    overlay.style.display = "none";
});

// Mehr Details in Gewinnlogik hinzufügen ...
