import { config } from "../config";
import { authHeader } from "../helpers/auth-header";
const BASE_URL = config.API_URL + '/api/auth';

function login(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/login', requestOptions)
        .then(response => {
            return response.json().then(data => ({
               ...data
            }));
        })
        .catch(error => {
            console.error('Error en login, service:', error);
            return error;
        });
}

export const accountService = {
    login,
};