import storage from 'store2';

const USER = 'USER';

export const appStorage = {

    setUser(user) {
        storage.set(USER, user);
    },

    getUser() {
        return storage.get(USER);
    },

    removeUser() {
        storage.remove(USER);
    },

    clear() {
        storage.clear();
    },

    logOut() {
        this.removeUser();
        this.clear();
    },
}    