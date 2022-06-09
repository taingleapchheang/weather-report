///Wave 2\\\
const temp = document.createElement('p');
const landscape = document.createElement('p');
const cityText = document.createElement('h2');
const textboxCity = document.getElementById('textbox-city');

// const location = {
//   city: 'Seattle',
//   lat: 47.6485,
//   lon: -122.379,
//   temp: 54,
// };

const increaseTemp = () => {
  const increaseButton = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  increaseButton.textContent = '⬆️';
  tempContainer.appendChild(increaseButton);
  increaseButton.addEventListener('click', (e) => {
    temp.textContent = parseInt(temp.textContent) + 1;
    handleTempandLanscapesChange();
  });
};

const currentTemp = () => {
  const tempContainer = document.getElementById('temp-content');
  temp.textContent = '50';
  handleTempandLanscapesChange();
  tempContainer.appendChild(temp);
};

const decreaseTemp = () => {
  const decreaseButton = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  decreaseButton.textContent = '⬇️';
  tempContainer.appendChild(decreaseButton);
  decreaseButton.addEventListener('click', (e) => {
    temp.innerText = parseInt(temp.innerText) - 1;
    handleTempandLanscapesChange();
  });
};

const Gardenlandscape = () => {
  const landscapeContainer = document.getElementById('garden-content');
  handleTempandLanscapesChange();
  landscapeContainer.appendChild(landscape);
};

//Helper Functions\\
const handleTempandLanscapesChange = () => {
  if (parseInt(temp.textContent) >= 80) {
    temp.style.color = 'red';
    landscape.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (
    parseInt(temp.textContent) >= 70 &&
    parseInt(temp.textContent) < 80
  ) {
    temp.style.color = 'orange';
    landscape.textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (
    parseInt(temp.textContent) >= 60 &&
    parseInt(temp.textContent) < 70
  ) {
    temp.style.color = 'yellow';
    landscape.textContent = '`"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`';
  } else if (
    parseInt(temp.textContent) >= 50 &&
    parseInt(temp.textContent) < 60
  ) {
    temp.style.color = 'green';
    landscape.textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  } else if (parseInt(temp.textContent) < 50) {
    temp.style.color = 'teal';
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
///Wave 4\\\

const getRealTimeTemp = () => {
  const realTimeTemp = document.createElement('button');
  const tempContainer = document.getElementById('temp-content');
  realTimeTemp.textContent = 'Get Realtime Temperature';
  tempContainer.appendChild(realTimeTemp);
  realTimeTemp.addEventListener('click', (e) => {
    //const axios = require('axios');
    const findLatitudeAndLongitude = () => {
      let latitude, longitude;
      axios
        .get('http://127.0.0.1:5000/location', {
          params: {
            q: textboxCity.value,
          },
        })
        .then((response) => {
          latitude = response.data[0].lat;
          longitude = response.data[0].lon;
          console.log(`${latitude}, ${longitude} have been found`);
          getRealTimeWeather(latitude, longitude);
        })
        .catch((error) => {
          console.log(`Not Found ${error.response}`);
        });
    };

    const getRealTimeWeather = (latitude, longitude) => {
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: latitude,
            key: longitude,
          },
        })
        .then((response) => {
          actualTemp = response.data;
          console.log(`${actualTemp} have been found`);
        })
        .catch((error) => {
          console.log(`Not Found ${error.response.data}`);
        });
    };
  });
};

///Wave 6\\\

const reset = () => {
  const resetButton = document.createElement('button');
  const resetContainer = document.getElementById('textbox-content');
  resetButton.textContent = 'Reset';
  resetContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    textboxCity.value = 'Seattle';
    cityText.textContent = 'For the lovely city of: ' + textboxCity.value;
  });
};

document.addEventListener(
  'DOMContentLoaded',
  increaseTemp(),
  currentTemp(),
  decreaseTemp(),
  Gardenlandscape(),
  cityContent(),
  updateCityName(),
  getRealTimeTemp(),
  reset()
);
