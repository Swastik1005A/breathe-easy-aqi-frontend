import { useState, useEffect } from "react";
import { Activity, MapPin, Bell, TrendingUp, Wind } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AQIGauge from "@/components/common/AQIGauge";
import AQIBadge from "@/components/common/AQIBadge";
import StatCard from "@/components/common/StatCard";
import api from "@/services/api";

interface DashboardData {
  latestAQI: number;
  category: string;
  healthRisk: string;
  lastUpdated: string;
  trend: number;
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
    const load = async () => {
      try {
        const dashboard = await api.getDashboardData();
        setData(dashboard);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  /* ---------- LOADING STATE (KEPT) ---------- */
  if (isLoading || !data) {
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

  /* ---------- ORIGINAL UI RESTORED ---------- */
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Overview of air quality monitoring and predictions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Predictions"
              value={data.stats.predictions}
              icon={Activity}
              description="All-time predictions made"
            />
            <StatCard
              title="Cities Monitored"
              value={data.stats.citiesMonitored}
              icon={MapPin}
              description="Active monitoring locations"
            />
            <StatCard
              title="Alerts Issued"
              value={data.stats.alertsIssued}
              icon={Bell}
              description="Health alerts this month"
            />
            <StatCard
              title="Trend"
              value={`${data.trend > 0 ? "+" : ""}${data.trend}%`}
              icon={TrendingUp}
              description="Improvement vs last week"
              trend={{ value: data.trend, isPositive: data.trend > 0 }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* AQI Card */}
            <div className="aqi-card lg:col-span-1">
              <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                Current AQI
              </h2>

              <div className="flex flex-col items-center">
                <AQIGauge
                  value={data.latestAQI}
                  category={data.category}
                  size="lg"
                />

                <div className="mt-6 text-center">
                  <AQIBadge category={data.category} size="lg" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Last updated:{" "}
                    {new Date(data.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Health Advisory */}
            <div className="aqi-card lg:col-span-2">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Health Advisory
              </h2>

              <div className="rounded-lg bg-secondary/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Air Quality Status: {data.category}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {data.healthRisk}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions (RESTORED) */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="/predict"
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      New Prediction
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Predict AQI for a location
                    </p>
                  </div>
                </a>

                <a
                  href="/trends"
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      View Trends
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Historical AQI analysis
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;