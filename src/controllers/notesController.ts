import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utility/appError';
import { Notes } from '../models/notesModel';

export class NotesController {
  // Create a new note
  static async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.body.userId = req.user._id;
      const newNote = await Notes.create(req.body);
      res.status(201).json({
        status: 'success',
        data: newNote,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all notes
  static async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter: { isActive: Boolean; isPublic?: boolean } = { isActive: true };
      if (req.user.role === 'user') filter.isPublic = true;
      const allNotes = await Notes.find(filter).sort({ createdAt: -1 });

      res.status(200).json({
        status: 'success',
        data: allNotes,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allNotes = await Notes.find({ userId: req.user._id, isActive: true }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        status: 'success',
        data: allNotes,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getNotesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allNotes = await Notes.find({ userId: req.params.id, isActive: true }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        status: 'success',
        data: allNotes,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a single note by ID
  static async getNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        throw new AppError('Note not found', 404);
      }

      res.status(200).json({
        status: 'success',
        data: note,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a note by ID
  static async updateNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter: { _id: string; userId?: any } = { _id: req.params.id };
      if (req.user.role === 'user') filter.userId = req.user._id;
      const updatedNote = await Notes.findOneAndUpdate(filter, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedNote) {
        throw new AppError('Note not found', 404);
      }

      res.status(200).json({
        status: 'success',
        data: updatedNote,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a note by ID
  static async deleteNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter: { _id: string; userId?: any } = { _id: req.params.id };
      if (req.user.role === 'user') filter.userId = req.user._id;
      const deletedNote = await Notes.findByIdAndDelete(filter);
      if (!deletedNote) {
        throw new AppError('Note not found', 404);
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
