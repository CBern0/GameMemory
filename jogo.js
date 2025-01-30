function Jogar() {

    // Variáveis para o estado do jogo
    let vazio = "Vazio"; // Controla se está esperando virar uma carta
    let resetar = 0; // Controla o número de pares encontrados
    let pontuacao = 0; // Armazena a pontuação do jogador
    let IdPrimeiraImagem = null; // Armazena a primeira carta virada
    let checagem = false; // Impede que o jogador vire mais de uma carta simultaneamente
    let cartas = []; // Array para armazenar as imagens das cartas
    let qtdCartas = 0; // Quantidade de cartas no jogo

    // Efeitos sonoros
    let somdeacerto = new Audio('somdeacerto.mp3'); // Som de acerto
    let somdeerro = new Audio('somdeerro.mp3'); // Som de erro
    let somvitoria = new Audio('vitoria.mp3'); // Som de vitória
    let somdereset = new Audio("somdereset.mp3"); // Som de reset
    let somAtivo = true; // Controla se os sons estão ativados ou não


    // Remove o botão de iniciar se ele existir
    const botaoiniciar = document.getElementById("iniciar");
    if (botaoiniciar){
        AtivarTelaCheia(); // Ativa a tela cheia quando o jogo começa
    }

    const botoesDificuldade = document.querySelectorAll('.dificuldades');
    if (botoesDificuldade.onclick){
        
    }
    botoesDificuldade.forEach(botao => botao.remove()); // Remove os botões de dificuldade após escolher

    // Criação do botão de volume (para mutar/desmutar sons)
    const buttonSound = document.createElement('button');
    buttonSound.setAttribute("id", "volume");
    buttonSound.innerHTML = '<span>  🔊 </span>';
    buttonSound.addEventListener("click", tirarSom); // Função para alternar som
    document.querySelector("body").appendChild(buttonSound);

    // Criação do botão de reiniciar
    const button = document.createElement("button");
    button.setAttribute("id", "desistir");
    button.textContent = "Reiniciar";
    button.addEventListener("click", ReiniciarPagina); // Chama a função para reiniciar o jogo
    document.querySelector("body").appendChild(button);

    // Limpa o tabuleiro antes de criar um novo
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = '';

    // Função que cria os botões de dificuldade
    function criarBotao(id, texto, evento) {
        const botao = document.createElement("button");
        botao.setAttribute("id", id);
        botao.setAttribute("class", "dificuldades");
        botao.textContent = texto;
        botao.addEventListener("click", evento); // Chama a função que define o modo de dificuldade
        document.querySelector("body").appendChild(botao);
    }

    // Criação dos botões para escolher o modo de dificuldade
    criarBotao("facil", "-Fácil-", ModoFacil);
    criarBotao("medio", "-Médio-", ModoMedio);
    criarBotao("dificil", "-Difícil-", ModoDificil);

    // Função para construir o tabuleiro
    function construirTabuleiro(cartasArray, numCartas) {
        cartas = cartasArray; // Recebe o array de cartas embaralhadas
        qtdCartas = numCartas; // Recebe a quantidade de cartas do modo escolhido
        
        for (let i = 0; i < cartasArray.length; i++) {
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/verso.jpg"); // Define a imagem de verso da carta
            img.setAttribute("id", i); // Atribui o id à carta (para referência posterior)
            img.classList.add("card"); // Adiciona a classe 'card'
            img.addEventListener("click", () => {
                exibirCarta(i); // Chama a função para exibir a carta
                AtivarTelaCheia(); // Ativa a tela cheia quando uma carta é virada
            });
            tabuleiro.appendChild(img); // Adiciona a carta ao tabuleiro
        }
        removerDificuldade(); // Remove os botões de dificuldade após iniciar o jogo
    }

    // Função que define o modo fácil
    function ModoFacil() {
        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(3, 1fr)"; // 3 colunas
        document.getElementById("tabuleiro").style.padding = "40px";
        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg",
            "imgs/5.jpg", "imgs/6.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5); // Embaralha as cartas
        construirTabuleiro(cartas, 6); // Constrói o tabuleiro com 6 cartas
    }

    // Função que define o modo médio
    function ModoMedio() {
        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(4, 1fr)"; // 4 colunas
        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5); // Embaralha as cartas
        construirTabuleiro(cartas, 10); // Constrói o tabuleiro com 10 cartas
    }

    // Função que define o modo difícil
    function ModoDificil() {
        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(8, 1fr)"; // 8 colunas
        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/11.jpg", "imgs/12.jpg", "imgs/13.jpg", "imgs/14.jpg", "imgs/15.jpg",
            "imgs/16.jpg", "imgs/17.jpg", "imgs/18.jpg", "imgs/19.jpg", "imgs/20.jpg",
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/11.jpg", "imgs/12.jpg", "imgs/13.jpg", "imgs/14.jpg", "imgs/15.jpg",
            "imgs/16.jpg", "imgs/17.jpg", "imgs/18.jpg", "imgs/19.jpg", "imgs/20.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5); // Embaralha as cartas
        construirTabuleiro(cartas, 20); // Constrói o tabuleiro com 20 cartas
    }

    // Remove os botões de dificuldade após o início do jogo
    function removerDificuldade(){
        document.getElementById("facil").remove();
        document.getElementById("medio").remove();
        document.getElementById("dificil").remove();
    }

    // Função que exibe as cartas e verifica se são iguais
    function exibirCarta(posicao) {
        if (checagem || posicao == IdPrimeiraImagem) return; // Impede de virar cartas simultaneamente ou repetir a carta já virada

        const img = document.getElementById(posicao);
        img.src = cartas[posicao]; // Mostra a carta virada

        if (vazio == "Vazio") {
            vazio = posicao; // Armazena a primeira carta virada
            IdPrimeiraImagem = posicao; // Armazena o id da primeira carta
        } else {
            let posicaoAnterior = vazio; // Armazena a posição da carta anterior
            checagem = true; // Impede novas viradas até que a comparação termine

            // Verifica se as cartas coincidem
            if (cartas[posicao] != cartas[posicaoAnterior]) {
                somdeerro.play(); // Toca o som de erro
                setTimeout(() => {
                    document.getElementById(posicao).src = "imgs/verso.jpg"; // Volta a carta para o verso
                    document.getElementById(posicaoAnterior).src = "imgs/verso.jpg"; // Volta a carta anterior para o verso
                    vazio = "Vazio"; // Reseta a variável que controla o estado de "vazio"
                    checagem = false; // Libera a verificação para o próximo par
                }, 500);
                pontuacao -= 10; // Diminui a pontuação em caso de erro
            } else {
                // Se as cartas forem iguais, elas são removidas (não podem ser clicadas novamente)
                document.getElementById(posicao).onclick = null;
                document.getElementById(posicaoAnterior).onclick = null;
                document.getElementById(posicao).id = null;
                document.getElementById(posicaoAnterior).id = null;
                
                somdeacerto.play(); // Toca o som de acerto
                setTimeout(() => {
                    vazio = "Vazio"; // Reseta a variável que controla o estado de "vazio"
                    checagem = false; // Libera a verificação para o próximo par
                }, 1);
                pontuacao += 50; // Aumenta a pontuação por acerto
                resetar += 1; // Aumenta o contador de pares encontrados

                // Se o jogador encontrar todos os pares, o jogo termina
                if (resetar == qtdCartas) {
                    somvitoria.play(); // Toca o som de vitória
                    tabuleiro.innerHTML = ''; // Limpa o tabuleiro
                    const div = document.createElement("div");
                    div.setAttribute("id", "pontuacao");
                    tabuleiro.appendChild(div); // Exibe a pontuação final

                    // Estiliza a exibição de pontuação
                    let final = document.getElementById("pontuacao").style;
                    final.backgroundColor = 'rgb(129, 0, 0)';
                    final.color = 'white';
                    final.height = '150px';
                    final.width = '500px';
                    final.borderRadius = '12px';
                    final.padding = '5px';
                    final.margin = 'auto';
                    final.marginTop = '17%';
                    final.textAlign = 'center';
                    final.marginBottom = '17%';

                    document.getElementById("desistir").remove(); // Remove o botão de reiniciar após o término do jogo

                    // Exibe a mensagem de vitória
                    document.getElementById("pontuacao").innerHTML = `<h1>Parabéns, Você concluiu o jogo</h1><h2>Sua pontuação é de: ${pontuacao}</h2>`;
                    
                    // Reinicia o jogo após 3 segundos
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }
        }
    }

    // Função para reiniciar o jogo
    function ReiniciarPagina() {
        somdereset.play() // Toca o som de reset
        buttonSound.remove(); // Remove o botão de volume
        Jogar(); // Reinicia o jogo chamando a função principal novamente
    }

    // Função que ativa o modo tela cheia
    function AtivarTelaCheia() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }

    // Função que alterna o som do jogo
    function tirarSom() {
        if (somAtivo) {
            // Desativa os sons
            somdeacerto.muted = true;
            somdeerro.muted = true;
            somvitoria.muted = true;
            somdereset.muted = true;
            somAtivo = false;
            buttonSound.innerHTML = '<span> 🔇 </span>'; // Alterar o ícone para volume desligado
        } else {
            // Ativa os sons
            somdeacerto.muted = false;
            somdeerro.muted = false;
            somvitoria.muted = false;
            somdereset.muted = false;
            somAtivo = true;
            buttonSound.innerHTML = '<span> 🔊 </span>'; // Alterar o ícone para volume ligado
        }
    }
}
