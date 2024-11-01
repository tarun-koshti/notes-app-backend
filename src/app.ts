import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

if (!process.env.NODE_ENV) {
  dotenv.config({ path: './config.env' });
}

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use('/api', require('./routes'));

app.all('**', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'This route is not defined.',
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const stack: string = error.stack || '';
    const message: string = error.message || '';
    const statusCode: number = error.statusCode || 500;

    res.status(statusCode).json({
      status: 'error',
      message,
      stack,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
    });
  }
});

let db: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/notes-app-typescript`;
if (process.env.NODE_ENV === 'docker') {
  db = `mongodb://db:27017/notes-app-typescript`;
} else if (process.env.NODE_ENV === 'kubernetes') {
  db = process.env.MONGO_URI || `mongodb://db:27017/notes-app-typescript`;
}
console.log(db);

connect(db)
  .then(() => console.log('DB Connection Successful!'))
  .catch((error) => console.log(error.message));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Running on Port ${port}.`);
});
