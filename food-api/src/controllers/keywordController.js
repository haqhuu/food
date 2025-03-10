import axios from "axios";
import CandidateKeyword from "../models/CandidateKeyword.js";


const cosineSimilarity = (vecA, vecB) => {
    if (vecA.length !== vecB.length) {
        throw new Error("Vector dimensions do not match.");
    }
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}


export const recommendSimilarKeywords = async (req, res) => {
    try {
        // const { keyword } = req.query;
        const keyword = req.body.params.q;
        // console.log("--> keyword: ", q);

        if (!keyword) {
            return res.status(400).json({ error: "Missing 'keyword' in request body" });
        }

        // Gọi OpenAI API để tính embedding cho từ khóa đầu vào
        const aiResponse = await axios.post('http://ai-service:8003/embeddings', {
            text: keyword
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("kwwww: ", keyword);
        const inputEmbedding = aiResponse.data.embedding[0];
        console.log("___> E data:", inputEmbedding);
        // Sử dụng MongoDB Atlas Search (nếu đã cấu hình) để tìm top 5 candidate keywords gần nhất
        // Ví dụ dưới đây sử dụng aggregation pipeline với toán tử knnBeta (nếu sử dụng Atlas Search):
        const suggestions = await CandidateKeyword.aggregate([
            {
                $search: {
                    index: "candidateVector", // Tên index đã cấu hình cho trường embedding
                    knnBeta: {
                        vector: inputEmbedding,
                        path: "embedding",
                        k: 5,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    keyword: 1,
                    score: { $meta: "searchScore" },
                },
            },
        ]);

        return res.status(200).json({ suggestions });
    } catch (e) {
        console.log("e: ", e);
        return res.status(500).json({ "message": "server is broken" });
    }
};
