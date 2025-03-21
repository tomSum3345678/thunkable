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

// Show feedback (correct or wrong)
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
    document.getElementById('next-button').style.display = 'block';
}

// Move to the next question or end the game
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion > totalQuestions) {
        // End of game - redirect to results page with score and total time
        window.location.href = `result.html?score=${score}&time=${totalTime.toFixed(1)}`;
    } else {
        generateQuestion();
        startTimer();
    }
}