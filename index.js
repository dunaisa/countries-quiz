const defaultList = [
  'Albania',
  'Andorra',
  'Austria',
  'Belgium',
  'Bulgaria',
  'Bosnia and Herzegovina',
  'Belarus',
  'Switzerland',
  'Czech Republic',
  'Germany',
  'Denmark',
  'Estonia',
  'Finland',
  'United Kingdom',
  'Greece',
  'Croatia',
  'Hungary',
  'Ireland',
  'Iceland',
  'Italy',
  'Kosovo',
  'Lithuania',
  'Luxembourg',
  'Latvia',
  'Moldova',
  'Montenegro',
  'Netherlands',
  'North Macedonia',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Sweden',
  'Ukraine',
  'France',
  'Spain'
];

// const defaultList = [
//   'Albania',
//   'Andorra',
//   'Austria',
//   'Sweden',
//   'Ukraine',
//   'France',
//   'Spain'

// ];

const colors = ['#6B4E71', '#3A4454', '#53687E', '#4281A4', '#48A9A6', '#C1666B', '#D4B483'];

const animation = document.getElementById('animation');

const countryName = document.querySelector('.container__form-country-name');

const countriesClassName = document.getElementsByClassName('country');
const countriesCheckedClassName = document.getElementsByClassName('country_type_checked');

let matchCountryName, matchCountry;

const button = document.querySelector('.container__form-btn');
const startGameBtn = document.querySelector('.container__start-wrapper-btn');
const buttonStartWrapper = document.querySelector('.container__start-wrapper');
const buttonStartText = document.querySelector('.container__start-wrapper-btn-text');
const questionForm = document.querySelector('.container__form');

const resultContainer = document.querySelector('.container__result-wrapper');
const totalRightAnswersText = document.querySelector('.container__result-percent');
const restartGameBtn = document.querySelector('.container__result-btn');

const progressBar = document.querySelector('.circular-progress');
const progressBarPercent = document.querySelector('.circular-progress__percent');




for (i = 0; countriesClassName.length > i; i++) {
  countriesClassName[i].addEventListener('click', function () {
    // console.log(countriesCheckedClassName[0])
    let currentActive = countriesCheckedClassName[0];
    // console.log(currentActive)
    if (currentActive) {
      currentActive.classList.remove("country_type_checked");
      button.classList.remove("container__form-btn_type_active");
    };
    if (currentActive !== this) {
      this.classList.add("country_type_checked");
      button.classList.add("container__form-btn_type_active");
      matchCountry = this;

      matchCountryName = this.attributes.name.nodeValue;
      console.log(matchCountryName)
      return matchCountryName;
    };
  });
};

// Перемешали страны

// Записали страну в вопрос

let newDefaultArray, currentCountryIndex;

let totalRightAnswers = [];

newDefaultArray = defaultList.sort(() => Math.random() - 0.5);
currentCountryIndex = 0;

function handleStartGame() {
  countryName.textContent = newDefaultArray[currentCountryIndex];
};

// function setNextCountry() {
//   if (currentCountryIndex === 39) {
//     showResult();
//   } else {
//     currentCountryIndex = currentCountryIndex + 1;
//     renderQuestion(currentCountryIndex);
//   }
// };

function setNextCountry() {
  console.log(currentCountryIndex)
  console.log(newDefaultArray.length - 1)
  if (currentCountryIndex !== newDefaultArray.length - 1) {

    currentCountryIndex = currentCountryIndex + 1;
    countryName.textContent = newDefaultArray[currentCountryIndex];

  } else {

    showResult();
  }
};

function showResult() {
  console.log('Last country')

  button.classList.add('container__form-btn_type_hidden');
  questionForm.classList.add('container__form_type_hidden');

  resultContainer.classList.remove('container__result-wrapper_type_hidden')
  totalRightAnswersText.textContent = `${totalRightAnswers.length}`;

  let progressMinValue = 0;
  let progressMaxValue = totalRightAnswers.length;
  let progressAnimationSpeed = 50;

  let progress = setInterval(() => {
    progressMinValue++;
    progressBarPercent.textContent = `${Math.round((progressMinValue / defaultList.length) * 100)}%`;

    // progressBarPercent.textContent = `${progressMinValue}%`;

    progressBar.style.background = `conic-gradient(
      #3a4454 ${(progressMinValue * 100 / defaultList.length) * 3.6}deg,
      #f5f0fd ${(progressMinValue * 100 / defaultList.length) * 3.6}deg
      )`;

    // console.log(progressBar.style)
    if (progressMinValue === progressMaxValue) {
      clearInterval(progress)
    }
  }, progressAnimationSpeed)
}

// Сравнили выбранную страну и страну в вопросе

function compareAnswer() {


  if (newDefaultArray[currentCountryIndex] === matchCountryName) {
    matchCountry.classList.remove('country_type_checked');

    // matchCountry.classList.add('country_type_match');
    matchCountry.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)])
    totalRightAnswers.push(matchCountryName)
    console.log(totalRightAnswers)
    // return true
  } else {
    matchCountry.classList.remove('country_type_checked');
    // return false
  }
};

startGameBtn.addEventListener('click', function () {

  buttonStartText.textContent = 'Loading...';

  animation.classList.remove('fill__animation_type_hidden');

  setTimeout(function () {
    // уменьшение кнопки после анимации
    buttonStartWrapper.classList.add('container__start-wrapper_type_vanish');
  }, 3900);

  setTimeout(function () {

    buttonStartWrapper.classList.add('container__start-wrapper_type_hidden');
    button.classList.remove('container__form-btn_type_hidden');
    questionForm.classList.remove('container__form_type_hidden');
  }, 4200);

  handleStartGame();
});

button.addEventListener('click', function () {
  button.classList.remove("container__form-btn_type_active");

  compareAnswer();
  setNextCountry();
});

restartGameBtn.addEventListener('click', function () {
  history.go();
});

