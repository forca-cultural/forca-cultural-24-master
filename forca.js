let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
const palavras = [
    {
        nome: "ARARIPE",
        categoria: "O topônimo atual nome da cidade, provém do tupi antigo e significa, segundo Eduardo Navarro, “no rio das araras”, pela composição dos termos. Qual o atual nome da cidade?"
    },
    {
        nome: "BREJINHO",
        categoria: "Em divisão territorial datada de 1960, o município é constituído de 2 distritos, um deles Araripe. Qual era o outro?"
    },
    {
        nome: "RIACHOGRANDE",
        categoria: "Distrito onde nasceu o compositor do hino de Araripe."
    },
    {
        nome: "ALAGOINHA",
        categoria: "Distrito do município de Araripe"
    },
    {
        nome: "PAJEU",
        categoria: "Distrito do município de Araripe"
    },
    {
        nome: "SANTOANTONIO",
        categoria: "Padroeiro do município."
    },
    {
        nome: "CASADEPITIA",
        categoria: "Esse Espaço Cultural é um equipamento municipal dedicado a catalogação, conservação e divulgação da cultura e da memória do povo araripense. Qual o nome desse espaço?"
    },
    {
        nome: "RAIMUNDOELESBAO",
        categoria: "Nome do poeta que compôs o hino oficial de Araripe."
    },
    {
        nome: "BREJOSECO",
        categoria: "A partir do ano de 1889 a vila passou a denominar-se Araripe. Qual era o nome do local antes de receber seu atual nome?"
    },
    {
        nome: "FEQUARIPE",
        categoria: "Anualmente em uma festa que evidencia as danças típicas, músicas, vestimentas, coreografias, criatividade, animação e encenação de casamento das quadrilhas juninas. Qual o nome desse evento?"
    },
    {
        nome: "SOLDADINHODOARARIPE",
        categoria: "A fauna local do município de Araripe é rica em aves, mamíferos, répteis e insetos. Na região, foi descoberta uma ave que corre risco de extinção, trata-se de qual ave?"
    },
    {
        nome: "PRAXEDES",
        categoria: "Evento para a divulgação de trabalhos artísticos no município."
    }
]

let points = document.getElementById("points");

if (!localStorage.getItem("counter")) {
    localStorage.setItem("counter", String(0));
}

points.textContent += localStorage.getItem("counter");

palavra = document.getElementById('#palavraSecreta')
criarPalavraSecreta()

function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length)
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
}

palavraTela();

function palavraTela() {
    const categoria = document.getElementById('categoria');
    categoria.innerHTML = palavraSecretaCategoria
    const palavra = document.getElementById('palavraSecreta');
    palavra.innerHTML = '';

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] === undefined) {
            listaDinamica[i] = '&nbsp'
            palavra.innerHTML = palavra.innerHTML + "<div class = 'letras'>" + listaDinamica[i] + "</div>"

        } else {
            palavra.innerHTML = palavra.innerHTML + "<div class = 'letras'>" + listaDinamica[i] + "</div>"
        }

    }

}

let VerificarLetraEscolhida = (letra)=> {

    document.getElementById('tecla ' + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra('tecla ' + letra);
        comparaListas(letra);
        palavraTela()
    }
};

function mudarStyleLetra(tecla) {
    document.getElementById(tecla).classList.add('active')
}


function comparaListas(letra) {

    const posicao = palavraSecretaSorteada.indexOf(letra)
    if (posicao < 0) {
        tentativas--
        imagemForca()
        if (tentativas === 0) {
            abreModal('Fim da linha!', 'A palavra escondida era ' + palavraSecretaSorteada)
        }

    } else {
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] !== listaDinamica[i]) {
            vitoria = false;
        }
    }
    if (vitoria === true) {
        abreModal('Muito bem!', 'Você conseguiu adivinhar a palavra escondida.')
        tentativas = 0;
        localStorage.setItem("counter", String(parseInt(localStorage.getItem("counter")) + 1))
    }

    function imagemForca() {
        document.getElementById('img').src = `./imagem/forca${6 - tentativas}.png`
    }

    function abreModal(titulo, mensagem) {
        let alerta = document.getElementById("alerta")
        alerta.textContent = `${titulo} ${mensagem}`

        alerta.classList.add('active')
        document.getElementById("categoria").style.display = "none";
    }

    let btnRestart = document.querySelector('#btnRestart')

    btnRestart.addEventListener('click', function () {
        location.reload();
    })
}

window.addEventListener('keydown', (e) => {

    if (e.key.toLowerCase() === 'a' ||
        e.key.toLowerCase() === 'b' ||
        e.key.toLowerCase() === 'c' ||
        e.key.toLowerCase() === 'd' ||
        e.key.toLowerCase() === 'e' ||
        e.key.toLowerCase() === 'f' ||
        e.key.toLowerCase() === 'g' ||
        e.key.toLowerCase() === 'h' ||
        e.key.toLowerCase() === 'i' ||
        e.key.toLowerCase() === 'j' ||
        e.key.toLowerCase() === 'k' ||
        e.key.toLowerCase() === 'l' ||
        e.key.toLowerCase() === 'm' ||
        e.key.toLowerCase() === 'n' ||
        e.key.toLowerCase() === 'o' ||
        e.key.toLowerCase() === 'p' ||
        e.key.toLowerCase() === 'q' ||
        e.key.toLowerCase() === 'r' ||
        e.key.toLowerCase() === 's' ||
        e.key.toLowerCase() === 't' ||
        e.key.toLowerCase() === 'u' ||
        e.key.toLowerCase() === 'v' ||
        e.key.toLowerCase() === 'w' ||
        e.key.toLowerCase() === 'x' ||
        e.key.toLowerCase() === 'y' ||
        e.key.toLowerCase() === 'z') {

        VerificarLetraEscolhida(e.key.toUpperCase());
    }
})