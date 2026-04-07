import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ConfigSection } from "./config-section";
import { ConfigField } from "./config-field";

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
            onValueChange={(v) => onChange(["code_analyzer", "active_generator"], v)}
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
            onValueChange={(v) => onChange(["doc_creator", "active_generator"], v)}
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
    </ConfigSection>
  );
}
