export default class User {
    username = '';
    password = '';
    avatar = '/public/avatars/genericAvatar.jpg';
    birthDate = '';
    age = 0;
    status = '';
    adress = {};
    company = {};
    email = '';
    name = '';
    phone = '';
    website = '';

    constructor(user) {
        if (user) {
            this.username = user.username ?? '';
            this.password = user.password ?? '';
            this.avatar = user.avatar ?? '/public/avatars/genericAvatar.jpg';
            this.birthDate = user.birthDate ?? '';
            this.age = user.age ?? 0;
            this.status = user.status ?? '';
            this.adress = user.adress ?? {};
            this.company = user.company ?? {};
            this.email = user.email ?? '';
            this.name = user.name ?? '';
            this.phone = user.phone ?? '';
            this.website = user.website ?? '';
        } else {
            this.username = '';
            this.password = '';
            this.avatar = '/public/avatars/genericAvatar.jpg';
            this.birthDate = '';
            this.age = 0;
            this.status = '';
            this.adress = {};
            this.company = {};
            this.email = '';
            this.name = '';
            this.phone = '';
            this.website = '';
        }
    }
}