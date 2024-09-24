import { User } from '../src/models/user'; // Adjust the import path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}