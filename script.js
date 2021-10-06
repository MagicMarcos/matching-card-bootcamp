const cards = document.querySelectorAll('.card');

function shuffleCards() {
	let house1 = 'houseTully',
		house2 = 'houseBaratheon',
		house3 = 'houseLannister',
		house4 = 'houseStark',
		house5 = 'houseTargaryen',
		houses = [house1, house2, house3, house4, house5];
	houses = houses.concat(houses).sort(() => Math.random() - 0.5);
	cards.forEach((card, i) => {
		card.dataset.value = houses[i];
	});
}

shuffleCards();

let timeLeft = 15;
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', gameBegin);
let gameWon = false;

function gameBegin() {
	cards.forEach(el => {
		el.addEventListener('click', checkForMatch);
	});
	startBtn.classList.add('hidden');
	document.getElementById('countdown').classList.remove('hidden');
	const gameTimer = setInterval(() => {
		if (timeLeft <= -1) {
			cards.forEach(el => {
				el.removeEventListener('click', checkForMatch);
			});
			clearInterval(gameTimer);
			if (gameWon === false) {
				alert('You Lose');
			}

			document.getElementById('countdown').classList.add('hidden');
			document.getElementById('reset').classList.remove('hidden');
			return;
		} else {
			document.getElementById('countdown').innerText = timeLeft;
		}
		timeLeft--;
	}, 1000);
}

let clicked = [];
let count = 0;
function checkForMatch(click) {
	click.target.src = `img/${click.target.dataset.value}.png`;

	clicked.push(click.target);

	if (clicked.length === 2) {
		if (
			clicked[0].dataset.value === clicked[1].dataset.value &&
			clicked[0].classList !== clicked[1].classList
		) {
			clicked.forEach(el => el.removeEventListener('click', checkForMatch));
			count++;
		} else {
			setTimeout(() => {
				clicked.forEach(el => {
					el.src = `img/cardFront.png`;
				});
			}, 300);
		}
		setTimeout(() => {
			clicked = [];
		}, 301);
	} else if (clicked.length > 2) {
		clicked.forEach(el => {
			el.src = `img/cardFront.png`;
		});
		clicked = [];
	}

	if (count === 5) {
		gameWon = true;
		setTimeout(() => {
			alert('You Win!');
			document.getElementById('countdown').classList.add('hidden');
			document.getElementById('reset').classList.remove('hidden');
		}, 310);
	}
}

document
	.getElementById('reset')
	.addEventListener('click', () => location.reload());
