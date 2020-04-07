import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export function getChats(){
    const request = axios.get(`https://ec2-3-86-87-136.compute-1.amazonaws.com:5000${CHAT_SERVER}/getChats`)
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
