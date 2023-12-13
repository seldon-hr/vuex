import { COMMIT_UPDATE_USERNAME, SET_PASSWORD, SET_USER_REQUEST} from '@/common/mutatition-types';
import { gettingUser } from '../../../api';

const account = {
    namespaced: true,
    state: {
        password: "",
        username: "",
        userRequest: {},
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
        [COMMIT_UPDATE_USERNAME](state, newUsername) {
            state.username = newUsername;
        },
        [SET_USER_REQUEST](state, userRequest) {
            state.user = userRequest;
        },
        [SET_PASSWORD](state, newPassword) {
            state.password = newPassword;
        },
    },

    actions: {
            
            async getUser({ commit }, search) {
            console.log(search);
            /* search se va convertir en el data que se va a pedir en la consulta.
                Es decir si encuentra un usuario llamador Bert, el cual sería la consulta que se pide en
                la petición, entonces esta va a ser la respuesta que se va a obtener y asignar en el state
                para la comparativa.
            */
                const user = await gettingUser(1);
                commit(SET_USER_REQUEST, user);
            },
    
            verifyPassword({ state }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        //Obtener contraseña del módulo profile desde el store principal a un módulo secundario.
                        const PASSWORD_USER = state.userRequest.password;
                        const USERNAME_USER = state.userRequest.username;
    
                        if (PASSWORD_USER == state.password  && USERNAME_USER == state.username) {
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