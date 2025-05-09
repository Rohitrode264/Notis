import mongoose, { Model, Schema } from "mongoose";
import { title } from "process";

const Articles = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
});

const NewsBatch = new Schema({
    date: {
        type: String,
        default: () => new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split("T")[0],
        required: true,
    },
    India: [Articles],
    Global: [Articles],
    CurrentAffairs: [Articles]
});

const NewsModel = mongoose.model('NewsModel', NewsBatch);
export default NewsModel;