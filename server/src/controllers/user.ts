import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import mongoose from 'mongoose';

const validate = (req: Request, res: Response, next: NextFunction) => {
    console.log('Token validate, returning user...');

    let firebase = res.locals.firebase;

    return User.findOne({ uid: firebase.uid })
        .then((user) => {
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
        })
        .catch((error) => {
            console.log(error);

            return res.status(401).json({
                error
            });
        });
};

const create = (req: Request, res: Response, next: NextFunction) => {
    console.log('Attempting to create user...');

    let { uid, name } = req.body;
    let fire_token = res.locals.fire_token;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        uid,
        name
    });

    return user
        .save()
        .then((newUser) => {
            console.log(`New user ${uid} created.`);

            return res.status(200).json({
                user: newUser,
                fire_token
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    console.log('Loggin in user...');

    let { uid } = req.body;
    let fire_token = res.locals.fire_token;

    return User.findOne({ uid })
        .then((user) => {
            if (user) {
                console.log(`User ${uid} found, signing in...`);

                return res.status(200).json({ user, fire_token });
            } else {
                console.log(`User ${uid} not found, register...`);
                return create(req, res, next);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.userID;
    console.log(`Incoming read for ${_id} ...`);

    return User.findById(_id)
        .then((user) => {
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(402).json({ message: 'User not found' });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming read all...`);

    return User.find()
        .exec()
        .then((users) => {
            return res.status(200).json({ count: users.length, users });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

export default {
    validate,
    create,
    login,
    read,
    readAll
};
