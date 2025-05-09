import mongoose from "mongoose"

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL || '');
        console.log('MongoDB connected. Data streams flowing at quantum speed.');
    }
    catch(e){
        console.log(`An error occured:- ${e}`);
        process.exit(1);
    }
}

import '../scheduler/cronjobs';

export default connectDb;