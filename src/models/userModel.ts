import { Schema, model, Types } from 'mongoose';

export interface InterfaceUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  otp: string | undefined;
  isActive: boolean;
  createdAt: Date;
  UpdatedAt: Date;
}

const userSchema: Schema = new Schema<InterfaceUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      maxlength: [50, 'A Name can contains Maximum 50 Characters.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide us your Email'],
      unique: true,
      maxlength: [100, 'Email Can Contains Maximum 100 Characters'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    otp: {
      type: String,
      maxlength: [6, 'OTP Can Contains Maximum 6 Characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const User = model('User', userSchema);
