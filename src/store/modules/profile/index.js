import { SET_AGE, SET_USERNAME, SET_USER, SET_USER_LIST } from '@/common/mutatition-types';
import User from '../../../models/account/user';


const profile = {
            namespaced: true,
            state: {
               user: new User(),
            },
            getters: {
               getAge(state) {
                   return state.user.age;
               },
           },
           mutations: {
                [SET_AGE](state, age) {
                   state.user.age = age;
                },
                [SET_USERNAME](state, age) {
                   state.user.username = age;
                },
                [SET_USER](state, user) {
                     state.user = user;
               },
           },
            actions: {
               getUser({ commit }) {
                    const user = this.state.account.user;

                    const usersList = this.state.account.usersList;
                    const userIndex = usersList.findIndex((u) => u.username === user.username);
                    if (userIndex > -1) {
                        usersList.splice(userIndex, 1);
                        usersList.unshift(user);
                        commit(SET_USER_LIST, usersList);
                    }

                    
                    commit(SET_USER, user);
                },


               calculateAge({ commit, state }) {
                   const today = new Date();
                   const birthDate = new Date(state.user.birthDate);
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
