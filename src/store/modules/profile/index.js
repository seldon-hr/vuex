import { SET_AGE } from '@/common/mutatition-types';

const profile = {
           namespaced: true,
           state: {
               user: {
                    username: "seldon",
                    name: "Seldon",
                    age: 0,
                    email: "seldon@seldon",
                    birth: "1998-12-12",
                    password: "123456",
                    status: "active",
                    avatar: "/avatars/avatar.jpg",
                },
           },
           getters: {
               getAge(state) {
                   return state.age;
               },
           },
           mutations: {
               setAge(state, age) {
                   state.age = age;
               },
           },
           actions: {
               calculateAge({ commit, state }) {
                    const today = new Date();
                    const birthDate = new Date(state.user.birth);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const month = today.getMonth() - birthDate.getMonth();
                    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    commit(SET_AGE, age);
                },
           },
}     

export default profile;
