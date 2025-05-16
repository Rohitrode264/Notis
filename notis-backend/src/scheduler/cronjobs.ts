import cron from 'node-cron';
import axios from 'axios';
import { BASE_URL } from '../config/env';
import { DateTime } from 'luxon';
console.log('Scheduled task execution has begun.');
cron.schedule('50 59 * * * *', async ()=>{
    try{
        console.log(`Cleaning the database at ${DateTime.now().setZone('Asia/Kolkata')}`);
        await axios.delete(`${BASE_URL}/deleteCurrentBatch`);
        console.log(`Data cleanup operation has been executed at ${DateTime.now().setZone('Asia/Kolkata')}`);
    }
    catch(error:any){
        console.error(`Error during deletion ${error}`)
    }
});

cron.schedule('0 0 * * * *', async ()=>{
    try{
        console.log(`Data update in progress at ${DateTime.now().setZone('Asia/Kolkata')}`);
        await axios.post(`${BASE_URL}/NewsBatch`);
        console.log(`Data has been successfully updated at ${DateTime.now().setZone('Asia/Kolkata')}`);
    }
    catch(error:any){
        console.error(`Error during updating the data ${error}`);
    }
});
