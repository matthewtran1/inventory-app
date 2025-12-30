import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); 

interface ItemPayload {
  id?: number;
  storage_id: string;
  name: string;
  entered_date?: string;
  expired_date?: string;
  notes?: string;
  amount?: number;
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
    const { storage_id, name, amount, entered_date, expired_date, notes } = body;
    
    //  type checking
    if (
      typeof storage_id !== "string" ||
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

    // [] is array destructuring to get first item from returned rows
    /*
    const arr = [10, 20, 30];
    const [first] = arr;
    console.log(first); // 10
    */
    const [item] = await sql`
      INSERT INTO "Inventory"."items"
        (storage_id, name, entered_date, expired_date, notes, amount)
      VALUES
        (${storage_id}, ${name}, ${entered_date ?? null}, ${expired_date ?? null}, ${notes ?? null}, ${amount ?? 100})
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

// update an item
export async function PATCH(request: NextRequest) {
  try {
    const body: ItemPayload = await request.json();
    const { id, storage_id, name, entered_date, expired_date, notes, amount } = body;
    
    //  type checking
    if (
      typeof id !== "number" ||
      typeof amount !== "number" ||
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

    // [] is array destructuring to get first item from returned rows
    /*
    const arr = [10, 20, 30];
    const [first] = arr;
    console.log(first); // 10
    */
    const [item] = await sql`
      UPDATE "Inventory"."items"
      SET name = ${name}, amount = ${amount ?? 100}, entered_date = ${entered_date ?? null}, expired_date = ${expired_date ?? null}, notes = ${notes ?? null}
      WHERE id = ${id} AND storage_id = ${storage_id}
      RETURNING *
    `;
    return NextResponse.json(item, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: ItemPayload = await request.json();
    const { id, storage_id} = body;

    const [item] = await sql`
      DELETE FROM "Inventory"."items"
      WHERE id = ${id} AND storage_id = ${storage_id}
      RETURNING *
    `;
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item, { status: 200 });
    
  }

  catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}