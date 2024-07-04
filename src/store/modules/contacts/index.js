const module = {
    namespaced: true,
    state() {
        return {
            contacts: [
                { id: 1, name: "You", avatar: "/avatars/avatar-0.jpg" },
                { id: 2, name: "Hassabis", avatar: "/avatars/avatar-2.jpg" },
                { id: 3, name: "Du Rove", avatar: "/avatars/avatar-1.jpg" },
                { id: 4, name: "Sopolsky", avatar: "/avatars/avatar-5.jpg" },
                { id: 5, name: "Sagan", avatar: "/avatars/avatar-4.jpg" },
                { id: 6, name: "Yuval", avatar: "/avatars/avatar-10.jpg" },
                { id: 7, name: "Hubberman", avatar: "/avatars/avatar-6.jpg" },
          ],
        }
    },

    actions: {

    },
    
    mutations: {

    },

    getters: {
        getContacts(state) {
            return state.contacts;
        },
        getContactsById: (state) => (contactId) => {
            return state.contacts.find((contact) => contact.id === contactId);
        }
    },
};

export default module;