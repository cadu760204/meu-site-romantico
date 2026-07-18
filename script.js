"use strict";

/* ELEMENTOS PRINCIPAIS */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const mainContent = document.getElementById("mainContent");
const musicButton = document.getElementById("musicButton");

const openLetterButton = document.getElementById("openLetterButton");
const closeLetterButton = document.getElementById("closeLetterButton");
const letterModal = document.getElementById("letterModal");
const modalOverlay = document.querySelector(".modal-overlay");

const finalSurpriseButton = document.getElementById("finalSurpriseButton");
const finalScene = document.getElementById("finalScene");
const heartStars = document.getElementById("heartStars");
const restartButton = document.getElementById("restartButton");

const finalPhraseOne = document.getElementById("finalPhraseOne");
const finalPhraseTwo = document.getElementById("finalPhraseTwo");
const finalPhraseThree = document.getElementById("finalPhraseThree");

/* ENTRADA DO SITE */

enterButton.addEventListener("click", () => {
    intro.classList.add("fade-out");
    startInstrumental();

    window.setTimeout(() => {
        intro.classList.add("hidden");
        mainContent.classList.remove("hidden");
        window.scrollTo(0, 0);
    }, 900);
});

/* CONTADOR DESDE 04/10/2025 */

const relationshipStart = new Date("2025-10-04T00:00:00");

function updateCounter() {
    const now = new Date();
    let difference = now.getTime() - relationshipStart.getTime();

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCounter();
window.setInterval(updateCounter, 1000);

/* CARTA */

function openLetter() {
    letterModal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeLetter() {
    letterModal.classList.remove("open");
    document.body.style.overflow = "";
}

openLetterButton.addEventListener("click", openLetter);
closeLetterButton.addEventListener("click", closeLetter);
modalOverlay.addEventListener("click", closeLetter);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && letterModal.classList.contains("open")) {
        closeLetter();
    }
});

/* MÚSICA DO SITE */

const backgroundMusic =
    document.getElementById("backgroundMusic");

async function startInstrumental() {
    try {
        backgroundMusic.volume = 0.35;
        await backgroundMusic.play();

        musicButton.textContent = "♫";
        musicButton.classList.remove("paused");
    } catch (error) {
        console.log("A música aguardará outra interação.");
    }
}

musicButton.addEventListener("click", async () => {
    try {
        if (backgroundMusic.paused) {
            await backgroundMusic.play();

            musicButton.textContent = "♫";
            musicButton.classList.remove("paused");
        } else {
            backgroundMusic.pause();

            musicButton.textContent = "♪";
            musicButton.classList.add("paused");
        }
    } catch (error) {
        console.log("Não foi possível controlar a música.");
    }
});

/* ESTRELAS EM FORMATO DE CORAÇÃO */

function createHeartStars() {
    heartStars.innerHTML = "";

    /*
        Garante que a animação apareça mesmo que exista
        uma regra antiga escondendo o coração.
    */

    heartStars.style.setProperty(
        "display",
        "block",
        "important"
    );

    const numberOfLights = 36;

    for (let index = 0; index < numberOfLights; index += 1) {
        const light = document.createElement("span");

        const size = 2 + Math.random() * 5;
        const startX = Math.random() * 100;
        const startY = 70 + Math.random() * 30;
        const horizontalMovement =
            (Math.random() - 0.5) * 160;

        light.style.position = "absolute";
        light.style.left = `${startX}%`;
        light.style.top = `${startY}%`;
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.borderRadius = "50%";
        light.style.background =
            "rgba(255, 255, 255, 0.95)";
        light.style.boxShadow =
            "0 0 8px white, 0 0 18px #ffd0df";
        light.style.opacity = "0";

        heartStars.appendChild(light);

        light.animate(
            [
                {
                    transform:
                        "translate(0, 0) scale(0.5)",
                    opacity: 0
                },
                {
                    opacity: 0.95,
                    offset: 0.18
                },
                {
                    transform:
                        `translate(${horizontalMovement}px, -75vh) scale(1.3)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    7000 + Math.random() * 5000,
                delay:
                    Math.random() * 3500,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    }
}

/* FRASES DA SURPRESA FINAL */

function hideFinalMessages() {
    finalPhraseOne.classList.remove("visible");
    finalPhraseTwo.classList.remove("visible");
    finalPhraseThree.classList.remove("visible");
    restartButton.classList.remove("visible");
}

function startFinalSurprise() {
    closeLetter();
    hideFinalMessages();

    finalScene.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    createHeartStars();

    window.setTimeout(() => {
        finalPhraseOne.classList.add("visible");
    }, 3300);

    window.setTimeout(() => {
        finalPhraseOne.classList.remove("visible");
    }, 7300);

    window.setTimeout(() => {
        finalPhraseTwo.classList.add("visible");
    }, 8200);

    window.setTimeout(() => {
        finalPhraseTwo.classList.remove("visible");
    }, 12200);

    window.setTimeout(() => {
        finalPhraseThree.classList.add("visible");
    }, 13100);

    window.setTimeout(() => {
        restartButton.classList.add("visible");
    }, 16500);
}

finalSurpriseButton.addEventListener(
    "click",
    startFinalSurprise
);

restartButton.addEventListener("click", () => {
    finalScene.classList.add("hidden");
    hideFinalMessages();
    heartStars.innerHTML = "";

    document.body.style.overflow = "";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
