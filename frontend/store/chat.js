export const state = () => ({
    messages: [],
});

export const mutations = {
    loadChats(state, payload) {
        state.messages = payload;
    },
    add(state, payload) {
        if (state.messages.findIndex(x => x.id === payload.id) === -1)
            state.messages.push(payload);
    },
};

export const actions = {
    async loadChats({ commit }, payload) {
        try {
            const res = await this.$axios.get('/chats');
            commit('loadChats', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async add({ state, commit }, payload) {
        try {
            await this.$axios.post('/chat', {
                userId: payload.userId,
                message: payload.message,
            }, {
                withCredentials: true,
            })
        } catch (err) {
            console.error(err);
        }
    },
};