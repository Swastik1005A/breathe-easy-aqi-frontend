import { useState, useEffect } from 'react';
import { Send, MapPin, Building, Wind, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AQIGauge from '@/components/common/AQIGauge';
import AQIBadge from '@/components/common/AQIBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/services/api';

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
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    areaType: '',
    so2: '',
    no2: '',
    rspm: '',
  });

  useEffect(() => {
    const fetchStates = async () => {
      const response = await api.getStates();
      if (response.success) {
        setStates(response.states);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        const response = await api.getCitiesByState(formData.state);
        if (response.success) {
          setCities(response.cities);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await api.predictAQI(formData);
      if (response.success) {
        setResult(response.prediction);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    if (field === 'state') {
      setFormData((prev) => ({ ...prev, city: '' }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8" data-animate="header">
            <h1 className="font-display text-3xl font-bold text-foreground">AQI Prediction</h1>
            <p className="mt-2 text-muted-foreground">
              Enter pollutant values to predict the Air Quality Index for your location
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Prediction Form */}
            <div className="aqi-card" data-animate="form">
              <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                Enter Pollutant Data
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location Details
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleInputChange('state', value)}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleInputChange('city', value)}
                        disabled={!formData.state}
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="areaType">Area Type</Label>
                    <Select
                      value={formData.areaType}
                      onValueChange={(value) => handleInputChange('areaType', value)}
                    >
                      <SelectTrigger id="areaType">
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

                {/* Pollutant Values Section */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Building className="h-4 w-4" />
                    Pollutant Concentrations (μg/m³)
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="so2">SO₂</Label>
                      <Input
                        id="so2"
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="e.g., 12.5"
                        value={formData.so2}
                        onChange={(e) => handleInputChange('so2', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="no2">NO₂</Label>
                      <Input
                        id="no2"
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="e.g., 25.8"
                        value={formData.no2}
                        onChange={(e) => handleInputChange('no2', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rspm">RSPM</Label>
                      <Input
                        id="rspm"
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="e.g., 85.2"
                        value={formData.rspm}
                        onChange={(e) => handleInputChange('rspm', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
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

            {/* Results Panel */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* AQI Result Card */}
                  <div className="aqi-card" data-animate="result">
                    <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                      Prediction Result
                    </h2>

                    <div className="flex flex-col items-center">
                      <AQIGauge value={result.aqi} category={result.category} size="lg" />
                      
                      <div className="mt-6 text-center">
                        <AQIBadge category={result.category} size="lg" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          {result.location.city}, {result.location.state}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.location.areaType} Area
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Health Advisory Card */}
                  <div className="aqi-card" data-animate="advisory">
                    <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                      Health Advisory
                    </h2>
                    
                    <div className="flex items-start gap-4 rounded-lg bg-secondary/50 p-4">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {result.healthRisk}
                      </p>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      Predicted at: {new Date(result.timestamp).toLocaleString()}
                    </p>
                  </div>
                </>
              ) : (
                <div className="aqi-card flex min-h-[400px] flex-col items-center justify-center text-center" data-animate="placeholder">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Wind className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    No Prediction Yet
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Enter the pollutant values and location details to get an AQI prediction
                  </p>
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
