import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../../hooks/use-auth";
import { Suspense } from "react";
import PageLoader from "../shared/page-loader";
import { AuthLayout } from "./auth-layout";

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
