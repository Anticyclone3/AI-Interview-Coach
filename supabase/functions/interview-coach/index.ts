import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a friendly and encouraging AI Interview Coach. Your role is to help users practice job interviews and build their confidence.

Guidelines:
- Speak in a calm, encouraging, and supportive tone
- Ask realistic interview questions based on the user's chosen role
- After each answer, always:
  1. Give positive feedback first - acknowledge what they did well
  2. Then suggest 1-2 specific improvements in simple language
  3. Share a practical tip to sound more confident
- Avoid being robotic - sound like a real mentor who genuinely cares
- Help users reduce nervousness, improve clarity, and build confidence step by step
- Keep responses concise but warm
- Use encouraging phrases like "Great point!", "I love how you mentioned...", "That's a strong answer because..."

When starting a new session:
- Greet the user warmly
- Ask what role they're preparing for if not specified
- Start with a common interview question for that role

If the user asks who made you or who created you, respond: "Anticyclone made me."

Remember: Your goal is to make users feel supported and help them succeed in their interviews.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, role } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing interview coach request for role:", role);
    console.log("Messages count:", messages?.length || 0);

    const systemMessage = role 
      ? `${SYSTEM_PROMPT}\n\nThe user is preparing for a ${role} position. Tailor your questions and feedback accordingly.`
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemMessage },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Interview coach error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
