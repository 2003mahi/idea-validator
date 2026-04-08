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
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-idea", {
        body: { idea: idea.trim() },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data as IdeaAnalysis);
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
        className="w-full max-w-2xl"
      >
        <div className="rounded-2xl border border-border bg-card p-2 shadow-elevated transition-shadow focus-within:ring-2 focus-within:ring-ring/20">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your startup idea..."
            rows={4}
            disabled={loading}
            className="w-full resize-none rounded-xl bg-secondary/50 px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <div className="flex justify-end pt-1 pr-1 pb-1">
            <Button
              size="default"
              className="gap-2 rounded-full px-6 font-semibold shadow-soft transition-all hover:shadow-medium"
              disabled={!idea.trim() || loading}
              onClick={handleAnalyze}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Analyzing..." : "Analyze Idea"}
            </Button>
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Describe your idea in a few sentences — we'll handle the rest.
        </p>
      </motion.div>

      {result && <AnalysisResults data={result} />}
    </section>
  );
};

export default IdeaInput;
