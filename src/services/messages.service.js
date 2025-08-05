import { config } from "../config";
import { authHeader } from "../helpers/auth-header";
const BASE_URL = config.API_URL + '/api/auth';

function getMessagesByChannel(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/getMessagesByChannel', requestOptions)
        .then(response => {
            return response.json().then(data => ({
               ...data
            }));
        })
        .catch(error => {
            console.error('Error en obtener los mensajes del canal, service:', error);
            return error;
        });
}

function saveMessage(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/saveMessage', requestOptions)
        .then(response => {
            return response.json().then(data => ({
               ...data
            }));
        })
        .catch(error => {
            console.error('Error en guardar el mensaje, service:', error);
            return error;
        });
}

export const messagesService = {
    getMessagesByChannel,
    saveMessage,
};
