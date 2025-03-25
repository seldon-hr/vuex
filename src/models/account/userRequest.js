class UserRequest {
    username = "";
    password = "";

    constructor(username, password) {
        if (username && password) {
            this.username = username ?? '';
            this.password = password ?? '';
        } else {
            this.username = '';
            this.password = '';
        }
    }
}

export default UserRequest;