let currentLevel = 'Easy';
let score = 0;
let questionCount = 0;
const questionsPerLevel = 10;
let correctAnswer;

const levels = {
    'Easy': 10,
    'Medium': 20,
    'Hard': 30
};

function startQuiz(level) {
    currentLevel = level;
    score = 0;
    questionCount = 0;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    document.getElementById('level-label').innerText = `Level: ${currentLevel}`;
    document.getElementById('score-label').innerText = `Score: ${score}`;
    nextQuestion();
}

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * levels[currentLevel]) + 1;
    const num2 = Math.floor(Math.random() * levels[currentLevel]) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let question;
    if (operation === '+') {
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2}`;
    } else if (operation === '-') {
        correctAnswer = num1 - num2;
        question = `${num1} - ${num2}`;
    } else if (operation === '*') {
        correctAnswer = num1 * num2;
        question = `${num1} * ${num2}`;
    } else if (operation === '/') {
        correctAnswer = num1 / num2;
        question = `${num1 * num2} / ${num1}`;
    }

    const answers = [correctAnswer];
    while (answers.length < 4) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 7) - 3;
        if (wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    answers.sort(() => Math.random() - 0.5);

    return { question, answers };
}

function nextQuestion() {
    if (questionCount >= questionsPerLevel) {
        if (currentLevel === 'Easy') {
            currentLevel = 'Medium';
        } else if (currentLevel === 'Medium') {
            currentLevel = 'Hard';
        } else {
            alert(`Congratulations! You completed all levels with a score of ${score}.`);
            window.location.reload();
            return;
        }
        alert(`Level Up! You are now on ${currentLevel} level.`);
        startQuiz(currentLevel);
        return;
    }

    questionCount++;
    const { question, answers } = generateQuestion();
    document.getElementById('question-label').innerText = `What is ${question}?`;
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((button, index) => {
        button.innerText = answers[index];
        button.className = 'answer-btn';
        button.disabled = false;
    });
    document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(index) {
    const answerButtons = document.querySelectorAll('.answer-btn');
    if (parseInt(answerButtons[index].innerText) === correctAnswer) {
        answerButtons[index].classList.add('correct');
        score++;
    } else {
        answerButtons[index].classList.add('incorrect');
        answerButtons.forEach((button, idx) => {
            if (parseInt(button.innerText) === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    answerButtons.forEach(button => button.disabled = true);
    document.getElementById('score-label').innerText = `Score: ${score}`;
    document.getElementById('next-btn').style.display = 'block';
}
