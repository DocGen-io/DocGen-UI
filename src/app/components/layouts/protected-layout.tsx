import { Navigate } from "react-router";
import { isAuthenticated } from "../../hooks/use-auth";
import { Suspense } from "react";
import { AppLayout } from "./app-layout";
import PageLoader from "../shared/page-loader";

// Protected Route Layout Component
export default function ProtectedLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
      <Suspense fallback={<PageLoader />}>
          <AppLayout/>
      </Suspense>
  );
}