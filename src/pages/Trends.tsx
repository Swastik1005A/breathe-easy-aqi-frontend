import { useState, useEffect } from 'react';
import { TrendingUp, Wind, Calendar, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/services/api';

interface TrendData {
  date: string;
  aqi: number;
}

const Trends = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cities] = useState([
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
  ]);

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAQITrends(selectedCity, '7d');
        if (response.success) {
          setTrends(response.trends);
        }
      } catch (error) {
        console.error('Failed to fetch trends:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
  }, [selectedCity]);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-aqi-good';
    if (aqi <= 100) return 'bg-aqi-moderate';
    if (aqi <= 200) return 'bg-aqi-poor';
    if (aqi <= 300) return 'bg-aqi-unhealthy';
    return 'bg-aqi-severe';
  };

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 200) return 'Poor';
    if (aqi <= 300) return 'Unhealthy';
    return 'Severe';
  };

  const maxAQI = Math.max(...trends.map((t) => t.aqi), 100);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8" data-animate="header">
            <h1 className="font-display text-3xl font-bold text-foreground">AQI Trends</h1>
            <p className="mt-2 text-muted-foreground">
              Analyze historical air quality patterns and trends across cities
            </p>
          </div>

          {/* Controls */}
          <div className="mb-8 flex flex-wrap items-center gap-4" data-animate="controls">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">City:</span>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[180px]">
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

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Last 7 Days
              </Button>
              <Button variant="ghost" size="sm">
                Last 30 Days
              </Button>
              <Button variant="ghost" size="sm">
                Last 90 Days
              </Button>
            </div>
          </div>

          {/* Chart Section */}
          <div className="aqi-card mb-8" data-animate="chart">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Daily AQI Trend - {selectedCity}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span>7-Day Overview</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Wind className="h-8 w-8 animate-pulse text-primary" />
              </div>
            ) : (
              <div className="relative">
                {/* Simple Bar Chart Visualization */}
                <div className="flex h-64 items-end justify-between gap-2">
                  {trends.map((trend, index) => (
                    <div
                      key={trend.date}
                      className="group flex flex-1 flex-col items-center gap-2"
                      data-animate="bar"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative w-full">
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                          AQI: {trend.aqi}
                          <br />
                          {getAQICategory(trend.aqi)}
                        </div>
                        
                        {/* Bar */}
                        <div
                          className={`mx-auto w-full max-w-[50px] rounded-t-lg transition-all duration-500 ${getAQIColor(trend.aqi)} hover:opacity-80`}
                          style={{
                            height: `${(trend.aqi / maxAQI) * 200}px`,
                            minHeight: '20px',
                          }}
                        />
                      </div>
                      
                      {/* Date Label */}
                      <span className="text-xs text-muted-foreground">
                        {new Date(trend.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Y-Axis Labels */}
                <div className="absolute -left-2 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
                  <span>{maxAQI}</span>
                  <span>{Math.round(maxAQI / 2)}</span>
                  <span>0</span>
                </div>
              </div>
            )}
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="aqi-card" data-animate="stat">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average AQI</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {trends.length > 0
                      ? Math.round(trends.reduce((sum, t) => sum + t.aqi, 0) / trends.length)
                      : '--'}
                  </p>
                </div>
              </div>
            </div>

            <div className="aqi-card" data-animate="stat">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aqi-good/10">
                  <BarChart3 className="h-6 w-6 text-aqi-good" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Day</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {trends.length > 0 ? Math.min(...trends.map((t) => t.aqi)) : '--'}
                  </p>
                </div>
              </div>
            </div>

            <div className="aqi-card" data-animate="stat">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aqi-unhealthy/10">
                  <BarChart3 className="h-6 w-6 text-aqi-unhealthy" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Worst Day</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {trends.length > 0 ? Math.max(...trends.map((t) => t.aqi)) : '--'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Data Table */}
          <div className="mt-8 aqi-card" data-animate="table">
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
              Daily AQI Data
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">AQI</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trends.map((trend, index) => (
                    <tr
                      key={trend.date}
                      className={index !== trends.length - 1 ? 'border-b border-border' : ''}
                    >
                      <td className="px-4 py-3 text-foreground">
                        {new Date(trend.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{trend.aqi}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getAQIColor(trend.aqi)} ${
                            trend.aqi > 100 ? 'text-white' : 'text-foreground'
                          }`}
                        >
                          {getAQICategory(trend.aqi)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`h-2 w-2 rounded-full ${getAQIColor(trend.aqi)}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trends;
