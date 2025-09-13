import axios from "axios";

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
if (!apiKey) {
    throw new Error("VITE_GIPHY_API_KEY is missing. Set it in your environment.");
}

export const giphyApi = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs',
    timeout: 8000,
    params: {
        api_key: apiKey,
        lang: 'en'
    }
});
