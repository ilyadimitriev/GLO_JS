// Проверка и приведение введенных данных на валидность
const checkInputData = () => {
	document.addEventListener(`blur`, event => {
		const target = event.target.closest(`input`);
		if (target && target.value !== `` && target.getAttribute(`name`)) {
			if (target.getAttribute(`name`).match(/^user_(name|message|email|phone)$/)) {
				target.value = target.value.replace(/^(-| ){1,}|(-| ){1,}$/g, ``);
				target.value = target.value.replace(/-{2,}/g, `-`);
				target.value = target.value.replace(/ {2,}/g, ` `);
			}
			if (target.getAttribute(`name`) === `user_name`) {
				// Создаем массив из отдельных слов
				const words = target.value.match(/[^ |-]{1,}/g);
				words.forEach((word, index) => {
					let regWord;
					// capitalize полученные слова
					word = word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
					if (index === 0) {
						regWord = new RegExp(word, `i`);
					} else if (index === words.length - 1) {
						regWord = new RegExp(word + `$`, `i`);
					} else {
						regWord = new RegExp(`[^а-яё]` + word + `[^а-яё]`, `ig`);
						const newWord = target.value.match(regWord)[0];
						word = newWord.slice(0, 2).toUpperCase() + newWord.slice(2).toLowerCase();
					}
					target.value = target.value.replace(regWord, word);
				});
			}
		}
	}, true);
};

export default checkInputData;
