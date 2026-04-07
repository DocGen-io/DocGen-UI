import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "../lib/api/auth";
import type { LoginRequest, RegisterRequest, User } from "../types";
import { toast } from "sonner";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// Hook to get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authAPI.getMe,
    enabled: !!localStorage.getItem("access_token"),
    retry: false,
  });
}

// Hook for login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      // Invalidate current user query to trigger a refetch of the user data
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success("Login successful!");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
    },
  });
}

// Hook for register mutation
export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authAPI.register(data),
    onSuccess: (user: User) => {
      toast.success("Account created successfully! Please sign in.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
}

// Hook for logout
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    queryClient.clear();
    toast.success("Logged out successfully");
  };
}

// Auth helper functions
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("access_token");
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}
