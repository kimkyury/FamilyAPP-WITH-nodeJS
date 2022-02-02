export const state = () => ({
    births: [],
    mainSpecials: [],
});

function fullData(x) {
    let temp = x.date.split("-");
    temp[2] = temp[2].split("T")[0];
    temp = temp.map((x) => parseInt(x));
    const now = new Date();
    const event = new Date(temp[0], temp[1] - 1, temp[2] - 1);
    return [Math.floor(
        ((now.getTime() - event.getTime()) / (1000 * 60 * 60 * 24)) * -1
    ), x]
}

export const mutations = {
    loadSpecials(state, payload) {
        const temp = payload.map(x => fullData(x));
        state.mainSpecials = temp;
    },
    addMainSpecial(state, payload) {
        state.mainSpecials.push(fullData(payload));
    },
};

export const actions = {
    async loadSpecials({ commit }, payload) {
        try {
            const res = await this.$axios.get('/specials', {
                withCredentials: true,
            });
            commit('loadSpecials', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async add({ state, commit }, payload) {
        try {
            const res = await this.$axios.post('/special', {
                content: payload.content,
                date: payload.date,
                id: payload.id,
            }, {
                withCredentials: true,
            });
            commit('addMainSpecial', res.data)
        } catch (err) {
            console.error(err);
        }
    },
    async remove({ commit }, payload) {
        try {
            await this.$axios.delete(`/schedule/${payload.id}`, {
                withCredentials: true,
            });
            commit('remove', payload);
        } catch (err) {
            console.error(err);
        }
    },

};