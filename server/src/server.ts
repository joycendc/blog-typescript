import http from 'http';
import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';
import userRoutes from './routes/user';
import blogRoutes from './routes/blog';

const router = express();

/** Server handler */
const httpServer = http.createServer(router);

/** Connect to firebase admin */
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey)
});

/** Connec to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        console.log('Connected to Mongo');
    })
    .catch((error) => console.log(error));

/** Logging middleware */
router.use((req, res, next) => {
    console.log(`Method '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`);

    res.on('finish', () => {
        console.log(`Method '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`);
    });

    next();
});

/** Parse the Body */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** API Access Policies */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PACTH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

/** Error handler */
router.use((req, res, next) => {
    const error = new Error('Not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Request listener */
httpServer.listen(config.server.port, () => {
    console.log(`Server is running on PORT: ${config.server.port} ...`);
});
