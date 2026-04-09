import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import AuthAlert from "@/components/shared/auth-alert";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/hooks/use-auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils";

const RegisterForm = () => {
  const navigate = useNavigate();
  const register = useRegister();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    register.mutate(
      {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  const passwordsMatch =
    formData.password === formData.confirmPassword || !formData.confirmPassword;

  return (
    <CardContent className="pt-8">
      {register.isError && (
        <AuthAlert message={register.error.message} type="Registration" />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              disabled={register.isPending}
              className="bg-muted/20 focus:bg-background transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={register.isPending}
              className="bg-muted/20 focus:bg-background transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            disabled={register.isPending}
            className="bg-muted/20 focus:bg-background transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            disabled={register.isPending}
            className={cn(
              "bg-muted/20 focus:bg-background transition-all",
              !passwordsMatch &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {!passwordsMatch && (
            <p className="text-[11px] text-destructive font-medium">
              Passwords do not match
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 mt-2"
          disabled={register.isPending || !passwordsMatch || !formData.password}
        >
          {register.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm border-t border-border/40 pt-6">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline underline-offset-4 ml-1"
        >
          Sign in
        </Link>
      </div>
    </CardContent>
  );
};

export default RegisterForm;
