const module = {
    namespaced: true,
    state: {
        channels: [
            {
                id: 1,
                name: "General",
                messages: [],
            },
            {
                id: 2,
                name: "Backend",
                messages: [],
            },
            {
                id: 3,
                name: "Frontend",
                messages: [],
            },
            {
                id: 4,
                name: "Tricks",
                messages: [],
            },
        ],
        currentChannel: null,
    },

    getters: {
        getChannels: (state, getters, rootState, rootGetters) => (search) => {
            return state.channels
                .filter(
                    (channel) => channel.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map((channel) => {
                    const messages = rootGetters["messages/getMessages"](channel.id);
                    return {
                        ...channel,
                        messages,
                    };
                });    
        },
        getCurrentChannel: (state) => {
            return state.currentChannel;
        },
       
    },

    
    mutations: {
        setChannels(state, channels) {
            state.channels = channels;
        },
        setCurrentChannel(state, currentChannel) {
            state.currentChannel = currentChannel;
        },
    },

    actions: {
        setChannels({ commit }, channels) {
            commit("setChannels", channels);
        },
        setCurrentChannel({ commit }, currentChannel) {
            commit("setCurrentChannel", currentChannel);
        },
    },

};

export default module;