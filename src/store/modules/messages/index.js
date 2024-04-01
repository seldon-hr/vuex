const module = {
    namespaced: true,
    state() {
        return {
            messages: [
                {
                    id: 1,
                    author: 1,
                    message: "Bro... 👀",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 1,
                },
                {
                    id: 2,
                    author: 2,
                    message: "¿Ahora que hiciste?, Cabro...!!!",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 1,
                },
                {
                    id: 3,
                    author: 3,
                    message: "Por eso lo despidieron la vez pasada",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 1,
                },
                // ... rest of the messages for channelId 1
                {
                    id: 17,
                    author: 1,
                    message: "Time to add more messages for channel 2",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 2,
                },
                {
                    id: 18,
                    author: 2,
                    message: "Totally agree! Let's do it!",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 2,
                },
                // Add more messages for channelId 3 & 4
                {
                    id: 19,
                    author: 2,
                    message: "Greetings! 🚀",
                    timestamp: new Date().toLocaleTimeString(),
                    read: false,
                    channelId: 3,
                },
            ],
        } 
    },


    getters: {
        getMessages: (state)  => (channelId) => {
            return state.messages.filter((message) => message.channelId === parseInt(channelId));
        },
    },

    mutations: {
        setMessages(state, messages) {
            state.messages = messages;
        },
    },
}

export default module