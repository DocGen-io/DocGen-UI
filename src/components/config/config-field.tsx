import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface ConfigFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  description?: string;
}

export function ConfigField({
  label,
  htmlFor,
  children,
  description,
}: ConfigFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {description && (
        <p className="text-[0.7rem] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
