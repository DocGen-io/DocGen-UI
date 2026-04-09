import { Input } from "@/components/ui/input";
import { ConfigSection } from "@/components/config/config-section";
import { ConfigField } from "@/components/config/config-field";

interface RagConfigFormProps {
  config: any;
  onChange: (path: string[], value: any) => void;
}

export function RagConfigForm({ config, onChange }: RagConfigFormProps) {
  return (
    <ConfigSection title="RAG Configuration">
      <ConfigField label="Embedding Model" htmlFor="embedding_model">
        <Input
          id="embedding_model"
          value={config.rag?.embedding_model || ""}
          onChange={(e) => onChange(["rag", "embedding_model"], e.target.value)}
        />
      </ConfigField>

      <div className="grid grid-cols-3 gap-4">
        <ConfigField label="Top K Retriever" htmlFor="top_k_retriever">
          <Input
            id="top_k_retriever"
            type="number"
            value={config.rag?.top_k_retriever || 0}
            onChange={(e) =>
              onChange(["rag", "top_k_retriever"], parseInt(e.target.value))
            }
          />
        </ConfigField>
        <ConfigField label="Top K Reranker" htmlFor="top_k_reranker">
          <Input
            id="top_k_reranker"
            type="number"
            value={config.rag?.top_k_reranker || 0}
            onChange={(e) =>
              onChange(["rag", "top_k_reranker"], parseInt(e.target.value))
            }
          />
        </ConfigField>
        <ConfigField label="Chunk Size" htmlFor="chunk_size">
          <Input
            id="chunk_size"
            type="number"
            value={config.rag?.chunk_size || 0}
            onChange={(e) =>
              onChange(["rag", "chunk_size"], parseInt(e.target.value))
            }
          />
        </ConfigField>
      </div>
    </ConfigSection>
  );
}
