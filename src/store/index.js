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
})

export default store;