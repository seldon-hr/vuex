import storage from 'store2';

const USER = 'USER';
const TOKEN = 'TOKEN';
const CHANNEL_USERS = 'CHANNEL_USERS';

export const appStorage = {

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