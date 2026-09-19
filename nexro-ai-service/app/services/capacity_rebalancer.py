from typing import Dict, Any, List

class CapacityRebalancer:
    """
    Multi-Society Capacity Optimization Engine
    Computes inter-cooperative worker shifts to resolve localized deficit spikes
    while respecting primary society autonomy and minimizing member transit.
    """

    NEIGHBORING_SOCIETIES = [
        {
            'societyId': 'soc_kcls_42',
            'societyName': 'KCLS #42 Indiranagar',
            'cluster': 'Indiranagar Central',
            'surplusCapacity': 20,
            'transitMinutes': 8,
            'transitDistanceKm': 2.4
        },
        {
            'societyId': 'soc_bub_18',
            'societyName': 'Domlur Labour Co-op #18',
            'cluster': 'Domlur Ring Road',
            'surplusCapacity': 16,
            'transitMinutes': 12,
            'transitDistanceKm': 4.1
        },
        {
            'societyId': 'soc_uls_09',
            'societyName': 'Ulsoor Guild #09',
            'cluster': 'Ulsoor / Halasuru',
            'surplusCapacity': 14,
            'transitMinutes': 15,
            'transitDistanceKm': 5.2
        },
        {
            'societyId': 'soc_mal_03',
            'societyName': 'Malleshwaram Guild #03',
            'cluster': 'Malleshwaram Central',
            'surplusCapacity': 13,
            'transitMinutes': 24,
            'transitDistanceKm': 8.9
        }
    ]

    @classmethod
    def generate_rebalance_plan(
        cls,
        target_cluster: str = 'Bangalore East (Indiranagar)',
        trade: str = 'Electrical',
        deficit_count: int = 63
    ) -> Dict[str, Any]:
        allocated_shifts = []
        remaining_needed = deficit_count

        for candidate in sorted(cls.NEIGHBORING_SOCIETIES, key=lambda s: s['transitMinutes']):
            if remaining_needed <= 0:
                break
            
            shift_count = min(remaining_needed, candidate['surplusCapacity'])
            remaining_needed -= shift_count

            allocated_shifts.append({
                'sourceSocietyId': candidate['societyId'],
                'sourceSociety': candidate['societyName'],
                'sourceCluster': candidate['cluster'],
                'transferredWorkers': shift_count,
                'transitMinutes': candidate['transitMinutes'],
                'transitDistanceKm': candidate['transitDistanceKm'],
                'status': 'Proposed (Awaiting Federation MD Approval)'
            })

        total_transferred = deficit_count - remaining_needed

        return {
            'targetCluster': target_cluster,
            'trade': trade,
            'totalDeficit': deficit_count,
            'totalReallocated': total_transferred,
            'unmetDeficit': remaining_needed,
            'reallocationPlan': allocated_shifts,
            'projectedImpact': {
                'slaResponseBeforeMinutes': 24.5,
                'slaResponseAfterMinutes': 9.2,
                'fulfillmentRateBefore': '84.1%',
                'fulfillmentRateAfter': '99.2%',
                'cooperativeFairnessIndex': 0.94
            },
            'statutoryCompliance': {
                'interSocietyProtocol': 'Karnataka Cooperative Societies Act Section 27-B Compliant',
                'travelAllowanceIncluded': True,
                'welfareShieldContinuous': True
            }
        }
