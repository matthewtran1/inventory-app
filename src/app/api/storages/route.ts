import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); 

interface StoragePayload {
  id: string;
  name: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: StoragePayload = await request.json();
    const { id, name, notes } = body;

    await sql`
        INSERT INTO "Inventory"."storage" (id, name, notes)
  VALUES (${id}, ${name}, ${notes || null})
        `;


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Failed to insert item' }, { status: 500 });
  }
}
