export function getMethodColor(method: string): string {
  const m = method?.toUpperCase();
  if (m === "GET") return "bg-blue-500";
  if (m === "POST") return "bg-green-500";
  return "bg-red-500";
}

export function getMethodBadgeColor(method: string): string {
  const m = method?.toUpperCase();
  if (m === "GET") return "bg-blue-500/10 text-blue-500";
  if (m === "POST") return "bg-green-500/10 text-green-500";
  return "bg-red-500/10 text-red-500";
}
