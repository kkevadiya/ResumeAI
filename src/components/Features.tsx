import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import the icons we need from lucide-react
import { Zap, Bot, Palette } from "lucide-react";

// Updated features array with real icons
const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "AI-Powered Suggestions",
    description:
      "Our intelligent AI analyzes your profile and suggests powerful keywords and phrases to make your resume stand out.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Premium Templates",
    description:
      "Choose from a collection of modern, luxurious, and professionally designed templates that are proven to impress.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant ATS Optimization",
    description:
      "Ensure your resume gets past automated screening systems (ATS) with our built-in optimization checker.",
  },
];


const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-primary">ResumeAI</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;