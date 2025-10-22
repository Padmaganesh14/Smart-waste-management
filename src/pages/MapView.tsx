import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 140px)",
};

type BinStatus = "normal" | "warning" | "critical";

interface SmartBin {
  id: string;
  name: string;
  location: string;
  position: { lat: number; lng: number };
  fillLevel: number;
  status: BinStatus;
  lastCollected: string;
}

const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707,
};

const MapView = () => {
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);
  const [smartBins] = useState<SmartBin[]>([
    {
      id: "BIN-001",
      name: "Anna Nagar",
      location: "Main Street & 5th Ave",
      position: { lat: 13.0850, lng: 80.2101 },
      fillLevel: 85,
      status: "warning",
      lastCollected: "2 hours ago",
    },
    {
      id: "BIN-002",
      name: "Marina Beach",
      location: "Park Plaza",
      position: { lat: 13.0499, lng: 80.2824 },
      fillLevel: 95,
      status: "critical",
      lastCollected: "5 hours ago",
    },
    {
      id: "BIN-003",
      name: "T. Nagar",
      location: "City Hall",
      position: { lat: 13.0418, lng: 80.2341 },
      fillLevel: 45,
      status: "normal",
      lastCollected: "1 hour ago",
    },
    {
      id: "BIN-004",
      name: "Adyar",
      location: "Market Square",
      position: { lat: 13.0067, lng: 80.2571 },
      fillLevel: 32,
      status: "normal",
      lastCollected: "30 minutes ago",
    },
  ]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCKo21Fk7WY22JwIkhj1BbMNhKjVVz5dBM",
  });

  const getMarkerColor = (status: BinStatus) => {
    switch (status) {
      case "critical":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "normal":
        return "#10b981";
      default:
        return "#10b981";
    }
  };

  const getStatusVariant = (status: BinStatus): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      case "normal":
        return "default";
    }
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card>
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
          <Card>
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
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Live Map - Smart Waste Management</h1>
          <p className="text-muted-foreground">Real-time monitoring & optimization</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 shadow-medium overflow-hidden">
            <CardContent className="p-0">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={smartBins.length > 0 ? smartBins[0].position : defaultCenter}
              >
                {smartBins.map((bin) => (
                  <Marker
                    key={bin.id}
                    position={bin.position}
                    onClick={() => setSelectedBin(bin)}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 12,
                      fillColor: getMarkerColor(bin.status),
                      fillOpacity: 1,
                      strokeColor: "#fff",
                      strokeWeight: 3,
                    }}
                  />
                ))}

                {selectedBin && (
                  <InfoWindow
                    position={selectedBin.position}
                    onCloseClick={() => setSelectedBin(null)}
                  >
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-foreground mb-2">
                        {selectedBin.id}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {selectedBin.location}
                      </p>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Fill Level</span>
                          <span className="font-bold">{selectedBin.fillLevel}%</span>
                        </div>
                        <Progress value={selectedBin.fillLevel} className="h-2" />
                      </div>
                      <Badge variant={getStatusVariant(selectedBin.status)} className="uppercase text-xs">
                        {selectedBin.status}
                      </Badge>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Real-Time Bin Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto">
              {smartBins.map((bin) => (
                <Card
                  key={bin.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedBin(bin)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{bin.id}</h3>
                        <Badge 
                          variant={getStatusVariant(bin.status)} 
                          className="uppercase text-xs mt-1"
                        >
                          {bin.status}
                        </Badge>
                      </div>
                      <span className="text-2xl font-bold">{bin.fillLevel}%</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{bin.location}</p>
                    
                    <div>
                      <Progress 
                        value={bin.fillLevel} 
                        className="h-2"
                      />
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Last collected: {bin.lastCollected}
                    </p>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;
