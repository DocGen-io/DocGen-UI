import { Input } from "@/components/ui/input";
import { SecretField } from "@/components/config/secret-field";
import { ConfigSection } from "@/components/config/config-section";
import { ConfigField } from "@/components/config/config-field";

interface WeaviateConfigFormProps {
  config: any;
  onChange: (path: string[], value: any) => void;
}

export function WeaviateConfigForm({
  config,
  onChange,
}: WeaviateConfigFormProps) {
  return (
    <ConfigSection title="Weaviate Configuration">
      <ConfigField label="Weaviate URL" htmlFor="weaviate_url">
        <Input
          id="weaviate_url"
          value={config.WEAVIATE_URL || ""}
          onChange={(e) => onChange(["WEAVIATE_URL"], e.target.value)}
        />
      </ConfigField>

      <SecretField
        id="weaviate_api_key"
        label="Weaviate API Key"
        value={config.WEAVIATE_API_KEY}
        onChange={(val) => onChange(["WEAVIATE_API_KEY"], val)}
      />
    </ConfigSection>
  );
}
