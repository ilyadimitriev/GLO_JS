import smoothScroll from './smoothScroll';
// Управление меню
const toggleMenu = () => {
	const menu = document.querySelector(`menu`);

	const handlerMenu  = () => {
		menu.classList.toggle(`active-menu`);
	};

	document.querySelector(`body`).addEventListener(`click`, event => {
		let target;
		if (menu.classList.contains(`active-menu`)) {
			target = event.target.closest(`.active-menu`);
			if (!target || event.target.matches(`.active-menu a`)) {
				if (event.target.matches(`.active-menu>ul>li>a`)) {
					smoothScroll(event);
				}
				handlerMenu();
			}
		} else {
			target = event.target.closest(`.menu`);
			if (target) {
				handlerMenu();
			}
		}
	});
};

export default toggleMenu;
