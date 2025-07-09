import { channelsService } from "../../../services/channels.service";
const module = {
    namespaced: true,
    state: {
        channels: [
            /* {
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
            }, */
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
        getChannelsByUser({ commit, rootState, dispatch, state }) {
            let itemRequest = {
                userId: rootState.account.user._id,
            };

            channelsService.getChannelsByUser(itemRequest)
                .then(response => {
                    if (response.success) {
                        commit("setChannels", response.body);
                        dispatch("account/assignChannelsToStorage", state.channels, { root: true });
                    //TODO: Agregar los canales al storage para que una vez que se refresque la página debe estar la page.
                    }
                })
                .catch(error => {
                    console.error('Error al consumir.', error);
                })
        },
    },

};

export default module;