import { createStore } from 'vuex';
import router from '../router';
import { gettingUser } from '../api';
import { COMMIT_UPDATE_USERNAME, SET_PASSWORD } from '@/common/mutatition-types';

import profile from './modules/profile/index.js';

const store = createStore({

    modules: {
        //Aqui se importan los modulos
        profile,
    },
  
    
  state() {
        return {
            password: "",
            username: "",
        }
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
        /* 
            La sintaxis que se muestra en el código seleccionado es específica de JavaScript y se utiliza en el contexto de un proyecto de Vue.js.
            En Vue.js, se utiliza una sintaxis especial para definir las mutaciones en el store (almacén) de Vuex, que es una biblioteca de administración de estado para aplicaciones Vue.js.
            La sintaxis [COMMIT_UPDATE_USERNAME] se refiere a una constante o una cadena que representa el nombre de una mutación en Vuex. En este caso, parece ser el nombre de una mutación llamada "COMMIT_UPDATE_USERNAME".
        */
        [COMMIT_UPDATE_USERNAME](state, newUsername) {
            state.username = newUsername;
        },
        [SET_PASSWORD](state, newPassword) {
            state.password = newPassword;
        },
    },

    actions: {

        async getUser({ commit }, newUsername) {
            console.log(newUsername);
            const user = await gettingUser(1);
            commit(COMMIT_UPDATE_USERNAME, user.username);
        },

        verifyPassword({ state }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    //Obtener contraseña del módulo profile desde el store principal a un módulo secundario.
                    const PASSWORD_USER = profile.state.user.password;
                    const USERNAME_USER = profile.state.user.username;

                    if (PASSWORD_USER == state.password  && USERNAME_USER == state.username) {
                        resolve(true);
                        //Redireccionar a la página de inicio
                         router.push('/')
                    } else {
                        reject(false);
                        alert('Contraseña o username incorrecto');
                    }
                }, 500);
            });
        }

    },    
})

export default store;