import data from '../../DATA/ew.json';
export fetchStreamingInfo from './api';

export const randomIntFromInterval = (min, max) => {
  let result = Math.floor(Math.random() * (max - min + 1) + min);
  if (result < min) {
    result = min;
  } else if (result > max) {
    result = max;
  }
  return result;
};

export const findMovie = () => data[randomIntFromInterval(930, 1930)];
