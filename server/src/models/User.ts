import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string; // hashed
  favorites: string[]; // coin ids
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: [String], default: [] },
});

export default mongoose.model<IUser>('User', UserSchema);
