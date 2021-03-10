//Отправка формы
const sendForm = (formId, formValidator) => {
	const errorMessage = `Что-то пошло не так...`,
		successMessage = `Спасибо, мы скоро с Вами свяжемся!`;

	const form = document.querySelector(`${formId}`);

	const statusMessage = document.createElement(`div`);

	form.addEventListener(`submit`, event => {
		event.preventDefault();
		// FormValidator описан в add-validation.js
		if (formValidator.validate()) { // Если прошли валидацию, то:
			form.appendChild(statusMessage);
			statusMessage.innerHTML = `<div></div><div></div><div></div><div></div>`;
			statusMessage.classList = `lds-ellipsis`;
			const formData = new FormData(form);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error(`Возникла ошибка при отправки данных`);
					} else {
						handleResponse();
					}
				})
				.catch(handleError);
		} else { // Если не прошли валидацию, ничего не запускать
			return;
		}
	});
	const handleResponse = () => {
		statusMessage.style.cssText = `font-size: 2rem; color: #fff;`;
		statusMessage.innerHTML = ``;
		statusMessage.textContent = successMessage;
		// Убираем сообщение по таймауту
		setTimeout(() => {
			statusMessage.style.transition = `1000ms`;
			statusMessage.style.opacity = `0`;
			statusMessage.addEventListener(`transitionend`,
				event => {
					if (event.target.closest(`.popup`)) {
						event.target.closest(`.popup`).style.display = `none`;
					}
					statusMessage.style.cssText = ``;
					statusMessage.remove();
				}, {
					once: true
				});
		}, 3000);
		statusMessage.classList.remove(`lds-ellipsis`);
		form.querySelectorAll(`input`).forEach(input => {
			input.value = ``;
		});
	};
	const handleError = error => {
		statusMessage.style.cssText = `font-size: 2rem;`;
		statusMessage.innerHTML = ``;
		statusMessage.textContent = errorMessage;
		statusMessage.classList.remove(`lds-ellipsis`);
		console.error(error);
	};
	const postData = body =>
		fetch(`server.php`, {
			method: `POST`,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
};

export default sendForm;
