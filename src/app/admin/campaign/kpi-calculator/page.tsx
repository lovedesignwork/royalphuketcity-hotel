"use client";

import { useState, useMemo } from "react";
import { CalculatorInputs } from "@/types/calculator";
import { calculateKPIs } from "@/lib/calculations";
import HotelBaseline from "@/components/calculator/hotel-baseline";
import OccupancyTargets from "@/components/calculator/occupancy-targets";
import BudgetInputs from "@/components/calculator/budget-inputs";
import GapDisplay from "@/components/calculator/gap-display";
import ResultsDisplay from "@/components/calculator/results-display";
import VerdictBanner from "@/components/calculator/verdict-banner";
import CopySummary from "@/components/calculator/copy-summary";

const DEFAULT_INPUTS: CalculatorInputs = {
  totalRooms: 251,
  campaignMonths: 6,
  adr: 1800,
  currentOcc: 25,
  targetOcc: 60,
  monthlyBudget: 50000,
  costPerLead: 150,
  conversionRate: 8,
  avgNights: 2,
  organicMonthly: 500,
};

function Divider() {
  return <hr className="border-gray-200" />;
}

export default function KPICalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const outputs = useMemo(() => calculateKPIs(inputs), [inputs]);

  function handleChange(updates: Partial<CalculatorInputs>) {
    setInputs((prev) => ({ ...prev, ...updates }));
  }

  function handleReset() {
    setInputs(DEFAULT_INPUTS);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#8B7355] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hotel KPI Calculator</h1>
            <p className="text-sm text-gray-500">Occupancy & Campaign — Royal Phuket City Hotel</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Validate campaign targets before presenting to the MD. Enter your current occupancy, campaign budget, and conversion assumptions — the calculator will tell you if the goal is achievable and by how much.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Inputs */}
        <div className="p-6 space-y-6">
          <HotelBaseline inputs={inputs} onChange={handleChange} />
          <Divider />
          <OccupancyTargets inputs={inputs} onChange={handleChange} />
          <Divider />
          <BudgetInputs inputs={inputs} onChange={handleChange} />
        </div>

        {/* Results */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 space-y-6">
          <GapDisplay gap={outputs.gap} />
          <Divider />
          <ResultsDisplay results={outputs.results} targetMet={outputs.targetMet} />
          <Divider />
          <VerdictBanner inputs={inputs} outputs={outputs} />

          {/* Actions */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-3">
              <CopySummary inputs={inputs} outputs={outputs} />
              <button
                disabled
                title="Phase 2"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 border border-dashed border-gray-300 cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
                <span className="text-[10px] bg-gray-100 text-gray-400 rounded px-1.5 py-0.5">Phase 2</span>
              </button>
              <button
                disabled
                title="Phase 2"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 border border-dashed border-gray-300 cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save
                <span className="text-[10px] bg-gray-100 text-gray-400 rounded px-1.5 py-0.5">Phase 2</span>
              </button>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset to defaults
            </button>
          </div>
        </div>
      </div>

      {/* Context footer */}
      <div className="mt-6 text-xs text-gray-400 text-center space-y-1">
        <p>All calculations use 30-day months. ROAS is based on room revenue only (excluding F&B, ancillaries).</p>
        <p>Phase 2: Save history, export PDF, multi-scenario comparison.</p>
      </div>
    </div>
  );
}
