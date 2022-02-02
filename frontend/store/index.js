export const state = () => ({});

export const mutations = {

};

export const actions = {
    async nuxtServerInit({ dispatch }, { req }) {
        await dispatch('users/loadUser')
        await dispatch('users/loadFamilies');
    },
};