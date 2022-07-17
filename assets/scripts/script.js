const timerDisplay = document.querySelector('#temporizador-display');

const horasEl = document.querySelector('#horas');
const minutosEl = document.querySelector('#minutos');
const segundosEl = document.querySelector('#segundos');
const milesegundosEl = document.querySelector('#milisegundos');

const iniciar = document.querySelector('#iniciar');
const pausar = document.querySelector('#pausar');
const capturar = document.querySelector('#capturar');
const resetar = document.querySelector('#resetar');

let temporizador = { tempoDecorrido: 0 };

iniciar.addEventListener('click', () => {
    clearInterval(temporizador.cron);
    iniciarTimer();
    alterarVisibilidadeBotao();
});

pausar.addEventListener('click', () => {
    clearInterval(temporizador.cron);
    temporizador.elapsedTime += Date.now() - temporizador.startTime;
    alterarVisibilidadeBotao();
});

resetar.addEventListener('click', () => {
    clearInterval(temporizador.cron);
    temporizador.tempoDecorrido = 0;
    temporizador.dataInicial = null;
    iniciar.classList.remove('hide');
    pausar.classList.add('hide');
    escreverTemporizador(0, 0, 0, 0);
});

function alterarVisibilidadeBotao() {
    if (iniciar.classList.contains('hide')) {
        iniciar.classList.remove('hide');
        pausar.classList.add('hide');
    } else {
        iniciar.classList.add('hide');
        pausar.classList.remove('hide');
    }
}

function iniciarTimer() {
    temporizador.dataInicial = Date.now();
    temporizador.cron = setInterval(() => {
        const tempoDecorrido = Date.now() - temporizador.dataInicial + temporizador.tempoDecorrido
        const milisegundos = parseInt((tempoDecorrido % 1000))
        const segundos = parseInt((tempoDecorrido / 1000) % 60)
        const minutos = parseInt((tempoDecorrido / (1000 * 60)) % 60)
        const horas = parseInt((tempoDecorrido / (1000 * 60 * 60)) % 24);
        escreverTemporizador(horas, minutos, segundos, milisegundos)
    }, 10);
}

function escreverTemporizador(horas, minutos, segundos, milisegundos) {
    const h = horas < 10 ? "0" + horas : horas;
    const m = minutos < 10 ? "0" + minutos : minutos;
    const s = segundos < 10 ? "0" + segundos : segundos;
    const ms = milisegundos < 10 ? "00" + milisegundos : milisegundos < 100 ? "0" + milisegundos : milisegundos;

    horasEl.innerHTML = h;
    minutosEl.innerHTML = m;
    segundosEl.innerHTML = s;
    milesegundosEl.innerHTML = ms;
}
