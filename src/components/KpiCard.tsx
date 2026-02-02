import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type KpiCardData = {
  id: string;
  label: string;
  value: string | number;
  delta_pct: number;
  trend: number[];
};

export function KpiCard({
  data,
  onInfo,
}: {
  data: KpiCardData;
  onInfo: (id: string) => void;
}) {
  const trendData = data.trend.map((value, index) => ({ index, value }));
  const deltaClass = data.delta_pct >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {data.label}
        </div>
        <button
          type="button"
          onClick={() => onInfo(data.id)}
          className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-50"
        >
          i
        </button>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">{data.value}</div>
          <div className={`text-xs ${deltaClass}`}>
            {data.delta_pct >= 0 ? "+" : ""}
            {data.delta_pct}% vs prior
          </div>
        </div>
        <div className="h-10 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Tooltip contentStyle={{ fontSize: 10 }} />
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
    </div>
  );
}
