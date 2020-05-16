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
    prevButton = document.getElementById('prev');

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

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });
  // Close Button
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
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

  // Block "Chose type of burger" in Modal 
  const playTest = () => {

    let numberQuestion = 0;
    const renderAnswers = (index) => {

      questions[index].answers.forEach((answer) => {

        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
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
      questionTitle.textContent = questions.question;
      // проверяем на количество и делаем кнопки next и prev неактивными
      if (numberQuestion < 1) {
        prevButton.disabled = "disabled";
      } else if (numberQuestion > (questions.length - 2)) {
        nextButton.disabled = "disabled";
      } else {
        prevButton.disabled = "";
        nextButton.disabled = "";
      }
      renderAnswers(indexQuestion);
    };

    renderQuestions(numberQuestion);

    nextButton.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

  };
});