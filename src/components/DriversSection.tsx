import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type DriversIntents = {
  topByVolume: { intent: string; count: number }[];
  topByEscalation: { intent: string; rate: number }[];
  noMatchPages: { page: string; count: number; rate: number }[];
};

export type DriversTools = {
  tools: { name: string; failures: number; timeouts: number; latency_p95: number }[];
};

function Table<T>({ data, columns }: { data: T[]; columns: ColumnDef<T, any>[] }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-slate-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DriversSection({
  intents,
  tools,
}: {
  intents: DriversIntents;
  tools: DriversTools;
}) {
  const noMatchColumns = React.useMemo<ColumnDef<DriversIntents["noMatchPages"][number]>[]>(
    () => [
      { accessorKey: "page", header: "Page / Step" },
      { accessorKey: "count", header: "No-match count" },
      { accessorKey: "rate", header: "Rate %" },
    ],
    []
  );

  const toolColumns = React.useMemo<ColumnDef<DriversTools["tools"][number]>[]>(
    () => [
      { accessorKey: "name", header: "Tool / Webhook" },
      { accessorKey: "failures", header: "Failures" },
      { accessorKey: "timeouts", header: "Timeouts" },
      { accessorKey: "latency_p95", header: "Latency p95 (ms)" },
    ],
    []
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-800">
            Top intents by volume
          </div>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intents.topByVolume} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="intent" type="category" fontSize={10} width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f172a" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-800">
            Top intents by escalation rate
          </div>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intents.topByEscalation} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="intent" type="category" fontSize={10} width={110} />
                <Tooltip />
                <Bar dataKey="rate" fill="#475569" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-800">
            Top pages/steps by no-match
          </div>
          <div className="mt-4">
            <Table data={intents.noMatchPages} columns={noMatchColumns} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-800">
            Top tools/webhooks by failure + timeout + latency
          </div>
          <div className="mt-4">
            <Table data={tools.tools} columns={toolColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}
