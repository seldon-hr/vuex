import { reactive } from "vue";

/* 
Al utilizar reactive para crear el objeto store, 
   se asegura que cualquier cambio en el valor de username será notificado a 
todos los componentes que estén utilizando ese valor en su vista, permitiendo que la interfaz de usuario se actualice de forma dinámic */
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
        /* this, hace referencia al mismo objeto, al store */
        this.username = newUsername;
    },
});

/* Si se usa el store nos permite exportar todo el módulo, es decir lo principal
y tendremos ya este en una sola exportación */
export default store;