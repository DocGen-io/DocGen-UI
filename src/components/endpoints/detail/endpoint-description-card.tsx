import { useState } from "react";

export function EndpointDescriptionCard({ description }: { description?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!description) return null;

  return (
    <section className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 border-b border-border/40 pb-2">Description</h3>
      <div className="flex flex-col gap-1 items-start">
        <p className={`text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap ${isExpanded ? "" : "line-clamp-4"}`}>
          {description}
        </p>
        {description.length > 250 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-xs font-semibold text-primary hover:underline mt-2"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </section>
  );
}
