import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ConfigSection } from "@/components/config/config-section";
import { ConfigField } from "@/components/config/config-field";

interface TracingConfigFormProps {
  config: any;
  onChange: (path: string[], value: any) => void;
}

export function TracingConfigForm({
  config,
  onChange,
}: TracingConfigFormProps) {
  return (
    <ConfigSection title="Tracing & Debugging">
      <div className="flex items-center justify-between">
        <ConfigField label="Enable Tracing" htmlFor="tracing">
          <Switch
            id="tracing"
            checked={!!config.tracing}
            onCheckedChange={(checked) => onChange(["tracing"], checked)}
          />
        </ConfigField>
      </div>
      <Separator />
      <ConfigField label="Phoenix Data Directory" htmlFor="phoenix_data_dir">
        <Input
          id="phoenix_data_dir"
          value={config.phoenix_data_dir || ""}
          onChange={(e) => onChange(["phoenix_data_dir"], e.target.value)}
        />
      </ConfigField>
      <Separator />
      <ConfigField label="Phoenix Host (Collector/API)" htmlFor="PHOENIX_HOST">
        <Input
          id="PHOENIX_HOST"
          placeholder="http://localhost:6006"
          value={config.PHOENIX_HOST || ""}
          onChange={(e) => onChange(["PHOENIX_HOST"], e.target.value)}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          The public-facing URL of your Phoenix instance.
        </p>
      </ConfigField>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-bold flex items-center gap-2">
          Dynamic Pricing (LLM)
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <ConfigField label="Input Cost (per 1M tokens)" htmlFor="prompt_cost_per_1m">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="prompt_cost_per_1m"
                type="number"
                step="0.0001"
                className="pl-7"
                value={config.prompt_cost_per_1m || 0}
                onChange={(e) => onChange(["prompt_cost_per_1m"], parseFloat(e.target.value))}
              />
            </div>
          </ConfigField>
          <ConfigField label="Output Cost (per 1M tokens)" htmlFor="completion_cost_per_1m">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="completion_cost_per_1m"
                type="number"
                step="0.0001"
                className="pl-7"
                value={config.completion_cost_per_1m || 0}
                onChange={(e) => onChange(["completion_cost_per_1m"], parseFloat(e.target.value))}
              />
            </div>
          </ConfigField>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Costs configured here will override any hardcoded defaults and apply to all traces in this project.
        </p>
      </div>
    </ConfigSection>
  );
}
