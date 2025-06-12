const grid = document.getElementById('schedule-grid');
const modal = document.getElementById('modal');
const subjectSelect = document.getElementById('subject');
const studyTimeInput = document.getElementById('study-time');
const closeModal = document.getElementById('close-modal');
const saveBtn = document.getElementById('save');
const clearCellBtn = document.getElementById('clear-cell');
const clearAllBtn = document.getElementById('clear-all');
const toggleThemeBtn = document.getElementById('toggle-theme');
const timeModal = document.getElementById('time-modal');
const editStudyTimeBtn = document.getElementById('edit-study-time');
const setHoursBtn = document.getElementById('set-hours');

let selectedCell = null;
let startHour = parseInt(localStorage.getItem('startHour')) || 7;
let endHour = parseInt(localStorage.getItem('endHour')) || 22;

const subjects = ['matematica', 'portugues', 'historia', 'biologia', 'quimica'];

// Cria a grade do cronograma conforme o horário definido
function createScheduleGrid() {
  grid.innerHTML = '';
  for (let hour = startHour; hour < endHour; hour++) {
    const row = document.createElement('div');
    row.className = 'grid-row';

    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    timeSlot.textContent = `${hour}:00`;
    row.appendChild(timeSlot);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.time = `${hour}:00`;
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
  }

  loadSchedule();
}

// Salva o cronograma no localStorage
function saveSchedule() {
  const data = [];
  document.querySelectorAll('.cell').forEach(cell => {
    data.push({
      day: cell.dataset.day,
      time: cell.dataset.time,
      subject: subjects.find(s => cell.classList.contains(s)) || '',
      studyTime: cell.dataset.studyTime || '',
      content: cell.innerHTML
    });
  });
  localStorage.setItem('schedule', JSON.stringify(data));
}

// Carrega o cronograma do localStorage
function loadSchedule() {
  const data = JSON.parse(localStorage.getItem('schedule')) || [];
  document.querySelectorAll('.cell').forEach((cell, index) => {
    const item = data[index];
    if (item && item.subject) {
      cell.className = `cell ${item.subject}`;
      cell.innerHTML = item.content;
      cell.dataset.studyTime = item.studyTime;
    }
  });
}

// Obtém célula pelo dia e hora
function getCell(day, hour) {
  return Array.from(document.querySelectorAll('.cell')).find(cell =>
    cell.dataset.day === String(day) && cell.dataset.time === `${hour}:00`
  );
}

// Evento ao salvar bloco
saveBtn.onclick = () => {
  const subject = subjectSelect.value;
  let time = parseInt(studyTimeInput.value);
  if (isNaN(time) || time <= 0) {
    alert('Por favor, informe um tempo de estudo válido (> 0).');
    return;
  }
  if (selectedCell) {
    const blocksNeeded = Math.ceil(time / 60); // blocos de 1h
    const day = selectedCell.dataset.day;
    let hour = parseInt(selectedCell.dataset.time.split(':')[0]);

    // Limpa blocos a preencher para evitar sobreposição visual
    for (let i = 0; i < blocksNeeded; i++) {
      let currentHour = hour + i;
      if (currentHour >= endHour) break;
      const cell = getCell(day, currentHour);
      if (cell) {
        cell.className = 'cell';
        cell.textContent = '';
        cell.dataset.studyTime = '';
      }
    }

    // Preenche os blocos necessários
    for (let i = 0; i < blocksNeeded; i++) {
      let currentHour = hour + i;
      if (currentHour >= endHour) break;
      const cell = getCell(day, currentHour);
      if (cell) {
        cell.className = `cell ${subject}`;
        // No último bloco, mostra tempo restante; nos outros 60 min
        const displayTime = (i === blocksNeeded - 1 && time % 60 !== 0) ? time % 60 : 60;
        cell.textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${displayTime} min`;
        cell.dataset.studyTime = time;
      }
    }
  }
  saveSchedule();
  modal.style.display = 'none';
};

// Limpar bloco selecionado
clearCellBtn.onclick = () => {
  if (selectedCell) {
    selectedCell.className = 'cell';
    selectedCell.textContent = '';
    selectedCell.dataset.studyTime = '';
    saveSchedule();
    modal.style.display = 'none';
  }
};

// Limpar todo o cronograma
clearAllBtn.onclick = () => {
  if (confirm('Tem certeza que deseja limpar todo o cronograma?')) {
    document.querySelectorAll('.cell').forEach(cell => {
      cell.className = 'cell';
      cell.textContent = '';
      cell.dataset.studyTime = '';
    });
    localStorage.removeItem('schedule');
  }
};

// Alternar tema claro/escuro
toggleThemeBtn.onclick = () => {
  document.body.classList.toggle('dark');
};

// Fechar modal ao clicar no X
closeModal.onclick = () => {
  modal.style.display = 'none';
};

// Fechar modal clicando fora da área
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
  if (e.target === timeModal) {
    timeModal.style.display = 'none';
  }
};

// Abrir modal para definir horário de estudos
editStudyTimeBtn.onclick = () => {
  timeModal.style.display = 'block';
  document.getElementById('start-hour').value = startHour;
  document.getElementById('end-hour').value = endHour;
};

// Aplicar horários definidos
setHoursBtn.onclick = () => {
  const start = parseInt(document.getElementById('start-hour').value);
  const end = parseInt(document.getElementById('end-hour').value);
  if (isNaN(start) || isNaN(end) || start < 0 || start > 23 || end <= start || end > 23) {
    alert('Informe um horário válido. O fim deve ser maior que o início.');
    return;
  }
  startHour = start;
  endHour = end;
  localStorage.setItem('startHour', startHour);
  localStorage.setItem('endHour', endHour);
  timeModal.style.display = 'none';
  createScheduleGrid();
};

createScheduleGrid();
