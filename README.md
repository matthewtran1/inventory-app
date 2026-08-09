# Inventory App

A personal project I built to track household inventory across multiple locations, with an LLM-powered recipe generator that suggests meals based on what's actually in stock.

**Live demo:** [k-delta-ashen.vercel.app](https://k-delta-ashen.vercel.app)

## What it does

- Tracks items across different household locations (pantry, fridge, etc.)
- Flags low-stock items so nothing runs out unnoticed
- Surfaces items nearing their expiration date on a dedicated dashboard
- Generates recipe suggestions from current inventory using an LLM, so you can see what you can actually cook without shopping first

## How it's built

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Database:** Neon (serverless PostgreSQL)
- **Recipes:** LangChain orchestrating calls to the Groq API (`llama-3.1-8b-instant`) to generate recipes constrained to the ingredients currently in inventory, with clear separation between available vs. missing ingredients per recipe

The API layer is built with Next.js route handlers, covering CRUD operations for inventory items, low-stock and expiration queries, and the recipe generation endpoint. See [`src/app/api/recipes/route.ts`](./src/app/api/recipes/route.ts) for the Groq/LangChain integration specifically, the prompt is constrained to avoid inventing ingredients and to return structured JSON the frontend can render directly.
