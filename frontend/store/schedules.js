import Vue from 'vue';

export const state = () => ({
    mainSchedules: [],
});

function schedule(x) {
    const s = {
        scheduleId: x.id,
        userId: x.User.id,
        name: x.name,
        start: x.start,
        end: x.end,
        color: x.User.color,
        timed: true,
        category: ['아들', '딸'].includes(x.User.category) ? `${x.User.category}(${x.User.nickname})` : x.User.category,
    }
    return s;
}

export const mutations = {
    addSchedule(state, payload) {
        state.mainSchedules.push(schedule(payload));
    },
    loadSchedules(state, payload) {
        payload = payload.map(x => schedule(x));
        state.mainSchedules = payload;
    },
    remove(state, payload) {
        const idx = state.mainSchedules.findIndex(element => element.scheduleId === payload.id);
        state.mainSchedules.splice(idx, 1);
    }
};

export const actions = {
    async loadSchedules({ commit }, payload) {
        try {
            const res = await this.$axios.get('/schedules');
            commit('loadSchedules', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async add({ state, commit }, payload) {
        try {
            console.log(payload.start);
            const res = await this.$axios.post('/schedule', {
                name: payload.name,
                start: payload.start,
                end: payload.end,
            }, {
                withCredentials: true,
            });
            commit('addSchedule', res.data)
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