import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type ReportHistoryRow = {
  id: string;
  name: string;
  date_range: string;
  created_by: string;
  created_at: string;
  downloads: { pdf?: string; csv?: string };
};

export function ReportHistoryTable({ data }: { data: ReportHistoryRow[] }) {
  const columns = React.useMemo<ColumnDef<ReportHistoryRow>[]>(
    () => [
      { accessorKey: "name", header: "Report" },
      { accessorKey: "date_range", header: "Date range" },
      { accessorKey: "created_by", header: "Created by" },
      { accessorKey: "created_at", header: "Created at" },
      {
        header: "Downloads",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.downloads.pdf ? (
              <button className="rounded-md border border-slate-200 px-2 py-1 text-xs">
                PDF
              </button>
            ) : null}
            {row.original.downloads.csv ? (
              <button className="rounded-md border border-slate-200 px-2 py-1 text-xs">
                CSV
              </button>
            ) : null}
          </div>
        ),
      },
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
            <tr key={row.id}>
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
