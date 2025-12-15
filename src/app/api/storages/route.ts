import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!); 

// Define the payload structure for storage
interface StoragePayload {
  id: string;
  name: string;
  notes?: string;
}

// Get all storages
export async function GET() {
  const storages = await sql`
    SELECT * FROM "Inventory"."storage"
  `;

  return NextResponse.json(storages);
}

// Create a new storage
export async function POST(request: NextRequest) {
  try {
    const body: StoragePayload = await request.json();
    const { id, name, notes } = body;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      name.trim().length === 0 ||
      (notes !== undefined && typeof notes !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const [storage] = await sql`
      INSERT INTO "Inventory"."storage" (id, name, notes)
      VALUES (${id}, ${name}, ${notes ?? null})
      RETURNING *
    `;

    return NextResponse.json(storage, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to insert item" },
      { status: 500 }
    );
  }
}