import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import IdeaInput from "@/components/landing/IdeaInput";
import Footer from "@/components/landing/Footer";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import TrendingSection from "@/components/landing/TrendingSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrendingSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <IdeaInput />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
