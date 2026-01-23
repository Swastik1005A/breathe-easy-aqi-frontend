import { cn } from '@/lib/utils';

interface AQIGaugeProps {
  value: number;
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AQIGauge = ({ value, category, size = 'md', className }: AQIGaugeProps) => {
  const getColor = (cat: string) => {
    const normalizedCat = cat.toLowerCase();
    switch (normalizedCat) {
      case 'good':
        return 'text-aqi-good';
      case 'moderate':
        return 'text-aqi-moderate';
      case 'poor':
        return 'text-aqi-poor';
      case 'unhealthy':
        return 'text-aqi-unhealthy';
      case 'severe':
      case 'hazardous':
        return 'text-aqi-severe';
      default:
        return 'text-muted-foreground';
    }
  };

  const getBgColor = (cat: string) => {
    const normalizedCat = cat.toLowerCase();
    switch (normalizedCat) {
      case 'good':
        return 'bg-aqi-good/10';
      case 'moderate':
        return 'bg-aqi-moderate/10';
      case 'poor':
        return 'bg-aqi-poor/10';
      case 'unhealthy':
        return 'bg-aqi-unhealthy/10';
      case 'severe':
      case 'hazardous':
        return 'bg-aqi-severe/10';
      default:
        return 'bg-muted';
    }
  };

  const sizeStyles = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-40 w-40',
  };

  const textSizeStyles = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        getBgColor(category),
        sizeStyles[size],
        className
      )}
      data-animate="scale-in"
    >
      <div className="text-center">
        <span className={cn('font-display font-bold', getColor(category), textSizeStyles[size])}>
          {value}
        </span>
        <p className="text-xs font-medium text-muted-foreground">AQI</p>
      </div>
      
      {/* Animated ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="stroke-current text-muted/30"
          strokeWidth="8"
          fill="none"
          r="42"
          cx="50"
          cy="50"
        />
        <circle
          className={cn('stroke-current transition-all duration-1000', getColor(category))}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          r="42"
          cx="50"
          cy="50"
          strokeDasharray={`${Math.min(value / 500, 1) * 264} 264`}
        />
      </svg>
    </div>
  );
};

export default AQIGauge;
