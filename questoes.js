import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj8i37JYNigvbhXfqP4HVzjAEOzcXf_i0",
  authDomain: "sdel-b3f65.firebaseapp.com",
  projectId: "sdel-b3f65",
  storageBucket: "sdel-b3f65.firebasestorage.app",
  messagingSenderId: "297725999985",
  appId: "1:297725999985:web:d41da68311c190ef8a54d0",
  measurementId: "G-PT92VECJ2H"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const questions = [
  // suas perguntas aqui
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
let userAnswers = [];
let totalTime = 2 * 60 * 60 + 30 * 60; // 2h30m em segundos
let timerInterval;

function startTimer() {
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
    `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  nextButton.innerText = "Próximo";
  nextButton.style.display = "none";
  totalTime = 2 * 60 * 60 + 30 * 60;
  startTimer();
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
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

  userAnswers.push({
    questionId: currentQuestionIndex,
    answerId: parseInt(selectedBtn.dataset.id),
    correct: isCorrect,
  });

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function updateProgressBar() {
  progressBar.value = ((currentQuestionIndex + 1) / totalQuestions) * 100;
}

async function showScore() {
  clearInterval(timerInterval);
  resetState();
  questionElement.innerText = `Você acertou ${score} de ${totalQuestions} perguntas!`;
  nextButton.innerText = "Refazer Quiz";
  nextButton.style.display = "block";

  try {
    await addDoc(collection(db, "quizResults"), {
      timestamp: serverTimestamp(),
      score: score,
      totalQuestions: totalQuestions,
      answers: userAnswers,
    });
    console.log("Resultados salvos com sucesso no Firestore!");
  } catch (error) {
    console.error("Erro ao salvar resultados:", error);
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    startQuiz();
  }
});

startQuiz();
