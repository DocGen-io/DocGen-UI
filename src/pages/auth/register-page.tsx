import { Card,  CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {  UserPlus } from 'lucide-react';
import RegisterForm from '@/components/pages/auth/register-form';

export function RegisterPage() {
  


  return (
    <Card className="border-border/60 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-3 pb-8 text-center pt-8 bg-muted/20">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-3xl font-bold tracking-tight">Join DocGen</CardTitle>
          <CardDescription className="text-base mt-2">
            Start automating your documentation today
          </CardDescription>
        </div>
      </CardHeader>
      
      <RegisterForm/>   
    </Card>
  );
}
