import axios from 'axios';
const URL_BASE = 'http://localhost:4000';

function postSignUp (body) {
    const promise = axios.post(`${URL_BASE}/sign-up`, body);
    return promise;
}

export {
    postSignUp
}