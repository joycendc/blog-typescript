import firebaseAdmin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
    console.log('Validating firebase token...');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((result) => {
                if (result) {
                    res.locals.firebase = result;
                    res.locals.fire_token = token;
                    next();
                } else {
                    console.log('Invalid Token, unauthorized...');

                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
            })
            .catch((error) => {
                console.log(error);

                return res.status(401).json({
                    error,
                    message: 'Unauthorizes'
                });
            });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractFirebaseInfo;
