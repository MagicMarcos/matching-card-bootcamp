const cards = document.querySelectorAll('.card');
function shuffleCards() {
	let city1 = 'boston',
		city2 = 'shanghai',
		city3 = 'milan',
		city4 = 'london',
		city5 = 'paris',
		cityNames = [city1, city2, city3, city4, city5];

	cityNames = cityNames.concat(cityNames).sort(() => Math.random() - 0.5);
	cards.forEach((el, i) => {
		el.dataset.value = cityNames[i];
		console.log('dataset value = ' + el.dataset.value);
	});
}

shuffleCards();

cards.forEach(el => el.addEventListener('click', checkForMatch));

let clicked = [];
let count = 0;
function checkForMatch(click) {
	click.target.src = `img/${click.target.dataset.value}.jpeg`;
	// store clicked element in an array
	clicked.push(click.target);
	if (clicked.length === 2) {
		if (clicked[0].dataset.value === clicked[1].dataset.value) {
			count++;
		} else {
			setTimeout(() => {
				clicked.forEach(el => (el.src = `img/test.png`));
				console.log('changing');
			}, 800);
			console.log('change');
		}
		setTimeout(() => {
			clicked = [];
		}, 801);
	}
	console.log('clicked array', clicked, click.target.dataset.value);

	if (count === 5) {
		setTimeout(() => {
			alert('youWin');
		}, 1000);
	}
}
