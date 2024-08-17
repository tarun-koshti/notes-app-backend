export class AppError extends Error {
  statusCode: number;
  status: string;
  constructor(message: string, statusCode?: number | undefined) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error;';
    Error.captureStackTrace(this, this.constructor);
  }
}
