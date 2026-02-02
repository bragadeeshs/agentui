import React from "react";
import { FilterBar, FilterState } from "./components/FilterBar";
import { KpiCard } from "./components/KpiCard";
import { KpiInfoDrawer } from "./components/KpiInfoDrawer";
import { TrendChart } from "./components/TrendChart";
import { SplitSummaryCard } from "./components/SplitSummaryCard";
import { DriversSection } from "./components/DriversSection";
import { DrilldownTable } from "./components/DrilldownTable";
import { SessionDetailDrawer } from "./components/SessionDetailDrawer";
import { EmptyState } from "./components/EmptyState";
import { ReportBuilder, ReportBuilderState } from "./components/reports/ReportBuilder";
import { ReportPreview } from "./components/reports/ReportPreview";
import { ReportHistoryTable } from "./components/reports/ReportHistoryTable";

const availableBots = ["Atlas Support", "Pulse Voice", "Orion Concierge", "Nova Assist"];

const mockOverview = {
  kpis: [
    {
      id: "total_sessions",
      label: "Total Sessions/Calls",
      value: 128934,
      delta_pct: 4.2,
      trend: [120, 132, 125, 140, 148, 152, 160],
      info: {
        definition: "Total inbound sessions and voice calls in the period.",
        formula: "Count(session_id) + Count(call_id)",
        notes: "Deduplicated by session_id/call_id.",
        sources: ["sessions", "voice_calls"],
      },
    },
    {
      id: "containment",
      label: "Containment %",
      value: "68.3%",
      delta_pct: 1.1,
      trend: [63, 65, 66, 67, 68, 69, 68],
      info: {
        definition: "Percent of sessions resolved without human handoff.",
        formula: "1 - (handoff_sessions / total_sessions)",
        notes: "Voice includes agent transfers.",
        sources: ["sessions.outcome", "handoffs"],
      },
    },
    {
      id: "handoff",
      label: "Handoff %",
      value: "14.7%",
      delta_pct: -0.8,
      trend: [16, 15, 14, 15, 14, 14, 15],
      info: {
        definition: "Percent of sessions requiring human handoff.",
        formula: "handoff_sessions / total_sessions",
        notes: "Includes queue transfers.",
        sources: ["handoffs"],
      },
    },
    {
      id: "abandonment",
      label: "Abandonment %",
      value: "3.9%",
      delta_pct: 0.2,
      trend: [3.2, 3.4, 3.5, 3.7, 3.9, 4.1, 3.9],
      info: {
        definition: "Sessions ending before a valid outcome.",
        formula: "abandoned_sessions / total_sessions",
        notes: "Triggered after 60s inactivity.",
        sources: ["sessions"],
      },
    },
    {
      id: "sla",
      label: "SLA %",
      value: "92.5%",
      delta_pct: -0.4,
      trend: [94, 93, 92, 93, 92, 92, 92],
      info: {
        definition: "Percent of sessions meeting SLA targets.",
        formula: "sessions_meeting_sla / total_sessions",
        notes: "SLA differs by channel.",
        sources: ["sla"],
      },
    },
    {
      id: "avg_response",
      label: "Avg Response Time / ASA",
      value: "1.8s / 24s",
      delta_pct: -3.1,
      trend: [2.4, 2.1, 2.0, 1.9, 1.9, 1.8, 1.8],
      info: {
        definition: "Chat response time and voice ASA.",
        formula: "avg(chat_response_ms), avg(asa_seconds)",
        notes: "Computed separately then combined.",
        sources: ["chat_responses", "voice_queue"],
      },
    },
    {
      id: "aht",
      label: "AHT",
      value: "5m 42s",
      delta_pct: 2.4,
      trend: [5.1, 5.2, 5.4, 5.6, 5.7, 5.8, 5.7],
      info: {
        definition: "Average handle time for voice sessions.",
        formula: "sum(handle_time) / call_count",
        notes: "Excludes transfers.",
        sources: ["voice_calls"],
      },
    },
    {
      id: "tool_success",
      label: "Tool Success %",
      value: "96.8%",
      delta_pct: 0.5,
      trend: [95.8, 96.1, 96.4, 96.6, 96.8, 97.0, 96.8],
      info: {
        definition: "Percent of tool calls with success status.",
        formula: "successful_tool_calls / total_tool_calls",
        notes: "Timeouts count as failures.",
        sources: ["tool_calls"],
      },
    },
    {
      id: "webhook_timeout",
      label: "Webhook Timeout %",
      value: "1.6%",
      delta_pct: -0.2,
      trend: [1.9, 1.8, 1.7, 1.7, 1.6, 1.6, 1.6],
      info: {
        definition: "Share of webhook calls timing out.",
        formula: "webhook_timeouts / webhook_calls",
        notes: "Timeout threshold 5s.",
        sources: ["webhook_calls"],
      },
    },
    {
      id: "mos",
      label: "Voice MOS avg",
      value: "4.2",
      delta_pct: 0.1,
      trend: [4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.2],
      info: {
        definition: "Mean opinion score across voice sessions.",
        formula: "avg(mos_score)",
        notes: "Range 1-5.",
        sources: ["voice_quality"],
      },
    },
  ],
};

