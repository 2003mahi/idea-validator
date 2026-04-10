import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Sparkles, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();

  // Clear any "Auth Required" toasts when reaching the auth page
  useEffect(() => {
    dismiss();
  }, [dismiss]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome Back!", description: "Successfully logged in." });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ 
              title: "Account Found", 
              description: "This email is already registered. Switching to Sign In mode.",
            });
            setIsLogin(true);
            return;
          }
          throw error;
        }

        toast({ 
          title: "Registration Successful!", 
          description: "Check your email for a confirmation link to activate your account.",
        });
        setIsLogin(true);
        setPassword("");
      }
    } catch (error: any) {
      toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-background">
        <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <nav className="relative z-50 flex h-16 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-lg">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">CrazeCheck</span>
        </Link>
      </nav>

      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-medium">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLogin ? "Enter your email to sign in" : "Enter your email to get started"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 block w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
              />
            </div>
            <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? "Sign In" : "Continue"} <MoveRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
