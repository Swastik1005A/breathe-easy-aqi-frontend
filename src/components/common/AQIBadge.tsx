import { cn } from '@/lib/utils';

interface AQIBadgeProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AQIBadge = ({ category, size = 'md', className }: AQIBadgeProps) => {
  const getCategoryStyles = (cat: string) => {
    const normalizedCat = cat.toLowerCase();
    switch (normalizedCat) {
      case 'good':
        return 'bg-aqi-good text-white';
      case 'moderate':
        return 'bg-aqi-moderate text-foreground';
      case 'poor':
        return 'bg-aqi-poor text-white';
      case 'unhealthy':
        return 'bg-aqi-unhealthy text-white';
      case 'severe':
      case 'hazardous':
        return 'bg-aqi-severe text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        getCategoryStyles(category),
        sizeStyles[size],
        className
      )}
      data-animate="scale-in"
    >
      {category}
    </span>
  );
};

export default AQIBadge;