const mockTrends = {
  sessions: Array.from({ length: 14 }).map((_, i) => ({
    date: `2026-01-${String(15 + i).padStart(2, "0")}`,
    value: 120 + i * 4 + (i % 3) * 6,
    compare: 105 + i * 3 + (i % 2) * 4,
  })),
  containment: Array.from({ length: 14 }).map((_, i) => ({
    date: `2026-01-${String(15 + i).padStart(2, "0")}`,
    value: 62 + i * 0.6,
    compare: 18 - i * 0.2,
  })),
  sla: Array.from({ length: 14 }).map((_, i) => ({
    date: `2026-01-${String(15 + i).padStart(2, "0")}`,
    value: 92 + (i % 3) * 0.4,
    compare: 4 + (i % 4) * 0.3,
  })),
  latency: Array.from({ length: 14 }).map((_, i) => ({
    date: `2026-01-${String(15 + i).padStart(2, "0")}`,
    value: 620 + i * 12,
    compare: 720 + i * 9,
    secondary: 500 + i * 7,
  })),
};

const mockChatSummary = {
  metrics: [
    { label: "Volume", value: 82340, delta_pct: 3.2 },
    { label: "Containment", value: "69%", delta_pct: 1.0 },
    { label: "SLA", value: "93%", delta_pct: -0.3 },
    { label: "CSAT", value: "4.3", delta_pct: 0.2 },
  ],
};

const mockVoiceSummary = {
  metrics: [
    { label: "Volume", value: 46594, delta_pct: 2.1 },
    { label: "Containment", value: "64%", delta_pct: 0.6 },
    { label: "SLA", value: "91%", delta_pct: -0.5 },
    { label: "MOS", value: "4.2", delta_pct: 0.1 },
  ],
};

const mockDrivers = {
  intents: {
    topByVolume: [
      { intent: "Order status", count: 18432 },
      { intent: "Returns", count: 10221 },
      { intent: "Billing", count: 8450 },
      { intent: "Tech support", count: 7012 },
      { intent: "Shipping", count: 6451 },
    ],
    topByEscalation: [
      { intent: "Fraud dispute", rate: 42 },
      { intent: "Payment failure", rate: 35 },
      { intent: "Cancellation", rate: 29 },
      { intent: "Device setup", rate: 24 },
      { intent: "Refund status", rate: 22 },
    ],
    noMatchPages: [
      { page: "Checkout", count: 421, rate: 6.8 },
      { page: "Plan selection", count: 318, rate: 5.9 },
      { page: "Account login", count: 299, rate: 5.1 },
    ],
  },
  tools: {
    tools: [
      { name: "CRM Lookup", failures: 42, timeouts: 11, latency_p95: 820 },
      { name: "Order API", failures: 36, timeouts: 8, latency_p95: 910 },
      { name: "Eligibility Check", failures: 21, timeouts: 5, latency_p95: 640 },
    ],
  },
};

