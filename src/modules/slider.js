// Слайдер
const  slider = () => {
	const slide = document.querySelectorAll(`.portfolio-item`),
		slider = document.querySelector(`.portfolio-content`);

	let currentSlide = 0,
		interval,
		dot;

	// Добавить точки по числу слайдов
	const addDots = () => {
		let amount = slide.length;
		const newDot = document.createElement(`li`),
			portfolioDots = document.querySelector(`.portfolio-dots`);

		newDot.classList.add(`dot`);
		do {
			portfolioDots.insertAdjacentElement("beforeend", newDot.cloneNode());
			amount--;
		} while (amount > 0);
		dot = document.querySelectorAll(`.dot`);
		dot[0].classList.add(`dot-active`);
	};
	addDots();

	const prevSlide = (elem, index, strClass) => {
		elem[index].classList.remove(strClass);
	};
	const nextSlide = (elem, index, strClass) => {
		elem[index].classList.add(strClass);
	};
	const autoPlaySide = () => {
		prevSlide(slide, currentSlide, `portfolio-item-active`);
		prevSlide(dot, currentSlide, `dot-active`);
		currentSlide++;
		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		nextSlide(slide, currentSlide, `portfolio-item-active`);
		nextSlide(dot, currentSlide, `dot-active`);
	};
	const startSlide = (time = 3000) => {
		interval = setInterval(autoPlaySide, time);
	};
	const stopSlide = () => {
		clearInterval(interval);
	};
	slider.addEventListener(`click`, event => {
		event.preventDefault();
		const target = event.target;
		if (!target.matches(`.portfolio-btn, .dot`)) {
			return;
		}
		prevSlide(slide, currentSlide, `portfolio-item-active`);
		prevSlide(dot, currentSlide, `dot-active`);

		if (target.matches(`#arrow-right`)) {
			currentSlide++;
		} else if (target.matches(`#arrow-left`)) {
			currentSlide--;
		} else if (target.matches(`.dot`)) {
			dot.forEach((elem, index) => {
				if (elem === target) {
					currentSlide = index;
				}
			});
		}

		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		if (currentSlide < 0) {
			currentSlide = slide.length - 1;
		}
		nextSlide(slide, currentSlide, `portfolio-item-active`);
		nextSlide(dot, currentSlide, `dot-active`);
	});
	slider.addEventListener(`mouseover`, event => {
		if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
			stopSlide();
		}
	});
	slider.addEventListener(`mouseout`, event => {
		if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
			startSlide(1500);
		}
	});
	startSlide(1500);
};

export default slider;
