///Wave 2\\\
const tempValue = document.getElementById('temp-value');
const landscape = document.getElementById('landscape-content');
const cityName = document.getElementById('city-name-top');
const textboxCity = document.getElementById('textbox-city');
const skyscape = document.createElement('p');
const API = 'http://127.0.0.1:5000';

const defaultLocation = {
  city: 'Seattle',
  lat: 47.6485,
  lon: -122.379,
  temp: 50,
  degree: 'F',
};

const tempConversion = {
  F: [80, 70, 60, 50],
  C: [27, 21, 15, 10],
};

const increaseTemp = () => {
  const increaseButton = document.getElementById('increase-temp-control');
  increaseButton.addEventListener('click', (e) => {
    tempValue.textContent = parseInt(tempValue.textContent) + 1;
    handleTempandLandscapesChange();
  });
};

const decreaseTemp = () => {
  const decreaseButton = document.getElementById('decrease-temp-control');
  decreaseButton.addEventListener('click', (e) => {
    tempValue.textContent = parseInt(tempValue.textContent) - 1;
    handleTempandLandscapesChange();
  });
};

const currentTempValue = () => {
  tempValue.textContent = defaultLocation.temp;
  handleTempandLandscapesChange();
};

const cityContent = () => {
  cityName.textContent = defaultLocation.city;
};

///Wave 3\\\
const updateCityName = () => {
  cityName.textContent = defaultLocation.city;
  textboxCity.addEventListener('keyup', () => {
    defaultLocation.city = textboxCity.value;
    cityName.textContent = defaultLocation.city;
  });
};

///Wave 4\\\
const getRealTimeTemp = () => {
  const realTimeTempButton = document.getElementById('current-temp-button');
  realTimeTempButton.addEventListener('click', findLatitudeAndLongitude);
};

///Wave 5\\\
const displaySky = () => {
  const skyContainer = document.getElementById('sky-content');
  handleSkyChange();
  skyContainer.appendChild(skyscape);
};

///Wave 6\\\
const reset = () => {
  const resetButton = document.createElement('button');
  const resetContainer = document.getElementById('textbox-content');
  resetButton.textContent = 'Reset';
  resetContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    textboxCity.value = defaultLocation.city;
  });
};

///Wave 7\\\
const celsius = () => {
  const celsiusButton = document.getElementById('celsius-button');
  celsiusButton.addEventListener('click', convertFToC);
};

const fahrenheit = () => {
  const fahrenheitButton = document.getElementById('fahrenheit-button');
  fahrenheitButton.addEventListener('click', convertCToF);
};

//Helper Functions\\
const convertKToF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const convertCToF = () => {
  if (defaultLocation.degree === 'C') {
    tempValue.textContent = Math.round(tempValue.textContent * (9 / 5) + 32);
    defaultLocation.degree = 'F';
  }
};

const convertFToC = () => {
  if (defaultLocation.degree === 'F') {
    tempValue.textContent = Math.round((tempValue.textContent - 32) * (5 / 9));
    defaultLocation.degree = 'C';
  }
};

const handleTempandLandscapesChange = () => {
  if (
    parseInt(tempValue.textContent) >= tempConversion[defaultLocation.degree][0]
  ) {
    tempValue.style.color = 'red';
    landscape.textContent = `🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂`;
  } else if (
    parseInt(tempValue.textContent) >=
      tempConversion[defaultLocation.degree][1] &&
    parseInt(tempValue.textContent) < tempConversion[defaultLocation.degree][0]
  ) {
    tempValue.style.color = 'orange';
    landscape.textContent = `🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷`;
  } else if (
    parseInt(tempValue.textContent) >=
      tempConversion[defaultLocation.degree][2] &&
    parseInt(tempValue.textContent) < tempConversion[defaultLocation.degree][1]
  ) {
    tempValue.style.color = 'yellow';
    landscape.textContent = `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`;
  } else if (
    parseInt(tempValue.textContent) >=
      tempConversion[defaultLocation.degree][3] &&
    parseInt(tempValue.textContent) < tempConversion[defaultLocation.degree][2]
  ) {
    tempValue.style.color = 'green';
    landscape.textContent = `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`;
  } else if (
    parseInt(tempValue.textContent) < tempConversion[defaultLocation.degree][3]
  ) {
    temp.style.color = 'teal';
    landscape.textContent = `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`;
  }
};

const handleSkyChange = () => {
  if (document.getElementById('sky-select').value === 'sunny') {
    skyscape.textContent = `☀️ ☀️ ☀️ ☀️☀️  ☀️ ☀️ ☀️☀️`;
  } else if (document.getElementById('sky-select').value === 'rainy') {
    skyscape.textContent = `🌧️💧🌧️  🌧️💧🌧️ 💧🌧️ 💧🌧️`;
  } else if (document.getElementById('sky-select').value === 'cloudy') {
    skyscape.textContent = `☁️☁️ ⛅ ☁️ ⛅ ☁️☁️☁️ ⛅`;
  } else if (document.getElementById('sky-select').value === 'snowy') {
    skyscape.textContent = `❄️️🌧️❄️️ ❄️️ 🌧️❄️️ ❄️️ 🌧️❄️️ ❄️️`;
  }
};

const findLatitudeAndLongitude = () => {
  axios
    .get(`${API}/location`, {
      params: {
        q: defaultLocation.city,
      },
    })
    .then((response) => {
      defaultLocation.lat = response.data[0].lat;
      defaultLocation.lon = response.data[0].lon;
      console.log(
        `${defaultLocation.lat}, ${defaultLocation.lon} have been found`
      );
      getRealTimeWeather();
    })
    .catch((error) => {
      console.log(`Not Found ${error.response}`);
    });
};

const getRealTimeWeather = () => {
  axios
    .get(`${API}/weather`, {
      params: {
        lat: defaultLocation.lat,
        lon: defaultLocation.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      defaultLocation.temp = Math.round(convertKToF(weather.current.temp));
      tempValue.textContent = defaultLocation.temp;
      defaultLocation.degree = 'F';
      handleTempandLandscapesChange();
      console.log(`${defaultLocation.temp} have been found`);
    })
    .catch((error) => {
      console.log(`Not Found ${error.response.data}`);
    });
};

document.addEventListener(
  'DOMContentLoaded',
  increaseTemp(),
  currentTempValue(),
  decreaseTemp(),
  updateCityName(),
  getRealTimeTemp(),
  displaySky(),
  reset(),
  celsius(),
  fahrenheit()
);
