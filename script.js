import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Função para verificar se o usuário é aluno ou professor
async function verificarTipoUsuario(email) {
    const colecoes = ["Alunos", "professores"];
    for (const colecao of colecoes) {
        const querySnapshot = await getDocs(collection(db, "usuarios", colecao));
        for (const doc of querySnapshot.docs) {
            if (doc.data().email === email) {
                return doc.data().tipo; // Retorna 'aluno' ou 'professor'
            }
        }
    }
    return null; // Retorna null se não encontrar
}

// Função de Login
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const erro = document.getElementById("erro");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verifica se é aluno ou professor
        const tipo = await verificarTipoUsuario(email);
        if (tipo === "aluno") {
            window.location.href = "aluno.html";
        } else if (tipo === "professor") {
            window.location.href = "professor.html";
        } else {
            erro.innerText = "Tipo de usuário não encontrado.";
        }
    } catch (error) {
        erro.innerText = "Erro no login: " + error.message;
    }
}

// Expor a função login para ser chamada no HTML
window.login = login;
