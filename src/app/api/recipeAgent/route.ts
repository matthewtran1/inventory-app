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

    // Get items
    const items = await sql`
      SELECT name
      FROM "Inventory"."items"
      WHERE expired_date IS NULL 
      OR expired_date = '' 
      OR expired_date::date >= CURRENT_DATE;
    `;


    // Prepare prompt
    const ingredientNames = items.map((item) => item.name.toLowerCase());
    
    // sends no recipes
    if (ingredientNames.length === 0) {
        // No ingredients, no need to query LLM
        
        return NextResponse.json({ recipes: [] })
    }

    const prompt = `
      Important:
      - If the list of ingredients I already have is empty, do NOT generate any recipes.
      - Return literally: {"recipes": []}.
      - Do NOT make up ingredients or recipes.

      You are an average home cook making quick, simple meals.
      Think weeknight dinners, minimal prep, and basic cooking skills.

      Ingredients I already have (available in my kitchen):
      ${ingredientNames.join(", ")}

      Instructions:
      1. Generate 5 easy recipes most people could make at home.
      2. In the "ingredients" field, list ONLY the ingredients the user already has. 
      3. In the "missingIngredients" field, list only ingredients required by the recipe that are NOT in the available list above.
      4. Do NOT put any available ingredients in "missingIngredients".
      5. Ignore nonsense or test ingredients that are not real food items.
      6. Make the instructions very detailed so a beginner cook can easily follow each step.
      7. Only include meals that can be made with beginner-friendly equipment (pans, pots, air fryer, oven, etc.). Do NOT include recipes that require a grill or advanced appliances.
      8. Return ONLY JSON in this format:

      {
        "recipes": [
          {
            "name": "Recipe Name",
            "ingredients": ["ingredient1", "ingredient2", ...],
            "missingIngredients": ["Missing ingredient1", ...],
            "prepTime": "15 mins",
            "difficulty": "Easy",
            "instructions": {
              "step1": "Do this first",
              "step2": "Do this next",
              "step3": "Finish with this"
            }
          }
        ]
      }

      Important:
      - All strings must be properly escaped so the JSON can be parsed.
      - Do NOT include any text outside the JSON object.
      - Only include ingredients from the user's inventory in the "ingredients" field. 
      - Do not add, invent, or guess any other ingredients.
      `;

    // Send prompt to agent
    const response = await agent.invoke({
      messages: [{ role: "user", content: prompt }],
    });
    //console.log(response)

    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate recipes" },
      { status: 500 }
    );
  }
}
