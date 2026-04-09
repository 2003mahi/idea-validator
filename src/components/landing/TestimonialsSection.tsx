import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Founder, TechStart",
    content: "This tool saved me months of building a product no one wanted. The demand score was incredibly accurate.",
    avatar: "AJ",
  },
  {
    name: "Sarah Chen",
    role: "Indie Hacker",
    content: "The competitor analysis gave me exactly the angle I needed to differentiate my SaaS. Invaluable.",
    avatar: "SC",
  },
  {
    name: "Michael Ross",
    role: "Product Manager",
    content: "I use CrazeCheck for every new feature idea. It's like having a market researcher instantly available 24/7.",
    avatar: "MR",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const TestimonialsSection = () => {
  return (
    <section className="relative px-6 py-24 bg-secondary/20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Social Proof
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by creators and founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            See how others are validating their ideas and saving time before building.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
            >
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
