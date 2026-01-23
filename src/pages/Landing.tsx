import { Link } from 'react-router-dom';
import { ArrowRight, Activity, TrendingUp, Shield, Wind, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Landing = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Prediction',
      description: 'Get instant AQI predictions using advanced machine learning models trained on historical data.',
    },
    {
      icon: Shield,
      title: 'Health Alerts',
      description: 'Receive personalized health advisories based on air quality levels in your area.',
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Track historical AQI patterns and understand air quality changes over time.',
    },
  ];

  const aqiScale = [
    { range: '0-50', label: 'Good', color: 'bg-aqi-good' },
    { range: '51-100', label: 'Moderate', color: 'bg-aqi-moderate' },
    { range: '101-200', label: 'Poor', color: 'bg-aqi-poor' },
    { range: '201-300', label: 'Unhealthy', color: 'bg-aqi-unhealthy' },
    { range: '301-500', label: 'Severe', color: 'bg-aqi-severe' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center" data-animate="hero">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                <Wind className="h-4 w-4" />
                <span>AI-Powered Air Quality Monitoring</span>
              </div>
              
              <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Predict Air Quality.
                <br />
                <span className="text-white/90">Protect Health.</span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                Harness the power of machine learning to predict Air Quality Index and receive real-time health advisories. Make informed decisions for a healthier tomorrow.
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/predict">
                  <Button size="lg" className="group bg-white text-primary hover:bg-white/90">
                    Predict AQI
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/trends">
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                    View AQI Trends
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AQI Scale Section */}
        <section className="border-b border-border bg-card py-12">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <span className="text-sm font-medium text-muted-foreground">AQI Scale:</span>
              {aqiScale.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded-full ${item.color}`} />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground"> ({item.range})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center" data-animate="section">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Smart Air Quality Monitoring
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our AI-powered system provides accurate predictions and actionable insights for better health decisions.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="aqi-card group"
                  data-animate="feature"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-secondary/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center" data-animate="cta">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Start Monitoring Air Quality Today
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of users who rely on our predictions for healthier living.
              </p>
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
