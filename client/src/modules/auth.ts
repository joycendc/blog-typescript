import firebase from 'firebase/compat';
import { auth } from '../config/firebase';
import IUser from '../interfaces/user';
import axios from 'axios';
import config from '../config/config';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopup(provider)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });

export const Authenticate = async (uid: string, name: string, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${config.server.url}/users/login`,
            data: {
                uid,
                name
            },
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            console.log('Successfully authenticated.');
            callback(null, response.data.user);
        } else {
            console.log('Authentication failed.');
            callback('Authentication failed.', null);
        }
    } catch (error) {
        console.log(error);
        callback('Authentication failed.', null);
    }
};

export const Validate = async (fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.server.url}/users/validate`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            console.log('Successfully validated.');
            callback(null, response.data.user);
        } else {
            console.log('Validation failed.');
            callback('Validation failed.', null);
        }
    } catch (error) {
        console.log(error);
        callback('Validation failed.', null);
    }
};
