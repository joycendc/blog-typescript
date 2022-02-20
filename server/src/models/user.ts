import IUser from '../interfaces/user';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    uid: { type: String, unique: true },
    name: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
