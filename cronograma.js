// Assumindo que Firebase já foi inicializado na página de login e você já tem firebase.auth() ativo

const grid = document.getElementById('schedule-grid');
const modal = document.getElementById('modal');
const subjectSelect = document.getElementById('subject');
const studyTimeInput = document.getElementById('study-time');
const closeModal = document.getElementById('close-modal');
const saveBtn = document.getElementById('save');
const clearCellBtn = document.getElementById('clear-cell');
const clearAllBtn = document.getElementById('clear-all');

const subjects = ['matematica', 'portugues', 'historia', 'biologia', 'quimica'];
const hours = Array.from({ length: 15 }, (_, i) => `${7 + i}:00`); // 7h até 21h

let selectedCell = null;

// Cria a grade de estudos
function createScheduleGrid() {
  grid.innerHTML = '';

  hours.forEach(hour => {
    const row = document.createElement('div');
    row.className = 'grid-row';

    // Coluna de horário
    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    timeSlot.textContent = hour;
    row.appendChild(timeSlot);

    // 7 dias da semana (0=seg, 6=dom)
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.time = hour;
      cell.dataset.day = day;

      cell.addEventListener('click', () => {
        selectedCell = cell;

        // Pega dados existentes
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

// Salvar grade no Firestore
function saveScheduleToFirebase() {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('Usuário não autenticado!');
    return;
  }

  const allCells = document.querySelectorAll('.cell');
  const scheduleData = [];

  allCells.forEach(cell => {
    if (cell.className !== 'cell') {
      scheduleData.push({
        day: cell.dataset.day,
        time: cell.dataset.time,
        subject: subjects.find(s => cell.classList.contains(s)) || '',
        studyTime: cell.dataset.studyTime || ''
      });
    }
  });

  firebase.firestore().collection('schedules').doc(user.uid).set({
    schedule: scheduleData
  }).then(() => {
    console.log('Grade salva no Firestore');
  }).catch(err => {
    console.error('Erro ao salvar:', err);
  });
}

// Carregar dados do Firestore
function loadScheduleFromFirebase() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  firebase.firestore().collection('schedules').doc(user.uid).get()
    .then(doc => {
      if (!doc.exists) return;

      const scheduleData = doc.data().schedule || [];

      scheduleData.forEach(item => {
        const cell = document.querySelector(`.cell[data-day="${item.day}"][data-time="${item.time}"]`);
        if (cell) {
          cell.className = `cell ${item.subject}`;
          cell.dataset.studyTime = item.studyTime;
          cell.innerHTML = `
            <strong>${item.subject.charAt(0).toUpperCase() + item.subject.slice(1)}</strong><br>
            <small>${item.studyTime} min</small>
          `;
        }
      });
    })
    .catch(err => {
      console.error('Erro ao carregar:', err);
    });
}

// Eventos modal
closeModal.onclick = () => {
  modal.style.display = 'none';
};

saveBtn.onclick = () => {
  const subject = subjectSelect.value;
  const time = studyTimeInput.value;

  if (!subject || !time) {
    alert('Por favor, selecione uma disciplina e informe o tempo de estudo.');
    return;
  }

  if (selectedCell) {
    selectedCell.className = `cell ${subject}`;
    selectedCell.dataset.studyTime = time;
    selectedCell.innerHTML = `
      <strong>${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong><br>
      <small>${time} min</small>
    `;
  }

  modal.style.display = 'none';
  saveScheduleToFirebase();
};

clearCellBtn.onclick = () => {
  if (selectedCell) {
    selectedCell.className = 'cell';
    selectedCell.textContent = '';
    selectedCell.dataset.studyTime = '';
  }
  modal.style.display = 'none';
  saveScheduleToFirebase();
};

clearAllBtn.onclick = () => {
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach(cell => {
    cell.className = 'cell';
    cell.textContent = '';
    cell.dataset.studyTime = '';
  });
  modal.style.display = 'none';

  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection('schedules').doc(user.uid).delete()
      .then(() => {
        console.log('Grade apagada no Firestore');
      }).catch(err => {
        console.error('Erro ao apagar grade:', err);
      });
  }
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Inicia
createScheduleGrid();

// Espera o usuário estar autenticado para carregar dados
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    loadScheduleFromFirebase();
  } else {
    console.log('Usuário não autenticado');
  }
});
