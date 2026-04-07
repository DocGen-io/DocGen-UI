import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { ConfigSection } from "./config-section";
import { ConfigField } from "./config-field";

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
    </ConfigSection>
  );
}
