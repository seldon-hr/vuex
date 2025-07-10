import storage from 'store2';
import  store  from '../store/index';
import { SET_USER } from '@/common/mutatition-types';

const USER = 'USER';
const TOKEN = 'TOKEN';
const CHANNEL_USERS = 'CHANNEL_USERS';

export const appStorage = {

    cargarStorage() {
        const user = this.getUser();
        const channels = this.getChannelUsers();
        /* const token = this.getToken(); */

        if (user) {
            store.commit('account/' + SET_USER, user);
        }
        if (channels) {
            store.commit('channels/setChannels', channels);
        }
        /* if (token) {
            //Validaciòn del token.
            store.commit('account/' + SET_USER, user);
        } */

        /*
         * Posteriormente añadiremos que lea todo el storage
         * Y por lo tanto que sea dinámica.
         * 
         * const storage = this(); obtenemos todas las que empiezan con get
        */
    },

    //--USER--
    setUser(user) {
        storage.set(USER, user);
    },
    getUser() {
        return storage.get(USER);
    },
    removeUser() {
        storage.remove(USER);
    },

    //--TOKEN--
    setToken(token) {
        storage.set(TOKEN, token);
    },
    getToken() {
        return storage.get(TOKEN);
    },
    removeToken() {
        storage.remove(TOKEN);
    },

    //--channelUsers--
    setChannelUsers(channelUsers) {
        storage.set(CHANNEL_USERS, channelUsers);
    },
    getChannelUsers() {
        return storage.get(CHANNEL_USERS);
    },
    removeChannelUsers() {
        storage.remove(CHANNEL_USERS);
    },

    //--CLEAR--
    clear() {
        storage.clear();
    },

    logOut() {
        this.removeUser();
        this.removeToken();
        this.removeChannelUsers();
    },
}    