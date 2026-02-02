export type KpiInfo = {
  label: string;
  definition: string;
  formula: string;
  notes: string;
  sources: string[];
};

export function KpiInfoDrawer({
  open,
  info,
  onClose,
}: {
  open: boolean;
  info?: KpiInfo;
  onClose: () => void;
}) {
  if (!open || !info) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/30">
      <div className="h-full w-full max-w-md bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              KPI Details
            </div>
            <div className="text-lg font-semibold text-slate-900">{info.label}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500"
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400">Definition</div>
            <div>{info.definition}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400">Formula</div>
            <div>{info.formula}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400">Notes</div>
            <div>{info.notes}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400">Data source</div>
            <ul className="list-disc pl-4">
              {info.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
