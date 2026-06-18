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
    ruaesq: { xInicio:140, xFim: 240 },
    ruadir: { xInicio: 240, xFim: 340 },
    calcdir: { xInicio: 340, xFim: 400 },
    casadir: { xInicio: 400, xFim: 480 }
}

let obj = [
    { tipo: 'cesto', faixa: 'casaesq', y: 800, width: 60, height: 60 },
    { tipo: 'carro', faixa: 'ruaesq', y: 1200, width: 60, height: 60 },
    { tipo: 'buraco', faixa: 'ruadir', y: 1200, width: 60, height: 60 },
]

let velocidade = 0;
const maxVelocidade = 10;
let cameraY = 0;
let placar = 0;
let pedido = [];

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
    } else {
        faixaEscolhida = Math.random() < 0.5 ? 'ruaesq' : 'ruadir';
    }

    const largura = 60;
    const limites = faixa[faixaEscolhida];
    const x = limites.xInicio + (limites.xFim - limites.xInicio - largura) / 2;

    obj.push({ tipo, faixaEscolhida, x, y, width: 60, height: 60 });
}

function verificarColisao(player, elemento) {
    const elementoYnatela = elemento.y + cameraY;
    const sobrepoeX = (player.x < elemento.x + elemento.width) && (player.x + player.width > elemento.x);
    const sobrepoeY = (player.y < elementoYnatela + elemento.height) && (player.y + player.height > elementoYnatela);
    const colidiu = sobrepoeX && sobrepoeY;

    return colidiu;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        if (colidiu) {
            if (elemento.tipo === 'cesto') {
                placar = placar + 100;
            } else if (elemento.tipo === 'carro') {
                placar = 0;
            } else if (elemento.tipo === 'buraco') {
                placar = 0;
            }
            ctx.fillText('Placar:' + placar, 170, 30);
        }

        ctx.fillRect(elemento.x, elemento.y + cameraY, 60, 60);
    });

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    const ultimoElemento = obj[obj.length - 1];
    if (ultimoElemento.y - cameraY < 1000) {
        gerarElemento(ultimoElemento.y - 300);
    }

    obj = obj.filter(elemento => elemento.y + cameraY < canvas.height + 100);

    pedido.forEach(item => {
        if (item.direcao === 'esquerda') {
            item.x = item.x - 5;
        } else {
            item.x = item.x + 5;
        }

        ctx.fillStyle = 'yellow';
        ctx.fillRect(item.x, item.y, item.width, item.height);
    })

    pedido.forEach(item => {
        obj.forEach(elemento => {
            const colidiuComCesto = verificarColisao(item, elemento)
            if (colidiuComCesto && elemento.tipo === 'cesto') {
                placar = placar + 100;
                item.acertou = true;
            }
        })
    })

    pedido = pedido.filter(item => item.acertou != true);

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Placar:' + placar, 170, 30);

    velocidade = Math.min(3 + Math.floor(placar / 1000), maxVelocidade);
    console.log(velocidade);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const posicaoRelativa = e.clientX - rect.left;
    player.x = posicaoRelativa;

    if (player.x < 140) {
        player.x = 140;
    }

    if (player.x > 300) {
        player.x = 300;
    }
})

canvas.addEventListener('click', (e) => {
    let direction

    if (player.x < canvas.width / 2) {
        direction = 'esquerda';
    } else {
        direction = 'direita';
    }

    pedido.push({
        x: player.x,
        y: player.y,
        width: 10,
        height: 10,
        direcao: direction
    })
})