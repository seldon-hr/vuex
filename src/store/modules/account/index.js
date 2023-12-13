import { COMMIT_UPDATE_USERNAME, SET_PASSWORD, SET_USER_REQUEST, SET_USER_ENTRY} from '@/common/mutatition-types';
import { gettingUser } from '../../../api';
import router from '@/router';

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
            state.userRequest = userRequest;
        },
        [SET_USER_ENTRY](state, usernameEntry) {
            state.username = usernameEntry;
        },
        [SET_PASSWORD](state, newPassword) {
            state.password = newPassword;
        },
    },

    actions: {
            async getUsers({ commit }, usernameEntry) {
            console.log(usernameEntry);
            /* //TODO: search se va convertir en el data que se va a pedir en la consulta.
                Es decir si encuentra un usuario llamador Bert, el cual sería la consulta que se pide en
                la petición, entonces esta va a ser la respuesta que se va a obtener y asignar en el state
                para la comparativa.

                *Al parecer no sería pasado como argumento, sino del propio state.
            */
            const user = await gettingUser(1);
            console.log(user);
                commit(SET_USER_REQUEST, user);
                commit(SET_USER_ENTRY, usernameEntry);
            },
    
            verifyPassword({ state, rootState }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        //Obtener contraseña del módulo profile desde el store principal a un módulo secundario.
                        //TODO: Se va a obtener con la data que se va a asignar desde la petición.
                        const PASSWORD_USER = rootState.profile.user.password;
                        const USERNAME_USER = rootState.profile.user.username;
                        console.log('Desde el módulo account, obeteniendo lo del profile', PASSWORD_USER, USERNAME_USER);
    
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