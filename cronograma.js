
const grid = document.getElementById('schedule-grid');
const modal = document.getElementById('modal');
const subjectSelect = document.getElementById('subject');
const studyTimeInput = document.getElementById('study-time');
const closeModal = document.getElementById('close-modal');
const saveBtn = document.getElementById('save');
const clearCellBtn = document.getElementById('clear-cell');
const clearAllBtn = document.getElementById('clear-all');
let selectedCell = null;

// Disciplinas disponíveis
const subjects = ['matematica', 'portugues', 'historia', 'biologia', 'quimica'];
const hours = Array.from({ length: 15 }, (_, i) => `${7 + i}:00`);

// Cria grade semanal
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

        // Preencher dados existentes no modal
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

// Fecha modal
closeModal.onclick = () => {
  modal.style.display = 'none';
};

// Salvar dados do bloco
saveBtn.onclick = () => {
  const subject = subjectSelect.value;
  const time = studyTimeInput.value;

  if (selectedCell) {
    selectedCell.className = `cell ${subject}`;
    selectedCell.dataset.studyTime = time;
    selectedCell.innerHTML = `
      <strong>${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong>
      <br><small>${time} min</small>
    `;
  }

  modal.style.display = 'none';
};

// Limpar somente a célula selecionada
clearCellBtn.onclick = () => {
  if (selectedCell) {
    selectedCell.className = 'cell';
    selectedCell.textContent = '';
    selectedCell.dataset.studyTime = '';
  }
  modal.style.display = 'none';
};

// Limpar todas as células
clearAllBtn.onclick = () => {
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach(cell => {
    cell.className = 'cell';
    cell.textContent = '';
    cell.dataset.studyTime = '';
  });
  modal.style.display = 'none';
};

// Fecha modal ao clicar fora
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Gera a grade do cronograma
createScheduleGrid();
