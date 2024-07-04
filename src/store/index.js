import { createStore } from 'vuex';
//Aqui se importan los modulos
import account from './modules/account/index.js';
import channels from './modules/channels/index.js';
import messages from './modules/messages/index.js';
import contacts from './modules/contacts/index.js';

const store = createStore({

    modules: {
        //Aqui se importan los modulos
        account,
        channels,
        messages,
        contacts,
    },
})

export default store;