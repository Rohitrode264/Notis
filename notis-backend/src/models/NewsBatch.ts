import mongoose from 'mongoose';

const ArticleSchema= new mongoose.Schema({
    title:String,
    description:String,
    url:String,
    publishedAt:Date,
    source:String,
    summary:String
});

const NewsBatchSchema= new mongoose.Schema({
    batchTime:{
        type:String,
        enum:['6AM', '9AM', '12PM', '3PM', '6PM', '12AM'],
        required:true
    },
    category:{
        type:String,
        enum:['India','Global','Current Affairs'],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    article:[ArticleSchema]
});

export const NewsBatch=mongoose.model('NewsBatch',NewsBatchSchema);