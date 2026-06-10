const casas = document.querySelectorAll(".casa");
const statusTexto = document.getElementById("status");

let jogador = "🎀";
let jogoAtivo = true;

let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const combinacoesVitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

function jogar() {

    const index = this.dataset.index;

    if(tabuleiro[index] !== "" || !jogoAtivo){
        return;
    }

    tabuleiro[index] = jogador;
    this.textContent = jogador;

    verificarVencedor();

    if(jogoAtivo){
        jogador = jogador === "🎀" ? "💖" : "🎀";
        statusTexto.textContent = `Vez da ${jogador}`;
    }
}

function verificarVencedor(){

    for(let combinacao of combinacoesVitoria){

        const [a,b,c] = combinacao;

        if(
            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ){

            casas[a].classList.add("vencedora");
            casas[b].classList.add("vencedora");
            casas[c].classList.add("vencedora");

            statusTexto.textContent = `👑 ${tabuleiro[a]} venceu!`;
            jogoAtivo = false;
            return;
        }
    }

    if(!tabuleiro.includes("")){
        statusTexto.textContent = "🤝 Empate!";
        jogoAtivo = false;
    }
}

function reiniciar(){

    jogador = "🎀";
    jogoAtivo = true;

    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    statusTexto.textContent = "Vez da 🎀";

    casas.forEach(casa => {
        casa.textContent = "";
        casa.classList.remove("vencedora");
    });
}