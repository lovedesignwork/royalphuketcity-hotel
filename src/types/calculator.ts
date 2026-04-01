export interface CalculatorInputs {
  // Hotel Baseline
  totalRooms: number;
  campaignMonths: number;
  adr: number;

  // Occupancy Targets
  currentOcc: number;
  targetOcc: number;

  // Budget & Channel
  monthlyBudget: number;
  costPerLead: number;
  conversionRate: number;
  avgNights: number;
  organicMonthly: number;
}

export interface GapMetrics {
  currentPerNight: number;
  targetPerNight: number;
  extraPerNight: number;
  gapTotal: number;
}

export interface ResultMetrics {
  adNights: number;
  organicNights: number;
  totalExtraNights: number;
  projectedOcc: number;
  totalAdSpend: number;
  additionalRevenue: number;
  roas: number;
  gapVsTarget: number;
}

export interface CalculatorOutputs {
  gap: GapMetrics;
  results: ResultMetrics;
  targetMet: boolean;
}
