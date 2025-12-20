import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";

const sql = neon(process.env.DATABASE_URL!);

// Groq model
const model = new ChatGroq({
  model: "llama-3.1-8b-instant",
  apiKey: process.env.GROQ_API_KEY!,
});

// Create Agent
const agent = createAgent({
  model
});

// Get recipes
export async function GET() {
  try {
    const items = await sql`
      SELECT name
      FROM "Inventory"."items"
      WHERE
      (
        NULLIF(expired_date, '') IS NOT NULL
        AND NULLIF(expired_date, '')::date >= CURRENT_DATE
      )
      OR
      (
        NULLIF(expired_date, '') IS NULL
        AND entered_date::date >= CURRENT_DATE - INTERVAL '5 days'
      );
    `;

    const ingredientNames = items.map((item) => item.name);

    const prompt = `
      You are an average home cook making quick, simple meals.
      Think weeknight dinners, minimal prep, and basic cooking skills.

      Ingredients you have:
      ${ingredientNames.join(", ")}

      Generate 5 easy recipes most people could make at home.
      Rank them by popularity.

      Return only JSON with recipe name and missing ingredients.
      `;

    // Send prompt to agent
    const response = await agent.invoke({
      messages: [{ role: "user", content: prompt }],
    });
    console.log(response)
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate recipes" },
      { status: 500 }
    );
  }
}
