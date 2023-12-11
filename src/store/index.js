import { createStore } from 'vuex';
import router from '../router';
import { gettingUser } from '../api';
import { COMMIT_UPDATE_USERNAME, SET_PASSWORD, SET_AGE } from '@/common/mutatition-types';

const store = createStore({
  state() {
        return {
            user: {
                username: "seldon",
                name: "Seldon",
                age: 0,
                email: "seldon@seldon",
                birth: "1998-12-12",
                password: "123456",
            },
            password: "",
            username: "",
        }
    }, 

    getters: {
        getUser(state) {
            return state.user;
        },
        getAge(state) {
            return state.user.age;
        },
        getUsername(state) {
            /* Más específicamente los getters permiten manipular información sin necesidad de actualizarla. */
            return state.user.username.split("").join("");
        },
    },

    mutations: {
        [SET_AGE](state, age) {
            state.user.age = age;
        },
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
        /* El primer objeto que se le pasa a una action, es del context,
        context: contiene propiedades y métodos que proporcionan accesos a commit, disptach, state
        y otras funcionalidades de vue. Hace referencia al store.
        payload: mientras que payload funge como los argumentos que recibiría la función.  */
        calculateAge({ commit, state }) {
            const today = new Date();
            const birthDate = new Date(state.user.birth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            commit(SET_AGE, age);
        },

        async updateUsername({ commit }, newUsername) {
            console.log(newUsername);
            const user = await gettingUser(1);
            commit(COMMIT_UPDATE_USERNAME, user.username);
        },

        verifyPassword({ state }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (state.user.password == state.password  && state.user.username == state.username) {
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