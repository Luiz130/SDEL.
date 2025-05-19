
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
    question: "A distância entre os pontos A(2, -3) e B(6, 1) no plano cartesiano é:",
    answers: [
      { id: 1, text: "4", correct: false },
      { id: 2, text: "5", correct: false },
      { id: 3, text: "6", correct: true },
      { id: 4, text: "√32", correct: false },
      { id: 5, text: "8", correct: false },
    ],
  },
  {
    question: "Em uma PA de 10 termos, o primeiro é 3 e o último é 30. Qual é a soma dos termos dessa PA?",
    answers: [
      { id: 1, text: "150", correct: false },
      { id: 2, text: "155", correct: false },
      { id: 3, text: "160", correct: true },
      { id: 4, text: "165", correct: false },
      { id: 5, text: "170", correct: false },
    ],
  },
  {
    question: "Um sólido geométrico tem base quadrada de 4 cm de lado e altura de 9 cm. Qual é o volume desse sólido, sabendo que se trata de uma pirâmide?",
    answers: [
      { id: 1, text: "36 cm³", correct: false },
      { id: 2, text: "48 cm³", correct: false },
      { id: 3, text: "60 cm³", correct: false },
      { id: 4, text: "72 cm³", correct: true },
      { id: 5, text: "80 cm³", correct: false },
    ],
  },
  {
    question: "Em uma urna há 5 bolas vermelhas, 3 verdes e 2 azuis. Qual é a probabilidade de se retirar uma bola verde ao acaso?",
    answers: [
      { id: 1, text: "1/2", correct: false },
      { id: 2, text: "1/3", correct: false },
      { id: 3, text: "3/10", correct: true },
      { id: 4, text: "2/5", correct: false },
      { id: 5, text: "3/5", correct: false },
    ],
     
  },
   {
    question: "Um capital de R$ 10.000,00 foi aplicado à taxa de juros compostos de 2% ao mês durante 12 meses. Qual será o montante ao final do período?",
    answers: [
      { id: 1, text: "R$ 12.000,00", correct: false },
      { id: 2, text: "R$ 12.682,50", correct: true },
      { id: 3, text: "R$ 11.440,00", correct: false },
      { id: 4, text: "R$ 12.000,80", correct: false },
      { id: 5, text: "R$ 12.260,40", correct: false },
    ],
  },
  {
    question: "A função f(x) = x³ - 6x² + 9x representa o lucro de uma empresa. Qual é o valor de x que proporciona o lucro máximo?",
    answers: [
      { id: 1, text: "1", correct: false },
      { id: 2, text: "2", correct: false },
      { id: 3, text: "3", correct: true },
      { id: 4, text: "4", correct: false },
      { id: 5, text: "5", correct: false },
    ],
  },
  {
    question: "Se f(x) = logₐ(x) e f(81) = 4, então o valor de a é:",
    answers: [
      { id: 1, text: "2", correct: false },
      { id: 2, text: "3", correct: false },
      { id: 3, text: "9", correct: false },
      { id: 4, text: "81", correct: false },
      { id: 5, text: "3√3", correct: true },
    ],
  },
  {
    question: "Uma escada de 10 m de comprimento está apoiada em uma parede, formando um ângulo de 60° com o chão. Qual a altura que a escada alcança na parede?",
    answers: [
      { id: 1, text: "5 m", correct: false },
      { id: 2, text: "6 m", correct: false },
      { id: 3, text: "8.66 m", correct: true },
      { id: 4, text: "7.50 m", correct: false },
      { id: 5, text: "9.00 m", correct: false },
    ],
  },
  {
    question: "A matriz A = [[1, 2], [3, 4]] tem determinante igual a:",
    answers: [
      { id: 1, text: "2", correct: false },
      { id: 2, text: "-2", correct: true },
      { id: 3, text: "0", correct: false },
      { id: 4, text: "4", correct: false },
      { id: 5, text: "-4", correct: false },
    ],
  },
  {
    question: "Uma caixa d'água cúbica tem capacidade de 8 m³. Qual é a medida da aresta dessa caixa?",
    answers: [
      { id: 1, text: "2 m", correct: false },
      { id: 2, text: "2.5 m", correct: false },
      { id: 3, text: "3 m", correct: false },
      { id: 4, text: "√8 m", correct: false },
      { id: 5, text: "2 m (∛8)", correct: true },
    ],
  },
  {
    question: "Qual é a área da região delimitada pelas curvas y = x² e y = 4?",
    answers: [
      { id: 1, text: "8", correct: false },
      { id: 2, text: "10.66", correct: false },
      { id: 3, text: "16/3", correct: true },
      { id: 4, text: "12", correct: false },
      { id: 5, text: "20", correct: false },
    ],
  },
  {
    question: "Quantas diagonais tem um polígono de 12 lados?",
    answers: [
      { id: 1, text: "54", correct: true },
      { id: 2, text: "60", correct: false },
      { id: 3, text: "66", correct: false },
      { id: 4, text: "72", correct: false },
      { id: 5, text: "78", correct: false },
    ],
  },
  {
    question: "A solução da equação 2^x = 5 é:",
    answers: [
      { id: 1, text: "log(5)/log(2)", correct: true },
      { id: 2, text: "log(2)/log(5)", correct: false },
      { id: 3, text: "5/2", correct: false },
      { id: 4, text: "2log5", correct: false },
      { id: 5, text: "ln(5)", correct: false },
    ],
  },
  {
    question: "Uma amostra de material radioativo perde metade de sua massa a cada 10 horas. Se a massa inicial era 80 g, quanto restará após 30 horas?",
    answers: [
      { id: 1, text: "10 g", correct: true },
      { id: 2, text: "20 g", correct: false },
      { id: 3, text: "15 g", correct: false },
      { id: 4, text: "5 g", correct: false },
      { id: 5, text: "8 g", correct: false },
    ],
  },
   {
    question: "Considere a função f(x) = sen(x) + cos(x). Qual é o valor máximo que f(x) pode assumir?",
    answers: [
      { id: 1, text: "1", correct: false },
      { id: 2, text: "√2", correct: true },
      { id: 3, text: "2", correct: false },
      { id: 4, text: "0", correct: false },
      { id: 5, text: "1.5", correct: false },
    ],
  },
  {
    question: "Uma função exponencial é dada por f(x) = a·b^x. Se f(1) = 6 e f(2) = 18, então o valor de f(0) é:",
    answers: [
      { id: 1, text: "2", correct: true },
      { id: 2, text: "3", correct: false },
      { id: 3, text: "6", correct: false },
      { id: 4, text: "1", correct: false },
      { id: 5, text: "4", correct: false },
    ],
  },
  {
    question: "O valor de x que satisfaz a equação ln(x² - 1) = 0 é:",
    answers: [
      { id: 1, text: "0", correct: false },
      { id: 2, text: "±1", correct: false },
      { id: 3, text: "±e", correct: false },
      { id: 4, text: "±√2", correct: true },
      { id: 5, text: "1", correct: false },
    ],
  },
  {
    question: "Em uma progressão geométrica de razão 3, o quinto termo é 243. Qual é o primeiro termo?",
    answers: [
      { id: 1, text: "1", correct: true },
      { id: 2, text: "3", correct: false },
      { id: 3, text: "9", correct: false },
      { id: 4, text: "27", correct: false },
      { id: 5, text: "81", correct: false },
    ],
  },
  {
    question: "Qual é o número de anagramas da palavra 'MATEMÁTICA'?",
    answers: [
      { id: 1, text: "302400", correct: false },
      { id: 2, text: "907200", correct: false },
      { id: 3, text: "453600", correct: true },
      { id: 4, text: "604800", correct: false },
      { id: 5, text: "3628800", correct: false },
    ],
  },
  {
    question: "A integral definida ∫₀^1 (3x² + 2x + 1) dx é igual a:",
    answers: [
      { id: 1, text: "2", correct: false },
      { id: 2, text: "2.5", correct: false },
      { id: 3, text: "3", correct: true },
      { id: 4, text: "3.5", correct: false },
      { id: 5, text: "4", correct: false },
    ],
  },
  {
    question: "Uma pirâmide de base quadrada tem 6 m de altura e base com lados de 4 m. Qual é seu volume?",
    answers: [
      { id: 1, text: "48 m³", correct: true },
      { id: 2, text: "32 m³", correct: false },
      { id: 3, text: "64 m³", correct: false },
      { id: 4, text: "96 m³", correct: false },
      { id: 5, text: "24 m³", correct: false },
    ],
  },
  {
    question: "Qual a solução da equação: |2x - 3| = 5?",
    answers: [
      { id: 1, text: "x = 4 ou x = -1", correct: true },
      { id: 2, text: "x = 1 ou x = -4", correct: false },
      { id: 3, text: "x = 3 ou x = -2", correct: false },
      { id: 4, text: "x = 5 ou x = -2", correct: false },
      { id: 5, text: "x = 2 ou x = -5", correct: false },
    ],
  },
  {
    question: "Dado que sen²(x) + cos²(x) = 1, qual o valor de sen(x) se cos(x) = 3/5 e x pertence ao segundo quadrante?",
    answers: [
      { id: 1, text: "4/5", correct: false },
      { id: 2, text: "-4/5", correct: true },
      { id: 3, text: "3/5", correct: false },
      { id: 4, text: "-3/5", correct: false },
      { id: 5, text: "5/4", correct: false },
    ],
  },
  {
    question: "Um triângulo tem lados 5 cm, 12 cm e 13 cm. Qual é sua área?",
    answers: [
      { id: 1, text: "30 cm²", correct: true },
      { id: 2, text: "60 cm²", correct: false },
      { id: 3, text: "39 cm²", correct: false },
      { id: 4, text: "78 cm²", correct: false },
      { id: 5, text: "45 cm²", correct: false },
    ],
  },

   {
    question: "Qual é a soma das raízes da equação quadrática 3x² - 12x + 7 = 0?",
    answers: [
      { id: 1, text: "4", correct: false },
      { id: 2, text: "6", correct: false },
      { id: 3, text: "-4", correct: false },
      { id: 4, text: "2", correct: true },
      { id: 5, text: "0", correct: false },
    ],
  },
  {
    question: "Em uma progressão aritmética de razão 5, o primeiro termo é 7. Qual é o décimo termo?",
    answers: [
      { id: 1, text: "47", correct: false },
      { id: 2, text: "52", correct: true },
      { id: 3, text: "42", correct: false },
      { id: 4, text: "40", correct: false },
      { id: 5, text: "60", correct: false },
    ],
  },
  {
    question: "O valor de log₅(125) é:",
    answers: [
      { id: 1, text: "3", correct: true },
      { id: 2, text: "2", correct: false },
      { id: 3, text: "5", correct: false },
      { id: 4, text: "1", correct: false },
      { id: 5, text: "4", correct: false },
    ],
  },
  {
    question: "Uma função é dada por f(x) = 2x³ - 3x² + 4x - 1. Qual é o valor de f'(1)?",
    answers: [
      { id: 1, text: "3", correct: true },
      { id: 2, text: "4", correct: false },
      { id: 3, text: "2", correct: false },
      { id: 4, text: "5", correct: false },
      { id: 5, text: "6", correct: false },
    ],
  },
  {
    question: "Em um triângulo retângulo, os catetos medem 9 cm e 12 cm. Qual é a hipotenusa?",
    answers: [
      { id: 1, text: "15 cm", correct: true },
      { id: 2, text: "18 cm", correct: false },
      { id: 3, text: "14 cm", correct: false },
      { id: 4, text: "13 cm", correct: false },
      { id: 5, text: "17 cm", correct: false },
    ],
  },
  {
    question: "Qual é o valor de 2² + 3² + 4² + 5²?",
    answers: [
      { id: 1, text: "50", correct: false },
      { id: 2, text: "55", correct: false },
      { id: 3, text: "54", correct: false },
      { id: 4, text: "30", correct: false },
      { id: 5, text: "30", correct: true },
    ],
  },
  {
    question: "Se x e y são números reais e x² + y² = 25, qual é o valor máximo de x + y?",
    answers: [
      { id: 1, text: "5", correct: true },
      { id: 2, text: "6", correct: false },
      { id: 3, text: "4", correct: false },
      { id: 4, text: "7", correct: false },
      { id: 5, text: "8", correct: false },
    ],
  },
  {
    question: "A equação (x - 2)(x + 3) = 0 tem as raízes:",
    answers: [
      { id: 1, text: "x = -3 e x = 2", correct: true },
      { id: 2, text: "x = 3 e x = -2", correct: false },
      { id: 3, text: "x = 0 e x = 1", correct: false },
      { id: 4, text: "x = 2 e x = -3", correct: false },
      { id: 5, text: "x = -2 e x = 3", correct: false },
    ],
  },
  {
    question: "Qual é o valor de x na equação log₂(x) = 5?",
    answers: [
      { id: 1, text: "25", correct: false },
      { id: 2, text: "32", correct: true },
      { id: 3, text: "10", correct: false },
      { id: 4, text: "50", correct: false },
      { id: 5, text: "16", correct: false },
    ],
  },
  {
    question: "Qual é o valor da soma dos ângulos internos de um hexágono?",
    answers: [
      { id: 1, text: "720°", correct: true },
      { id: 2, text: "1080°", correct: false },
      { id: 3, text: "540°", correct: false },
      { id: 4, text: "360°", correct: false },
      { id: 5, text: "480°", correct: false },
    ],
  },
    {
    question: "O valor de x na equação log₁₀(x) = 2 é:",
    answers: [
      { id: 1, text: "10", correct: false },
      { id: 2, text: "100", correct: true },
      { id: 3, text: "1000", correct: false },
      { id: 4, text: "1", correct: false },
      { id: 5, text: "0", correct: false },
    ],
  },
  {
    question: "Se a área de um círculo é 25π, qual é o seu raio?",
    answers: [
      { id: 1, text: "5", correct: true },
      { id: 2, text: "10", correct: false },
      { id: 3, text: "2", correct: false },
      { id: 4, text: "25", correct: false },
      { id: 5, text: "4", correct: false },
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
const totalQuestions = questions.length;

// Timer: 2h30min (em segundos)
let totalTime = 2 * 60 * 60 + 30 * 60;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval); // Garante que não existam múltiplos timers
  updateTimerDisplay(); // Mostra o tempo inicial imediatamente
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

function showScore() {
  clearInterval(timerInterval); // Para o cronômetro
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${totalQuestions}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";
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
    startQuiz();
  }
});

startQuiz();
