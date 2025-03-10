// processCandidates.js
import mongoose from "mongoose";
import CandidateKeyword from "../models/CandidateKeyword.js";
import { getUniqueKeywords } from "./extractCandidates.js";
import axios from "axios";

// Hàm gọi API tính embedding cho một keyword
export const computeEmbedding = async (keyword) => {
    try {
        const response = await axios.post('http://ai-service:8003/embeddings', {
            text: keyword
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        // const embedding = data.embedding;
        console.log(response.data.embedding[0]);
        // return response.data.data[0].embedding;
        return response.data.embedding[0];
    } catch (e) {
        console.log("e: ", e);
    }

}

export const processCandidates = async () => {
    const batchSize = 100; // Số lượng keyword xử lý trong mỗi batch (có thể điều chỉnh)
    const keywords = await getUniqueKeywords();
    console.log(`Found ${keywords.length} unique keywords`);

    for (let i = 0; i < keywords.length; i += batchSize) {
        const batch = keywords.slice(i, i + batchSize);
        console.log("===> batch:: ", batch);
        // Tính embedding cho mỗi keyword trong batch với concurrency giới hạn
        const operations = await Promise.all(batch.map(async keyword => {
            try {
                const embedding = await computeEmbedding(keyword);
                // console.log("+====> embedding: ", embedding);
                return {
                    updateOne: {
                        filter: { keyword },
                        update: { $set: { embedding } },
                        upsert: true,
                    }
                };
            } catch (error) {
                console.error(`Error processing keyword "${keyword}":`, error.message);
                return null;
            }
        }));

        // Lọc bỏ các null operation
        const bulkOps = operations.filter(op => op !== null);
        if (bulkOps.length) {
            await CandidateKeyword.bulkWrite(bulkOps);
            console.log(`Processed batch ${i / batchSize + 1} / ${Math.ceil(keywords.length / batchSize)}`);
        }

        // Thêm delay để không gây quá tải cho API hoặc DB (có thể sử dụng setTimeout hoặc sleep)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log("Done processing candidate keywords.");
}


mongoose.connect(`mongodb://admin:admin@food-mongodb:27017/food?authSource=admin`)
    .then(() => processCandidates())
    .then(() => mongoose.disconnect())
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
