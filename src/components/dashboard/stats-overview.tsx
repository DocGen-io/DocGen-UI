import { DASHBOARD_STAT_ITEMS } from "@/definitions/dashboard";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { StatCard } from "./stat-card";
import { useTeamStore } from "@/stores/team-store";

export function StatsOverview() {
  const { activeTeam } = useTeamStore();
  const { data: statsData, isLoading, isError } = useDashboardStats(activeTeam?.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {DASHBOARD_STAT_ITEMS.map((item) => {
        let value: number | string = isLoading ? "..." : 0;
        if (statsData) {
          value = (statsData as Record<string, number>)[item.id] ?? 0;
        }

        return (
          <StatCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            value={value}
            error={isError}
            trend="+0%"
            trendUp={true}
          />
        );
      })}
    </div>
  );
}
