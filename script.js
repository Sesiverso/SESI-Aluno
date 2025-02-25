// Importa Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

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

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para verificar login
async function verificarLogin() {
    // Pega os valores dos campos de entrada
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Busca o aluno na coleção "Alunos" com o campo nome
        const q = query(collection(db, "Alunos"), where("nome", "==", nome)); 
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("Usuário não encontrado!");
            return;
        }

        // Encontrar o aluno correspondente
        querySnapshot.forEach((docSnap) => {
            const dados = docSnap.data();

            // Verifica email e senha
            if (dados.email === email && dados.senha === senha) {
                alert("Login bem-sucedido!");

                // Redireciona com base no tipo e na turma
                if (dados.tipo === "aluno") {
                    redirecionarAluno(dados.turmas);
                } else if (dados.tipo === "professor") {
                    redirecionarProfessor(dados.turmas);
                }
            } else {
                alert("Email ou senha incorretos!");
            }
        });

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao acessar o banco de dados.");
    }
}

// Função para redirecionar alunos
function redirecionarAluno(turma) {
    const turmas = {
        "1 ano": "1anoaluno.html",
        "2 ano": "2anoaluno.html",
        "3 ano": "3anoaluno.html",
        "4 ano": "4anoaluno.html",
        "5 ano": "5anoaluno.html",
        "6 ano": "6anoaluno.html",
        "7 ano": "7anoaluno.html",
        "8 ano": "8anoaluno.html",
        "9 ano": "9anoaluno.html",
        "1 ano médio": "1anomedioaluno.html",
        "2 ano médio": "2anomedioaluno.html",
        "3 ano médio": "3anomedioaluno.html"
    };

    if (turmas[turma]) {
        window.location.href = turmas[turma];
    } else {
        alert("Turma não encontrada.");
    }
}

// Função para redirecionar professores
function redirecionarProfessor(turma) {
    const turmas = {
        "1 ano": "1anoprof.html",
        "2 ano": "2anoprof.html",
        "3 ano": "3anoprof.html",
        "4 ano": "4anoprof.html",
        "5 ano": "5anoprof.html",
        "6 ano": "6anoprof.html",
        "7 ano": "7anoprof.html",
        "8 ano": "8anoprof.html",
        "9 ano": "9anoprof.html",
        "1 ano médio": "1anomedio.html",
        "2 ano médio": "2anomedio.html",
        "3 ano médio": "3anomedio.html"
    };

    if (turmas[turma]) {
        window.location.href = turmas[turma];
    } else {
        alert("Turma não encontrada.");
    }
}

// Adiciona o evento ao botão de login
document.getElementById("loginBtn").addEventListener("click", verificarLogin);
er("click", verificarLogin);
