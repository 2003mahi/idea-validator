import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, FileText, BarChart3, TrendingUp, Compass, LogOut, Loader2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AnalysisResults, { type IdeaAnalysis } from "@/components/landing/AnalysisResults";

const Dashboard = () => {
  const [validations, setValidations] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const [{ data: prof }, { data: vals }] = await Promise.all([
          // @ts-ignore - Tables are not yet synced to types.ts
          supabase.from("profiles").select("*").eq("id", user.id).single(),
          // @ts-ignore - Tables are not yet synced to types.ts
          supabase.from("validations").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
        ]);

        setProfile(prof);
        setValidations(vals || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 px-6 py-8">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">CrazeCheck</span>
        </Link>
        
        <nav className="space-y-4 text-sm font-medium">
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 px-4 py-2.5 text-primary">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground">
            <FileText className="h-4 w-4" />
            My Ideas
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground">
            <Compass className="h-4 w-4" />
            Explore Trends
          </button>
        </nav>

        <div className="absolute bottom-8">
          <button onClick={handleSignOut} className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your startup ideas.</p>
          </div>
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            New Validation
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Total Ideas Evaluated</p>
            <p className="mt-2 font-display text-4xl font-bold text-foreground">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : validations.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Average Viability Score</p>
            <p className="mt-2 font-display text-4xl font-bold text-emerald-500">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : validations.length > 0 ? Math.round(validations.reduce((a, b) => a + b.score, 0) / validations.length) : "--"}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/50 transition-colors cursor-pointer group">
            <p className="text-sm font-medium text-primary">Upgrade Status</p>
            <p className="mt-2 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : profile?.is_pro ? "Pro Tier ✨" : "Free Tier"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {profile?.is_pro ? "You have unlimited insights!" : "Click to view Pro benefits"}
            </p>
          </div>
        </div>

        {/* Ideas Table */}
        <div className="mt-12 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="border-b border-border px-6 py-5 bg-secondary/10">
            <h2 className="font-semibold text-foreground">Recent Validations</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : validations.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No recent validations found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Head back to the home page to test an idea.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {validations.map((val) => (
                <div key={val.id} className="p-6 transition-colors hover:bg-secondary/10 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-8">
                      <h4 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">{val.idea_text}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{new Date(val.created_at).toLocaleDateString()} at {new Date(val.created_at).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${val.score >= 70 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          Score: {val.score}
                        </span>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                            <Eye className="h-4 w-4" /> View Report
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none">
                          <AnalysisResults data={val.result_json as unknown as IdeaAnalysis} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
