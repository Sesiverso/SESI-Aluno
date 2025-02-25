import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Função para verificar login
async function login() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const erro = document.getElementById("erro");

    if (!nome || !email || !password) {
        erro.innerText = "Preencha todos os campos!";
        return;
    }

    // Caminho correto: Alunos/aluno1/(Nome do Aluno)
    const alunoRef = doc(db, "Alunos", "aluno1", nome);
    const alunoSnap = await getDoc(alunoRef);

    if (alunoSnap.exists()) {
        const data = alunoSnap.data();
        if (data.email === email) {
            if (data.senha === password) {
                sessionStorage.setItem("turmas", data.turmas);
                sessionStorage.setItem("nome", nome);

                // Redireciona com base na turma
                const turma = data.turmas.toLowerCase().replace(" ", "");
                if (data.tipo === "aluno") {
                    window.location.href = `${turma}aluno.html`;
                } else if (data.tipo === "professor") {
                    window.location.href = `${turma}prof.html`;
                } else {
                    erro.innerText = "Tipo de usuário inválido.";
                }
            } else {
                erro.innerText = "Senha incorreta.";
            }
        } else {
            erro.innerText = "E-mail incorreto.";
        }
    } else {
        erro.innerText = "Aluno não encontrado.";
    }
}

// Expor função global para HTML
window.login = login;
