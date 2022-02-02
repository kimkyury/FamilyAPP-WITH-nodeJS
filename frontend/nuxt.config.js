
module.exports = {
    head: {
        title: 'NodeBird',
    },
    buildModules: [
        '@nuxtjs/vuetify',

    ],
    modules: [
        '@nuxtjs/axios',
    ],
    vuetify: {

    },
    axios: {
        browserBaseURL: 'http://127.0.0.1:3085',
        baseURL: 'http://127.0.0.1:3085',
        https: false,
    },
};