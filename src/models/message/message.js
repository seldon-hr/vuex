export default class Message {
    id = 0;
    author = 0;
    message = "";
    timestamp = new Date().toLocaleTimeString();
    read = false;
    channelId = 0;

    constructor(message) {
        if (message) {
            this.id = message.id ?? 0;
            this.author = message.author ?? 0;
            this.message = message.message ?? "";
            this.timestamp = message.timestamp ?? new Date().toLocaleTimeString();
            this.read = message.read ?? false;
            this.channelId = parseInt(message.channelId) ?? 0;

        } else {
            this.id = 0;
            this.author = 0;
            this.message = "";
            this.timestamp = new Date().toLocaleTimeString();
            this.read = false;
            this.channelId = 0;
        }
    }
}