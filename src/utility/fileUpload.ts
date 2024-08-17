import multer from 'multer';
import { Request } from 'express';
import { AppError } from './appError';

interface FileCp extends multer.FileFilterCallback {
  (error: Error | null, acceptFile: boolean): void;
}

const storage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cp: FileCp) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cp(null, true);
  } else {
    cp(
      new AppError(
        `Invalid File Type: ${file.mimetype}. Only ${allowedFileTypes.join(
          ', '
        )} File Types are Allowed.`,
        400
      ),
      false
    );
  }
};

export const fileUpload = multer({ storage, fileFilter });
