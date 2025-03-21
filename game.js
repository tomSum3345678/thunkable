let currentQuestion = 1;
let totalQuestions = 10;
let timeLeft = 10.0;
let timerInterval;
let correctAnswer;
let score = 0;
let totalTime = 0.0; // Track total time taken
let timeUsedForQuestion = 0.0; // Track time used for the current question

// Start the game when the page loads
window.onload = function() {
    generateQuestion();
    startTimer();
};

// Generate a new math question based on the criteria
function generateQuestion() {
    const operators = ['+', '-', '*', '/'];
    let operand1, operand2, operator, answer;

    do {
        operand1 = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        operand2 = Math.floor(Math.random() * 100) + 1;
        operator = operators[Math.floor(Math.random() * operators.length)];

        if (operator === '+') {
            answer = operand1 + operand2;
        } else if (operator === '-') {
            answer = operand1 - operand2;
        } else if (operator === '*') {
            answer = operand1 * operand2;
        } else if (operator === '/') {
            // Ensure division results in an integer
            answer = operand1 / operand2;
            operand1 = Math.floor(answer) * operand2; // Adjust operand1 to make answer an integer
            answer = operand1 / operand2;
        }
    } while (
        answer < 0 || // Ensure subtraction result is non-negative
        (operator === '/' && !Number.isInteger(answer)) || // Ensure division result is an integer
        operand1 < 1 || operand1 > 100 || operand2 < 1 || operand2 > 100 // Ensure operands are in range
    );

    correctAnswer = answer;
    document.getElementById('question-text').textContent = `${operand1} ${operator} ${operand2} = ?`;
    document.getElementById('question-number').textContent = `Question ${currentQuestion}`;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('done-button').style.display = 'block';
    document.getElementById('end-game-options').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
}

// Start the countdown timer
function startTimer() {
    timeLeft = 10.0;
    timeUsedForQuestion = 0.0;
    document.getElementById('timer').textContent = `${timeLeft.toFixed(1)} sec`;
    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        timeUsedForQuestion += 0.1;
        document.getElementById('timer').textContent = `${timeLeft.toFixed(1)} sec`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            totalTime += 10.0; // If time runs out, count the full 10 seconds
            showFeedback(false); // Time's up, treat as incorrect
        }
    }, 100);
}

// Check the player's answer
function checkAnswer() {
    clearInterval(timerInterval);
    totalTime += timeUsedForQuestion; // Add the time used for this question to the total
    const userAnswer = parseInt(document.getElementById('answer-input').value);
    const isCorrect = userAnswer === correctAnswer;
    showFeedback(isCorrect);
    if (isCorrect) score++;
}

// Show feedback (correct or wrong) and show end-game options if it's the last question
function showFeedback(isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.style.display = 'block';
    if (isCorrect) {
        feedbackDiv.textContent = 'CORRECT!';
        feedbackDiv.className = 'correct';
    } else {
        feedbackDiv.textContent = `WRONG! Answer is ${correctAnswer}!`;
        feedbackDiv.className = 'wrong';
    }
    document.getElementById('done-button').style.display = 'none';

    // If this is the last question, show the end-game options
    if (currentQuestion === totalQuestions) {
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('end-game-options').style.display = 'block';
    } else {
        document.getElementById('next-button').style.display = 'block';
    }
}

// Handle the next action (go to the next question)
function handleNextAction() {
    const nextButton = document.getElementById('next-button');
    const label = nextButton.getAttribute('data-label');

    if (label === 'NEXT QUESTION') {
        nextQuestion();
    }
}

// Move to the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion > totalQuestions) {
        // This case won't be reached because we handle the last question in showFeedback
        return;
    } else {
        generateQuestion();
        startTimer();
    }
}

// Function to reset the game and start a new session
function playAgain() {
    // Reset game state
    currentQuestion = 1;
    score = 0;
    totalTime = 0.0;
    timeUsedForQuestion = 0.0;

    // Hide end-game options
    document.getElementById('end-game-options').style.display = 'none';

    // Show game elements again
    document.getElementById('timer').style.display = 'block';
    document.getElementById('question-number').style.display = 'block';
    document.getElementById('question-text').style.display = 'block';
    document.getElementById('answer-input').style.display = 'block';
    document.getElementById('done-button').style.display = 'block';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';

    // Start a new game
    generateQuestion();
    startTimer();
}

// Function to show the final result
function showResult() {
    // Hide game elements and end-game options
    document.getElementById('timer').style.display = 'none';
    document.getElementById('question-number').style.display = 'none';
    document.getElementById('question-text').style.display = 'none';
    document.getElementById('answer-input').style.display = 'none';
    document.getElementById('done-button').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('end-game-options').style.display = 'none';

    // Show the result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    document.getElementById('score-display').textContent = `Score: ${score}/10`;
    document.getElementById('time-display').textContent = `Total Time: ${totalTime.toFixed(1)} sec`;
}

// Function to return to the main menu
function backToMain() {
    window.location.href = "index.html";
}