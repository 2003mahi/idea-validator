import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { idea } = await req.json();
    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please provide a startup idea." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert startup analyst and market researcher. When given a startup idea, provide a structured validation analysis. Return a JSON object with these exact keys:

{
  "score": <number 1-100 representing overall viability>,
  "verdict": "<one of: Strong Potential | Promising | Needs Work | High Risk>",
  "summary": "<2-3 sentence executive summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "marketSize": "<estimated market size description>",
  "competitors": ["<competitor or similar product 1>", "<competitor 2>"],
  "nextSteps": ["<actionable step 1>", "<actionable step 2>", "<actionable step 3>"]
}

Be specific, data-driven where possible, and honest. Do not sugarcoat — founders need real feedback.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this startup idea: "${idea}"` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "deliver_analysis",
              description: "Deliver structured startup idea analysis",
              parameters: {
                type: "object",
                properties: {
                  score: { type: "number", description: "Viability score 1-100" },
                  verdict: { type: "string", enum: ["Strong Potential", "Promising", "Needs Work", "High Risk"] },
                  summary: { type: "string" },
                  strengths: { type: "array", items: { type: "string" } },
                  risks: { type: "array", items: { type: "string" } },
                  marketSize: { type: "string" },
                  competitors: { type: "array", items: { type: "string" } },
                  nextSteps: { type: "array", items: { type: "string" } },
                },
                required: ["score", "verdict", "summary", "strengths", "risks", "marketSize", "competitors", "nextSteps"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "deliver_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-idea error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
