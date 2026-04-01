import { CalculatorOutputs } from "@/types/calculator";
import { CalculatorInputs } from "@/types/calculator";
import { formatTHB, formatPercent } from "@/lib/format";

interface Props {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

export default function VerdictBanner({ inputs, outputs }: Props) {
  const { targetMet, results } = outputs;
  const gap = Math.round(inputs.targetOcc - results.projectedOcc);
  const nightsShort = Math.abs(outputs.results.gapVsTarget);

  return (
    <div
      className={`rounded-xl border-2 p-5 ${
        targetMet
          ? "bg-green-50 border-green-300"
          : "bg-red-50 border-red-300"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            targetMet ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {targetMet ? (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Message */}
        <div>
          <p className={`font-bold text-sm mb-1 ${targetMet ? "text-green-800" : "text-red-800"}`}>
            {targetMet ? "Target Achievable" : "Target Not Met"}
          </p>
          {targetMet ? (
            <p className={`text-sm leading-relaxed text-green-700`}>
              This budget + organic can push occupancy to{" "}
              <strong>{formatPercent(results.projectedOcc)}</strong>, meeting the{" "}
              <strong>{formatPercent(inputs.targetOcc)}</strong> target.{" "}
              Total additional revenue:{" "}
              <strong>{formatTHB(results.additionalRevenue)}</strong> over{" "}
              <strong>{inputs.campaignMonths} {inputs.campaignMonths === 1 ? "month" : "months"}</strong>.
            </p>
          ) : (
            <p className={`text-sm leading-relaxed text-red-700`}>
              Projected occupancy reaches <strong>{formatPercent(results.projectedOcc)}</strong>, still{" "}
              <strong>{gap} points</strong> below the <strong>{formatPercent(inputs.targetOcc)}</strong> target.
              You&apos;re <strong>{nightsShort.toLocaleString()} room nights short</strong>.{" "}
              Options: increase monthly budget, improve conversion rate, boost OTA/organic efforts, or adjust the target.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
