const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Ao chegar na escola, você nota uma criança chorando no banheiro. Qual a sua primeira ação?",
        alternativas: [
            {
                texto: "Deixe ela pra lá, não sou eu mesmo!",
                afirmacao: "Você prefere evitar situações que não te envolvem diretamente, mostrando uma atitude mais individualista.",
                pontos: { problematico: 1, pesadelo: 1 }
            },
            {
                texto: "Questiono o motivo e ajudo ela!",
                afirmacao: "Você demonstra empatia e disposição para ajudar os outros, criando um ambiente mais acolhedor.",
                pontos: { facil: 1, dedicado: 1 }
            }
        ]
    },
    {
        enunciado: "Você tem uma prova importante amanhã, mas também quer passar a noite jogando ou assistindo séries. O que faz?",
        alternativas: [
            {
                texto: "Passo a noite me divertindo e deixo para estudar na última hora.",
                afirmacao: "Você prioriza a diversão em vez dos estudos, o que pode comprometer seu desempenho.",
                pontos: { problematico: 1, pesadelo: 1 }
            },
            {
                texto: "Organizo meu tempo, estudo o conteúdo e reservo um momento para relaxar depois.",
                afirmacao: "Você equilibra suas responsabilidades com organização, mostrando compromisso com os estudos.",
                pontos: { estudioso: 1, dedicado: 1 }
            }
        ]
    },
    {
        enunciado: "Durante uma aula, o professor pede para você apresentar um resumo do conteúdo para a turma. Como você se prepara?",
        alternativas: [
            {
                texto: "Faço um resumo rápido na hora, sem revisar muito, e apresento do meu jeito.",
                afirmacao: "Você confia no improviso, mas isso pode refletir uma falta de preparação mais cuidadosa.",
                pontos: { problematico: 1 }
            },
            {
                texto: "Estudo o conteúdo com antecedência, faço anotações organizadas e treino a apresentação.",
                afirmacao: "Você se dedica a preparar apresentações claras e bem fundamentadas, impressionando a todos.",
                pontos: { estudioso: 1, dedicado: 1 }
            }
        ]
    },
    {
        enunciado: "Você recebe um trabalho para casa, mas percebe que ele está um pouco difícil. O que você faz?",
        alternativas: [
            {
                texto: "Entrego o trabalho incompleto ou copio algo da internet para terminar rápido.",
                afirmacao: "Você busca atalhos que comprometem sua aprendizagem, o que pode gerar problemas no futuro.",
                pontos: { problematico: 1, pesadelo: 1 }
            },
            {
                texto: "Peço ajuda ao professor ou estudo mais para entender e completar o trabalho corretamente.",
                afirmacao: "Você enfrenta desafios com iniciativa, buscando aprender e melhorar continuamente.",
                pontos: { estudioso: 1, dedicado: 1 }
            }
        ]
    },
    {
        enunciado: "Na hora do recreio, você vê um colega sendo excluído pelos outros. Como você reage?",
        alternativas: [
            {
                texto: "Ignoro a situação e continuo com meus amigos, não é problema meu.",
                afirmacao: "Você evita se envolver em questões sociais, o que pode limitar sua conexão com os colegas.",
                pontos: { problematico: 1 }
            },
            {
                texto: "Chamo o colega para se juntar ao seu grupo ou converso com ele para incluí-lo.",
                afirmacao: "Você promove inclusão e solidariedade, contribuindo para um ambiente escolar positivo.",
                pontos: { facil: 1, dedicado: 1 }
            }
        ]
    },
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let pontuacao = { facil: 0, problematico: 0, estudioso: 0, dedicado: 0, pesadelo: 0 };

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    for (let perfil in opcaoSelecionada.pontos) {
        pontuacao[perfil] += opcaoSelecionada.pontos[perfil];
    }
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Seu perfil como aluno...";
    textoResultado.textContent = historiaFinal + determinarPerfil();
    caixaAlternativas.textContent = "";
}

function determinarPerfil() {
    let maxPontos = Math.max(...Object.values(pontuacao));
    let perfis = Object.keys(pontuacao).filter(perfil => pontuacao[perfil] === maxPontos);
    let perfilFinal = perfis.length > 1 ? "misto" : perfis[0];
    
    switch (perfilFinal) {
        case "facil":
            return "Você é um aluno fácil, que se integra bem e contribui para um ambiente harmonioso na escola.";
        case "problematico":
            return "Você é um aluno problemático, que tende a evitar responsabilidades e pode criar desafios para os professores.";
        case "estudioso":
            return "Você é um aluno estudioso, que valoriza o aprendizado e se esforça para entender os conteúdos.";
        case "dedicado":
            return "Você é um aluno dedicado, que enfrenta desafios com iniciativa e contribui positivamente na escola.";
        case "pesadelo":
            return "Você é o pesadelo dos professores, com atitudes que dificultam o ambiente escolar e o aprendizado.";
        default:
            return "Você tem um perfil misto, com características variadas que dependem da situação.";
    }
}

mostraPergunta();
