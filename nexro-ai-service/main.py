from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.api.endpoints import router as ai_router

app = FastAPI(
    title="Nexro Predictive Demand & Capacity AI Service",
    description="Python FastAPI Microservice for Demand AI, Inter-Society Workforce Rebalancing and Explainable AI.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Nexro Demand AI Microservice",
        "version": "1.0.0",
        "port": 8000,
        "runtime": "Python 3.14 + FastAPI",
        "models": ["DemandForecaster", "CapacityRebalancer", "ExplainableAI"],
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
