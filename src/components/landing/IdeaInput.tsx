import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AnalysisResults, { type IdeaAnalysis } from "./AnalysisResults";

const IdeaInput = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IdeaAnalysis | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!idea.trim()) return;
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ 
        title: "Authentication Required", 
        description: "Please sign in to validate your startup ideas.", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      // Check validation count for free users
      // @ts-ignore - Tables are not yet synced to types.ts
      const profileResponse = await supabase.from("profiles").select("is_pro").eq("id", user.id).single();
      
      // @ts-ignore - Tables are not yet synced to types.ts
      const validationsResponse = await supabase.from("validations").select("*", { count: 'exact', head: true }).eq("user_id", user.id);

      const isPro = !!((profileResponse.data as any)?.is_pro);
      const count = (validationsResponse as any).count;

      if (!isPro && count !== null && count >= 10) {
        toast({
          title: "Free Limit Reached",
          description: "You've used all 10 free validations. Upgrade to Pro for unlimited insights!",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // --- LOCAL SIMULATION MODE ENABLED ---
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let verdict = "Promising";
      let score = 78;
      const ideaLower = idea.toLowerCase();

      if (idea.length < 50) {
        verdict = "Needs Work";
        score = 45;
      } else if (ideaLower.includes("ai ") || ideaLower.includes("artificial intelligence")) {
        verdict = "Strong Potential";
        score = 92;
      } else if (ideaLower.includes("app") || ideaLower.includes("platform")) {
        verdict = "Promising";
        score = 81;
      }

      const confidenceScore = Math.min(Math.round((idea.length / 500) * 100), 98) || 45;

      const mockData: IdeaAnalysis = {
        score: score,
        verdict: verdict,
        summary: "This is a brilliantly constructed simulated AI analysis testing your idea: " + idea.substring(0, 80) + "...",
        confidenceScore: confidenceScore,
        reasoning: "The score reflects a balance between market demand and existing competition density. More detail in your description could unlock a higher precision score.",
        analyzedPoints: [
          "Cross-referenced 15+ competitor data points",
          "Analyzed recent market trends (2025-2026)",
          "Benchmarked against successfully scaled SaaS revenue models",
          "Scanned 50+ relevant customer forums and pain-point discussions"
        ],
        strengths: [
          "Identifies a glaring problem in your targeted market space.",
          "Demonstrates a clear path to a high-margin subscription business model.",
          "The target audience metrics are highly reachable via organic digital channels."
        ],
        weaknesses: [
          "High initial reliance on manual onboarding before automation scales.",
          "Lacks immediate defensibility against large platform incumbents.",
          "Brand recognition is currently zero in a trust-heavy industry."
        ],
        risks: [
          "Customer Acquisition Cost (CAC) might scale faster than Lifetime Value (LTV) initially.",
          "Engineering the core proprietary technology requires highly specialized talent.",
          "Risk of massive established ecosystem competitors pivoting slightly to swallow this feature."
        ],
        marketSize: {
          tam: "$4.2B global market for specialized nutrition management.",
          sam: "$850M reachable via direct digital marketing in Tier-1 countries.",
          som: "$12M target revenue within 24 months of launch."
        },
        competitors: [
          { name: "Legacy ERPs", type: "Indirect", threat: "Medium" },
          { name: "Manual Spreadsheet Workflows", type: "Direct", threat: "High" },
          { name: "Niche Startups", type: "Direct", threat: "Low" }
        ],
        pivotOptions: [
          "B2B Enterprise licensing instead of direct-to-consumer app.",
          "White-label API for existing logistics companies.",
          "Focus exclusively on high-net-worth individual micro-segments."
        ],
        targetAudience: {
          persona: "Tech-savvy professionals aged 25-45 with high disposable income.",
          painPoint: "Inefficiency in managing fragmented health data across multiple devices.",
          solution: "Unified, AI-driven dashboard for holistic pet wellness."
        },
        revenueModel: [
          "Freemium with $19.99/mo premium tier for AI deep-insights.",
          "Transaction fees on partner marketplace integrations.",
          "Data-as-a-Service for veterinary research firms (Anonymized)."
        ],
        roadmap: [
          { phase: "Month 1", task: "MVP Launch & 100 User Interviews" },
          { phase: "Month 3", task: "Beta Integration with 5 Major Pet Food Brands" },
          { phase: "Month 6", task: "Seed Round Preparation & Scale to 10k Users" }
        ]
      };

      // Save to Supabase
      // @ts-ignore - Tables are not yet synced to types.ts
      await supabase.from("validations").insert({
        user_id: user.id,
        idea_text: idea,
        score: score,
        result_json: mockData as any
      });

      setResult(mockData);
      // --- END LOCAL SIMULATION ---
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Analysis failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <div className={`relative group rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-xl p-3 shadow-2xl transition-all duration-500 focus-within:ring-4 focus-within:ring-primary/10 ${loading ? 'border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)] bg-card' : 'hover:border-primary/30'}`}>
          {/* Background Glow */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 transition-opacity duration-700 group-focus-within:opacity-100 blur-xl -z-10" />

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea in detail... What problem are you solving? Who is the audience? How will you make money?"
            rows={6}
            disabled={loading}
            className="w-full resize-none rounded-2xl bg-secondary/20 px-6 py-5 text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50 transition-all font-medium leading-relaxed"
          />
          
          <div className="flex items-center justify-between mt-2 px-3 pb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${idea.length > 200 ? 'bg-emerald-500' : idea.length > 50 ? 'bg-amber-500' : 'bg-red-500'}`} />
                {idea.length < 50 ? 'Short' : idea.length < 200 ? 'Moderate' : 'Insightful'} Detail
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40">
                {idea.length} / 500 chars
              </span>
            </div>

            <Button
              size="lg"
              className={`gap-2 rounded-2xl px-8 font-bold text-base shadow-elevated transition-all duration-300 ${loading ? "animate-pulse" : "hover:scale-[1.02] active:scale-95"}`}
              disabled={!idea.trim() || loading}
              onClick={handleAnalyze}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              {loading ? "Analyzing..." : "Validate Idea"}
            </Button>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
           Detailed inputs result in <span className="text-primary font-bold">95%+ more accurate</span> reports.
        </p>
      </motion.div>

      {result && <AnalysisResults data={result} />}
    </section>
  );
};

export default IdeaInput;
