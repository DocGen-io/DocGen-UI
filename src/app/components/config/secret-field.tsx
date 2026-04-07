import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface SecretFieldProps {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
  id: string;
}

export function SecretField({
  label,
  value,
  onChange,
  placeholder,
  id,
}: SecretFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShow(!show)}
          className="h-6 w-6 p-0"
        >
          {show ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        </Button>
      </div>
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}
