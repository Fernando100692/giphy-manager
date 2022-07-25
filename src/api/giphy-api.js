import axios from 'axios';
import endpoints from '../config/endpoints';

const { search, trending, random, translate } = endpoints;

// Get All Gifs by Search
export const getAllbySearch = async ({q = '', limit = 25, offset = 0}) => {
  try {
    const params = new URLSearchParams([['q', q], ['limit', limit], ['offset', offset]]);
    const allFound = await axios.get(search, { params });
    return allFound;

  } catch(err) {
    return console.error(err);
  }
}

// Get All Gifs by Trending
export const getAllbyTrending = async ({rating = 'g', limit = 25, offset = 0}) => {
  try {
    const params = new URLSearchParams([['rating', rating], ['limit', limit], ['offset', offset]]);
    const allFound = await axios.get(trending, { params });
    return allFound;

  } catch(err) {
    return console.error(err);
  }
}

// Get random Gifs by Random
export const getByRandom = async ({tag = ''}) => {
  try {
    const params = new URLSearchParams([['tag', tag]]);
    const allFound = await axios.get(random, { params });
    return allFound;

  } catch(err) {
    return console.error(err);
  }
}

// Get special Gifs by Translate
export const getByTranslate = async ({s = ''}) => {
  try {
    const params = new URLSearchParams([['s', s]]);
    const allFound = await axios.get(translate, { params });
    return allFound;

  } catch(err) {
    return console.error(err);
  }
}