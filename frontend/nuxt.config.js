
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
            url: 'http://127.0.0.1:3085',
        }]
    },
    vuetify: {

    },
    axios: {
        browserBaseURL: 'http://127.0.0.1:3085',
        baseURL: 'http://127.0.0.1:3085',
        https: false,
    },
    server: {
        port: 3000,
        host: '127.0.0.1'
    }
};