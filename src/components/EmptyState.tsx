export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      {description ? <div className="mt-1 text-xs">{description}</div> : null}
    </div>
  );
}
