import { MapPin, TrendingUp, Bell, Shield, Users, Navigation2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MapPin,
    title: "Real-Time Monitoring",
    description: "Track waste bin fill levels with IoT sensors and get instant updates on bin status across your city.",
  },
  {
    icon: TrendingUp,
    title: "Route Optimization",
    description: "AI-powered route planning for garbage trucks to minimize fuel costs and collection time.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive notifications when bins are full or overflowing, and get alerts about irregular patterns.",
  },
  {
    icon: Shield,
    title: "Citizen Reporting",
    description: "Enable citizens to report illegal dumping and overflowing bins directly through the platform.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Dedicated dashboards for citizens, drivers, and administrators with role-specific features.",
  },
  {
    icon: Navigation2,
    title: "Location Tracking",
    description: "GPS-enabled bin locations with interactive maps showing real-time status and schedules.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Cities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage waste efficiently and sustainably
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 border-border hover:border-primary/50 bg-card"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
