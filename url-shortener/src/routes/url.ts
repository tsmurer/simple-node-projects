import express, { Request, Response } from 'express';
import { createUrl, redirectUrl } from '../controllers/urlController';

const router = express.Router();

// Middleware for createUrl route
const createUrlMiddleware = async (req: Request, res: Response) => {
  try {
    await createUrl(req as Request, res as Response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Middleware for redirectUrl route
const redirectUrlMiddleware = async (req: Request, res: Response) => {
  try {
    await redirectUrl(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post('/', createUrlMiddleware);
router.get('/:shortUrl', redirectUrlMiddleware);

export default router;