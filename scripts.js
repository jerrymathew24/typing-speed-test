const sentenceElement = document.getElementById("sentance");
const textArea = document.querySelector("textarea");
const restartButton = document.querySelector("button");
const timeDisplay = document.querySelector(".results p:nth-child(1) span");
const speedDisplay = document.querySelector(".results p:nth-child(2) span");
const accuracyDisplay = document.querySelector(".results p:nth-child(3) span");

// Add a Finish button dynamically
const finishButton = document.createElement("button");
finishButton.textContent = "Finish";
finishButton.style.display = "none"; // Hidden initially
document.querySelector(".container").appendChild(finishButton);

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes a man perfect.",
    "JavaScript is a powerful programming language.",
    "Typing fast improves productivity."
];

let startTime, timer;
let sentence = "";

// Function to start the timer
function startTimer() {
    startTime = new Date();
    timer = setInterval(updateResults, 100);
}

// Function to update speed and accuracy
function updateResults() {
    const elapsedTime = (new Date() - startTime) / 1000; // in seconds
    const wordsTyped = textArea.value.trim().split(/\s+/).length;
    const speed = Math.round((wordsTyped / elapsedTime) * 60); // Words per minute

    // Calculate accuracy
    const typedText = textArea.value;
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sentence[i]) {
            correctChars++;
        }
    }
    const accuracy = Math.round((correctChars / sentence.length) * 100);

    timeDisplay.textContent = elapsedTime.toFixed(1);
    speedDisplay.textContent = isNaN(speed) ? 0 : speed;
    accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;

    // Check if user has finished typing the given sentence
    if (typedText.trim() === sentence) {
        finishTest();
    }
}

// Function to finish the test
function finishTest() {
    clearInterval(timer);
    textArea.disabled = true;
    finishButton.style.display = "none";
}

// Function to restart the test
function restartTest() {
    clearInterval(timer);
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = sentence;
    textArea.value = "";
    textArea.disabled = false;
    timeDisplay.textContent = "0";
    speedDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    startTime = null;
    finishButton.style.display = "inline-block"; // Show finish button again
}

// Event Listeners
textArea.addEventListener("input", () => {
    if (!startTime) {
        startTimer();
    }
});
restartButton.addEventListener("click", restartTest);
finishButton.addEventListener("click", finishTest);

// Initialize with a random sentence
restartTest();
