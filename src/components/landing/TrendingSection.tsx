import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

const TRENDS = [
  { idea: "AI-Powered Pet Nutritionist", score: 92, status: "Strong Potential" },
  { idea: "SaaS for Boutique Flower Shops", score: 78, status: "Promising" },
  { idea: "Solar-Powered Water Desalination", score: 85, status: "Strong Potential" },
  { idea: "Remote Team Building in VR", score: 64, status: "Needs Work" },
  { idea: "Hyper-Local Farmers Market App", score: 72, status: "Promising" },
];

const TrendingSection = () => {
  return (
    <section className="py-12 border-y border-border bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recently Validated</h2>
      </div>
      
      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {[...TRENDS, ...TRENDS].map((trend, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-full border border-border bg-card px-6 py-3 shadow-soft"
          >
            <div className={`h-2 w-2 rounded-full ${trend.score >= 80 ? 'bg-emerald-500' : 'bg-primary'}`} />
            <span className="text-sm font-medium text-foreground">{trend.idea}</span>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">
              {trend.score}/100
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;
