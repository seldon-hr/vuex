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
            return state.user.username.split("").reverse().join("");
        },
    },

    actions : {
        calculateAge({ commit }) {
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
            commit('setUsername', newUsername);
        },
    }    
       
})

/* const mutations = {
    setAge(state, age) {
        state.user.age = age;
    },
    setUsername(state, newUsername) {
        state.user.username = newUsername;
    },
}     */

export default store;
/* export { actions, mutations }; */