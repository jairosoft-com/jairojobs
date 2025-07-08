import { TrendingUp, Users, Building2 } from 'lucide-react';

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white/70 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/80 transition-all duration-300">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{value}</div>
      <div className="text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { icon: TrendingUp, value: "50,000+", label: "Active Jobs" },
    { icon: Building2, value: "15,000+", label: "Companies" },
    { icon: Users, value: "2M+", label: "Job Seekers" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}