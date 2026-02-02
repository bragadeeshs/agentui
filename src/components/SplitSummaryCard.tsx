import React from "react";

export function SplitSummaryCard({
  title,
  metrics,
}: {
  title: string;
  metrics: { label: string; value: string | number; delta_pct: number }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-slate-50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              {metric.label}
            </div>
            <div className="text-lg font-semibold text-slate-900">{metric.value}</div>
            <div
              className={`text-xs ${
                metric.delta_pct >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {metric.delta_pct >= 0 ? "+" : ""}
              {metric.delta_pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
