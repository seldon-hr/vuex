import { reactive } from "vue";

const store = reactive({
    username: "seldon",
    user: {
        name: "Seldon",
        age: 0,
        email: "seldon@seldon",
        birth: "1998-12-12",
    },

    // Methods
    //Calcular user age
    calculateAge() {
        const today = new Date();
        const birthDate = new Date(this.user.birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        this.user.age = age;
    },

    updateUsername(newUsername) {
        this.username = newUsername;
    },
});

/* Si se usa el store nos permite exportar todo el módulo, es decir lo principal
y tendremos ya este en una sola exportación */
export default store;