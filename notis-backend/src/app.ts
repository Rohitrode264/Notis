import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './utils/db';
import { aggregateCurrentAffairs, aggregateGlobalNews, aggregateNewsForIndia } from './services/newsProviders/aggregate';
import NewsModel from './models/NewsBatch';
import { DateTime } from 'luxon';
import newsGlobeRoutes from './routes/newsGlobe.routes';
import newsCaRoutes from './routes/newsCa.routes';
import newsIndiaRoutes from './routes/newsIndia.routes';
import summarizeRoutes from './routes/summarize.routes';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router=Router();

app.get('/', (req: Request, res: Response) => {
  res.send('✅ Notis backend is live and running!');
});

app.post('/NewsBatch', async (req: Request, res: Response) => {

    try {
        const India = await aggregateNewsForIndia();
        const Global = await aggregateGlobalNews();
        const currentAffairs = await aggregateCurrentAffairs();
        const date = DateTime.now().setZone('Asia/Kolkata');
        const dateString = date.toLocaleString(DateTime.DATE_FULL);

        await NewsModel.create({
            date: dateString,
            India: India,
            Global: Global,
            CurrentAffairs: currentAffairs
        })
        res.json({
            message: "News Created"
        })
    }
    catch (e) {
        res.status(401).json({
            errorMessage: e
        })
    }
});

app.get('/NewsBatchForIndia',newsIndiaRoutes);
app.get('/NewsBatchForGlobe',newsGlobeRoutes);
app.get('/NewsBatchOfCa',newsCaRoutes);
app.post('/summarize',summarizeRoutes);

app.delete('/deleteCurrentBatch', async (req: Request, res: Response) => {
    const date = DateTime.now().setZone('Asia/Kolkata');
    const targetDate = date.toLocaleString(DateTime.DATE_FULL);
    try {
        await NewsModel.deleteMany({ date: targetDate });
        res.json({
            message: "All records have been purged and the database is now clean."
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDb();
    console.log(`
        ╔═════════════════════════════════════════════════╗
        ║ 🚀 SERVER LAUNCH INITIATED                      ║
        ║ Port       :: ${PORT}                            ║ 
        ║ Status     :: 🟢 ONLINE                         ║
        ║ Timezone   :: 🌐 Asia/Kolkata                   ║
        ║ Uplink     :: ✔ Database Connected              ║
        ╚══════════════════════════════════════════════════╝
        `);

})
