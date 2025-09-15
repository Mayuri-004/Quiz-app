let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');

function loadQuestion() {
    if(currentQuestion >= questions.length){
        showResult();
        return;
    }

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.sort(() => Math.random() - 0.5).forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => selectOption(option);
        optionsEl.appendChild(li);
    });

    timeLeft = 15;
    timerEl.textContent = `Time: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if(timeLeft <= 0){
            clearInterval(timer);
            currentQuestion++;
            loadQuestion();
        }
    }, 1000);
}

function selectOption(selected){
    const correct = questions[currentQuestion].answer;
    if(selected === correct){
        score++;
    }
    clearInterval(timer);
    currentQuestion++;
    loadQuestion();
}

function showResult(){
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    timerEl.style.display = 'none';
    resultEl.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>
                          <button onclick="restartQuiz()">Restart Quiz</button>`;
}

function restartQuiz(){
    currentQuestion = 0;
    score = 0;
    questionEl.style.display = '';
    optionsEl.style.display = '';
    nextBtn.style.display = '';
    timerEl.style.display = '';
    resultEl.innerHTML = '';
    loadQuestion();
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

loadQuestion();
