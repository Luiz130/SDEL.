// Importar Firebase (adicione essas tags script no seu HTML antes do cronograma.js, se for local)
// <script type="module" src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"></script>

// Se preferir usar CDN direto no script, você pode transformar seu cronograma.js em módulo e usar import, ou usar CDN simples (não recomendado para modular)

// -- INICIO DO SCRIPT --

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCj8i37JYNigvbhXfqP4HVzjAEOzcXf_i0",
  authDomain: "sdel-b3f65.firebaseapp.com",
  projectId: "sdel-b3f65",
  storageBucket: "sdel-b3f65.appspot.com",
  messagingSenderId: "297725999985",
  appId: "1:297725999985:web:d41da68311c190ef8a54d0",
  measurementId: "G-PT92VECJ2H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;

signInAnonymously(auth).catch(console.error);

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user.uid;
    carregarCronograma();
  } else {
    currentUser = null;
  }
});

const grid = document.getElementById('schedule-grid');
const modal = document.getElementById('modal');
const subjectSelect = document.getElementById('subject');
const studyTimeInput = document.getElementById('study-time');
const closeModal = document.getElementById('close-modal');
const saveBtn = document.getElementById('save');
const clearCellBtn = document.getElementById('clear-cell');
const clearAllBtn = document.getElementById('clear-all');
let selectedCell = null;

const subjects = ['matematica', 'portugues', 'historia', 'biologia', 'quimica'];
const hours = Array.from({ length: 15 }, (_, i) => `${7 + i}:00`);

function createScheduleGrid() {
  hours.forEach(hour => {
    const row = document.createElement('div');
    row.className = 'grid-row';

    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    timeSlot.textContent = hour;
    row.appendChild(timeSlot);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.time = hour;
      cell.dataset.day = i;

      cell.addEventListener('click', () => {
        selectedCell = cell;
        const existingSubject = subjects.find(s => cell.classList.contains(s)) || '';
        const existingTime = cell.dataset.studyTime || '';

        subjectSelect.value = existingSubject;
        studyTimeInput.value = existingTime;
        modal.style.display = 'block';
      });

      row.appendChild(cell);
    }

    grid.appendChild(row);
  });
}

// Salvar no Firestore
async function salvarCronograma() {
  if (!currentUser) return;

  const dados = {};

  document.querySelectorAll('.cell').forEach(cell => {
    const key = `${cell.dataset.day}_${cell.dataset.time}`;
    if (cell.dataset.studyTime && cell.dataset.studyTime !== '') {
      const subject = subjects.find(s => cell.classList.contains(s)) || '';
      dados[key] = {
        subject: subject,
        time: cell.dataset.studyTime
      };
    }
  });

  try {
    await setDoc(doc(db, "cronogramas", currentUser), dados);
    console.log('Cronograma salvo com sucesso');
  } catch (err) {
    console.error("Erro ao salvar cronograma:", err);
  }
}

// Carregar do Firestore
async function carregarCronograma() {
  if (!currentUser) return;

  try {
    const docSnap = await getDoc(doc(db, "cronogramas", currentUser));
    if (docSnap.exists()) {
      const dados = docSnap.data();

      // Limpa grade antes de carregar
      document.querySelectorAll('.cell').forEach(cell => {
        cell.className = 'cell';
        cell.textContent = '';
        cell.dataset.studyTime = '';
      });

      for (const key in dados) {
        const [day, time] = key.split('_');
        const { subject, time: studyTime } = dados[key];
        const cell = document.querySelector(`.cell[data-day="${day}"][data-time="${time}"]`);
        if (cell) {
          cell.className = `cell ${subject}`;
          cell.dataset.studyTime = studyTime;
          cell.innerHTML = `
            <strong>${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong>
            <br><small>${studyTime} min</small>
          `;
        }
      }
      console.log('Cronograma carregado');
    }
  } catch (err) {
    console.error("Erro ao carregar cronograma:", err);
  }
}

// Eventos do modal
closeModal.onclick = () => {
  modal.style.display = 'none';
};

saveBtn.onclick = async () => {
  if (!selectedCell) return;

  const subject = subjectSelect.value;
  const time = studyTimeInput.value;

  selectedCell.className = `cell ${subject}`;
  selectedCell.dataset.studyTime = time;
  selectedCell.innerHTML = `
    <strong>${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong>
    <br><small>${time} min</small>
  `;

  await salvarCronograma();
  modal.style.display = 'none';
};

clearCellBtn.onclick = async () => {
  if (selectedCell) {
    selectedCell.className = 'cell';
    selectedCell.textContent = '';
    selectedCell.dataset.studyTime = '';
  }
  await salvarCronograma();
  modal.style.display = 'none';
};

clearAllBtn.onclick = async () => {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.className = 'cell';
    cell.textContent = '';
    cell.dataset.studyTime = '';
  });
  await salvarCronograma();
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

createScheduleGrid();
