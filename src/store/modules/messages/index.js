import Message from '../../../models/message/message';
import { SET_MESSAGES } from '@/common/mutatition-types';

const messages = {
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
            message: new Message(),
        } 
    },

    actions: {
        newMessage({ state }, message) {
            state.message = new Message (message) ;
            state.messages.push(state.message);
            console.log(state.messages);
        },

        updateMesages({ commit}, messages) {
            commit(SET_MESSAGES, messages);
        },

        updateMesage({ commit }, message) {
            const messages = state.messages.map((m) => {
                if (m.id === message.id) {
                    return message;
                }
                return m;
            });
            commit(SET_MESSAGES, messages);
        },
    },


    getters: {
        getMessages: (state) => (channelId) => {
            /* Al usuar v-router, cuando usamos un param, este siempre va a a venir en string
                y como nuestra propiedad de channelId como entero, entonces, tenemos que transformar en Int. */
            return state.messages.filter((message) => message.channelId === parseInt(channelId));
        },
    },

    mutations: {
        [SET_MESSAGES](state, messages) {
            state.messages = messages;
        },
    },
}

export default messages