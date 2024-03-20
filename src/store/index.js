import { createStore } from 'vuex';
//Aqui se importan los modulos
import profile from './modules/profile/index.js';
import account from './modules/account/index.js';
import channels from './modules/channels/index.js';

const store = createStore({

    modules: {
        //Aqui se importan los modulos
        account,
        channels,
        profile,
    },
})

export default store;