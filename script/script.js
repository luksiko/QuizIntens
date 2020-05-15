document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        questionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
        closeModal = document.getElementById('closeModal');

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  });

  const playTest = () => {
    const renderQuestions = () => {
      let burgerImg = './image/burger.png',
        burgerName = 'Стандарт';
      questionTitle.textContent = 'Какого цвета бургер вы хотите?';
      formAnswers.innerHTML = `
      <div class="answers-item d-flex flex-column">
        <input type="radio" id="answerItem1" name="answer" class="d-none">
        <label for="answerItem1" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${burgerImg}" alt="burger">
          <span>${burgerName}</span>
        </label>
      </div>
     `;
    };
    renderQuestions();
  };


});