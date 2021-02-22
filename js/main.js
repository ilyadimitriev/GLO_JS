`use strict`;

function getMessage(date) {
	const textHello = document.querySelector('.text-hello'),
		textDayOfWeek = document.querySelector('.text-day_of_week'),
		textTime = document.querySelector('.text-time'),
		textTillNewYear = document.querySelector('.text-till_new_year');

	function getTime(date) {
		const partOfDay = [`Доброе утро`, `Добрый день`, `Добрый вечер`, `Доброй ночи`],
			dayOfWeek = [`Воскресенье`, `Понедельник`, `Вторник`, `Среда`, `Четверг`, `Пятница`, `Суббота`],
			time = date.toLocaleTimeString(`en`),
			newYearDate = new Date(date.getFullYear() + 1, 0, 1).getTime(),
			daysTillNewYear = Math.floor((newYearDate - date.getTime()) / 1000 / 60 / 60 / 24);
		return { partOfDay, dayOfWeek, time, daysTillNewYear };
	}

	function writeDate(date) {
		const data = getTime(date);
		let dayWord = ``;
		if (data.daysTillNewYear % 100 <= 4 || data.daysTillNewYear % 100 >= 21) {
			dayWord = ((data.daysTillNewYear % 10) >= 2 && (data.daysTillNewYear % 10) <= 4) ?  `дня` :
				((data.daysTillNewYear % 10) === 1) ? `день` : `дней`;
		} else {
			dayWord = `дней`;
		}
		textHello.textContent = (date.getHours() >= 5 && date.getHours() <= 11) ? data.partOfDay[0] :
			(date.getHours() >= 12 && date.getHours() <= 17) ? data.partOfDay[1] :
				(date.getHours() >= 18 && date.getHours() <= 23) ? data.partOfDay[2] : data.partOfDay[3];
		textDayOfWeek.textContent = `Сегодня: ` + data.dayOfWeek[date.getDay()];
		textTime.textContent = `Текущее время: ` + data.time;
		textTillNewYear.textContent = `До нового года осталось: ${data.daysTillNewYear} ${dayWord}`;
	}
	writeDate(date);
}

getMessage(new Date());
