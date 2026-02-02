export type ReportBuilderState = {
  template: string;
  bots: string[];
  channel: string;
  queue: string;
  locale: string;
  sections: string[];
  outputFormat: "pdf" | "csv";
};

const templates = [
  "Executive Weekly",
  "Ops Daily",
  "Bot Improvement",
  "Reliability",
  "Handoff",
];

const sectionsList = [
  "KPI summary",
  "Trends",
  "Drivers",
  "Channel split",
  "Session drilldown",
];

export function ReportBuilder({
  state,
  onChange,
  onGenerate,
  availableBots,
}: {
  state: ReportBuilderState;
  onChange: (next: ReportBuilderState) => void;
  onGenerate: () => void;
  availableBots: string[];
}) {
  function update<K extends keyof ReportBuilderState>(
    key: K,
    value: ReportBuilderState[K]
  ) {
    onChange({ ...state, [key]: value });
  }

  function toggleSection(section: string) {
    if (state.sections.includes(section)) {
      update(
        "sections",
        state.sections.filter((item) => item !== section)
      );
    } else {
      update("sections", [...state.sections, section]);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-slate-800">Report Builder</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Template</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.template}
            onChange={(event) => update("template", event.target.value)}
          >
            {templates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Bots</label>
          <select
            multiple
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.bots}
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
          <label className="text-xs font-semibold uppercase text-slate-500">Channel</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.channel}
            onChange={(event) => update("channel", event.target.value)}
          >
            <option value="all">All</option>
            <option value="chat">Chat</option>
            <option value="voice">Voice</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Queue</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.queue}
            onChange={(event) => update("queue", event.target.value)}
            placeholder="All queues"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Locale</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.locale}
            onChange={(event) => update("locale", event.target.value)}
            placeholder="All locales"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Output</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
            value={state.outputFormat}
            onChange={(event) => update("outputFormat", event.target.value as "pdf" | "csv")}
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV bundle</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold uppercase text-slate-500">Sections</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {sectionsList.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => toggleSection(section)}
              className={`rounded-full border px-3 py-1 text-xs ${
                state.sections.includes(section)
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Generate report
      </button>
    </div>
  );
}