const mockSessions = Array.from({ length: 18 }).map((_, i) => ({
  id: `S-2026-01-${1000 + i}`,
  channel: i % 2 === 0 ? "chat" : "voice",
  top_intent: ["Order status", "Returns", "Billing", "Tech support"][i % 4],
  outcome: i % 3 === 0 ? "Resolved" : "Handoff",
  handoff_reason: i % 3 === 0 ? null : "Complex request",
  latency_p95: 650 + i * 12,
  tool_failures_count: i % 4,
  csat: i % 5 === 0 ? null : 4.0 + (i % 3) * 0.2,
}));

const mockSessionDetail = {
  id: "S-2026-01-1004",
  channel: "chat",
  started_at: "2026-01-27T09:14:32Z",
  ended_at: "2026-01-27T09:22:11Z",
  bot: "Atlas Support",
  outcome: "Resolved",
  handoff_reason: null,
  locale: "en-US",
  queue: null,
  events: [
    { ts: "09:14:32", type: "Session start", detail: "New chat initiated" },
    { ts: "09:15:10", type: "Intent", detail: "Order status" },
    { ts: "09:16:04", type: "Tool call", detail: "Order API" },
    { ts: "09:20:44", type: "Resolution", detail: "Provided tracking" },
  ],
  tool_calls: [
    { name: "Order API", status: "success", latency_ms: 420 },
    { name: "CRM Lookup", status: "success", latency_ms: 310 },
  ],
  transcript: [
    { speaker: "User", text: "Where is my order?" },
    { speaker: "Bot", text: "Let me check that for you." },
    { speaker: "Bot", text: "Your order is in transit." },
  ],
  errors: [],
};

const mockReportHistory = [
  {
    id: "RPT-1001",
    name: "Executive Weekly",
    date_range: "2026-01-20 to 2026-01-26",
    created_by: "J. Park",
    created_at: "2026-01-27 09:10",
    downloads: { pdf: "#", csv: "#" },
  },
  {
    id: "RPT-1002",
    name: "Ops Daily",
    date_range: "2026-01-27",
    created_by: "M. Rivera",
    created_at: "2026-01-28 07:40",
    downloads: { pdf: "#", csv: "#" },
  },
];

