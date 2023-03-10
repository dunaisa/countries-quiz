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

const zoomBtnPlus = document.querySelector('.zoom__btn_type_plus');
const zoomBtnMinus = document.querySelector('.zoom__btn_type_minus');
const map = document.querySelector('.map');
// map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(1.5)';

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

// ???????????????????? ????????????

// ???????????????? ???????????? ?? ????????????

let newDefaultArray, currentCountryIndex;

let totalRightAnswers = [];

newDefaultArray = defaultList.sort(() => Math.random() - 0.5);
currentCountryIndex = 0;

function handleStartGame() {
  countryName.textContent = newDefaultArray[currentCountryIndex];
};

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

// ???????????????? ?????????????????? ???????????? ?? ???????????? ?? ??????????????

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
    // ???????????????????? ???????????? ?????????? ????????????????
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

// function addOnWheel(map, handler) {
//   if (map.addEventListener) {
//     if ('onwheel' in document) {
//       // IE9+, FF17+
//       map.addEventListener("wheel", handler);
//     } else if ('onmousewheel' in document) {
//       // ???????????????????? ?????????????? ??????????????
//       map.addEventListener("mousewheel", handler);
//     } else {
//       // 3.5 <= Firefox < 17, ?????????? ???????????? ?????????????? DOMMouseScroll ??????????????????
//       map.addEventListener("MozMousePixelScroll", handler);
//     }
//   } else { // IE8-
//     map.attachEvent("onmousewheel", handler);
//   }
// }

// let scale = 1;

// addOnWheel(map, function (e) {

//   let delta = e.deltaY || e.detail || e.wheelDelta;

//   // ???????????????????????????? ?????? ???????????? CSS
//   if (delta > 0) scale += 0.05;
//   else scale -= 0.05;

//   map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';

//   // ?????????????? ??????????????????
//   e.preventDefault();
// });

// const container = document.querySelector('.container');
// let startY;
// let startX;
// let scrollLeft;
// let scrollTop;
// let isDown;

// map.addEventListener('mousedown', e => mouseIsDown(e));
// map.addEventListener('mouseup', e => mouseUp(e))
// map.addEventListener('mouseleave', e => mouseLeave(e));
// map.addEventListener('mousemove', e => mouseMove(e));

// function mouseIsDown(e) {
//   console.log('ok')
//   isDown = true;
//   startY = e.pageY - map.offsetTop;
//   startX = e.pageX - map.offsetLeft;
//   scrollLeft = map.scrollLeft;
//   scrollTop = map.scrollTop;
// }
// function mouseUp(e) {
//   console.log('ok')
//   isDown = false;
// }
// function mouseLeave(e) {
//   isDown = false;
// }
// function mouseMove(e) {
//   if (isDown) {
//     e.preventDefault();
//     //Move vertcally
//     const y = e.pageY - map.offsetTop;
//     const walkY = y - startY;
//     map.scrollTop = scrollTop - walkY;

//     //Move Horizontally
//     const x = e.pageX - map.offsetLeft;
//     const walkX = x - startX;
//     map.scrollLeft = scrollLeft - walkX;

//   }
// }
