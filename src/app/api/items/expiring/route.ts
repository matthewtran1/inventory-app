import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); 

// Get expiring items
export async function GET() {
  const expiring_items = await sql`
    SELECT i."name", s."name" AS storage, i."entered_date", i."expired_date"
    FROM "Inventory"."items" i
    JOIN "Inventory"."storage" s ON i."storage_id" = s."id"
    WHERE i."expired_date"::date <= (i."entered_date"::date + INTERVAL '5 days')
    AND i."expired_date"::date >= i."entered_date"::date
    ORDER BY i."expired_date"::date ASC
    `;
 
  return NextResponse.json(expiring_items);
}
