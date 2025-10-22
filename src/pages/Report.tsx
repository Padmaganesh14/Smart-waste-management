import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    location: "",
  });
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCKo21Fk7WY22JwIkhj1BbMNhKjVVz5dBM",
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedLocation({ lat, lng });
      setFormData({ ...formData, location: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.description || !formData.location) {
      toast.error("Please fill in all fields");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    toast.success("Report submitted successfully! OTP sent to driver.");
    
    localStorage.setItem("pendingReport", JSON.stringify({
      ...formData,
      otp,
      timestamp: new Date().toISOString(),
    }));

    setTimeout(() => {
      navigate("/map");
    }, 2000);
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p className="text-destructive">Error loading maps. Please add your Google Maps API key.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p>Loading maps...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle className="text-3xl">Report Waste Issue</CardTitle>
            <CardDescription>
              Help keep our community clean by reporting overflowing bins or illegal dumping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location (Click on map to select)
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  readOnly
                  placeholder="Click on the map to select location"
                  className="mb-2"
                />
                <div className="rounded-lg overflow-hidden border border-border">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={selectedLocation}
                    onClick={handleMapClick}
                  >
                    <Marker position={selectedLocation} />
                  </GoogleMap>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;

