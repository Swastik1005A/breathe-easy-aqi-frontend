import { useState, useEffect } from 'react';
import { Activity, MapPin, Bell, TrendingUp, Wind } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AQIGauge from '@/components/common/AQIGauge';
import AQIBadge from '@/components/common/AQIBadge';
import StatCard from '@/components/common/StatCard';
import { api } from '@/services/api';

interface DashboardData {
  latestAQI: number;
  category: string;
  healthRisk: string;
  lastUpdated: string;
  stats: {
    predictions: number;
    citiesMonitored: number;
    alertsIssued: number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.getDashboardData();
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Wind className="mx-auto h-12 w-12 animate-pulse text-primary" />
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8" data-animate="header">
            <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Overview of air quality monitoring and predictions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Predictions"
              value={data?.stats.predictions || 0}
              icon={Activity}
              description="All-time predictions made"
            />
            <StatCard
              title="Cities Monitored"
              value={data?.stats.citiesMonitored || 0}
              icon={MapPin}
              description="Active monitoring locations"
            />
            <StatCard
              title="Alerts Issued"
              value={data?.stats.alertsIssued || 0}
              icon={Bell}
              description="Health alerts this month"
            />
            <StatCard
              title="Trend"
              value="+12%"
              icon={TrendingUp}
              description="Improvement vs last week"
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* AQI Overview Card */}
            <div className="aqi-card lg:col-span-1" data-animate="aqi-card">
              <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                Current AQI
              </h2>
              
              <div className="flex flex-col items-center">
                <AQIGauge 
                  value={data?.latestAQI || 0} 
                  category={data?.category || 'Unknown'} 
                  size="lg"
                />
                
                <div className="mt-6 text-center">
                  <AQIBadge category={data?.category || 'Unknown'} size="lg" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Health Risk Panel */}
            <div className="aqi-card lg:col-span-2" data-animate="health-panel">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Health Advisory
              </h2>
              
              <div className="rounded-lg bg-secondary/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Air Quality Status: {data?.category}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {data?.healthRisk}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="/predict"
                  className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">New Prediction</h4>
                    <p className="text-sm text-muted-foreground">Predict AQI for a location</p>
                  </div>
                </a>
                <a
                  href="/trends"
                  className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">View Trends</h4>
                    <p className="text-sm text-muted-foreground">Historical AQI analysis</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* AQI Scale Reference */}
          <div className="mt-8 aqi-card" data-animate="scale-reference">
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
              AQI Scale Reference
            </h2>
            <div className="grid gap-3 sm:grid-cols-5">
              {[
                { range: '0-50', label: 'Good', color: 'bg-aqi-good', text: 'text-white' },
                { range: '51-100', label: 'Moderate', color: 'bg-aqi-moderate', text: 'text-foreground' },
                { range: '101-200', label: 'Poor', color: 'bg-aqi-poor', text: 'text-white' },
                { range: '201-300', label: 'Unhealthy', color: 'bg-aqi-unhealthy', text: 'text-white' },
                { range: '301-500', label: 'Severe', color: 'bg-aqi-severe', text: 'text-white' },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-lg p-4 text-center ${item.color} ${item.text}`}
                >
                  <p className="font-display text-lg font-bold">{item.label}</p>
                  <p className="text-sm opacity-90">{item.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
