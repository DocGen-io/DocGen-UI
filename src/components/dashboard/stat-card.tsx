import { TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  trendUp: boolean;
  error?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  error,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "transition-all shadow-sm",
        error
          ? "border-destructive/30 bg-destructive/5"
          : "hover:border-primary/20",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <Icon
          className={cn(
            "h-4 w-4",
            error ? "text-destructive" : "text-primary/70",
          )}
        />
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-sm text-destructive font-medium flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Loading Failed
          </div>
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
        {!error && (
          <div className="flex items-center gap-1 text-xs mt-2">
            <TrendingUp
              className={`h-3 w-3 ${
                trendUp ? "text-green-500" : "text-amber-500"
              }`}
            />
            <span className={trendUp ? "text-green-500" : "text-amber-500"}>
              {trend}
            </span>
            <span className="text-muted-foreground ml-1">from last sync</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
