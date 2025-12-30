import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Get low items
export async function GET() {
  try {
    const low_items = await sql`
      SELECT "name", "amount" 
      FROM "Inventory"."items"
      WHERE "amount" <= 50
      ORDER BY "amount" ASC
    `;

    return NextResponse.json(low_items);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch low items" },
      { status: 500 }
    );
  }
}
