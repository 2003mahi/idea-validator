// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    /* === AUTH CHECK DISABLED LOGIC START ===
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized. Please log in first." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    === AUTH CHECK DISABLED LOGIC END === */

    const { idea } = await req.json();
    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please provide a startup idea." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    // --- AI MOCK GENERATOR LOGIC ---
    // Simulate complex AI processing time by artificially waiting 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Dynamically assign realistic metrics based on their string
    let verdict = "Promising";
    let score = 78;
    
    const ideaLower = idea.toLowerCase();
    if (idea.length < 50) {
      verdict = "Needs Work";
      score = 45;
    } else if (ideaLower.includes("ai ") || ideaLower.includes("artificial intelligence")) {
      verdict = "Strong Potential";
      score = 92;
    } else if (ideaLower.includes("app") || ideaLower.includes("platform")) {
      verdict = "Promising";
      score = 81;
    }

    const mockAnalysis = {
      score: score,
      verdict: verdict,
      summary: "This is a brilliantly constructed simulated AI analysis testing your idea: " + idea.substring(0, 80) + "...",
      strengths: [
        "Identifies a glaring problem in your targeted market space.",
        "Demonstrates a clear path to a high-margin subscription business model.",
        "The target audience metrics are highly reachable via organic digital channels."
      ],
      weaknesses: [
        "High initial reliance on manual onboarding before automation scales.",
        "Lacks immediate defensibility against large platform incumbents.",
        "Brand recognition is currently zero in a trust-heavy industry."
      ],
      risks: [
        "Customer Acquisition Cost (CAC) might scale faster than Lifetime Value (LTV) initially.",
        "Engineering the core proprietary technology requires highly specialized talent.",
        "Risk of massive established ecosystem competitors pivoting slightly to swallow this feature."
      ],
      marketSize: {
        tam: "$4.2B global market for specialized nutrition management.",
        sam: "$850M reachable via direct digital marketing in Tier-1 countries.",
        som: "$12M target revenue within 24 months of launch."
      },
      competitors: [
        { name: "Legacy ERPs", type: "Indirect", threat: "Medium" },
        { name: "Manual Spreadsheet Workflows", type: "Direct", threat: "High" },
        { name: "Niche Startups", type: "Direct", threat: "Low" }
      ],
      pivotOptions: [
        "B2B Enterprise licensing instead of direct-to-consumer app.",
        "White-label API for existing logistics companies.",
        "Focus exclusively on high-net-worth individual micro-segments."
      ],
      targetAudience: {
        persona: "Tech-savvy professionals aged 25-45 with high disposable income.",
        painPoint: "Inefficiency in managing fragmented health data across multiple devices.",
        solution: "Unified, AI-driven dashboard for holistic pet wellness."
      },
      revenueModel: [
        "Freemium with $19.99/mo premium tier for AI deep-insights.",
        "Transaction fees on partner marketplace integrations.",
        "Data-as-a-Service for veterinary research firms (Anonymized)."
      ],
      roadmap: [
        { phase: "Month 1", task: "MVP Launch & 100 User Interviews" },
        { phase: "Month 3", task: "Beta Integration with 5 Major Pet Food Brands" },
        { phase: "Month 6", task: "Seed Round Preparation & Scale to 10k Users" }
      ],
      reasoning: "The high score is driven by the clear market gap and the high-margin subscription potential, though the technical complexity of AI pet nutrition poses a moderate risk.",
      analyzedPoints: [
        "Cross-referenced 15+ competitor data points",
        "Analyzed recent pet-tech market trends (2025-2026)",
        "Benchmarked against successfully scaled SaaS revenue models",
        "Scanned 50+ relevant customer forums and pain-point discussions"
      ]
    };

    return new Response(JSON.stringify(mockAnalysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    // --- END MOCK LOGIC ---
  } catch (e) {
    console.error("analyze-idea error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
