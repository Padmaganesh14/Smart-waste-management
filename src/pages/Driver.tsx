import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle2, XCircle } from "lucide-react";

const Driver = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [pendingReport, setPendingReport] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pendingReport");
    if (stored) {
      setPendingReport(JSON.parse(stored));
    }
  }, []);

  const handleVerify = () => {
    if (!pendingReport) {
      toast.error("No pending reports to verify");
      return;
    }

    if (otp === pendingReport.otp) {
      setVerified(true);
      toast.success("OTP verified successfully!");
      
      // Clear the pending report
      setTimeout(() => {
        localStorage.removeItem("pendingReport");
        navigate("/map");
      }, 2000);
    } else {
      toast.error("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-3xl">Driver Portal</CardTitle>
              <CardDescription>
                Enter the OTP to verify and accept waste collection requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {pendingReport && !verified ? (
                <>
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h3 className="font-semibold text-foreground">Pending Report</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>Reporter:</strong> {pendingReport.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Location:</strong> {pendingReport.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Description:</strong> {pendingReport.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Enter 6-Digit OTP</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={otp.length !== 6}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    Verify OTP
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Demo OTP for testing: {pendingReport.otp}
                  </p>
                </>
              ) : verified ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
                  <h3 className="text-2xl font-bold text-foreground">Verified!</h3>
                  <p className="text-muted-foreground">
                    Report accepted. Redirecting to map view...
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <XCircle className="w-16 h-16 text-muted-foreground mx-auto" />
                  <h3 className="text-xl font-semibold text-foreground">No Pending Reports</h3>
                  <p className="text-muted-foreground">
                    Submit a report first to test the OTP verification system
                  </p>
                  <Button
                    onClick={() => navigate("/report")}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Go to Report Page
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Driver;
