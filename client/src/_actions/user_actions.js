import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_SERVER_URL}${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_SERVER_URL}${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    console.log('login  ==>',request);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const token = window.localStorage.getItem('token');
    const request = axios.get(`${process.env.REACT_APP_SERVER_URL}${USER_SERVER}/auth` , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

