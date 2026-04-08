import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import IdeaInput from "@/components/landing/IdeaInput";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <IdeaInput />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
