import { COMMIT_UPDATE_USERNAME, SET_PASSWORD_ENTRY, SET_USER_REQUEST, SET_USERNAME_ENTRY, SET_USER_LIST, SET_USER} from '@/common/mutatition-types';
import { gettingUsers } from '../../../api';
import router from '@/router';

const account = {
    namespaced: true,
    state: {
        password: "",
        username: "",
        user: {},
        userRequest: {},
        userList: [],
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
    },

    actions: {
            async getUsers({ commit }) {
                const listUsers = await gettingUsers();
                commit(SET_USER_LIST, listUsers);
            },
        
            identifyUser({ commit, state }) {
                const userFind = state.userList.find(user => user.username == state.userRequest.username);
                if (userFind) {
                    /* 
                    * //TODO: Data que se va a procesar cuando esta llegue de la petición. 
                     */
                    userFind.password = userFind.username;
                    userFind.avatar = "/avatars/avatar.jpg";
                    
                    commit(SET_USER, userFind);
                    alert("Usuario encontrado, ;)");
                } else {
                    alert("Usuario no encontrado, ;(");
                }    
            },    

    
            verifyPassword({ state }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const PASSWORD_USER = state.user.password;
                        const USERNAME_USER = state.user.username;
                        console.log('Desde el módulo account, obeteniendo lo del profile', PASSWORD_USER, USERNAME_USER);
    
                        if (PASSWORD_USER == state.userRequest.password  && USERNAME_USER == state.userRequest.username) {
                            resolve(true);
                            router.push('/')
                        } else {
                            reject(false);
                            alert("Usuario o contraseña incorrectos");
                        }
                    }, 1000);
                });
            },
        },
    }

export default account;