import { Input } from "../ui/input";
import { Sparkles, RotateCcw, Code as CodeIcon, Eye } from "lucide-react";
import { SecretField } from "./secret-field";
import { ConfigSection } from "./config-section";
import { ConfigField } from "./config-field";

interface GeneratorConfigFormProps {
  config: any;
  onChange: (path: string[], value: any) => void;
}

export function GeneratorConfigForm({
  config,
  onChange,
}: GeneratorConfigFormProps) {
  return (
    <ConfigSection 
      title="AI Generators (LLMs)" 
      description="Configure the models used for code analysis and documentation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gemini */}
        <div className="space-y-4 border p-4 rounded-xl bg-primary/5 border-primary/10">
          <h4 className="font-bold flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" /> Google Gemini
          </h4>
          <ConfigField label="Model Name">
            <Input
              value={config.generators?.gemini?.model || ""}
              onChange={(e) =>
                onChange(["generators", "gemini", "model"], e.target.value)
              }
            />
          </ConfigField>
          <div className="grid grid-cols-2 gap-2">
            <ConfigField label="Location">
              <Input
                value={config.generators?.gemini?.location || ""}
                onChange={(e) =>
                  onChange(
                    ["generators", "gemini", "location"],
                    e.target.value,
                  )
                }
              />
            </ConfigField>
            <ConfigField label="Project ID">
              <Input
                value={config.generators?.gemini?.project_id || ""}
                onChange={(e) =>
                  onChange(
                    ["generators", "gemini", "project_id"],
                    e.target.value,
                  )
                }
              />
            </ConfigField>
          </div>
        </div>

        {/* Ollama */}
        <div className="space-y-4 border p-4 rounded-xl bg-orange-500/5 border-orange-500/10">
          <h4 className="font-bold flex items-center gap-2 text-orange-500">
            <RotateCcw className="w-4 h-4" /> Local Ollama
          </h4>
          <ConfigField label="Server URL">
            <Input
              value={config.generators?.ollama?.url || ""}
              onChange={(e) =>
                onChange(["generators", "ollama", "url"], e.target.value)
              }
            />
          </ConfigField>
          <ConfigField label="Local Model">
            <Input
              value={config.generators?.ollama?.model || ""}
              onChange={(e) =>
                onChange(["generators", "ollama", "model"], e.target.value)
              }
            />
          </ConfigField>
        </div>

        {/* OpenAI */}
        <div className="space-y-4 border p-4 rounded-xl bg-emerald-500/5 border-emerald-500/10">
          <h4 className="font-bold flex items-center gap-2 text-emerald-500">
            <CodeIcon className="w-4 h-4" /> OpenAI / GPT-4
          </h4>
          <SecretField
            id="openai_api_key"
            label="API Key"
            value={config.openai_api_key}
            onChange={(val) => onChange(["openai_api_key"], val)}
          />
          <ConfigField label="Default Model">
            <Input
              placeholder="gpt-4-turbo"
              value={config.generators?.openai?.model || ""}
              onChange={(e) =>
                onChange(["generators", "openai", "model"], e.target.value)
              }
            />
          </ConfigField>
        </div>

        {/* Anthropic */}
        <div className="space-y-4 border p-4 rounded-xl bg-purple-500/5 border-purple-500/10">
          <h4 className="font-bold flex items-center gap-2 text-purple-500">
            <Eye className="w-4 h-4" /> Anthropic / Claude
          </h4>
          <SecretField
            id="anthropic_api_key"
            label="API Key"
            value={config.anthropic_api_key}
            onChange={(val) => onChange(["anthropic_api_key"], val)}
          />
        </div>
      </div>
    </ConfigSection>
  );
}
