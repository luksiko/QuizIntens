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
		modalDialog = document.querySelector('.modal-dialog');

	// обьект с вопросами и ответами
	const questions = [{
			question: "Какого цвета бургер?",
			answers: [{
					title: 'Стандарт',
					url: './image/burger.png'
				},
				{
					title: 'Черный',
					url: './image/burgerBlack.png'
				}
			],
			type: 'radio'
		},
		{
			question: "Из какого мяса котлета?",
			answers: [{
					title: 'Курица',
					url: './image/chickenMeat.png'
				},
				{
					title: 'Говядина',
					url: './image/beefMeat.png'
				},
				{
					title: 'Свинина',
					url: './image/porkMeat.png'
				}
			],
			type: 'radio'
		},
		{
			question: "Дополнительные ингредиенты?",
			answers: [{
					title: 'Помидор',
					url: './image/tomato.png'
				},
				{
					title: 'Огурец',
					url: './image/cucumber.png'
				},
				{
					title: 'Салат',
					url: './image/salad.png'
				},
				{
					title: 'Лук',
					url: './image/onion.png'
				}
			],
			type: 'checkbox'
		},
		{
			question: "Добавить соус?",
			answers: [{
					title: 'Чесночный',
					url: './image/sauce1.png'
				},
				{
					title: 'Томатный',
					url: './image/sauce2.png'
				},
				{
					title: 'Горчичный',
					url: './image/sauce3.png'
				}
			],
			type: 'radio'
		}
	];

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
		playTest();
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

		let numberQuestion = 0;

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
			console.log(numberQuestion);
			// проверяем на количество и делаем кнопки next и prev неактивными
			switch (true) {
				case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
					questionTitle.textContent = `${questions[indexQuestion].question}`;
					renderAnswers(indexQuestion);
					prevButton.disabled = "";
					nextButton.disabled = "";
					sendButton.classList.add('d-none');
					break;
				case (numberQuestion === 0):
					console.log("это 0");

					break;
				case (numberQuestion === questions.length):
					nextButton.disabled = "disabled";
					prevButton.disabled = "disabled";
					sendButton.classList.remove('d-none');
					questionTitle.textContent = '';
					formAnswers.innerHTML = `
					<div class="form-group">
						<label for = "numberPhone"> Enter your number </label>
						<input type="phone" class="form-control" id="numberPhone" placeholder="Phone number">
					</div>	
					`;
					break;
				case (numberQuestion === questions.length + 1):
					formAnswers.textContent = 'Спасибо за пройденный тест!';
					setTimeout(() => {
						modalBlock.classList.remove('d-block');
						burgerBtn.classList.remove('active');
					}, 2000);
					sendButton.classList.add('d-none');

					break;
				default:
					nextButton.disabled = "";
					prevButton.disabled = "disabled";
					sendButton.classList.add('d-none');
			}





			/* if (numberQuestion <= 0) {
				prevButton.disabled = "disabled";
				renderAnswers(indexQuestion);
				sendButton.classList.add('d-none');

			} else if (numberQuestion === questions.length) {
				nextButton.disabled = "disabled";
				prevButton.disabled = "disabled";
				sendButton.classList.remove('d-none');

				formAnswers.innerHTML = `
				<div class="form-group">
					<label for = "numberPhone"> Enter your number </label>
					<input type="phone" class="form-control" id="numberPhone" placeholder="Phone number">
				</div>	
				`;

			} else if (numberQuestion === questions.length + 1) {
				formAnswers.textContent = 'Спасибо за пройденный тест!';
				setTimeout(() => {
					modalBlock.classList.remove('d-block');
					burgerBtn.classList.remove('active');
				}, 2000);
			} else {
				renderAnswers(indexQuestion);
				sendButton.classList.add('d-none');

				prevButton.disabled = "";
				nextButton.disabled = "";
			} */


		};

		// запуск функции рендеринга
		renderQuestions(numberQuestion);


		const checkAnswer = () => {
			const obj = {};

			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
			inputs.forEach((input, index) => {
				if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
					obj[index + "_" + questions[numberQuestion].question] = input.value;
				}
				if (numberQuestion === questions.length) {
					obj['Номер телефона'] = input.value;
				}

			});

			finalAnswers.push(obj);
			console.log('finalAnswers: ', finalAnswers);

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

		/* 		document
					.getElementById('formAnswers')
					.addEventListener('click', (event) => {
						console.log(event.target);
					}); */
	};



});