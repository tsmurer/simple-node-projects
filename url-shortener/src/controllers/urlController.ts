import { Request, Response } from 'express-serve-static-core';
import Url from '../models/url';
import shortId from 'shortid';

export const createUrl = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;


    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    const shortUrl = shortId.generate();

    const url = new Url({ originalUrl, shortUrl });

    await url.save();

    res.json({shortUrl});
}

export const redirectUrl = async (req: Request, res: Response) => {
    const shortUrl = req.params.shortUrl;

    const url = await Url.findOne({ shortUrl });

    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);   
}