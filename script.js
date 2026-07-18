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

/* INSTRUMENTAL ROMÂNTICO GERADO PELO NAVEGADOR */

let audioContext = null;
let masterGain = null;
let instrumentalInterval = null;
let instrumentalStarted = false;
let musicPaused = false;
let chordPosition = 0;

/*
    Progressão suave em Dó maior:
    C - Am - F - G
*/

const romanticChords = [
    [261.63, 329.63, 392.0],
    [220.0, 261.63, 329.63],
    [174.61, 220.0, 261.63],
    [196.0, 246.94, 293.66]
];

const melodyNotes = [
    523.25,
    493.88,
    440.0,
    392.0,
    440.0,
    392.0,
    349.23,
    392.0
];

function createSoftNote(frequency, startTime, duration, volume, type = "sine") {
    if (!audioContext || !masterGain) {
        return;
    }

    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(
        volume,
        startTime + 0.35
    );

    noteGain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + duration
    );

    oscillator.connect(noteGain);
    noteGain.connect(masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.1);
}

function playRomanticSequence() {
    if (
        !audioContext ||
        audioContext.state !== "running" ||
        musicPaused
    ) {
        return;
    }

    const now = audioContext.currentTime;
    const chord = romanticChords[chordPosition % romanticChords.length];

    chord.forEach((frequency, index) => {
        createSoftNote(
            frequency,
            now,
            4.2,
            index === 0 ? 0.045 : 0.025,
            index === 0 ? "triangle" : "sine"
        );

        createSoftNote(
            frequency / 2,
            now,
            4.4,
            0.012,
            "sine"
        );
    });

    const melodyIndex = chordPosition * 2;

    createSoftNote(
        melodyNotes[melodyIndex % melodyNotes.length],
        now + 0.5,
        1.7,
        0.026,
        "sine"
    );

    createSoftNote(
        melodyNotes[(melodyIndex + 1) % melodyNotes.length],
        now + 2.25,
        1.5,
        0.022,
        "sine"
    );

    chordPosition += 1;
}

function startInstrumental() {
    if (instrumentalStarted) {
        return;
    }

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        musicButton.style.display = "none";
        return;
    }

    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();

    masterGain.gain.value = 0.75;
    masterGain.connect(audioContext.destination);

    instrumentalStarted = true;
    musicPaused = false;

    playRomanticSequence();

    instrumentalInterval = window.setInterval(
        playRomanticSequence,
        4300
    );
}

musicButton.addEventListener("click", async () => {
    if (!instrumentalStarted) {
        startInstrumental();
        return;
    }

    if (musicPaused) {
        await audioContext.resume();
        musicPaused = false;
        musicButton.classList.remove("paused");
        musicButton.textContent = "♫";
        playRomanticSequence();
    } else {
        await audioContext.suspend();
        musicPaused = true;
        musicButton.classList.add("paused");
        musicButton.textContent = "♪";
    }
});

/* ESTRELAS EM FORMATO DE CORAÇÃO */

function createHeartStars() {
    heartStars.innerHTML = "";

    const numberOfStars = 95;

    for (let index = 0; index < numberOfStars; index += 1) {
        const angle =
            (Math.PI * 2 * index) / numberOfStars;

        /*
            Fórmula matemática de um coração.
        */

        const heartX =
            16 * Math.pow(Math.sin(angle), 3);

        const heartY =
            13 * Math.cos(angle) -
            5 * Math.cos(2 * angle) -
            2 * Math.cos(3 * angle) -
            Math.cos(4 * angle);

        const horizontalPosition =
            50 + heartX * 1.35;

        const verticalPosition =
            48 - heartY * 1.35;

        const star = document.createElement("span");

        star.className = "star";
        star.style.setProperty(
            "--x",
            `${horizontalPosition}%`
        );

        star.style.setProperty(
            "--y",
            `${verticalPosition}%`
        );

        star.style.setProperty(
            "--delay",
            `${index * 0.018}s`
        );

        heartStars.appendChild(star);
    }

    window.requestAnimationFrame(() => {
        document.querySelectorAll(".star").forEach((star) => {
            star.classList.add("formed");
        });
    });
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
