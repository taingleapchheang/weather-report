///Wave 2\\\
const tempValue = document.getElementById('temp-value');
const landscape = document.getElementById('landscape-content');
const cityName = document.getElementById('city-name-top');
const textboxCity = document.getElementById('textbox-city');
const skyscape = document.getElementById('sky-content');
const API = 'https://our-weather-report-proxy.herokuapp.com/';

const state = {
  city: 'Seattle',
  lat: 47.6485,
  lon: -122.379,
  temp: tempValue,
  degree: 'F',
};

const tempConversion = {
  F: [80, 70, 60, 50],
  C: [27, 21, 15, 10],
};

window.onload = () => {
  tempValue.textContent = findLatitudeAndLongitude();
  handleTempandLandscapesChange();
};

const upAndDownButtons = () => {
  const increaseButton = document.getElementById('increase-temp-control');
  const decreaseButton = document.getElementById('decrease-temp-control');
  increaseButton.addEventListener('click', () => {
    tempValue.textContent = parseInt(tempValue.textContent) + 1;
    handleTempandLandscapesChange();
  });
  decreaseButton.addEventListener('click', () => {
    tempValue.textContent = parseInt(tempValue.textContent) - 1;
    handleTempandLandscapesChange();
  });
};

const cityContent = () => {
  cityName.textContent = state.city;
};

///Wave 3\\\
const updateCityName = () => {
  cityName.textContent = state.city;
  textboxCity.addEventListener('keyup', () => {
    cityName.textContent = textboxCity.value;
    state.city = textboxCity.value;
  });
};

///Wave 4\\\
const getRealTimeTemp = () => {
  const realTimeTempButton = document.getElementById('current-temp-button');
  realTimeTempButton.addEventListener('click', findLatitudeAndLongitude);
};

///Wave 5\\\
const displaySky = () => {
  const skyValue = document.getElementById('sky-select');
  handleSkyChange();
  skyValue.addEventListener('change', () => {
    document.getElementById('sky-select');
    handleSkyChange();
  });
};

///Wave 6\\\
const reset = () => {
  const resetButton = document.createElement('button');
  const resetContainer = document.getElementById('textbox-content');
  resetButton.textContent = 'Reset';
  resetContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    state.city = 'Seattle';
    textboxCity.value = state.city;
    cityName.textContent = 'Seattle';
    tempValue.textContent = findLatitudeAndLongitude();
    handleTempandLandscapesChange();
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
  if (state.degree === 'C') {
    tempValue.textContent = Math.round(tempValue.textContent * (9 / 5) + 32);
    state.degree = 'F';
  }
};

const convertFToC = () => {
  if (state.degree === 'F') {
    tempValue.textContent = Math.round((tempValue.textContent - 32) * (5 / 9));
    state.degree = 'C';
  }
};

const handleTempandLandscapesChange = () => {
  const currentDegree = tempConversion[state.degree];
  const currentTemp = parseInt(tempValue.textContent);

  if (currentTemp >= currentDegree[0]) {
    tempValue.style.color = 'red';
    landscape.textContent = `🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂`;
  } else if (
    currentTemp >= currentDegree[1] &&
    currentTemp < currentDegree[0]
  ) {
    tempValue.style.color = 'orange';
    landscape.textContent = `🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷`;
  } else if (
    currentTemp >= currentDegree[2] &&
    currentTemp < currentDegree[1]
  ) {
    tempValue.style.color = 'purple';
    landscape.textContent = `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`;
  } else if (
    currentTemp >= currentDegree[3] &&
    currentTemp < currentDegree[2]
  ) {
    tempValue.style.color = 'green';
    landscape.textContent = `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`;
  } else if (currentTemp < currentDegree[3]) {
    tempValue.style.color = 'blue';
    landscape.textContent = `❄️️🌲⛄️🌲⛄️❄️️🌲❄️️🌲🌲⛄️❄️️🌲`;
  }
};

const handleSkyChange = () => {
  const skySelectValue = document.getElementById('sky-select').value;

  if (skySelectValue === 'sunny') {
    skyscape.textContent = `☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/4P21IxWN7BA')";
  } else if (skySelectValue === 'cloudy') {
    skyscape.textContent = `☁️☁️⛅☁️⛅☁️☁️⛅☁️⛅☁️☁️`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/9AqIdzEc9pY')";
  } else if (skySelectValue === 'rainy') {
    skyscape.textContent = `🌧️💧🌧️🌧️💧🌧️💧🌧️💧🌧️💧🌧️`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/GfXyyrvGqzs')";
  } else if (skySelectValue === 'snowy') {
    skyscape.textContent = `❄️️🌧️❄️️❄️️🌧️❄️️❄️️🌧️❄️️❄️️🌧️❄️️`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/usAIelADp1A')";
  }
};

const findLatitudeAndLongitude = () => {
  axios
    .get(`${API}/location`, {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      console.log(`${state.lat}, ${state.lon} have been found`);
      getRealTimeWeather();
    })
    .catch((error) => {
      console.log(`Not Found ${error.response.data}`);
    });
};

const getRealTimeWeather = () => {
  axios
    .get(`${API}/weather`, {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = Math.round(convertKToF(weather.current.temp));
      tempValue.textContent = state.temp;
      state.degree = 'F';
      handleTempandLandscapesChange();
      console.log(`${state.temp} has been found`);
    })
    .catch((error) => {
      console.log(`Not Found ${error.response.data}`);
    });
};

if (document.readyState !== 'loading') {
  upAndDownButtons();
  updateCityName();
  getRealTimeTemp();
  displaySky();
  reset();
  celsius();
  fahrenheit();
} else {
  document.addEventListener('DOMContentLoaded', upAndDownButtons);
  document.addEventListener('DOMContentLoaded', updateCityName);
  document.addEventListener('DOMContentLoaded', getRealTimeTemp);
  document.addEventListener('DOMContentLoaded', displaySky);
  document.addEventListener('DOMContentLoaded', reset);
  document.addEventListener('DOMContentLoaded', celsius);
  document.addEventListener('DOMContentLoaded', fahrenheit);
}
