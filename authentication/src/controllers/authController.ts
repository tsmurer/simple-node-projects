import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.registerUser(username, password);
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await AuthService.loginUser(username, password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  }

  static async protected(req: Request, res: Response) {
    res.json({ message: 'This is a protected route', user: req.user });
  }
}
