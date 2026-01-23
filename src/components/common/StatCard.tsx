import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        'aqi-card flex flex-col gap-3',
        className
      )}
      data-animate="fade-in"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="font-display text-3xl font-bold text-foreground">{value}</span>
        {trend && (
          <span
            className={cn(
              'mb-1 text-sm font-medium',
              trend.isPositive ? 'text-aqi-good' : 'text-aqi-unhealthy'
            )}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default StatCard;
