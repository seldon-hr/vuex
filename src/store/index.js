import { createStore } from 'vuex'

const store = createStore({
  state() {
        return {
            user: {
                username: "seldon",
                name: "Seldon",
                age: 0,
                email: "seldon@seldon",
                birth: "1998-12-12",
            },
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
        setAge(state, age) {
            state.user.age = age;
        },
        setUsername(state, newUsername) {
            state.user.username = newUsername;
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
            commit('setAge', age);
        },
        updateUsername({ commit }, newUsername) {
            console.log('udpateUsername action', newUsername);
            commit('setUsername', newUsername);
        },
    }    
       
})

export default store;