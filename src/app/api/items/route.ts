import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); 

interface ItemPayload {
  id: string;
  storage_id: string;
  name: string;
  entered_date?: string;
  expired_date?: string;
  notes?: string;
}

// Get all Items
export async function GET() {
  const items = await sql`
    SELECT * FROM "Inventory"."items"
  `;

  return NextResponse.json(items);
}


// Create a new item
export async function POST(request: NextRequest) {
  try {
    const body: ItemPayload = await request.json();
    const { id, storage_id, name, entered_date, expired_date, notes } = body;
    console.log("Received item payload:", body);
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      name.trim().length === 0 ||

      (entered_date !== undefined && typeof entered_date !== "string") ||
      (expired_date !== undefined && typeof expired_date !== "string") ||
      (notes !== undefined && typeof notes !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid item payload" },
        { status: 400 }
      );
    }

    const [item] = await sql`
      INSERT INTO "Inventory"."items"
        (storage_id, name, entered_date, expired_date, notes)
      VALUES
        (${storage_id}, ${name}, ${entered_date ?? null}, ${expired_date ?? null}, ${notes ?? null})
      RETURNING *
    `;

    return NextResponse.json(item, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to insert item" },
      { status: 500 }
    );
  }
}
