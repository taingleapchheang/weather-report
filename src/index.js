///Wave 2\\\
const temp = document.createElement('p');
const landscape = document.createElement('p');
const cityText = document.createElement('h2');
const textboxCity = document.getElementById('textbox-city');

const increaseTemp = () => {
  const increaseButton = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  increaseButton.textContent = '⬆️';
  tempContainer.appendChild(increaseButton);
  increaseButton.addEventListener('click', (e) => {
    temp.textContent = parseInt(temp.textContent) + 1;
    handleTempColorChange();
    handleLandscapesChange();
  });
};

const currentTemp = () => {
  const tempContainer = document.getElementById('temp-content');
  temp.textContent = '50';
  handleTempColorChange();
  tempContainer.appendChild(temp);
};

const decreaseTemp = () => {
  const decreaseButton = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  decreaseButton.textContent = '⬇️';
  tempContainer.appendChild(decreaseButton);
  decreaseButton.addEventListener('click', (e) => {
    temp.innerText = parseInt(temp.innerText) - 1;
    handleTempColorChange();
    handleLandscapesChange();
  });
};

const Gardenlandscape = () => {
  const landscapeContainer = document.getElementById('garden-content');
  handleLandscapesChange();
  landscapeContainer.appendChild(landscape);
};

//Helper Functions\\
const handleTempColorChange = () => {
  if (parseInt(temp.textContent) >= 80) {
    temp.style.color = 'red';
  } else if (
    parseInt(temp.textContent) >= 70 &&
    parseInt(temp.textContent) < 80
  ) {
    temp.style.color = 'orange';
  } else if (
    parseInt(temp.textContent) >= 60 &&
    parseInt(temp.textContent) < 70
  ) {
    temp.style.color = 'yellow';
  } else if (
    parseInt(temp.textContent) >= 50 &&
    parseInt(temp.textContent) < 60
  ) {
    temp.style.color = 'green';
  } else if (parseInt(temp.textContent) < 50) {
    temp.style.color = 'teal';
  }
};

const handleLandscapesChange = () => {
  if (parseInt(temp.textContent) >= 80) {
    landscape.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (
    parseInt(temp.textContent) >= 70 &&
    parseInt(temp.textContent) < 80
  ) {
    landscape.textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (
    parseInt(temp.textContent) >= 60 &&
    parseInt(temp.textContent) < 70
  ) {
    landscape.textContent = '`"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`';
  } else if (parseInt(temp.textContent) < 60) {
    landscape.textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
};

///Wave 3\\\
const cityContent = () => {
  const cityContainer = document.getElementById('city-content');
  cityText.textContent = 'For the lovely city of: ';
  cityContainer.appendChild(cityText);
};

const updateCityName = () => {
  textboxCity.addEventListener('keyup', () => {
    cityText.textContent = 'For the lovely city of: ' + textboxCity.value;
  });
};

const reset = () => {
  const resetButton = document.createElement('button');
  const resetContainer = document.getElementById('textbox-content');
  resetButton.textContent = 'Reset';
  resetContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    textboxCity.value = '';
    cityText.textContent = 'For the lovely city of: ';
  });
};

///Wave 4\\\

const getRealTimeTemp = () => {
  const realTimeTemp = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  realTimeTemp.value = '';
  tempContainer.appendChild(realTimeTemp);
  realTimeTemp.addEventListener('click');
};

// const axios = require('axios');

document.addEventListener(
  'DOMContentLoaded',
  increaseTemp(),
  currentTemp(),
  decreaseTemp(),
  Gardenlandscape(),
  cityContent(),
  updateCityName(),
  reset()
);
