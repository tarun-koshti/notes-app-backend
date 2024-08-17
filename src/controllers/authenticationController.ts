import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { InterfaceUser, User } from '../models/userModel';
import { AppError } from '../utility/appError';

const signToken = (user: InterfaceUser) => {
  const token: string = jwt.sign(user._id.toString(), 'some-secret');
  return token;
};

export class AuthenticationController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(new Date().toString());
      console.log(req.body);
      console.log(req.url);

      await User.create(req.body);

      res.status(200).json({
        status: 'success',
        message: 'OTP Sent successfully on your Email Id.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(new Date().toString());
      console.log(req.body);
      console.log(req.url);

      if (!req.body.email) {
        throw new AppError('Email is Missing.', 401);
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new AppError('No User Found with That Email ID.', 404);

      res.status(200).json({
        status: 'success',
        message: 'OTP Sent Successfully on Your Email Id.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(new Date().toString());
      console.log(req.body);
      console.log(req.url);

      const { email, otp } = req.body;
      if (!email || !otp) throw new AppError('Please provide us Email and otp.', 401);
      const user = await User.findOne<HydratedDocument<InterfaceUser>>({ email });
      if (!user) throw new AppError('No User Found With That Email ID.', 404);

      // if (user?.otp !== otp) {
      //   throw new AppError('OTP Did not match.', 404);
      // }
      const token: string = signToken(user);

      res.status(200).json({
        status: 'success',
        token,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      throw new AppError('No Token Found', 401);
    }
    const token: string = req.headers.authorization.split(' ')[1];
    const id = jwt.verify(token, 'some-secret');
    console.log(id);
    
    const user = await User.findOne<HydratedDocument<InterfaceUser>>({
      _id: id,
    });
    if (!user) throw new AppError('Invalid Token.', 403);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
