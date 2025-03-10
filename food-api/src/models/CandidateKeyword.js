// models/CandidateKeyword.js
import mongoose from "mongoose";

const CandidateKeywordSchema = new mongoose.Schema({
    keyword: { type: String, required: true, unique: true },
    embedding: { type: [Number], required: true } // ví dụ: vector có chiều cố định, như 768
});

export default mongoose.model("CandidateKeyword", CandidateKeywordSchema);
