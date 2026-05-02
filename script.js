const meusJogos = [
    {
        id: 1,
        titulo: "Final CBLOL - LOUD vs PNG",
        categoria: "LoL",
        descricao: "A grande final do segundo split. Não perca nenhum detalhe!",
        link: "https://youtube.com/link-da-transmissao-lol",
        comprado: false
    },
    {
        id: 2,
        titulo: "VCT Americas - SEN vs LEV",
        categoria: "Valorant",
        descricao: "Duelo de gigantes no Valorant Champions Tour.",
        link: "https://twitch.tv/valorant_br",
        comprado: false
    }
];

let jogoSelecionado = null;

function renderizarJogos() {
    const container = document.getElementById('jogos-container');
    container.innerHTML = '';

    meusJogos.forEach(jogo => {
        container.innerHTML += `
            <div class="card">
                <h3>${jogo.titulo}</h3>
                <p>Categoria: ${jogo.categoria}</p>
                <button onclick="abrirModal(${jogo.id})">Ver Detalhes</button>
            </div>
        `;
    });
}

function abrirModal(id) {
    jogoSelecionado = meusJogos.find(j => j.id === id);
    document.getElementById('modal-titulo').innerText = jogoSelecionado.titulo;
    document.getElementById('modal-desc').innerText = jogoSelecionado.descricao;
    
    const acao = document.getElementById('acao-compra');
    const linkDiv = document.getElementById('link-desbloqueado');

    if(jogoSelecionado.comprado) {
        acao.classList.add('hidden');
        linkDiv.classList.remove('hidden');
        document.getElementById('link-final').href = jogoSelecionado.link;
    } else {
        acao.classList.remove('hidden');
        linkDiv.classList.add('hidden');
    }

    document.getElementById('modal').classList.remove('hidden');
}

function comprarIngresso() {
    // Simulação de compra
    alert("Compra realizada com sucesso!");
    jogoSelecionado.comprado = true;
    abrirModal(jogoSelecionado.id);
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

renderizarJogos();