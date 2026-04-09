import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const handleStartFree = () => {
    const element = document.querySelector("textarea");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus();
    }
  };

  return (
    <section className="relative px-6 py-24 bg-background">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Monetize & Scale
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pick your validation tier
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Whether you just need a vibe check or a full-blown investor breakdown, we have you covered.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <h3 className="text-xl font-bold text-foreground">Free Check</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-foreground">
              $0
              <span className="ml-1 text-xl font-medium text-muted-foreground">/10 ideas</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Great for a quick intuition check before you sketch it out.</p>
            <ul className="mt-8 space-y-4 flex-1">
              {[
                "10 Free Idea Validations",
                "Basic Viability Score",
                "Executive Summary",
                "Strengths & Weaknesses",
                "Common Risks",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full font-semibold" variant="outline" onClick={handleStartFree}>
              Start Free
            </Button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col rounded-3xl border-2 border-primary bg-card p-8 shadow-medium"
          >
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-foreground">Pro Deep Dive</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-foreground">
              $9
              <span className="ml-1 text-xl font-medium text-muted-foreground">/idea</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Get the full 10-tab viral validation report and save weeks of research.</p>
            <ul className="mt-8 space-y-4 flex-1">
              {[
                "Everything in Free",
                "Unlimited Validations",
                "Full Competitor Analysis",
                "TAM / SAM / SOM calculation",
                "90-Day Execution Roadmap",
                "Pivot & Revenue Models",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className={feature === "Everything in Free" ? "font-semibold" : ""}>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full font-semibold shadow-elevated transition-transform hover:scale-105" onClick={handleStartFree}>
              Unlock Pro Report
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
