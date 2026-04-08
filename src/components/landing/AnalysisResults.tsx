import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Target, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export interface IdeaAnalysis {
  score: number;
  verdict: string;
  summary: string;
  strengths: string[];
  risks: string[];
  marketSize: string;
  competitors: string[];
  nextSteps: string[];
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
};

const getVerdictBg = (verdict: string) => {
  if (verdict === "Strong Potential") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (verdict === "Promising") return "bg-blue-50 text-blue-700 border-blue-200";
  if (verdict === "Needs Work") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
};

const AnalysisResults = ({ data }: { data: IdeaAnalysis }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto mt-8 space-y-5"
    >
      {/* Score + Verdict Header */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-medium">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Viability Score</p>
          <p className={`text-5xl font-display font-bold ${getScoreColor(data.score)}`}>{data.score}</p>
        </div>
        <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${getVerdictBg(data.verdict)}`}>
          {data.verdict}
        </span>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm leading-relaxed text-foreground">{data.summary}</p>
      </div>

      {/* Strengths & Risks */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <h3 className="text-sm font-semibold">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-amber-500">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-sm font-semibold">Risks</h3>
          </div>
          <ul className="space-y-2">
            {data.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market & Competitors */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Target className="h-4 w-4" />
            <h3 className="text-sm font-semibold">Market Size</h3>
          </div>
          <p className="text-sm text-muted-foreground">{data.marketSize}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Users className="h-4 w-4" />
            <h3 className="text-sm font-semibold">Competitors</h3>
          </div>
          <ul className="space-y-1">
            {data.competitors.map((c, i) => (
              <li key={i} className="text-sm text-muted-foreground">• {c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <ArrowRight className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Next Steps</h3>
        </div>
        <ol className="space-y-2">
          {data.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;
