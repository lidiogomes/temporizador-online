const timerDisplay = document.querySelector('#temporizador-display');

const horasEl = document.querySelector('#horas');
const minutosEl = document.querySelector('#minutos');
const segundosEl = document.querySelector('#segundos');
const milesegundosEl = document.querySelector('#milisegundos');
const historicoEl = document.querySelector('#historico');

const iniciar = document.querySelector('#iniciar');
const pausar = document.querySelector('#pausar');
const capturar = document.querySelector('#capturar');
const resetar = document.querySelector('#resetar');

let temporizador = { tempoDecorrido: 0 };
let historico = [];

iniciar.addEventListener('click', () => {
    iniciarTimer();
    alterarVisibilidadeBotao();
});

pausar.addEventListener('click', () => {
    temporizador.tempoDecorrido += Date.now() - temporizador.dataInicial
    clearInterval(temporizador.cron);
    alterarVisibilidadeBotao();
});

resetar.addEventListener('click', () => {
    clearInterval(temporizador.cron);
    temporizador.tempoDecorrido = 0;
    temporizador.dataInicial = null;
    iniciar.classList.remove('hide');
    pausar.classList.add('hide');
    capturar.classList.add('hide')
    resetar.classList.add('hide')
    historicoEl.classList.add('hide');
    historicoEl.innerHTML = '';
    historico = [];
    escreverTemporizador(0, 0, 0, 0);
});

capturar.addEventListener('click', () => {
    const tempoDecorrigo = retornaTempoDecorrido();
    let [horas, minutos, segundos, milisegundos] = calculaTempo(tempoDecorrigo);
    [horas, minutos, segundos, milisegundos] = formataZeros(horas, minutos, segundos, milisegundos);
    historico.unshift(`${horas}:${minutos}:${segundos}.${milisegundos}`);
    historicoEl.classList.remove('hide');
    adicionaHistorico();
});

function alterarVisibilidadeBotao() {
    if (iniciar.classList.contains('hide')) {
        iniciar.classList.remove('hide');
        pausar.classList.add('hide');
        capturar.classList.add('hide');
    } else {
        iniciar.classList.add('hide');
        pausar.classList.remove('hide');
        capturar.classList.remove('hide');
        resetar.classList.remove('hide');
    }
}

function iniciarTimer() {
    temporizador.dataInicial = Date.now();
    temporizador.cron = setInterval(() => {
        const tempoDecorrido = retornaTempoDecorrido();
        const [horas, minutos, segundos, milisegundos] = calculaTempo(tempoDecorrido);
        escreverTemporizador(horas, minutos, segundos, milisegundos)
    }, 10);
}

function retornaTempoDecorrido() {
    return Date.now() - temporizador.dataInicial + temporizador.tempoDecorrido
}

function calculaTempo(tempoDecorrido) {
    const milisegundos = parseInt((tempoDecorrido % 1000))
    const segundos = parseInt((tempoDecorrido / 1000) % 60)
    const minutos = parseInt((tempoDecorrido / (1000 * 60)) % 60)
    const horas = parseInt((tempoDecorrido / (1000 * 60 * 60)) % 24);

    return [horas, minutos, segundos, milisegundos];
}

function escreverTemporizador(horas, minutos, segundos, milisegundos) {
    [h, m, s, ms] = formataZeros(horas, minutos, segundos, milisegundos);

    horasEl.innerHTML = h;
    minutosEl.innerHTML = m;
    segundosEl.innerHTML = s;
    milesegundosEl.innerHTML = ms;
}

function formataZeros(horas, minutos, segundos, milisegundos) {
    const h = horas < 10 ? "0" + horas : horas;
    const m = minutos < 10 ? "0" + minutos : minutos;
    const s = segundos < 10 ? "0" + segundos : segundos;
    const ms = milisegundos < 10 ? "00" + milisegundos : milisegundos < 100 ? "0" + milisegundos : milisegundos;

    return [h, m, s, ms];
}

function adicionaHistorico() {
    const elementoP = document.createElement('p');    
    const textoP = document.createTextNode(`${historico.length}- ${historico[0]}`);
    elementoP.appendChild(textoP);
    historicoEl.prepend(elementoP);
}
