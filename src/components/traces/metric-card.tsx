import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function MetricCard({ title, value, icon: Icon, highlight }: any) {
    return (
        <Card className={cn("border-border/60", highlight && "bg-primary/5 border-primary/20")}>
            <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</span>
                    <Icon className={cn("h-4 w-4", highlight ? "text-primary" : "text-muted-foreground/60")} />
                </div>
                <p className="text-2xl font-black">{value}</p>
            </CardContent>
        </Card>
    );
}

export default MetricCard;