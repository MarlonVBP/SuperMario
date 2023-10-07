const modal = document.querySelector('.modal__placar');
const placar = document.querySelector('.content');
const button_close = document.querySelector('.close_modal');
const button_placar = document.querySelector('.nav__button_placar');
let jogadas = [];

button_close.addEventListener('click', () => {
    location.reload();
});

button_placar.addEventListener('click', () => {
    jogadas = JSON.parse(localStorage.getItem('jogadas')) ? JSON.parse(localStorage.getItem('jogadas')) : [];
    jogadas.forEach(element => {
        placar.innerHTML += `
        <li class="table-row">
        <div class="col left">${element.jogador}</div>
        <div class="col">${element.pontuacao}</div>
        </li>
        `;
    })
    modal.style.display = 'flex';
});

