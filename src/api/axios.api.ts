import * as axios from 'axios';
import {getTokenFromLocalStorage} from '../helpers/localstorage.helper.ts';

export const instance = axios.default.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
    }
})