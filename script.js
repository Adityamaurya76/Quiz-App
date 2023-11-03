const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
const questions = [];

// Fetch questions from JSON file
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions.push(...data);
        showNextQuestion();
    });

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        for (const option of question.options) {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option, question.answer));
            optionsContainer.appendChild(button);
        }
    } else {
        showResult();
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    showNextQuestion();
}

function showResult() {
    questionContainer.style.display = "none";
    scoreElement.textContent = score;
}
