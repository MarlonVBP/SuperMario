// pegando as classes das imagens
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
const restart_button = document.querySelector('#new_game');
const end_game_message = document.querySelector('.end_game_message');
const pontuacaoFinal = document.querySelector('.pontuacao');
const nick_user = document.querySelector('#nick');
const clouds = document.querySelector('.clouds');
const clouds_ = document.querySelector('.clouds_');
const clouds__ = document.querySelector('.clouds__');
let pontuacao = 0;
let vivo = true;
let timePipe = 1.5;
let timeCloud = 18;
let timeCloud_ = 16;
let timeCloud__ = 12;
let timeCloud___ = 10;
let jogadas = [];
let saltar = true;

// Fazendo a animação de pular
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
        scores();
        saltar = true;
    }, 500);
}

function scores() {
    if (vivo == true) {
        pontuacao += 1;
        score.textContent = `score:${pontuacao}`;
    }
}

const loop = setInterval(() => {
    // Pegando as posições das imagens
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    // O '+' antes de uma string, tenta convertela para numero se posivel.

    // fim de jogo
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Posição do pipe
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        // Posião do mario
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        // Animação de derrota
        mario.src = '../assets/imagens/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'
        clearInterval(loop);
        endGame();
    } else {
        if (timePipe >= 0.9) {
            timePipe -= 0.0004;
            pipe.style.animation = `pipe-animation ${timePipe}s infinite linear`;
            if (timePipe == 0.9) {
                setTimeout(() => {
                    timePipe = 1.1;
                })
            }

            if (timeCloud >= 14) {
                timeCloud -= 0.005;
                clouds.style.animation = `clouds-animation ${timeCloud}s infinite linear`;
            }

            if (timeCloud_ >= 12) {
                timeCloud_ -= 0.005;
                clouds_.style.animation = `clouds-animation ${timeCloud_}s infinite linear`;
            }

            if (timeCloud__ >= 8.5) {
                timeCloud__ -= 0.005;
                clouds__.style.animation = `clouds-animation ${timeCloud__}s infinite linear`;
            }

            if (timeCloud___ >= 7) {
                timeCloud___ -= 0.005;
                clouds_.style.animation = `clouds-animation ${timeCloud___}s infinite linear`;
            }

        }
    }
}, 10);

restart_button.addEventListener('click', () => {
    if ((nick_user.value).length > 0) {
        jogadas = JSON.parse(localStorage.getItem('jogadas')) ? JSON.parse(localStorage.getItem('jogadas')) : [];
        jogadas.push({
            jogador: nick_user.value,
            pontuacao: pontuacao
        })
        jogadas.sort((a, b) => b.pontuacao - a.pontuacao);
        localStorage.setItem('jogadas', JSON.stringify(jogadas))
    }

});

function endGame() {
    vivo = false;

    setTimeout(() => {
        end_game_message.classList.add('show');
        pontuacaoFinal.textContent = `Sua pontução foi: ${pontuacao}`;
    }, 1300);

};

function reset() {
    // Recarrega a página
    location.reload();
}

document.addEventListener('keydown', (e) => {
    if (e.key == ' ' && saltar == true || e.key == 'ArrowUp' && saltar == true) {
        jump();
        saltar = false;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && vivo == false) {
        reset();
    }
});