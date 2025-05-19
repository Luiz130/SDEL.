// Importações Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCj8i37JYNigvbhXfqP4HVzjAEOzcXf_i0",
  authDomain: "sdel-b3f65.firebaseapp.com",
  projectId: "sdel-b3f65",
  storageBucket: "sdel-b3f65.firebasestorage.app",
  messagingSenderId: "297725999985",
  appId: "1:297725999985:web:d41da68311c190ef8a54d0",
  measurementId: "G-PT92VECJ2H"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Quiz
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
  {
    question: "Qual é o valor da soma das raízes da equação quadrática x² - 7x + 10 = 0?",
    answers: [
      { id: 1, text: "7", correct: true },
      { id: 2, text: "10", correct: false },
      { id: 3, text: "5", correct: false },
      { id: 4, text: "2", correct: false },
      { id: 5, text: "12", correct: false },
    ],
  },
  {
    question: "Qual é o valor de x na equação 2x + 5 = 3x - 8?",
    answers: [
      { id: 1, text: "-13", correct: false },
      { id: 2, text: "13", correct: false },
      { id: 3, text: "-13/3", correct: true },
      { id: 4, text: "13/3", correct: false },
      { id: 5, text: "-8", correct: false },
    ],
  },
  {
    question: "A equação 2x² + 3x - 5 = 0 tem as raízes reais?",
    answers: [
      { id: 1, text: "Sim", correct: true },
      { id: 2, text: "Não", correct: false },
      { id: 3, text: "Somente uma raiz", correct: false },
      { id: 4, text: "As raízes são complexas", correct: false },
      { id: 5, text: "Duas raízes iguais", correct: false },
    ],
  },
  {
    question: "Se a função f(x) = x² + 4x + 3 tem um ponto de mínimo, qual é o valor de f(-2)?",
    answers: [
      { id: 1, text: "0", correct: false },
      { id: 2, text: "-1", correct: false },
      { id: 3, text: "1", correct: false },
      { id: 4, text: "-2", correct: true },
      { id: 5, text: "2", correct: false },
    ],
  },
  {
    question: "Se uma circunferência tem raio 4, qual é o comprimento da circunferência?",
    answers: [
      { id: 1, text: "16π", correct: true },
      { id: 2, text: "8π", correct: false },
      { id: 3, text: "4π", correct: false },
      { id: 4, text: "2π", correct: false },
      { id: 5, text: "10π", correct: false },
    ],
  },
  {
    question: "Em um triângulo equilátero de lado 6, qual é a área?",
    answers: [
      { id: 1, text: "9√3", correct: true },
      { id: 2, text: "12√3", correct: false },
      { id: 3, text: "36", correct: false },
      { id: 4, text: "18√3", correct: false },
      { id: 5, text: "18", correct: false },
    ],
  },
  {
    question: "A solução da equação logₓ(81) = 4 é:",
    answers: [
      { id: 1, text: "9", correct: true },
      { id: 2, text: "3", correct: false },
      { id: 3, text: "81", correct: false },
      { id: 4, text: "4", correct: false },
      { id: 5, text: "16", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let wrongQuestions = [];
const totalQuestions = questions.length;

// Timer: 2h30min em segundos
let totalTime = 2 * 60 * 60 + 30 * 60;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  wrongQuestions = [];
  nextButton.innerHTML = "Próxima";
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
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.dataset.id = answer.id;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  updateProgressBar();
}

function resetState() {
  nextButton.style.display = "none";
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
    wrongQuestions.push({
      question: questions[currentQuestionIndex].question,
      selectedAnswer: selectedBtn.innerHTML,
      correctAnswer: questions[currentQuestionIndex].answers.find(a => a.correct).text,
    });
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.value = progress;
}

async function saveResult() {
  try {
    await addDoc(collection(db, "quizResults"), {
      score: score,
      totalQuestions: totalQuestions,
      wrongQuestions: wrongQuestions,
      timestamp: new Date(),
    });
    console.log("Resultado salvo com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar resultado: ", e);
  }
}

async function showScore() {
  clearInterval(timerInterval);
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${totalQuestions}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";

  await saveResult();
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }

  updateProgressBar();
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    // Reinicia quiz
    totalTime = 2 * 60 * 60 + 30 * 60; // Reseta o timer também
    startQuiz();
  }
});

startQuiz();
