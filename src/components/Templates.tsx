import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import your actual template images
import template1 from "@/assets/template-1.jpg";
import template2 from "@/assets/template-2.jpg";
import template3 from "@/assets/template-3.jpg";

const templates = [
  {
    name: "Modern Professional",
    image: template1,
  },
  {
    name: "Creative Minimalist",
    image: template2,
  },
  {
    name: "Luxury Executive",
    image: template3,
  },
];

const Templates = () => {
  return (
    <section id="templates" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Find Your Perfect <span className="text-primary">Style</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card key={index} className="overflow-hidden group bg-card/50 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-0">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/builder">Choose a Template & Start</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Templates;