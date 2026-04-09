import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, AlertTriangle, Target, Users, ArrowRight, CheckCircle2, 
  Lock, Twitter, FileText, Download, PieChart, Lightbulb, UserCheck, 
  DollarSign, Map, BarChart, ShieldCheck, Zap, Info, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export interface IdeaAnalysis {
  score: number;
  verdict: string;
  summary: string;
  confidenceScore: number;
  reasoning: string;
  analyzedPoints: string[];
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  marketSize: {
    tam: string;
    sam: string;
    som: string;
  };
  competitors: {
    name: string;
    type: string;
    threat: string;
  }[];
  pivotOptions: string[];
  targetAudience: {
    persona: string;
    painPoint: string;
    solution: string;
  };
  revenueModel: string[];
  roadmap: {
    phase: string;
    task: string;
  }[];
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
  const [unlocked, setUnlocked] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    const checkPro = async () => {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data?.user;
      if (user) {
        // @ts-ignore - Tables are not yet synced to types.ts
        const profileResponse = await supabase.from("profiles").select("is_pro").eq("id", user.id).single();
        
        // @ts-ignore - Tables are not yet synced to types.ts
        const validationsResponse = await supabase.from("validations").select("*", { count: 'exact', head: true }).eq("user_id", user.id);

        const isPro = !!((profileResponse.data as any)?.is_pro);
        const count = (validationsResponse as any).count;

        setIsProUser(isPro);
        if (!isPro && count !== null && count >= 10) {
          // Logic for free tier limit
        }
      }
    };
    checkPro();
  }, []);

  const handleShare = () => {
    const text = `I just validated my startup idea "${data.summary.substring(0, 30)}..." on CrazeCheck! Get your AI validation score now:`;
    const url = window.location.origin;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    
    setTimeout(() => {
      setUnlocked(true);
      toast({
        title: "Deep Insights Unlocked!",
        description: "Viral bonus: You've unlocked the premium tabs for this session.",
      });
    }, 2000);
  };

  const handleUpgrade = () => {
    setRedirecting(true);
    window.location.href = "https://buy.stripe.com/test_eVq00j7sHdXB3Fn0RL7ss00";
  };

  const isTabLocked = (tabId: string) => {
    const premiumTabs = ["market", "competitors", "pivots", "roadmap", "audience", "revenue"];
    return premiumTabs.includes(tabId) && !isProUser && !unlocked;
  };

  const PremiumOverlay = () => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-background/60 px-4 py-8 text-center backdrop-blur-md border border-primary/20 shadow-premium">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
        <Lock className="h-8 w-8" />
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground">Unlock Premium Deep-Dive</h3>
      <p className="mt-2 mb-6 max-w-sm text-sm text-muted-foreground">
        Upgrade to Pro or share on X to see detailed market stats, competitor analysis, and your 90-day execution roadmap.
      </p>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button className="w-full gap-2 font-bold h-12 text-base shadow-elevated transition-transform hover:scale-105" onClick={handleUpgrade} disabled={redirecting}>
          {redirecting ? "Redirecting..." : "Upgrade to Pro $9"}
        </Button>
        <Button variant="outline" className="w-full gap-2 font-semibold h-12 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200" onClick={handleShare}>
          <Twitter className="h-4 w-4" /> Share to Unlock
        </Button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto mt-12 bg-card/30 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden"
    >
      {/* Header Panel */}
      <div className="p-8 border-b border-border/50 bg-gradient-to-br from-card to-secondary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-background shadow-inner border border-border/50">
              <span className={`text-4xl font-display font-black ${getScoreColor(data.score)}`}>{data.score}</span>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-soft">
                <BarChart className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-display font-bold text-foreground">Validation Results</h2>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getVerdictBg(data.verdict)}`}>
                  {data.verdict}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-lg leading-relaxed">{data.summary}</p>
            </div>
          </div>
          
          {/* Trust/Confidence Meter */}
          <div className="w-full md:w-56 p-4 rounded-2xl bg-background/50 border border-border/50 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-primary" /> Confidence Score
              </span>
              <span className={`text-xs font-bold ${(data.confidenceScore ?? 0) >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {data.confidenceScore ?? 45}%
              </span>
            </div>
            <Progress value={data.confidenceScore ?? 45} className="h-1.5" />
            <p className="mt-2 text-[9px] text-muted-foreground leading-tight italic">
              {(data.confidenceScore ?? 0) < 60 ? "Low detail detected. Expand your idea description for higher precision." : "High detail provided. Analysis is highly calibrated."}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="px-8 pt-4 overflow-x-auto">
          <TabsList className="h-auto p-1 bg-secondary/30 rounded-xl flex flex-nowrap w-max min-w-full">
            <TabsTrigger value="overview" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft">
              <Zap className="h-4 w-4" /> Insights
            </TabsTrigger>
            <TabsTrigger value="strengths" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <TrendingUp className="h-4 w-4" /> Strengths
            </TabsTrigger>
            <TabsTrigger value="weaknesses" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <Lightbulb className="h-4 w-4" /> Improvements
            </TabsTrigger>
            <TabsTrigger value="risks" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <AlertTriangle className="h-4 w-4" /> Risks
            </TabsTrigger>
            <TabsTrigger value="audience" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <UserCheck className="h-4 w-4" /> Audience {isTabLocked('audience') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="market" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <PieChart className="h-4 w-4" /> Market {isTabLocked('market') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="competitors" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <Users className="h-4 w-4" /> Competition {isTabLocked('competitors') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <DollarSign className="h-4 w-4" /> Revenue {isTabLocked('revenue') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="pivots" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <Target className="h-4 w-4" /> Pivots {isTabLocked('pivots') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="rounded-lg py-2.5 px-4 gap-2 data-[state=active]:bg-background">
              <Map className="h-4 w-4" /> Roadmap {isTabLocked('roadmap') && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-8 pb-12 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isTabLocked(activeTab) && <PremiumOverlay />}

              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-6">
                      <div className="p-6 rounded-2xl bg-secondary/20 border border-border/50">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                          <Info className="h-4 w-4" />
                          <h4 className="text-sm font-bold uppercase tracking-wider">AI Score Reasoning</h4>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed italic">
                          "{data.reasoning ?? "Initial assessment based on core market viability metrics."}"
                        </p>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">Core Strengths</h4>
                          <ul className="space-y-3">
                            {data.strengths?.slice(0, 2).map((s, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">Top Risks</h4>
                          <ul className="space-y-3">
                            {data.risks?.slice(0, 2).map((r, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Trust/Accuracy Checklist */}
                    <div className="p-6 rounded-2xl bg-background border border-border shadow-soft self-start">
                      <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3 text-primary" /> Accuracy Verification
                      </h4>
                      <ul className="space-y-4">
                        {(data.analyzedPoints ?? [
                          "Market demand analysis",
                          "Competitor landscape scan",
                          "Revenue model benchmarking"
                        ]).map((point, i) => (
                          <li key={i} className="flex items-center gap-3 text-xs font-medium text-foreground">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      
                      {(data.confidenceScore ?? 0) < 70 && (
                        <div className="mt-8 pt-6 border-t border-border">
                          <p className="text-[10px] text-muted-foreground leading-snug mb-3">
                            Want more precise figures? Describe your target features and specific audience details.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full gap-2 text-[10px] h-8 rounded-lg"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            <RotateCcw className="h-3 w-3" /> Refine & Re-run
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "strengths" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Key Strengths & Competitive Advantage</h3>
                  <div className="grid gap-4">
                    {data.strengths.map((s, i) => (
                      <div key={i} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">{i+1}</div>
                        <p className="text-sm font-medium text-emerald-900">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "weaknesses" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Areas for Improvement</h3>
                  <div className="grid gap-4">
                    {data.weaknesses.map((w, i) => (
                      <div key={i} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{i+1}</div>
                        <p className="text-sm font-medium text-blue-900">{w}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "risks" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Critical Vulnerabilities</h3>
                  <div className="grid gap-4">
                    {data.risks.map((r, i) => (
                      <div key={i} className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">{i+1}</div>
                        <p className="text-sm font-medium text-amber-900">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "market" && !isTabLocked("market") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Market Size & Potential</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">TAM</p>
                      <p className="text-2xl font-black text-foreground">{data.marketSize.tam.split(' ')[0]}</p>
                      <p className="mt-2 text-xs text-muted-foreground leading-tight">{data.marketSize.tam}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/20 border border-border/50 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">SAM</p>
                      <p className="text-2xl font-black text-foreground">{data.marketSize.sam.split(' ')[0]}</p>
                      <p className="mt-2 text-xs text-muted-foreground leading-tight">{data.marketSize.sam}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/20 border border-border/50 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">SOM</p>
                      <p className="text-2xl font-black text-foreground">{data.marketSize.som.split(' ')[0]}</p>
                      <p className="mt-2 text-xs text-muted-foreground leading-tight">{data.marketSize.som}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "competitors" && !isTabLocked("competitors") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Competitive Landscape</h3>
                  <div className="rounded-2xl border border-border/50 overflow-hidden bg-background">
                    <table className="w-full text-left">
                      <thead className="bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4">Competitor</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Threat Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.competitors.map((c, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 text-sm font-bold">{c.name}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{c.type}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                c.threat === 'High' ? 'bg-red-100 text-red-600' : 
                                c.threat === 'Medium' ? 'bg-amber-100 text-amber-600' : 
                                'bg-emerald-100 text-emerald-600'
                              }`}>
                                {c.threat}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "audience" && !isTabLocked("audience") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">ICP & Target Audience</h3>
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Ideal Persona</h4>
                        <p className="text-sm text-muted-foreground">{data.targetAudience.persona}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500 flex items-center justify-center text-white">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Core Pain Point</h4>
                        <p className="text-sm text-muted-foreground">{data.targetAudience.painPoint}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Your Solution Fit</h4>
                        <p className="text-sm text-muted-foreground">{data.targetAudience.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "revenue" && !isTabLocked("revenue") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Revenue & Monetization</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {data.revenueModel.map((model, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-background border border-border shadow-soft">
                        <DollarSign className="h-6 w-6 text-emerald-500 mb-4" />
                        <p className="text-sm font-bold text-foreground leading-snug">{model}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "pivots" && !isTabLocked("pivots") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Alternative Pivot Strategies</h3>
                  <div className="grid gap-4">
                    {data.pivotOptions.map((pivot, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-secondary/20 border border-border/50 flex gap-4">
                        <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-foreground">{pivot}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "roadmap" && !isTabLocked("roadmap") && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">90-Day Execution Roadmap</h3>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/50">
                    {data.roadmap.map((step, i) => (
                      <div key={i} className="relative flex items-center gap-8 pl-12">
                        <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-black shadow-soft z-10 border-4 border-background">
                          {i+1}
                        </div>
                        <div className="bg-card p-5 rounded-2xl border border-border shadow-soft flex-1">
                          <span className="text-xs font-black uppercase tracking-widest text-primary">{step.phase}</span>
                          <h4 className="mt-1 text-sm font-bold text-foreground">{step.task}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </motion.div>
  );
};

export default AnalysisResults;
