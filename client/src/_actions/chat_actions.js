import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export function getChats(){
    const token = window.localStorage.getItem('token');
    const request = axios.get(`${process.env.REACT_APP_SERVER_URL}${CHAT_SERVER}/getChats`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.data);

    return {
        type: GET_CHATS,
        payload: request
    }
}

export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}
