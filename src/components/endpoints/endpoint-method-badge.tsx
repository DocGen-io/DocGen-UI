import { getMethodBadgeColor } from "@/lib/utils/method-utils";

interface EndpointMethodBadgeProps {
  method: string;
}

export function EndpointMethodBadge({ method }: EndpointMethodBadgeProps) {
  return (
    <div
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${getMethodBadgeColor(method)}`}
    >
      {method}
    </div>
  );
}
