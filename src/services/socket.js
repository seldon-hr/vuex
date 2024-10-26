import { io } from 'socket.io-client';
import store from '../store';

class SocketService {
    constructor() {
        this.socket = null;
    }

    // Inicializar socket
    connect() {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        // Eventos de conexión
        this.socket.on('connect', () => {
            store.commit('messages/SET_CONNECTED', true);
        });

        this.socket.on('disconnect', () => {
            store.commit('messages/SET_CONNECTED', false);
        });

        // Eventos de mensajes
        this.socket.on('new_message', (message) => {
            store.commit('messages/ADD_MESSAGE', message);
        });

        // Eventos de usuarios
        this.socket.on('user_joined', (user) => {
            store.commit('contacts/ADD_ACTIVE_USER', user);
        });

        this.socket.on('user_left', (userId) => {
            store.commit('contacts/REMOVE_ACTIVE_USER', userId);
        });

        // Eventos de escritura
        this.socket.on('typing_start', ({ userId, channelId }) => {
            store.commit('channels/SET_TYPING', { userId, channelId, isTyping: true });
        });

        this.socket.on('typing_end', ({ userId, channelId }) => {
            store.commit('channels/SET_TYPING', { userId, channelId, isTyping: false });
        });
    }

    // Enviar mensaje
    sendMessage(channelId, message) {
        if (this.socket) {
            this.socket.emit('send_message', {
                channelId,
                content: message
            });
        }
    }

    // Unirse a un canal
    joinChannel(channelId) {
        if (this.socket) {
            this.socket.emit('join_channel', channelId);
        }
    }

    // Indicar que está escribiendo
    sendTyping(channelId, isTyping) {
        if (this.socket) {
            this.socket.emit(
                isTyping ? 'typing_start' : 'typing_end',
                { channelId }
            );
        }
    }

    // Desconectar socket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new SocketService();