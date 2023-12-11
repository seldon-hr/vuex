import { gettingUser } from '../api';
import { COMMIT_UPDATE_USERNAME, SET_AGE } from '@/common/mutatition-types';

const profile = {
           namespaced: true,
           state: {
               name: "Seldon",
               age: 0,
               email: "seldon@seldon",
               birth: "1998-12-12",
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
                   const birthDate = new Date(state.birth);
                   let age = today.getFullYear() - birthDate.getFullYear();
                   const month = today.getMonth() - birthDate.getMonth();
                   if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                       age--;
                   }
                   commit(SET_AGE, age);
               },

               async updateUsername({ commit }, newUsername) {
                console.log(newUsername);
                const user = await gettingUser(1);
                commit(COMMIT_UPDATE_USERNAME, user.username);
                },
           },
}     

export default profile;
