import { motion } from "framer-motion";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CountUp, Reveal, SectionHeading } from "@/components/kit/motion-primitives";
import { peakHours, retentionSeries, revenueSeries, serviceMix } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ranges = ["7 Days", "30 Days", "3 Months", "1 Year"] as const;
const pieColors = ["var(--gold)", "var(--rose)", "var(--peach)", "var(--chart-3)"];

const axis = { stroke: "var(--muted-foreground)", fontSize: 11 };

function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[1.5rem] border border-border bg-card p-5 shadow-soft", className)}>
      <p className="eyebrow text-muted-foreground">{title}</p>
      <div className="mt-5 h-52">{children}</div>
    </div>
  );
}

export function AnalyticsStory() {
  const [range, setRange] = useState<(typeof ranges)[number]>("7 Days");
  const factor = { "7 Days": 1, "30 Days": 1.18, "3 Months": 1.42, "1 Year": 1.75 }[range];

  return (
    <section className="border-y border-border bg-champagne/40 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Analytics"
            lines={["See what your business", "can't tell you."]}
          />
          <div className="flex gap-1 rounded-full border border-border bg-card p-1" role="group" aria-label="Date range">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
                  range === r ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {range === r && <motion.span layoutId="range-pill" className="absolute inset-0 -z-10 rounded-full bg-primary" />}
                {r}
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.05} className="mt-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Revenue", value: Math.round(482500 * factor), prefix: "₹", delta: "+18.4%" },
              { label: "Appointments", value: Math.round(1248 * factor), prefix: "", delta: "+12.1%" },
              { label: "Customer retention", value: 86, prefix: "", suffix: "%", delta: "+4.2%" },
            ].map((s) => (
              <div key={s.label} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-soft">
                <p className="eyebrow text-muted-foreground">{s.label}</p>
                <p className="mt-3 font-display text-4xl tracking-tight">
                  <CountUp key={`${s.label}-${range}`} value={s.value} prefix={s.prefix} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-1 text-xs font-semibold text-gold">{s.delta} vs previous period</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Revenue trend" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueSeries.map((d) => ({ ...d, revenue: Math.round(d.revenue * factor) }))}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axis} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} width={48} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Customer retention">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axis} />
                  <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={axis} width={32} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="retention" stroke="var(--rose)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Peak hours">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axis} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} width={32} />
                  <Tooltip cursor={{ fill: "var(--secondary)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Bar dataKey="load" fill="var(--gold)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Popular services">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={serviceMix} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={3}>
                    {serviceMix.map((s, i) => (
                      <Cell key={s.name} fill={pieColors[i % pieColors.length]} stroke="var(--card)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Worker utilization">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Meera", value: 91 },
                    { name: "Ananya", value: 86 },
                    { name: "Priya", value: 74 },
                    { name: "Arun", value: 68 },
                  ]}
                >
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={axis} width={60} />
                  <Tooltip cursor={{ fill: "var(--secondary)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Bar dataKey="value" fill="var(--rose)" radius={[0, 6, 6, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
