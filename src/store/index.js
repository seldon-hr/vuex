import { createStore } from 'vuex';
//Aqui se importan los modulos
import profile from './modules/profile/index.js';
import account from './modules/account/index.js';

const store = createStore({

    modules: {
        //Aqui se importan los modulos
        account,
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

})

export default store;