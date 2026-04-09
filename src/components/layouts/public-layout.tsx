import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "@/hooks/use-auth";
import { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { AuthLayout } from "@/components/layouts/auth-layout";

// Public Route Layout Component
export default function PublicLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <AuthLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  );
}
