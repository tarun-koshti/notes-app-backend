import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import { AppError } from '../utility/appError';

export class UserController {
  // ... Other functions ...

  // Get the user's own profile
  static async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // The authenticated user's ID can be obtained from the request, assuming you have implemented authentication middleware
      const userId = req.user._id;

      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('No User Found With That UserID', 404);
      }

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update the user's own profile
  static async updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        throw new AppError('No User Found With That UserID', 404);
      }

      res.status(200).json({
        status: 'success',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete the user's own profile
  static async deleteMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user._id;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new AppError('No User Found With That UserID', 404);
      }

      res.status(200).json({
        status: 'success',
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
