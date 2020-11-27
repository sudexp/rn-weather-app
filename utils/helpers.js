import dayjs from 'dayjs';

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

export const fahrenheitTtoCelsius = fahrenheit => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

export const kelvinTtoCelsius = kelvin => {
  return Math.round(kelvin - 273.15);
};

export const formatDate = date => {
  return {
    date: dayjs(date * 1000).format('MMM Do'),
    time: dayjs(date * 1000).format('HH:MM'),
  };
};
