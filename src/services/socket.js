import { io } from 'socket.io-client';
import store from '../store';

class SocketService {
    constructor() {
        this.socket = null;
    }

    //Inicializar el socket
    connect() {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: store.state.auth.token
            }
        });
    }
}
