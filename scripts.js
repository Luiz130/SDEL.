// Importações Firebase SDK v10 (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Nova configuração Firebase (projeto sdel-b3f65)
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
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;

// Referências DOM
const flashcards = document.querySelector(".flashcards");
const cardForm = document.querySelector(".card-form");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

// Monitorar autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadCards();
  } else {
    window.location.href = "login.html";
  }
});

// Mostrar formulário para criar card
window.create = function () {
  cardForm.style.display = "flex";
};

// Cancelar criação do card
window.cancel = function () {
  cardForm.style.display = "none";
};

// Logout do usuário
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// Salvar novo card no Firestore
window.save = async function () {
  if (question.value.trim() && answer.value.trim()) {
    const data = {
      question: question.value.trim(),
      answer: answer.value.trim(),
      uid: currentUser.uid,
      timestamp: new Date()
    };
    await addDoc(collection(db, "flashcards"), data);
    question.value = "";
    answer.value = "";
    cardForm.style.display = "none";
    await loadCards();
  }
};

// Remover todos os cards do usuário logado
window.removeAll = async function () {
  if (confirm("Deseja mesmo excluir todos os cards?")) {
    const snapshot = await getDocs(collection(db, "flashcards"));
    const promises = snapshot.docs.map((docSnap) => {
      if (docSnap.data().uid === currentUser.uid) {
        return deleteDoc(doc(db, "flashcards", docSnap.id));
      }
    });
    await Promise.all(promises);
    loadCards();
  }
};

// Carregar cards do usuário e mostrar na tela
async function loadCards() {
  flashcards.innerHTML = "";
  const snapshot = await getDocs(collection(db, "flashcards"));
  let count = 1;
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.uid === currentUser.uid) {
      addCard({ ...data, id: docSnap.id, number: count++ });
    }
  });
}

// Criar card visual na página
function addCard(card) {
  const div = document.createElement("div");
  div.className = "flashcard";
  div.setAttribute("data-id", card.id);

  const h2question = document.createElement("h2");
  h2question.style.textAlign = "justify";
  h2question.innerText = card.question;

  const h2answer = document.createElement("h2");
  h2answer.style = "text-align: center; display: none; color: green";
  h2answer.innerText = card.answer;

  const btn = document.createElement("button");
  btn.innerText = "mostrar";
  btn.onclick = () => {
    if (h2answer.style.display === "none") {
      h2answer.style.display = "block";
      btn.innerText = "esconder";
    } else {
      h2answer.style.display = "none";
      btn.innerText = "mostrar";
    }
  };

  const remove = document.createElement("span");
  remove.className = "remove";
  remove.innerText = "x";
  remove.onclick = async () => {
    if (confirm("Deseja excluir este card?")) {
      await deleteDoc(doc(db, "flashcards", card.id));
      loadCards();
    }
  };

  const number = document.createElement("span");
  number.className = "number";
  number.innerText = card.number;

  div.appendChild(h2question);
  div.appendChild(h2answer);
  div.appendChild(btn);
  div.appendChild(remove);
  div.appendChild(number);

  flashcards.appendChild(div);
}
