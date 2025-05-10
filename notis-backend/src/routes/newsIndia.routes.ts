import express, { Request, Response, Router } from 'express';
import { DateTime } from 'luxon';
import NewsModel from '../models/NewsBatch';
const app=Router();

app.get('/NewsBatchForIndia', async (req: Request, res: Response) => {
    const date = DateTime.now().setZone('Asia/Kolkata');
    const dateString = date.toLocaleString(DateTime.DATE_FULL);
    
    const response=await NewsModel.findOne({date:dateString});

    res.json(response?.India);
});

export default app;