const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const player = {
    x: 200,
    y: 600,
    width: 40,
    height: 40
}

const faixa = {
    casaesq: { xInicio: 0, xFim: 80 },
    calcesq: { xInicio: 80, xFim: 140 },
    rua: { xInicio: 140, xFim: 340 },
    calcdir: { xInicio: 340, xFim: 400 },
    casadir: { xInicio: 400, xFim: 480 }
}

let obj = [
    { tipo: 'cesto', faixa: 'casaesq', y: 800, width: 60, height: 60 },
    { tipo: 'carro', faixa: 'rua', y: 1200, width: 60, height: 60 },
    { tipo: 'buraco', faixa: 'rua', y: 1000, width: 60, height: 60 },
]
const velocidade = 3;

let cameraY = 0;

function gerarElemento(y) {
    const tipos = ['cesto', 'carro', 'buraco'];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    let faixaEscolhida

    if (tipo === 'cesto') {
        const sorteio = Math.floor(Math.random() * 2);
        if (sorteio === 0) {
            faixaEscolhida = 'casaesq';
        } else {
            faixaEscolhida = 'casadir';
        }
    }
    else {
        faixaEscolhida = 'rua';
    }

    const largura = 60;
    const limites = faixa[faixaEscolhida];
    const x = limites.xInicio + Math.random() * (limites.xFim - limites.xInicio - largura);

    obj.push({ tipo, faixaEscolhida, x, y, width: 60, height: 60 });
}

 function verificarColisao(player, elemento) {
    const elementoYnatela = elemento.y - cameraY;
        const sobrepoeX = (player.x < elemento.x + elemento.width) && (player.x + player.width > elemento.x);
        const sobrepoeY = (player.y < elemento.y + elemento.height) && (player.y + player.height > elementoYnatela);
        const colidiu = sobrepoeX && sobrepoeY;

        return colidiu;
    }

let placar = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cameraY = cameraY + velocidade;

    obj.forEach(elemento => {
        if (elemento.tipo === 'cesto') {
            ctx.fillStyle = 'green';
        } else if (elemento.tipo === 'carro') {
            ctx.fillStyle = 'red';
        } else if (elemento.tipo === 'buraco') {
            ctx.fillStyle = 'black';
        };

        const colidiu = verificarColisao(player, elemento);
        if(colidiu){
            if (elemento.tipo === 'cesto'){
            
        } else if (elemento.tipo === 'carro'){
            let placarAtual = + 100
            let disp = placarAtual + placar
            ctx.fillStyle = 'gey'
            ctx.font = '24px Arial black'
            ctx.fillText('Placar:' + disp, 10, 30)
        }
        }

        ctx.fillRect(elemento.x, elemento.y - cameraY, 60, 60);
    });

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(gameLoop);

    const ultimoElemento = obj[obj.length - 1];
    if (ultimoElemento.y - cameraY < 1000) {
        gerarElemento(ultimoElemento.y + 300);
    }

    obj = obj.filter(elemento => elemento.y - cameraY > -100);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const posicaoRelativa = e.clientX - rect.left;
    player.x = posicaoRelativa;

    if (player.x < 80) {
        player.x = 80;
    }

    if (player.x > 360) {
        player.x = 360;
    }
})