import { CheckCircle, AlertTriangle, AlertOctagon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  level: 'safe' | 'caution' | 'danger';
  title: string;
  description: string;
  className?: string;
}

const AlertCard = ({ level, title, description, className }: AlertCardProps) => {
  const levelConfig: Record<string, { icon: LucideIcon; styles: string; iconColor: string }> = {
    safe: {
      icon: CheckCircle,
      styles: 'border-status-safe bg-status-safe/5',
      iconColor: 'text-status-safe',
    },
    caution: {
      icon: AlertTriangle,
      styles: 'border-status-caution bg-status-caution/5',
      iconColor: 'text-status-caution',
    },
    danger: {
      icon: AlertOctagon,
      styles: 'border-status-danger bg-status-danger/5',
      iconColor: 'text-status-danger',
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-card-hover',
        config.styles,
        className
      )}
      data-animate="slide-up"
    >
      <div className="flex items-start gap-4">
        <div className={cn('mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full', `${config.iconColor}/10`)}>
          <Icon className={cn('h-6 w-6', config.iconColor)} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
