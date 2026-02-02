import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type DrilldownRow = {
  id: string;
  channel: string;
  top_intent: string;
  outcome: string;
  handoff_reason: string | null;
  latency_p95: number;
  tool_failures_count: number;
  csat: number | null;
};

export function DrilldownTable({
  data,
  onSelect,
}: {
  data: DrilldownRow[];
  onSelect: (id: string) => void;
}) {
  const columns = React.useMemo<ColumnDef<DrilldownRow>[]>(
    () => [
      { accessorKey: "id", header: "Session / Call ID" },
      { accessorKey: "channel", header: "Channel" },
      { accessorKey: "top_intent", header: "Top intent" },
      { accessorKey: "outcome", header: "Outcome" },
      { accessorKey: "handoff_reason", header: "Handoff reason" },
      { accessorKey: "latency_p95", header: "Latency p95" },
      { accessorKey: "tool_failures_count", header: "Tool failures" },
      { accessorKey: "csat", header: "CSAT" },
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => onSelect(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 text-slate-700">
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
