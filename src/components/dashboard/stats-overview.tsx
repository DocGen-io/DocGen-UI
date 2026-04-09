import { TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils";

interface Stat {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  trendUp: boolean;
  error?: boolean;
}

interface StatsOverviewProps {
  stats: Stat[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={cn(
            "transition-all shadow-sm",
            stat.error
              ? "border-destructive/30 bg-destructive/5"
              : "hover:border-primary/20",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <stat.icon
              className={cn(
                "h-4 w-4",
                stat.error ? "text-destructive" : "text-primary/70",
              )}
            />
          </CardHeader>
          <CardContent>
            {stat.error ? (
              <div className="text-sm text-destructive font-medium flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> Loading Failed
              </div>
            ) : (
              <div className="text-3xl font-bold">{stat.value}</div>
            )}
            {!stat.error && (
              <div className="flex items-center gap-1 text-xs mt-2">
                <TrendingUp
                  className={`h-3 w-3 ${
                    stat.trendUp ? "text-green-500" : "text-amber-500"
                  }`}
                />
                <span
                  className={stat.trendUp ? "text-green-500" : "text-amber-500"}
                >
                  {stat.trend}
                </span>
                <span className="text-muted-foreground ml-1">
                  from last sync
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
