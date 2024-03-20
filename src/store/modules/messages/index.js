const module = {
    namespaced: true,
    state: {
        messages: [],
    },


    getters: {
        getMessages: (state) => (channelId) => {
            return state.messages.filter((message) => message.channelId === channelId);
        },
    },

    mutations: {
        setMessages(state, messages) {
            state.messages = messages;
        },
    },
}

export default module