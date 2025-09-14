import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero animate-gradient-shift bg-[size:400%_400%]"></div>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-lg"></div>
      <div className="relative z-10 container mx-auto px-4">
        {/* Find this h1 tag */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in">
          Build Your <span className="text-gradient-hero">Dream Resume</span> with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-300">
          Create a professional, ATS-optimized resume in minutes. Our AI-powered platform provides intelligent suggestions and premium templates to help you land your next job.
        </p>
        <Button size="lg" asChild className="animate-fade-in animation-delay-600 shadow-lg shadow-primary/30">
          <Link to="/builder">Get Started for Free</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;