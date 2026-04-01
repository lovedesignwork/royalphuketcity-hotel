import { CalculatorInputs, CalculatorOutputs, GapMetrics, ResultMetrics } from "@/types/calculator";

export function calculateKPIs(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    totalRooms,
    campaignMonths,
    adr,
    currentOcc,
    targetOcc,
    monthlyBudget,
    costPerLead,
    conversionRate,
    avgNights,
    organicMonthly,
  } = inputs;

  const totalDays = campaignMonths * 30;

  // Gap metrics
  const currentPerNight = Math.round(totalRooms * (currentOcc / 100));
  const targetPerNight = Math.round(totalRooms * (targetOcc / 100));
  const extraPerNight = targetPerNight - currentPerNight;
  const gapTotal = extraPerNight * totalDays;

  const gap: GapMetrics = {
    currentPerNight,
    targetPerNight,
    extraPerNight,
    gapTotal,
  };

  // Result metrics
  const leadsPerMonth = costPerLead > 0 ? Math.floor(monthlyBudget / costPerLead) : 0;
  const adNights = Math.round(leadsPerMonth * (conversionRate / 100) * avgNights * campaignMonths);
  const organicNights = organicMonthly * campaignMonths;
  const totalExtraNights = adNights + organicNights;

  const projectedOcc = Math.min(
    100,
    Math.round(
      ((currentPerNight * totalDays + totalExtraNights) / (totalRooms * totalDays)) * 100
    )
  );

  const totalAdSpend = monthlyBudget * campaignMonths;
  const additionalRevenue = totalExtraNights * adr;
  const roas = totalAdSpend > 0 ? Math.round((adNights * adr) / totalAdSpend * 10) / 10 : 0;
  const gapVsTarget = totalExtraNights - gapTotal;

  const results: ResultMetrics = {
    adNights,
    organicNights,
    totalExtraNights,
    projectedOcc,
    totalAdSpend,
    additionalRevenue,
    roas,
    gapVsTarget,
  };

  return {
    gap,
    results,
    targetMet: projectedOcc >= targetOcc,
  };
}
