const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            autoIndex: false,
            retryWrites: false
        },
        url: 'mongodb+srv://admin:admin@health.augaz.mongodb.net/myBlog'
    },
    server: {
        host: 'localhost',
        port: '1337'
    }
};

export default config;
