import { useState, useEffect } from 'react';
import { Shield, Wind } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AlertCard from '@/components/common/AlertCard';
import { api } from '@/services/api';

interface Alert {
  id: number;
  level: 'safe' | 'caution' | 'danger';
  title: string;
  description: string;
  icon: string;
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.getHealthAlerts();
        if (response.success) {
          setAlerts(response.alerts);
        }
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const alertGuidelines = [
    {
      level: 'Good (0-50)',
      color: 'bg-aqi-good',
      advice: 'Air quality is satisfactory. Enjoy outdoor activities without restrictions.',
    },
    {
      level: 'Moderate (51-100)',
      color: 'bg-aqi-moderate',
      advice: 'Unusually sensitive people should consider limiting prolonged outdoor exertion.',
    },
    {
      level: 'Poor (101-200)',
      color: 'bg-aqi-poor',
      advice: 'Sensitive groups should reduce prolonged or heavy outdoor exertion.',
    },
    {
      level: 'Unhealthy (201-300)',
      color: 'bg-aqi-unhealthy',
      advice: 'Everyone should reduce outdoor activities. Wear masks if going outside.',
    },
    {
      level: 'Severe (301-500)',
      color: 'bg-aqi-severe',
      advice: 'Avoid all outdoor physical activities. Stay indoors with air purification.',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Wind className="mx-auto h-12 w-12 animate-pulse text-primary" />
            <p className="mt-4 text-muted-foreground">Loading health alerts...</p>
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
            <h1 className="font-display text-3xl font-bold text-foreground">Health Alerts</h1>
            <p className="mt-2 text-muted-foreground">
              Stay informed about air quality health advisories and safety guidelines
            </p>
          </div>

          {/* Current Alerts */}
          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Alert Categories
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  level={alert.level}
                  title={alert.title}
                  description={alert.description}
                />
              ))}
            </div>
          </section>

          {/* Health Guidelines */}
          <section>
            <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
              AQI Health Guidelines
            </h2>

            <div className="aqi-card overflow-hidden" data-animate="guidelines">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        AQI Level
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Health Advice
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertGuidelines.map((guideline, index) => (
                      <tr
                        key={guideline.level}
                        className={index !== alertGuidelines.length - 1 ? 'border-b border-border' : ''}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-4 w-4 rounded-full ${guideline.color}`} />
                            <span className="font-medium text-foreground">{guideline.level}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {guideline.advice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Protective Measures */}
          <section className="mt-12">
            <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
              Protective Measures
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Wear Masks',
                  description: 'Use N95 or PM2.5 masks when outdoors during poor air quality.',
                },
                {
                  title: 'Stay Indoors',
                  description: 'Keep windows closed and use air purifiers when AQI is high.',
                },
                {
                  title: 'Avoid Exertion',
                  description: 'Limit strenuous outdoor activities during moderate to poor AQI.',
                },
                {
                  title: 'Monitor AQI',
                  description: 'Check AQI regularly before planning outdoor activities.',
                },
                {
                  title: 'Stay Hydrated',
                  description: 'Drink plenty of water to help your body flush out toxins.',
                },
                {
                  title: 'Consult Doctor',
                  description: 'Seek medical advice if you experience breathing difficulties.',
                },
              ].map((measure, index) => (
                <div
                  key={measure.title}
                  className="aqi-card"
                  data-animate="measure"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {measure.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {measure.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Alerts;
