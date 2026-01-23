import { Wind, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Wind className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">AQI Predict</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered air quality prediction and health alert system for smarter, healthier cities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/predict" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Predict AQI
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  View Trends
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Health Alerts
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  About AQI
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Health Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AQI Predict. Final Year Major Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
