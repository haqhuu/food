from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI() 

model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

class TextRequest(BaseModel):
    text: str

@app.post("/embeddings")
async def get_embedding(request: TextRequest):
    embedding = model.encode(request.text)
    return {"embedding": embedding.tolist()}
