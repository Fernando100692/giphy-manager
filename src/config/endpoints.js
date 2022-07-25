
const giphyApiBaseUrl = process.env.REACT_APP_API_AUTH_BASE_URL;
const api_key = process.env.REACT_APP_API_KEY;
const type = 'gifs'; // Can be gifs or stickers

const onGetUrlEndpoint = (category) => {
    const customUrl = `${giphyApiBaseUrl}/${type}/${category}?api_key=${api_key}`;
    return customUrl;
};

const endpoints = {
    search: onGetUrlEndpoint('search'),
    random: onGetUrlEndpoint('random'),
    translate: onGetUrlEndpoint('translate'),
    trending: onGetUrlEndpoint('trending')
};

export default endpoints;