export function AnalyticsReportsPage({
  currentUserRole,
}: {
  currentUserRole: "admin" | "user";
}) {
  const [activeTab, setActiveTab] = React.useState<"dashboard" | "reports">(
    "dashboard"
  );
  const [filters, setFilters] = React.useState<FilterState>({
    bots: [availableBots[0]],
    from: "2026-01-15",
    to: "2026-01-28",
    compare: true,
    channel: "all",
    advanced: {
      locale: "",
      intentGroup: "",
      queue: "",
      campaign: "",
      handoffReason: "",
      tool: "",
      modelVersion: "",
    },
  });

  const [kpiDrawerOpen, setKpiDrawerOpen] = React.useState(false);
  const [selectedKpiId, setSelectedKpiId] = React.useState<string | null>(null);

  const [sessionDrawerOpen, setSessionDrawerOpen] = React.useState(false);
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(null);

  const [reportBuilder, setReportBuilder] = React.useState<ReportBuilderState>({
    template: "Executive Weekly",
    bots: [availableBots[0]],
    channel: "all",
    queue: "",
    locale: "",
    sections: ["KPI summary", "Trends", "Drivers"],
    outputFormat: "pdf",
  });

  const kpiInfo = mockOverview.kpis.find((kpi) => kpi.id === selectedKpiId);

  function handleRefresh() {
    // No-op for static UI demo
  }

  function handleOpenKpi(id: string) {
    setSelectedKpiId(id);
    setKpiDrawerOpen(true);
  }

  function handleSessionSelect(id: string) {
    setSelectedSessionId(id);
    setSessionDrawerOpen(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
            <p className="text-sm text-slate-500">
              Unified operational analytics for bot performance and reliability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              Export CSV
            </button>
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              Export PDF
            </button>
            <button
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              onClick={handleRefresh}
              type="button"
            >
              Refresh
            </button>
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              Share link
            </button>
            {currentUserRole === "admin" ? (
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">
                Schedule
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <FilterBar bots={filters} availableBots={availableBots} onChange={setFilters} />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6">
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {(["dashboard", "reports"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab === "dashboard" ? "Dashboard" : "Reports"}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" ? (
          <div className="mt-6 space-y-8">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">KPI overview</h2>
                <div className="text-xs text-slate-500">Last updated just now</div>
              </div>
              {mockOverview.kpis.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {mockOverview.kpis.map((kpi) => (
                    <KpiCard key={kpi.id} data={kpi} onInfo={handleOpenKpi} />
                  ))}
                </div>
              ) : (
                <EmptyState title="No KPI data" description="Adjust filters to load KPIs." />
              )}
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Trends</h2>
                <div className="text-xs text-slate-500">Daily cadence</div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <TrendChart
                  title="Sessions + outcomes"
                  data={mockTrends.sessions}
                  lines={[
                    { key: "value", label: "Sessions", color: "#0f172a" },
                    { key: "compare", label: "Resolved", color: "#64748b" },
                  ]}
                />

                <TrendChart
                  title="Containment + handoff"
                  data={mockTrends.containment}
                  lines={[
                    { key: "value", label: "Containment", color: "#0f172a" },
                    { key: "compare", label: "Handoff", color: "#94a3b8" },
                  ]}
                />

                <TrendChart
                  title="SLA + abandonment"
                  data={mockTrends.sla}
                  lines={[
                    { key: "value", label: "SLA", color: "#0f172a" },
                    { key: "compare", label: "Abandonment", color: "#cbd5f5" },
                  ]}
                />

                <TrendChart
                  title="Latency p95 (chat/tool/webhook)"
                  data={mockTrends.latency}
                  lines={[
                    { key: "value", label: "Chat", color: "#0f172a" },
                    { key: "compare", label: "Tool", color: "#64748b" },
                    { key: "secondary", label: "Webhook", color: "#94a3b8" },
                  ]}
                />
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <SplitSummaryCard title="Chat summary" metrics={mockChatSummary.metrics} />
              <SplitSummaryCard title="Voice summary" metrics={mockVoiceSummary.metrics} />
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Drivers</h2>
                <div className="text-xs text-slate-500">Top contributors and risks</div>
              </div>
              <DriversSection intents={mockDrivers.intents} tools={mockDrivers.tools} />
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Session drilldown</h2>
                <div className="text-xs text-slate-500">Click a row for details</div>
              </div>
              <DrilldownTable data={mockSessions} onSelect={handleSessionSelect} />
            </section>
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            <section className="grid gap-4 lg:grid-cols-[1.1fr_1.5fr]">
              <ReportBuilder
                state={reportBuilder}
                onChange={setReportBuilder}
                onGenerate={() => undefined}
                availableBots={availableBots}
              />
              <ReportPreview
                state={reportBuilder}
                trendData={mockTrends.sessions.map((item) => ({ date: item.date, value: item.value }))}
              />
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Report history</h2>
                <div className="text-xs text-slate-500">Latest runs</div>
              </div>
              <ReportHistoryTable data={mockReportHistory} />
            </section>
          </div>
        )}
      </div>

      <KpiInfoDrawer
        open={kpiDrawerOpen}
        info={
          kpiInfo
            ? {
                label: kpiInfo.label,
                definition: kpiInfo.info.definition,
                formula: kpiInfo.info.formula,
                notes: kpiInfo.info.notes,
                sources: kpiInfo.info.sources,
              }
            : undefined
        }
        onClose={() => setKpiDrawerOpen(false)}
      />

      <SessionDetailDrawer
        open={sessionDrawerOpen}
        detail={selectedSessionId ? mockSessionDetail : undefined}
        onClose={() => setSessionDrawerOpen(false)}
      />
    </div>
  );
}
