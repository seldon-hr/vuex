import { config } from "../config";
/* import { authHeader } from "../helpers/auth-header"; */
const BASE_URL = config.API_URL + '/auth';

function login(itemRequest) {
    const requestOptions = {
        method: 'POST',
        /* headers:  */
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/login', requestOptions)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Error en login, service:', error);
            return error;
        });
}

export const accountService = {
    login,
};