import Vue from 'vue';

export const state = () => ({
    mainPosts: [],
    imagePaths: [],
    folders: [],
    mainImage: {},
});

export const mutations = {
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state, payload) {
        state.imagePaths.splice(payload, 1);
    },
    addMainPost(state, payload) {
        payload.forEach(x => state.mainPosts.push(x));
        const find = state.folders.find(x => x.id == payload[0].FolderId)
        if (find == undefined) state.folders.push(payload[0].Folder);
        state.imagePaths = [];
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(x => x.id === payload.postId);
        state.mainPosts.splice(index, 1);
    },
    loadFolders(state, payload) {
        state.folders = payload;
    },
    removeFolder(state, payload) {
        // const index = state.folders.findIndex(x => x.id === payload.folderId);
        // state.folders.splice(index, 1);
    },
    loadPosts(state, payload) {
        state.mainPosts = payload;
    },
    unlikePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId);
        state.mainPosts[index].Likers.splice(userIndex, 1);
    },
    likePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Likers.push({
            id: payload.userId,
        })

    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadComments(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        Vue.set(state.mainPosts[index], 'Comments', payload.data);
    },
    loadMainImage(state, payload) {
        state.mainImage = payload;
    },
    changeFolder(state, payload) {
        const removeIndex = state.mainPosts.findIndex(x => x.id === payload.postId);
        state.mainPosts.splice(removeIndex, 1);
        state.mainPosts.push(payload.data);
    },
    uploadMainImage(state, payload) {
        state.mainImage = payload;
    }
};

export const actions = {
    async clearImage({ state }) {
        try {
            state.imagePaths = [];
        } catch (err) {
            console.error(err);
        }
    },
    async loadMainImage({ commit }, payload) {
        try {
            const res = await this.$axios.get('/post/mainImage', {
                withCredentials: true,
            });
            commit('loadMainImage', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadFolders({ commit }, payload) {
        try {
            const res = await this.$axios.get('/folder', {
                withCredentials: true,
            });
            commit('loadFolders', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadPosts({ commit }, payload) {
        try {
            const res = await this.$axios.get('/posts', {
                withCredentials: true,
            });
            commit('loadPosts', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadHashtagPosts({ commit }, payload) {
        try {
            const res = await this.$axios.get(`/hashtag/${payload.hashtag}`, {
                withCredentials: true,
            });
            commit('loadPosts', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async uploadImages({ commit }, payload) {
        try {
            console.log('dd', payload);
            const res = await this.$axios.post('/post/images', payload, {
                withCredentials: true,
            })
            commit('concatImagePaths', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async uploadMainImage({ commit }, payload) {
        try {
            const res = await this.$axios.post('/post/mainImage', payload, {
                withCredentials: true,
            })
            commit('uploadMainImage', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async add({ state, commit }, payload) {
        try {
            let res = [];
            for (let i = 0; i < state.imagePaths.length; i++) {
                res.push(
                    await this.$axios.post('/post', {
                        date: payload.date,
                        content: payload.content,
                        image: state.imagePaths[i],
                    }, {
                        withCredentials: true,
                    }))
            }
            res = res.map(v => v.data);
            commit('addMainPost', res);
        } catch (err) {
            console.error(err);
        }
    },
    async remove({ state, commit }, payload) {
        try {
            await this.$axios.delete(`/post/${payload.postId}`, {
                withCredentials: true,
            })
            commit('removeMainPost', payload);
        } catch (err) {
            console.error(err);
        }
    },
    async removeFolder({ commit }, payload) {
        try {
            if (payload.folderId) {
                await this.$axios.delete(`/folder/${payload.folderId}`, {
                    withCredentials: true,
                });
                commit('removeFolder', payload);
            }
        } catch (err) {
            console.error(err);
        }
    },

    async likePost({ commit }, payload) {
        try {
            const res = await this.$axios.post(`/post/like/${payload.postId}`, {}, {
                withCredentials: true,
            });
            commit('likePost', {
                userId: res.data.userId,
                postId: payload.postId,
            })
        } catch (err) {
            console.error(err);
        }
    },

    async unlikePost({ commit }, payload) {
        try {
            const res = await this.$axios.delete(`/post/like/${payload.postId}`, {
                withCredentials: true,
            });
            commit('unlikePost', {
                userId: res.data.userId,
                postId: payload.postId,
            })
        } catch (err) {
            console.error(err);
        }
    },

    async loadComments({ commit }, payload) {
        try {
            const res = await this.$axios.get(`/post/${payload.postId}/comment`, {
                withCredentials: true,
            })
            commit('loadComments', res.data)
        } catch (err) {
            console.error(err);
        }
    },

    async addComment({ commit }, payload) {
        try {
            const res = await this.$axios.post(`/post/${payload.postId}/comment`, {
                id: payload.postId,
                content: payload.content,
            }, {
                withCredentials: true,
            })
            commit('addComment', res.data);
        } catch (err) {
            console.error(err);
        }
    },

    async changeFolder({ commit }, payload) {
        try {
            const res = await this.$axios.put(`/folder/change`, {
                id: payload.postId,
                date: payload.date,
            }, {
                withCredentials: true,
            })
            commit('changeFolder', { postId: payload.postId, data: res.data });
        } catch (err) {
            console.error(err);
        }
    },
};