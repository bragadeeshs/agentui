import React from "react";

export type FilterState = {
  bots: string[];
  from: string;
  to: string;
  compare: boolean;
  channel: "all" | "chat" | "voice";
  advanced: {
    locale: string;
    intentGroup: string;
    queue: string;
    campaign: string;
    handoffReason: string;
    tool: string;
    modelVersion: string;
  };
};

export function FilterBar({
  bots,
  availableBots,
  onChange,
}: {
  bots: FilterState;
  availableBots: string[];
  onChange: (next: FilterState) => void;
}) {
  const [advancedOpen, setAdvancedOpen] = React.useState(false);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...bots, [key]: value });
  }

  function updateAdvanced<K extends keyof FilterState["advanced"]>(
    key: K,
    value: FilterState["advanced"][K]
  ) {
    onChange({
      ...bots,
      advanced: { ...bots.advanced, [key]: value },
    });
  }

  return (
    <div className="sticky top-0 z-20 border-y border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Bots</label>
            <select
              multiple
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm"
              value={bots.bots}
              onChange={(event) => {
                const selected = Array.from(event.target.selectedOptions).map(
                  (option) => option.value
                );
                update("bots", selected);
              }}
            >
              {availableBots.map((bot) => (
                <option key={bot} value={bot}>
                  {bot}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Date range</label>
            <div className="mt-1 flex gap-2">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                value={bots.from}
                onChange={(event) => update("from", event.target.value)}
              />
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                value={bots.to}
                onChange={(event) => update("to", event.target.value)}
              />
            </div>
            <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={bots.compare}
                onChange={(event) => update("compare", event.target.checked)}
              />
              Compare to previous period
            </label>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Channel</label>
            <div className="mt-1 inline-flex rounded-lg border border-slate-200 bg-white p-1 text-sm">
              {(["all", "chat", "voice"] as const).map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => update("channel", channel)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    bots.channel === channel
                      ? "bg-slate-900 text-white"
                      : "text-slate-500"
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setAdvancedOpen((prev) => !prev)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
            >
              {advancedOpen ? "Hide" : "Show"} advanced filters
            </button>
          </div>
        </div>

        {advancedOpen ? (
          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Locale"
              value={bots.advanced.locale}
              onChange={(event) => updateAdvanced("locale", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Intent group"
              value={bots.advanced.intentGroup}
              onChange={(event) => updateAdvanced("intentGroup", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Queue"
              value={bots.advanced.queue}
              onChange={(event) => updateAdvanced("queue", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Campaign"
              value={bots.advanced.campaign}
              onChange={(event) => updateAdvanced("campaign", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Handoff reason"
              value={bots.advanced.handoffReason}
              onChange={(event) => updateAdvanced("handoffReason", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Tool/Webhook"
              value={bots.advanced.tool}
              onChange={(event) => updateAdvanced("tool", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 p-2 text-sm"
              placeholder="Model version"
              value={bots.advanced.modelVersion}
              onChange={(event) => updateAdvanced("modelVersion", event.target.value)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
