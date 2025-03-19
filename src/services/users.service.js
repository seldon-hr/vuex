import { data } from "autoprefixer";
import { config } from "../config";
import { authHeader } from "../helpers/auth-header";
const BASE_URL = config.API_URL + '/api'

/* Funciòn para traer los usuarios que esta persona tiene, dependiendo va a tener
despuès se van a filtrar por usuario. */
function getUsers() {
    console.log('entry URL method.', (`${BASE_URL}/auth/getUsers`));
    const requestOptions = {
        method: 'POST',
       /*  headers: authHeader(), */
    }


    return fetch(`${BASE_URL}/auth/getUsers`, requestOptions)
        .then(response => {
            return response.json().then(data => ({
               ...data
            }));
        })
            .catch(error => {
            console.error('Error al obtener los usuarios.', error)
        })
}

export const usersService = {
    getUsers,
}