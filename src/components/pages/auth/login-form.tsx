import { Link, useNavigate } from 'react-router';
import { Loader2, AlertCircle, LogIn } from 'lucide-react';
import { useLogin } from '@/hooks/use-auth';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AuthAlert from '@/components/shared/auth-alert';
import { useTeamStore } from '@/stores/team-store';

const LoginForm = () => {
  const navigate = useNavigate();
  const setActiveTeam = useTeamStore((state) => state.setActiveTeam);
  const login = useLogin();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard');
        setActiveTeam(null)
      },
    });
  };
  return (
    <CardContent className="pt-8">
      {login.isError && (
        < AuthAlert message={login.error.message} type="Authentication" />
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            disabled={login.isPending}
            className="h-11 bg-muted/20 focus:bg-background transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={login.isPending}
            className="h-11 bg-muted/20 focus:bg-background transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20"
          disabled={login.isPending}
        >
          {login.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      <div className="mt-8 text-center text-sm border-t border-border/40 pt-6">
        <span className="text-muted-foreground">Don't have an account?</span>{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline underline-offset-4 ml-1">
          Create an account
        </Link>
      </div>
    </CardContent>
  );
}

export default LoginForm;
