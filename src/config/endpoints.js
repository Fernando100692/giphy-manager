
const giphyApiBaseUrl = 'http://api.giphy.com/v1';
const api_key = 'WnTEYVz8yJSXIH1ZF4mLgRF33Ey4oC1g';
const type = 'gifs'; // Can be gifs or stickers

const onGetUrlEndpoint = (category) => {
    const customUrl = `${giphyApiBaseUrl}/${type}/${category}?api_key=${api_key}`;
    return customUrl;
};

export default {
    search: onGetUrlEndpoint('search'),
    random: onGetUrlEndpoint('random'),
    translate: onGetUrlEndpoint('translate'),
    trending: onGetUrlEndpoint('trending')
}