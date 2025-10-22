import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Transform Waste Management?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of cities using our platform to create cleaner, more sustainable communities.
          </p>
          <Link to="/report">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
