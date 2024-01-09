import { COMMIT_UPDATE_USERNAME, SET_PASSWORD_ENTRY, SET_USER_REQUEST, SET_USERNAME_ENTRY, SET_USER_LIST, SET_USER, SET_USER_NOT_FOUND, SET_PASSWORD_INCORRECT, SET_NO_USERNAME_NEITHER_PASSWORD} from '@/common/mutatition-types';
import { gettingUsers } from '../../../api';
import router from '@/router';
import { appStorage } from '../../../helpers/appStorage';
import User from '../../../models/account/user';

const account = {
    /* Activa la propiedad de espacio de nombre, el cual permite que cuando uno quiere 
       hacer uso de un method, mutatio o getter hace referencia al nomber del módulo. */
    namespaced: true,
    state: {
        password: "",
        username: "",
        user: new User(),
        userRequest: {
            username: "",
            password: "",
        },
        userList: [],

        /* Rules */
        userNotFound: false,
        passwordIncorrect: false,
        noUsernameNeitherPassword: false,
    },

    getters: {
        getUser(state) {
            return state.user;
        },
        getUsername(state) {
            /* Más específicamente los getters permiten manipular información sin necesidad de actualizarla. */
            return state.username.split("").join("");
        },
    },

    mutations: {
        [SET_USER_LIST](state, userList) {
            state.userList = userList;
        },
        [COMMIT_UPDATE_USERNAME](state, newUsername) {
            state.username = newUsername;
        },
        [SET_USER_REQUEST](state, userRequest) {
            state.userRequest = userRequest;
        },
        [SET_USER](state, user) {
            state.user = user;
        },
        [SET_USERNAME_ENTRY](state, usernameEntry) {
            state.userRequest.username = usernameEntry;
        },
        [SET_PASSWORD_ENTRY](state, passwordEntry) {
            state.userRequest.password = passwordEntry;
        },
        // Rules
        [SET_USER_NOT_FOUND](state, userNotFound) {
            state.userNotFound = userNotFound;
        },
        [SET_PASSWORD_INCORRECT](state, value) {
            state.passwordIncorrect = value;
        },
        [SET_NO_USERNAME_NEITHER_PASSWORD](state, value) {
            state.noUsernameNeitherPassword = value;
        },

    },

    actions: {
        async getUsers({ commit }) {
            const listUsers = await gettingUsers();
            commit(SET_USER_LIST, listUsers);
        }, ~
        
        identifyUser({ commit, state }) {
            const userFind = state.userList.find(user => user.username == state.userRequest.username);
            if (userFind) {
                /* 
                * //TODO: Data que se va a procesar cuando esta llegue de la petición. 
                    contraseña y avatar temporales, posteriormente se agregarán cuando la petición llegue.
                    */

                userFind.password = userFind.username;
                userFind.avatar = "/public/avatars/avatar.jpg";
                userFind.birthDate = "1990-01-01";
                userFind.age = 0;
                userFind.status = "active";
                
                commit(SET_USER, userFind);
                /* commit(SET_USERNAME_ENTRY, userFind.username); */
                /* Usuario encontrado */
                commit(SET_USER_NOT_FOUND, false);
                commit(SET_NO_USERNAME_NEITHER_PASSWORD, false);
            } else {
                /* Usuario no encontrado */
                commit(SET_USERNAME_ENTRY, '');
                commit(SET_USER_NOT_FOUND, true);
            }  
        },    

    
        verifyPassword({ state, commit, dispatch },) {
            if (!state.userRequest.username == '' || !state.userRequest.password == '' || !state.userRequest.username == undefined || !state.userRequest.password == undefined) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const PASSWORD_USER = state.user.password;
                        const USERNAME_USER = state.user.username;
    
                        if (PASSWORD_USER == state.userRequest.password  && USERNAME_USER == state.userRequest.username) {
                            resolve(true);
                            commit(SET_PASSWORD_INCORRECT, false);

                            //Eliminar el usuarioRequest
                            commit(SET_USER_REQUEST, {});

                            //Asignar el usuario al storage
                            dispatch('asignUserToStorage');
                            router.push('/')
                        } else {
                            reject(false);
                            /* Contraseña incorrecta */
                            commit(SET_PASSWORD_INCORRECT, true);
                        }
                    }, 1000);
                });
            }
            else {
                /* No hay usuario ni contraseña */
                commit(SET_NO_USERNAME_NEITHER_PASSWORD, true);
            }
        },

        asignUserToStorage({ state }) {
            appStorage.setUser(state.user);
        },


        },
    }

export default account;