// Наведение на фото команды
const changeCommandPhoto = () => {
	const command = document.querySelectorAll(`.command__photo`);
	const togglePhoto = event => {
		const altImgSrc = event.target.getAttribute(`src`);
		event.target.setAttribute(`src`, event.target.dataset.img);
		event.target.dataset.img = altImgSrc;
	};
	command.forEach(commandMember => {
		commandMember.addEventListener(`mouseenter`, togglePhoto);
		commandMember.addEventListener(`mouseleave`, togglePhoto);
	});
};

export default changeCommandPhoto;
