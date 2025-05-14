import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyATG5P2NvdecjCPO7gzFNGs6l7plDrxY04",
  authDomain: "sdel-16c6a.firebaseapp.com",
  projectId: "sdel-16c6a",
  storageBucket: "sdel-16c6a.appspot.com",
  messagingSenderId: "676676370586",
  appId: "1:676676370586:web:444947d3dda78a80d9df23",
  measurementId: "G-FZWQ9FYZG5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;

const flashcards = document.querySelector(".flashcards");
const cardForm = document.querySelector(".card-form");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadCards();
  } else {
    window.location.href = "login.html";
  }
});

window.create = function () {
  cardForm.style.display = "flex";
};

window.cancel = function () {
  cardForm.style.display = "none";
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

window.save = async function () {
  if (question.value.trim() && answer.value.trim()) {
    const data = {
      question: question.value,
      answer: answer.value,
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
    h2answer.style.display = h2answer.style.display === "none" ? "block" : "none";
    btn.innerText = btn.innerText === "mostrar" ? "esconder" : "mostrar";
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
