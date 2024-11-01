import storage from 'store2';

const USER = 'USER';

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
        storage.set('TOKEN', token);
    },
    getToken() {
        return storage.get('TOKEN');
    },
    removeToken() {
        storage.remove('TOKEN');
    },



    //--CLEAR--
    clear() {
        storage.clear();
    },

    logOut() {
        this.removeUser();
        this.clear();
    },
}    