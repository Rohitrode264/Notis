import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb  from './utils/db';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());






const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await connectDb();
    console.log(`☠️  The database has awakened... ☠️`);
    console.log(`🕸️  Server whispering through port ${PORT}...`);
})