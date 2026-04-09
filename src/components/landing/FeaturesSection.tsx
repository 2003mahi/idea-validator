import { motion } from "framer-motion";
import { BarChart3, Target, Users, Zap, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "Get instant insights into market size, growth trends, and revenue potential for your idea.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Demand Score",
    description: "AI-calculated viability score based on real market signals and consumer behavior data.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Competitor Insights",
    description: "Discover who's already in the space and identify gaps you can exploit to win.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting days for a report — get a full validation breakdown in under 30 seconds.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    description: "Understand the biggest threats to your idea before investing time and money.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: TrendingUp,
    title: "Actionable Next Steps",
    description: "Receive a clear roadmap of what to do next to move from idea to traction.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FeaturesSection = () => {
  return (
    <section className="relative px-6 py-24">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-transparent to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why CrazeCheck
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to validate fast
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Stop guessing. Our AI analyzes real market data so you can make confident decisions before writing a single line of code.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${f.bg}`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
