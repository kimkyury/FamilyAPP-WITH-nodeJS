export const state = () => ({
    me: null,
    families: [],
});

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
    setFamilies(state, payload) {
        state.families = payload;
    },
};

export const actions = {
    async loadFamilies({ state, commit }) {
        try {
            const res = await this.$axios.get('/families', {
                withCredentials: true,
            });
            commit('setFamilies', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadUser({ state, commit }) {
        try {
            const res = await this.$axios.get('/user', {
                withCredentials: true,
            });
            commit('setMe', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async signUp({ commit }, payload) {
        try {
            const res = await this.$axios.post('/user', {
                email: payload.email,
                nickname: payload.nickname,
                password: payload.password,
                birth: payload.birth,
                category: payload.category,
                color: payload.color,
            }, {
                withCredentials: true,
            })
            commit('setMe', res.data);
        } catch (err) {
            alert('이미 존재하는 이메일입니다.');
            console.error(err);
        }

    },
    async logIn({ commit }, payload) {
        try {
            const res = await this.$axios.post('/user/login', {
                email: payload.email,
                password: payload.password,
            }, {
                withCredentials: true
            })
            commit('setMe', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async logOut({ commit }) {
        try {
            await this.$axios.post('/user/logout', {}, {
                withCredentials: true,
            })
            commit('setMe', null);
        } catch (err) {
            console.error(err);
        }
    },
};