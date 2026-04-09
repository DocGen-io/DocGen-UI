import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {  LogIn } from 'lucide-react';
import LoginForm from '@/components/pages/auth/login-form';

export function LoginPage() {
  

  return (
    <Card className="border-border/60 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-3 pb-8 text-center pt-8 bg-muted/20">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-base mt-2">
            Enter your credentials to access your workspace
          </CardDescription>
        </div>
      </CardHeader>
      
     <LoginForm/>
    </Card>
  );
}
