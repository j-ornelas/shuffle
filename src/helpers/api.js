import { UTELLY_KEY } from '../../private';

const convertTitleToHTML = title => title.split(' ').join('%20');

export const fetchStreamingInfo = async (title) => {
  const data = await fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=${convertTitleToHTML(title)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': UTELLY_KEY
    }
  })
    .then(res => res.json());
  return data;
};
