import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const IdeaInput = () => {
  const [idea, setIdea] = useState("");

  return (
    <section className="flex justify-center px-6 pb-24">
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
            className="w-full resize-none rounded-xl bg-secondary/50 px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex justify-end pt-1 pr-1 pb-1">
            <Button
              size="default"
              className="gap-2 rounded-full px-6 font-semibold shadow-soft transition-all hover:shadow-medium"
              disabled={!idea.trim()}
            >
              <Send className="h-4 w-4" />
              Analyze Idea
            </Button>
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Describe your idea in a few sentences — we'll handle the rest.
        </p>
      </motion.div>
    </section>
  );
};

export default IdeaInput;
