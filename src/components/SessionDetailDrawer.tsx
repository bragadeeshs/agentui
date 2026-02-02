import React from "react";

export type SessionDetail = {
  id: string;
  channel: string;
  started_at: string;
  ended_at: string;
  bot: string;
  outcome: string;
  handoff_reason: string | null;
  locale: string;
  queue: string | null;
  events: { ts: string; type: string; detail: string }[];
  tool_calls: { name: string; status: string; latency_ms: number }[];
  transcript: { speaker: string; text: string }[];
  errors: { code: string; message: string }[];
};

export function SessionDetailDrawer({
  open,
  detail,
  onClose,
}: {
  open: boolean;
  detail?: SessionDetail;
  onClose: () => void;
}) {
  if (!open || !detail) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/30">
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Session detail
            </div>
            <div className="text-lg font-semibold text-slate-900">{detail.id}</div>
            <div className="text-xs text-slate-500">
              {detail.channel} · {detail.bot}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Metadata</div>
            <div className="mt-2 grid gap-1 text-xs">
              <div>Started: {detail.started_at}</div>
              <div>Ended: {detail.ended_at}</div>
              <div>Outcome: {detail.outcome}</div>
              <div>Handoff reason: {detail.handoff_reason ?? "-"}</div>
              <div>Locale: {detail.locale}</div>
              <div>Queue: {detail.queue ?? "-"}</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Events timeline</div>
            <ul className="mt-2 space-y-2 text-xs">
              {detail.events.map((event, index) => (
                <li key={`${event.ts}-${index}`}>
                  <span className="font-semibold">{event.ts}</span> · {event.type} ·
                  {" "}{event.detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Tool calls</div>
            <ul className="mt-2 space-y-2 text-xs">
              {detail.tool_calls.map((tool, index) => (
                <li key={`${tool.name}-${index}`}>
                  {tool.name} · {tool.status} · {tool.latency_ms}ms
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Transcript</div>
            <div className="mt-2 space-y-2 text-xs">
              {detail.transcript.length === 0 ? (
                <div className="text-slate-500">Transcript unavailable.</div>
              ) : (
                detail.transcript.map((line, index) => (
                  <div key={`${line.speaker}-${index}`}>
                    <span className="font-semibold">{line.speaker}:</span> {line.text}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Errors</div>
            <div className="mt-2 space-y-2 text-xs">
              {detail.errors.length === 0 ? (
                <div className="text-slate-500">No errors logged.</div>
              ) : (
                detail.errors.map((error, index) => (
                  <div key={`${error.code}-${index}`}>
                    {error.code}: {error.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
