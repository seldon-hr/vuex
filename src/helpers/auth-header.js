import { appStorage } from "./appStorage";

/* Función de exportación para el token. */
export function authHeader() {
    // return authorization header with jwt token
    let token = appStorage.getToken();
    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
    /* else {
        return {
            'Content-Type': 'application/json'
        }
    } */
}    