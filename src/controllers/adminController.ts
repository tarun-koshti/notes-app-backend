import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utility/appError';
import { User } from '../models/userModel';

export class AdminUserController {
  // Create a new user
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json({
        status: 'success',
        data: savedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a user by ID
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('No User Found with That UserId', 404);
      }

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a user by ID
  static async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        throw new AppError('No User Found with That UserId', 404);
      }

      res.status(200).json({
        status: 'success',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a user by ID
  static async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new AppError('No User Found with That UserId', 404);
      }

      res.status(200).json({
        status: 'success',
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all users
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find().sort({ createdAt: -1 });

      res.status(200).json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
