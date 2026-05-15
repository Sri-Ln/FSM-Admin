import { Navigate } from 'react-router-dom';
import { PaintBucket } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (session) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <PaintBucket className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">PaintMarket Admin</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-center text-sm text-muted-foreground">
            Auth UI — wire up Supabase Auth here.
          </p>
        </div>
      </div>
    </div>
  );
}
