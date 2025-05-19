const questions = [
  {
    question: "Se log₂(x) = 5, então o valor de x é:",
    answers: [
      { id: 1, text: "10", correct: false },
      { id: 2, text: "16", correct: false },
      { id: 3, text: "25", correct: false },
      { id: 4, text: "32", correct: true },
      { id: 5, text: "64", correct: false },
    ],
  },
  {
    question: "Em uma progressão geométrica de razão 2, o primeiro termo é 3. Qual é o quinto termo?",
    answers: [
      { id: 1, text: "48", correct: false },
      { id: 2, text: "96", correct: true },
      { id: 3, text: "24", correct: false },
      { id: 4, text: "72", correct: false },
      { id: 5, text: "144", correct: false },
    ],
  },
  // Adicione mais questões aqui
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

let totalTime = 2 * 60 * 60 + 30 * 60; // 2h30min em segundos
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none"; // esconde botão no início
  nextButton.innerText = "Próximo";
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    totalTime--;
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      showScore();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;
  timerElement.textContent = 
    `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  updateProgressBar();
}

function resetState() {
  nextButton.style.display = "none"; // esconde botão no reset
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Marca todas as respostas corretas
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // bloqueia os botões depois de responder
  });

  nextButton.style.display = "inline-block"; // mostra o botão Próximo
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.value = progress;
}

function showScore() {
  clearInterval(timerInterval);
  resetState();
  questionElement.textContent = `Você acertou ${score} de ${totalQuestions} questões!`;
  nextButton.innerText = "Jogar Novamente";
  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    totalTime = 2 * 60 * 60 + 30 * 60; // reseta timer
    startQuiz();
  }
});

startQuiz();
