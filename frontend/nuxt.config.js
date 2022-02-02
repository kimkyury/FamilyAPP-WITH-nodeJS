
module.exports = {
    head: {
        title: 'NodeBird',
    },
    buildModules: [
        '@nuxtjs/vuetify',

    ],
    modules: [
        '@nuxtjs/axios',
        'nuxt-socket-io',
    ],
    io: {
        // module options
        sockets: [{
            name: 'main',
            url: 'http://localhost:3085',
        }]
    },
    vuetify: {

    },
    axios: {
        browserBaseURL: 'http://127.0.0.1:3085',
        baseURL: 'http://127.0.0.1:3085',
        https: false,
    },
};