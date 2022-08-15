import fetchText from '../randomWords'
import axios from "axios";

const apiError = ['Sorry,', 'API', 'error', 'has', 'occurred'];

export async function randomWords(number: number) {
    try {
        const text = await fetchText(number);
        return text;
    } catch (e) {
        return apiError;
    }
}

export async function randomWordsHard(number: number) {
    try {
        const text = await axios
            .get(`https://random-word-api.herokuapp.com/word?number=${number}`) as {data: Array<string>};
        return text.data;
    } catch (e) {
        return apiError;
    }
}

export async function randomWiki() {
    try {
        const text = await axios
            .get('https://en.wikipedia.org/api/rest_v1/page/random/summary') as {
            data: {extract: string}
        };
        return text.data.extract
            .split(' ');
    } catch (e) {
        return apiError;
    }
}

export default async function randomRuText() {
    try {
        const text = await axios.get('https://fish-text.ru/get') as {
            data: { text: string }
        }
        return text.data.text.split(' ');
    } catch (e) {
        return apiError;
    }
}