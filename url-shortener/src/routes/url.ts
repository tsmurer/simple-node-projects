import express from 'express';
import { createUrl, redirectUrl } from '../controllers/urlController';

const router = express.Router();

router.post('/', createUrl);
router.get('/:shortUrl', redirectUrl);

export default router;
