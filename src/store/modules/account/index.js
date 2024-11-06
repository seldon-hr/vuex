import { COMMIT_UPDATE_USERNAME, SET_PASSWORD_ENTRY, SET_USER_REQUEST, SET_USERNAME_ENTRY, SET_USER_LIST, SET_USER, SET_USER_NOT_FOUND, SET_PASSWORD_INCORRECT, SET_NO_USERNAME_NEITHER_PASSWORD, SET_AGE, SET_USERNAME} from '@/common/mutatition-types';
import { gettingUsers } from '../../../api';
import { accountService } from '../../../services/account.service';
import router from '@/router';
import { appStorage } from '../../../helpers/appStorage';
import User from '../../../models/account/user';

const account = {
    /* Activa la propiedad de espacio de nombre, el cual permite que cuando uno quiere 
       hacer uso de un method, mutatio o getter hace referencia al nombre del módulo. */
    namespaced: true,
    state: {
        password: "",
        username: "",
        user: new User(),
        userRequest: {
            username: "",
            password: "",
        },
        usersList: [],

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
        getAge(state) {
            return state.user.age;
        },
    },

    mutations: {
        [SET_USER_LIST](state, usersList) {
            state.usersList = usersList;
        },
        [COMMIT_UPDATE_USERNAME](state, newUsername) {
            state.username = newUsername;
        },
        [SET_USERNAME](state, age) {
            state.user.username = age;
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
        [SET_AGE](state, age) {
            state.user.age = age;
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
        async getUsers({ commit, dispatch }) {
            const listUsers = await gettingUsers();

            if (listUsers.length > 0) {
                commit(SET_USER_LIST, listUsers);
                dispatch('processUsers');
            } else {
                alert("No hay usuarios");
            }
        },

        processUsers({ commit, state }) {
            const listUsers = state.usersList;
            listUsers.forEach((user, index) => {
                user.password = user.username;
                user.birthDate = "1990-01-01";
                user.age = 0;
                user.status = "active";
                user.avatar = "/public/avatars/avatar-" + index + ".jpg";
            });
            commit(SET_USER_LIST, listUsers);
        },
        
        identifyUser({ commit, state }) {
            const userFind = state.usersList.find(user => user.username == state.userRequest.username);
            if (userFind) {
                
                commit(SET_USER, userFind);
                /* commit(SET_USERNAME_ENTRY, userFind.username); */
                /* Usuario encontrado */
                commit(SET_USER_NOT_FOUND, false);
                commit(SET_NO_USERNAME_NEITHER_PASSWORD, false);
            } else {
                /* Usuario no encontrado */
                commit(SET_USER, new User());
                commit(SET_USERNAME_ENTRY, '');
                commit(SET_USER_NOT_FOUND, true);
            }
        },

        logIn({ commit, dispatch, state }) {
            let userRequest = state.userRequest;


            accountService.login(userRequest)
                .then(response => {
                    if (response.status == 200) {
                        //Si el inicio de sesión es exitoso, se asigna el usuario al storage.
                        commit(SET_USER, response.user);
                        dispatch('asignUserToStorage');
                        appStorage.setToken(response.token);
                        //Acceder a home.
                        //TODO: Vamos a redirigir al home.
                        router.push('/home')
                    } else {
                        console.error('Fallo en petición, no code 200, action:', response);
                    }
                })
                .catch(error => {
                    console.error('Error en login, action:', error);
                });
        },    

        resetUser({ commit }) {
            commit(SET_USER, new User());
        },

    
        verifyPassword({ state, commit, dispatch },) {
            if (!state.userRequest.username == '' || !state.userRequest.password == '' || !state.userRequest.username == undefined || !state.userRequest.password == undefined) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const PASSWORD_USER = state.user.password;
                        const USERNAME_USER = state.user.username;
    
                        if (PASSWORD_USER == state.userRequest.password && USERNAME_USER == state.userRequest.username) {
                            resolve(true);
                            commit(SET_PASSWORD_INCORRECT, false);

                            //Eliminar el usuarioRequest
                            commit(SET_USER_REQUEST, {});

                            //Asignar el usuario al storage
                            dispatch('asignUserToStorage');
                            dispatch('orderUser');

                            //Acceder a home.
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

        isThereUserOnStorage({ commit }) {
            const user = appStorage.getUser();
            if (user) {
                commit(SET_USER, user);
            }
        },

        orderUser({ commit, state }) {
            let user = state.user;
            const usersList = state.usersList;
            const userIndex = usersList.findIndex((u) => u.username === user.username);
            if (userIndex > -1) {
                usersList.splice(userIndex, 1);
                usersList.unshift(user);
                commit(SET_USER_LIST, usersList);
            }
        },

        calculateAge({ commit, state }) {
            const today = new Date();
            const birthDate = new Date(state.user.birthDate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            commit(SET_AGE, age);
        },

        logtOut({ commit }) {
            appStorage.removeUser();
            commit(SET_USER, new User());
            router.push('/login');
        },

    },
    
    getters: {
        getUsersList(state) {
            return state.usersList;
        },
}
};
export default account;