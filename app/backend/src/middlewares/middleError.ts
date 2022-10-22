import { ErrorRequestHandler } from 'express';

const middleError: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
};

export default middleError;
