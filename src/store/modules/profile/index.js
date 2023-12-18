import { SET_AGE, SET_USERNAME } from '@/common/mutatition-types';
import { appStorage } from '../../../helpers/appStorage';

const _USER = appStorage.getUser();

const profile = {
           namespaced: true,
           state: {
               user: _USER
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
           },
           actions: {
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
