
import React, { FC } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';


interface AuthAlertProps {
  message: string;
  type?:'Authentication' | 'Registration'
}
const AuthAlert:FC<AuthAlertProps> = ({ message,type }) => {
    return (
              <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{type || 'Authentication'} Failed</AlertTitle>
            <AlertDescription>
              {message || "Invalid username or password. Please try again."}
            </AlertDescription>
          </Alert>
    );
}

export default AuthAlert;
