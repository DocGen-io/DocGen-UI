import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ConfigSection } from "@/components/config/config-section";
import { ConfigField } from "@/components/config/config-field";

interface PipelineConfigFormProps {
  config: any;
  onChange: (path: string[], value: any) => void;
}

export function PipelineConfigForm({
  config,
  onChange,
}: PipelineConfigFormProps) {
  return (
    <ConfigSection title="Pipeline Strategy">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConfigField label="Active Analyzer Generator">
          <Select
            value={config.code_analyzer?.active_generator}
            onValueChange={(v) =>
              onChange(["code_analyzer", "active_generator"], v)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini">Gemini (Recommended)</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="ollama">Ollama (Local)</SelectItem>
            </SelectContent>
          </Select>
        </ConfigField>
        <ConfigField label="Active Documentation Generator">
          <Select
            value={config.doc_creator?.active_generator}
            onValueChange={(v) =>
              onChange(["doc_creator", "active_generator"], v)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini">Gemini</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="ollama">Ollama</SelectItem>
            </SelectContent>
          </Select>
        </ConfigField>
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between p-4 rounded-xl border border-primary/10 bg-primary/5">
          <div className="space-y-1">
            <h4 className="font-bold text-primary">Automatic Semantic Grouping</h4>
            <p className="text-sm text-primary/60 max-w-lg">
              When enabled, endpoints will be automatically analyzed and grouped into semantic clusters during the documentation pipeline.
            </p>
          </div>
          <Switch
            checked={!!config.process_grouping_automatically}
            onCheckedChange={(checked) =>
              onChange(["process_grouping_automatically"], checked)
            }
          />
        </div>
      </div>
    </ConfigSection>
  );
}
