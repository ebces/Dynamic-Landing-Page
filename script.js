const [main] = document.getElementsByTagName('body');
const time = document.querySelector('.clock__time');
const greeting = document.querySelector('.greeting__greeting-type');
const name = document.querySelector('.greeting__name');
const answer = document.querySelector('.objectives__answer');
const wrapper = document.querySelector('.wrapper');

const makeTimeString = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
  const hours12 = hour === 12 ? 12 : hour % 12;
  return hour >= 12 ? `${hours12}:${minutes}:${seconds} PM` : `${hours12}:${minutes}:${seconds} AM`;
};

const changeBackground = (time) => {
  const partOfDay = makeTimeString().slice(-2);
  if (partOfDay === 'AM') {
    time < 6 ? main.style.backgroundImage = 'url("assets/images/night.jpg")'
      : main.style.backgroundImage = 'url("assets/images/morning.jpg")';
  } else {
    (time < 6 || time === 12) ? main.style.backgroundImage = 'url("assets/images/midday.jpg")'
      : main.style.backgroundImage = 'url("assets/images/evening.jpg")';
  }
  if (partOfDay === 'AM') {
    main.style.color = 'white';
  }
};

const changeGreeting = (time) => {
  const partOfDay = makeTimeString().slice(-2);
  if (partOfDay === 'AM') {
    time < 6 ? greeting.textContent = 'Good night,'
      : greeting.textContent = 'Good morning,';
  } else {
    (time < 6 || time === 12) ? greeting.textContent = 'Good afternoon,'
      : greeting.textContent = 'Good evening,';
  }
  if (partOfDay === 'AM' && time < 6) {
    main.style.color = 'white';
  }
};

const setTextValue = (textNode, nameForSave, defaultValue) => {
  textNode.addEventListener('blur', () => {
    localStorage.setItem(nameForSave, textNode.textContent);
  });
  textNode.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      textNode.blur();
    }
  });

  if (!localStorage.getItem(nameForSave)) {
    textNode.textContent = defaultValue;
  } else {
    textNode.textContent = localStorage.getItem(nameForSave);
  }
};

setTextValue(name, 'name', '[Enter Name]');
setTextValue(answer, 'focus', '[Enter Focus]');

setInterval(() => {
  const timeString = makeTimeString();
  const hour = Number(timeString.split(':')[0]);
  time.textContent = timeString;
  changeGreeting(hour);
  changeBackground(hour);
}, 1000);

setTimeout(()=> wrapper.classList.remove('wrapper'), 1000);
