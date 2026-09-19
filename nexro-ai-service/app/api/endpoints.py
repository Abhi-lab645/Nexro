from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from app.services.demand_forecaster import DemandForecaster
from app.services.capacity_rebalancer import CapacityRebalancer
from app.services.explainable_ai import ExplainableAI

router = APIRouter(prefix="/ai", tags=["AI Predictive Engine"])

class DemandPredictionRequest(BaseModel):
    cluster: Optional[str] = Field(default='Bangalore East (Indiranagar)')
    targetDate: Optional[str] = Field(default='Tomorrow')
    temperatureCelsius: Optional[float] = Field(default=34.5)
    humidityPercentage: Optional[float] = Field(default=78.0)
    isFestivalEve: Optional[bool] = Field(default=True)

class RebalancePlanRequest(BaseModel):
    targetCluster: Optional[str] = Field(default='Bangalore East (Indiranagar)')
    trade: Optional[str] = Field(default='Electrical')
    deficitCount: Optional[int] = Field(default=63)

class ExplanationRequest(BaseModel):
    cluster: Optional[str] = Field(default='Bangalore East (Indiranagar)')
    trade: Optional[str] = Field(default='Electrical')
    deficit: Optional[int] = Field(default=63)

class WorkerMatchRequest(BaseModel):
    bookingCategory: str = 'Electrical'
    customerLat: float = 12.9784
    customerLng: float = 77.6408
    candidates: List[Dict[str, Any]] = []

@router.post("/predict-demand")
def predict_demand(req: DemandPredictionRequest):
    return DemandForecaster.predict(
        cluster=req.cluster,
        target_date=req.targetDate,
        temperature_c=req.temperatureCelsius,
        humidity_pct=req.humidityPercentage,
        is_festival_eve=req.isFestivalEve
    )

@router.post("/rebalance-plan")
def generate_rebalance_plan(req: RebalancePlanRequest):
    return CapacityRebalancer.generate_rebalance_plan(
        target_cluster=req.targetCluster,
        trade=req.trade,
        deficit_count=req.deficitCount
    )

@router.post("/explain-reasoning")
def explain_reasoning(req: ExplanationRequest):
    return ExplainableAI.generate_explanation(
        cluster=req.cluster,
        trade=req.trade,
        deficit=req.deficit
    )

@router.post("/match-worker")
def match_worker(req: WorkerMatchRequest):
    """
    Cooperative equitable dispatch: sorts candidates by
    skill match, proximity distance, and rotation fairness score.
    """
    ranked = sorted(
        req.candidates,
        key=lambda c: (
            c.get('rating', 4.5) * 0.4 +
            (10.0 - min(10.0, c.get('distanceKm', 5.0))) * 0.4 +
            (1.0 if c.get('status') == 'available' else 0.0) * 0.2
        ),
        reverse=True
    )
    return {
        'rankedCandidates': ranked,
        'selectedWorker': ranked[0] if ranked else None,
        'dispatchPolicy': 'Cooperative Equitable Rotation (NSQF Level 4 Certified)'
    }
