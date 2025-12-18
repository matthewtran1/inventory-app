import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); 

// Get expiring items
export async function GET() {
  const expiring_items = await sql`
    SELECT 
      i."name",
      s."name" AS storage,
      i."entered_date",
      i."expired_date",
      (i."expired_date"::date - CURRENT_DATE) AS days_until_expiry
    FROM "Inventory"."items" i
    JOIN "Inventory"."storage" s 
      ON i."storage_id" = s."id"
    WHERE i."expired_date"::date <= CURRENT_DATE + INTERVAL '5 days'
    ORDER BY i."expired_date"::date ASC;

    `;
 
  return NextResponse.json(expiring_items);
}
