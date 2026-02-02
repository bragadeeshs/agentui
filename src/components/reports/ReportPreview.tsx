import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ReportBuilderState } from "./ReportBuilder";

export function ReportPreview({
  state,
  trendData,
}: {
  state: ReportBuilderState;
  trendData: { date: string; value: number }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Report Preview</div>
          <div className="text-sm font-semibold text-slate-800">{state.template}</div>
        </div>
        <div className="text-xs text-slate-500">Output: {state.outputFormat}</div>
      </div>

      {state.sections.length === 0 ? (
        <div className="mt-6 text-sm text-slate-500">
          Select sections to render the preview.
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {state.sections.includes("KPI summary") ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-800">KPI summary</div>
              <p className="mt-2 text-xs text-slate-600">
                Containment is trending upward with stable SLA performance. Handoff volume
                is concentrated in billing and cancellation intents.
              </p>
              <button
                type="button"
                className="mt-3 rounded-md border border-slate-200 px-3 py-1 text-xs"
              >
                Download CSV
              </button>
            </div>
          ) : null}

          {state.sections.includes("Trends") ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">Trend highlights</div>
                <button
                  type="button"
                  className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                >
                  Download CSV
                </button>
              </div>
              <div className="mt-3 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0f172a"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : null}

          {state.sections.includes("Drivers") ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-800">Drivers & risks</div>
              <p className="mt-2 text-xs text-slate-600">
                Payment failure intents drive escalations. Webhook timeouts dipped 0.2% after
                model version 3.4 rollout.
              </p>
              <button
                type="button"
                className="mt-3 rounded-md border border-slate-200 px-3 py-1 text-xs"
              >
                Download CSV
              </button>
            </div>
          ) : null}

          {state.sections.includes("Channel split") ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-800">Channel split</div>
              <p className="mt-2 text-xs text-slate-600">
                Chat volume grew 5% with stable response times. Voice AHT increased slightly
                due to transfer delays.
              </p>
              <button
                type="button"
                className="mt-3 rounded-md border border-slate-200 px-3 py-1 text-xs"
              >
                Download CSV
              </button>
            </div>
          ) : null}

          {state.sections.includes("Session drilldown") ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-800">Session drilldown</div>
              <p className="mt-2 text-xs text-slate-600">
                Top escalation reasons are complex billing requests and missing order history.
              </p>
              <button
                type="button"
                className="mt-3 rounded-md border border-slate-200 px-3 py-1 text-xs"
              >
                Download CSV
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
