export type DiffLineType = "add" | "remove" | "context" | "header";

export const getLineType = (line: string): DiffLineType => {
  if (line.startsWith("+")) return "add";
  if (line.startsWith("-")) return "remove";
  if (line.startsWith("@@")) return "header";
  return "context";
};

export const getLineClass = (type: DiffLineType): string => {
  switch (type) {
    case "add":
      return "bg-success/10 text-success-foreground border-l-2 border-success";
    case "remove":
      return "bg-destructive/10 text-destructive-foreground border-l-2 border-destructive";
    case "header":
      return "bg-muted text-muted-foreground font-semibold";
    default:
      return "text-foreground/70";
  }
};
