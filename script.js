// BANCO DE DADOS DE JOGOS (Adicione seus links aqui)
const bancoJogos = [
    {
        id: 1,
        titulo: "Final CBLOL - LOUD vs PNG",
        cat: "League of Legends",
        desc: "Acompanhe a disputa épica pelo título do segundo split.",
        link: "https://www.youtube.com/c/CBLOL", // Seu link aqui
        comprado: false
    },
    {
        id: 2,
        titulo: "VCT Americas - LOUD vs SEN",
        cat: "Valorant",
        desc: "O clássico das Américas no palco principal do VCT.",
        link: "https://www.twitch.tv/valorant_br", // Seu link aqui
        comprado: false
    }
];

// NAVEGAÇÃO ENTRE LOGIN E CADASTRO
function alternarAuth(tipo) {
    const isLogin = tipo === 'login';
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-cadastro').classList.toggle('hidden', isLogin);
    document.getElementById('tab-login').classList.toggle('active', isLogin);
    document.getElementById('tab-cadastro').classList.toggle('active', !isLogin);
    document.getElementById('auth-title').innerText = isLogin ? "Bem-vindo à Arena" : "Crie sua Conta";
}

// LÓGICA DE CADASTRO
function cadastrar() {
    const nomeComp = document.getElementById('c-nome').value;
    const email = document.getElementById('c-email').value;
    const senha = document.getElementById('c-password').value;

    if (!nomeComp || !email || !senha) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const primeiroNome = nomeComp.split(' ')[0];
    const userObj = { nome: primeiroNome, email: email, senha: senha };
    
    localStorage.setItem('arena_user', JSON.stringify(userObj));
    alert("Cadastro realizado! Faça login agora.");
    alternarAuth('login');
}

// LÓGICA DE LOGIN
function logar() {
    const emailInput = document.getElementById('l-email').value;
    const senhaInput = document.getElementById('l-password').value;
    const savedUser = JSON.parse(localStorage.getItem('arena_user'));

    if (savedUser && emailInput === savedUser.email && senhaInput === savedUser.senha) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('user-name-text').innerText = savedUser.nome;
        renderizarVitrine();
    } else {
        alert("Usuário não encontrado ou senha incorreta.");
    }
}

// RENDERIZAR VITRINE
function renderizarVitrine() {
    const container = document.getElementById('jogos-container');
    container.innerHTML = '';
    
    bancoJogos.forEach(jogo => {
        container.innerHTML += `
            <div class="card">
                <div class="badge">${jogo.cat}</div>
                <h3>${jogo.titulo}</h3>
                <button class="btn-main" onclick="abrirDetalhes(${jogo.id})">Ver Evento</button>
            </div>
        `;
    });
}

// MODAL E COMPRA
let jogoAtual = null;

function abrirDetalhes(id) {
    jogoAtual = bancoJogos.find(j => j.id === id);
    document.getElementById('modal-titulo').innerText = jogoAtual.titulo;
    document.getElementById('modal-categoria').innerText = jogoAtual.cat;
    document.getElementById('modal-desc').innerText = jogoAtual.desc;
    
    atualizarStatusModal();
    document.getElementById('modal').classList.remove('hidden');
}

function atualizarStatusModal() {
    if (jogoAtual.comprado) {
        document.getElementById('area-pagamento').classList.add('hidden');
        document.getElementById('area-link').classList.remove('hidden');
        document.getElementById('link-final').href = jogoAtual.link;
    } else {
        document.getElementById('area-pagamento').classList.remove('hidden');
        document.getElementById('area-link').classList.add('hidden');
    }
}

function confirmarCompra() {
    alert("Simulando integração com Pagamento...");
    jogoAtual.comprado = true;
    atualizarStatusModal();
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

function logout() {
    location.reload();
}
