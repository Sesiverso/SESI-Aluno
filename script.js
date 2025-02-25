import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCf7dIhbd6RWGt6hnapNkXXkbc5ExUCfhE",
    authDomain: "sesi-2e0f2.firebaseapp.com",
    projectId: "sesi-2e0f2",
    storageBucket: "sesi-2e0f2.firebasestorage.app",
    messagingSenderId: "47675189722",
    appId: "1:47675189722:web:087cfddde31477a82d78e3",
    measurementId: "G-PK6BFBT56B"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para verificar o login
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const erro = document.getElementById("erro");

    const alunosRef = collection(db, "Alunos");
    const snapshot = await getDocs(alunosRef);

    let userFound = false;

    snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === email) {
            userFound = true;
            if (data.senha === password) {
                sessionStorage.setItem("turmas", data.turmas);
                if (data.tipo === "aluno") {
                    window.location.href = "aluno.html";
                } else if (data.tipo === "professor") {
                    window.location.href = "professor.html";
                } else {
                    erro.innerText = "Tipo de usuário inválido.";
                }
            } else {
                erro.innerText = "Senha incorreta.";
            }
        }
    });

    if (!userFound) {
        erro.innerText = "Usuário não encontrado.";
    }
}

// Expor função global para HTML
window.login = login;
