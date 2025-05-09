// import cron from 'node-cron';
import { DateTime } from 'luxon';
// import { fetchCaGnews } from './services/newsProviders/Current-Affairs(India)/CaGnews';
// import { aggregateCurrentAffairs } from './services/newsProviders/aggregate';

// // Get current IST time
// const nowInIST = DateTime.now().setZone('Asia/Kolkata');
// const targetTime = nowInIST.plus({ minutes: 1 });

// // Format to cron pattern (minute and hour only)
// const minute = targetTime.minute;
// const hour = targetTime.hour;

// const cronPattern = `5 16 * * *`;

// console.log(`Scheduling "Hi Rohit" at IST ${targetTime.toFormat('HH:mm')}`);

// // Schedule the cron job
// cron.schedule(cronPattern, async () => {
//     const news = await aggregateCurrentAffairs();
//     console.log(`[${DateTime.now().setZone('Asia/Kolkata').toFormat('HH:mm:ss')}]`, news);
//   });
const response = DateTime.now().setZone('Asia/Kolkata');
console.log(response.toString()); // ISO format
console.log(response.toLocaleString(DateTime.DATE_FULL))