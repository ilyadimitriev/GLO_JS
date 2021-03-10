// Калькулятор
const calc = (price = 100) => {
	const calcBlock = document.querySelector(`.calc-block`),
		calcType = document.querySelector(`.calc-type`),
		calcSquare = document.querySelector(`.calc-square`),
		calcDay = document.querySelector(`.calc-day`),
		calcCount = document.querySelector(`.calc-count`);

	// Анимация смены числа
	const changeSum = newNum => {
		const totalValue = document.getElementById(`total`),
			difference = Math.abs(newNum - +totalValue.textContent),
			animationSteps = 20;
		let animationDone = false,
			animationId;
		const animate = () => {
			animation();
			start();
		};
		const animation = () => {
			if (+totalValue.textContent < newNum) {
				totalValue.textContent = Math.floor(+totalValue.textContent + (difference / animationSteps));
				if (+totalValue.textContent >= newNum) {
					totalValue.textContent = newNum;
					cancelAnimationFrame(animationId);
					animationDone = true;
				}
			} else if (+totalValue.textContent > newNum) {
				totalValue.textContent = Math.floor(+totalValue.textContent - (difference / animationSteps));
				if (+totalValue.textContent <= newNum) {
					totalValue.textContent = newNum;
					cancelAnimationFrame(animationId);
					animationDone = true;
				}
			}
		};
		const start = () => {
			if (!animationDone) {
				animationId = requestAnimationFrame(animate);
			}
		};
		start();
	};
	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = +calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}
		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}
		if (typeValue && squareValue) {
			total = Math.round(price * typeValue * squareValue * countValue * dayValue);
			changeSum(total);
		} else {
			changeSum(total);
		}
	};
	// Реализуем debounce, здесь сохраняем таймер до выполнения countSum
	let funcDelay;
	calcBlock.addEventListener(`input`, event => {
		const target = event.target;
		if (target.matches(`select`) || target.matches(`input`)) {
			// Отсчет времени до выполнения countSum сбрасывается, если он уже начинался
			clearTimeout(funcDelay);
			// Задаем задержку перед выполнением функции countSum
			funcDelay = setTimeout(countSum, 300);
		}
	});
};

export default calc;
