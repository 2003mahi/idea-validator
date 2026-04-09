import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleTryNow = () => {
    // Scroll smoothly to IdeaInput
    const element = document.querySelector("textarea");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus();
    }
  };

  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-16 text-center md:pt-44 md:pb-24">
      {/* Subtle gradient orb */}
      <div className="pointer-events-none absolute top-20 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent opacity-60 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          AI-Powered Validation
        </span>

        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Validate Your Startup Idea in Seconds
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          AI-powered tool that analyzes real market demand before you build
        </p>

        <Button
          onClick={handleTryNow}
          size="lg"
          className="mt-2 gap-2 rounded-full px-8 text-base font-semibold shadow-medium transition-all hover:shadow-elevated"
        >
          Try Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
