// Ограничение на ввод символов в полях ввода имени, сообщения, телефона, эл. почты и данных калькулятора
const restrictInput = () => {
	document.addEventListener(`input`, event => {
		const target = event.target.closest(`input`);
		if (target) {
			if (target.classList.contains(`calc-item`)) {
				target.value = target.value.replace(/[^\d]/g, ``);
				return;
			}
			switch (target.getAttribute(`name`)) {
			case `user_name`:
				target.value = target.value.replace(/[^а-яё ]/gi, ``);
				break;
			case `user_message`:
				target.value = target.value.replace(/[^а-яё .,!?;:'"-]/gi, ``);
				break;
			case `user_email`:
				target.value = target.value.replace(/[^\w'*~!.@-]/gi, ``);
				break;
			case 'user_phone':
				target.value = target.value.replace(/[^\d+]/gi, ``);
				break;
			}
		}
	});
};

export default restrictInput;
