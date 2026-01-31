import { useState, useEffect } from "react";
import { Send, MapPin, Building, Wind, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AQIGauge from "@/components/common/AQIGauge";
import AQIBadge from "@/components/common/AQIBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";

interface PredictionResult {
  aqi: number;
  category: string;
  healthRisk: string;
  timestamp: string;
  location: {
    state: string;
    city: string;
    areaType: string;
  };
}

const Predict = () => {
  const [states, setStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    areaType: "",
    so2: "",
    no2: "",
    rspm: "",
  });

  /* LOAD STATES */
  useEffect(() => {
    const fetchStates = async () => {
      const res = await api.getStates();
      if (res.success) setStates(res.states);
    };
    fetchStates();
  }, []);

  /* SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await api.predictAQI(formData);
      if (res.success) setResult(res.prediction);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">AQI Prediction</h1>
            <p className="text-muted-foreground">
              Enter pollutant values to predict AQI
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* FORM */}
            <div className="aqi-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* LOCATION */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Location Details
                  </h3>

                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(v) =>
                        handleInputChange("state", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CITY = INPUT (as requested) */}
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Enter city name"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Area Type</Label>
                    <Select
                      value={formData.areaType}
                      onValueChange={(v) =>
                        handleInputChange("areaType", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* POLLUTANTS */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {["so2", "no2", "rspm"].map((p) => (
                    <div key={p} className="space-y-2">
                      <Label>{p.toUpperCase()}</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData[p as keyof typeof formData]}
                        onChange={(e) =>
                          handleInputChange(p, e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>

                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Wind className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Predict AQI
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* RESULT + ADVISORY */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* Prediction Result */}
                  <div className="aqi-card flex flex-col items-center text-center">
                    <h2 className="mb-4 text-xl font-semibold">
                      Prediction Result
                    </h2>

                    <AQIGauge
                      value={result.aqi}
                      category={result.category}
                      size="lg"
                    />

                    <div className="mt-4">
                      <AQIBadge
                        category={result.category}
                        size="lg"
                      />
                      <p className="mt-2 text-sm">
                        {result.location.city}, {result.location.state}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {result.location.areaType} Area
                      </p>
                    </div>
                  </div>

                  {/* Health Advisorygit */}
                  <div className="aqi-card">
                    <h2 className="mb-2 text-xl font-semibold">
                      Health Advisory
                    </h2>
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        {result.healthRisk}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="aqi-card text-center">
                  <Wind className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2">No prediction yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predict;