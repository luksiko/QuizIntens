// обработчик событий, отслеживет загузку контента HTML
document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	const btnOpenModal = document.getElementById('btnOpenModal'),
		modalBlock = document.getElementById('modalBlock'),
		questionTitle = document.getElementById('question'),
		formAnswers = document.getElementById('formAnswers'),
		modalWrap = document.querySelector('.modal'),
		closeModal = document.getElementById('closeModal'),
		burgerBtn = document.getElementById('burger'),
		nextButton = document.getElementById('next'),
		prevButton = document.getElementById('prev'),
		sendButton = document.getElementById('send'),
		modalDialog = document.querySelector('.modal-dialog'),
		modalTitle = document.querySelector('.modal-title');

	const getData = () => {
		formAnswers.innerHTML = loader;
		setTimeout(() => {
			playTest();

		}, 2000)
	};

// скин лоадера с стороннего сайта
	let loader = `
	<style type="text/css">#hellopreloader>p{display:none;}#hellopreloader_preload{display: block;position: fixed;z-index: 99999;top: 0;left: 0;width: 100%;height: 100%;min-width: 1000px;background: #E4F1FE url(http://hello-site.ru//main/images/preloads/puff.svg) center center no-repeat;background-size:100px;}</style>
	<div id="hellopreloader_preload"></div><p><a href="http://hello-site.ru">Hello-Site.ru. Бесплатный конструктор сайтов.</a></p>
	`;

	// АНИМАЦИЯ МОДАЛКИ
	let count = -100;
	modalDialog.style.top = count + "%";

	const animateModal = () => {
		modalDialog.style.top = count + "%";
		count += 3;

		if (count < 0) {
			requestAnimationFrame(animateModal);
		} else {
			count = -100;
		}
	};

	//  ОБРАБОТЧИКИ событий открытий\закрытий модального окна
	btnOpenModal.addEventListener('click', () => {

		requestAnimationFrame(animateModal); // Вызов АНИМАЦИИ МОДАЛКИ

		modalBlock.classList.add('d-block');
		getData();
	});
	// Close Button
	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block');
		burgerBtn.classList.remove('active');
	});

	burgerBtn.style.display = 'none';
	// адаптивность через значение clientWidth 
	let clientWidth = document.documentElement.clientWidth;
	// перед загрузкой страницы проверяем значение экрана для бургера
	if (clientWidth < 753) {
		burgerBtn.style.display = 'flex';
	} else {
		burgerBtn.style.display = 'none';
	}
	// при ресайзе проверяем экран
	window.addEventListener('resize', function () {
		let clientWidth = document.documentElement.clientWidth;

		if (clientWidth < 753) {
			burgerBtn.style.display = 'flex';
		} else {
			burgerBtn.style.display = 'none';
		}
	});
	// кнопка бургера, 
	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.add('active');
		modalBlock.classList.add('d-block');
		playTest();
	});

	// дилигирование Клик на пустом месте закрывает форму
	document.addEventListener('click', (event) => {
		if (!event.target.closest('.modal-dialog') &&
			!event.target.closest('.openModalButton') &&
			!event.target.closest('.burger')) {
			modalBlock.classList.remove('d-block');
			burgerBtn.classList.remove('active');
		}
	});

	// Block "Chose type of burger" in Modal (функция запуска тестирования)
	const playTest = () => {

		const finalAnswers = [];
		const obj = {};

		let numberQuestion = 0;
		modalTitle.textContent = 'Ответь на вопрос';

		// функция рендеринга ответов и динамического вывода на страницу 
		const renderAnswers = (index) => {

			// карточка вопроса. Проходим циклом по массиву и выводим в верстку
			questions[index].answers.forEach((answer) => {
				const answerItem = document.createElement('div');
				answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
				answerItem.innerHTML = `
					<input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value = "${answer.title}">
					<label for="${answer.title}" class="d-flex flex-column justify-content-between">
						<img class="answerImg" src="${answer.url}" alt="burger">
					<span>${answer.title}</span>
					</label>
		`;
				formAnswers.appendChild(answerItem);
			});
		};
		// собираем карточку вопроса
		const renderQuestions = (indexQuestion) => {
			formAnswers.innerHTML = '';
			// проверяем на количество и делаем кнопки next и prev неактивными
			switch (true) {
				case (numberQuestion === 0):
					renderAnswers(indexQuestion);
					prevButton.disabled = "disabled";
					break;
				case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
					renderAnswers(indexQuestion);
					questionTitle.textContent = `${questions[indexQuestion].question}`;
					prevButton.disabled = "";
					nextButton.disabled = "";
					sendButton.classList.add('d-none');
					break;
				case (numberQuestion === questions.length):
					prevButton.classList.add('d-none');
					nextButton.classList.add('d-none');
					sendButton.classList.remove('d-none');
					modalTitle.textContent = '';
					questionTitle.textContent = '';
					formAnswers.innerHTML = `
					<div class="form-group">
						<label for = "numberPhone"> Enter your number </label>
						<input type="phone" class="form-control" id="numberPhone" placeholder="Phone number">
					</div>	
					`;
					// Запрет на ввод в строку телефона других символов кроме цифр и +-
					const numberPhone = document.getElementById('numberPhone');
					numberPhone.addEventListener('input', (event) => {
						event.target.value = event.target.value.replace(/[^0-9+-]/, ''); // ругалярное выражение
					});

					break;
				case (numberQuestion === questions.length + 1):
					formAnswers.textContent = 'Спасибо за пройденный тест!';
					prevButton.classList.add('d-none');
					nextButton.classList.add('d-none');
					for (let key in obj) {
						let newObj = {};
						newObj[key] = obj[key];
						finalAnswers.push(newObj);
					}

					setTimeout(() => {
						modalBlock.classList.remove('d-block');
						burgerBtn.classList.remove('active');
						prevButton.disabled = "";
						nextButton.disabled = "";
					}, 2000);
					sendButton.classList.add('d-none');
					break;
			}

		};

		// запуск функции рендеринга
		renderQuestions(numberQuestion);


		const checkAnswer = () => {

			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
			inputs.forEach((input, index) => {
				if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
					obj[index + "_" + questions[numberQuestion].question] = input.value;
				}
				if (numberQuestion === questions.length) {
					obj['Номер телефона'] = input.value;
				}

			});
			console.log(obj);
		};

		// обработчики событий кнопок next и prev
		nextButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
		};
		prevButton.onclick = () => {
			numberQuestion--;
			renderQuestions(numberQuestion);
		};
		sendButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
			console.log(finalAnswers);
		};
	};

});