# VidaFarma Project Context

## Project Overview
**VidaFarma** is a web application for a pharmacy and perfumery located in Pedro Juan Caballero, Paraguay. It functions as an e-commerce platform allowing users to browse products, manage a cart, and interact with an AI assistant.

## Tech Stack
*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** TypeScript (primary), JavaScript (services)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) components.
*   **Database:** PostgreSQL (using `pg` driver).
*   **AI:** Google Gemini 2.0 Flash (via `@google/genai` SDK).
*   **State Management:** React Context (`CartContext`).

## Key Directories & Files

### `/app`
Contains the application routes and pages (App Router).
*   `layout.tsx`: Root layout including `Navbar`, `Footer`, `Assistant`, and `CartDrawer`.
*   `page.tsx`: Landing page.
*   `api/`: Backend API routes (`products`, `categories`).
*   `globals.css`: Global styles and Tailwind directives.

### `/components`
UI components, including both shared UI elements and feature-specific components.
*   `Assistant.tsx`: Chat interface for the Gemini-powered AI assistant.
*   `CartDrawer.tsx`: Sidebar for managing the shopping cart.
*   `ui/`: Reusable primitive components (likely shadcn/ui).

### `/services`
Business logic and data fetching layers.
*   `geminiService.ts`: Integration with Google Gemini API. Handles chat history and system instructions using product context.
*   `productService.js` / `categoryService.js`: Database interaction logic.

### `/db`
Database configuration.
*   `database.sql`: Schema definition and seed data for `products`, `categories`, and `subcategories`.

## Data Models
(Inferred from `db/database.sql` and `types.ts`)
*   **Product:** ID, name, price, description, category, images, features.
*   **Category:** Name, sort order, subcategories.

## Setup & Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file with the following keys:
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    DATABASE_URL=your_postgres_connection_string
    ```

3.  **Database Setup:**
    Run the SQL script in `db/database.sql` against your PostgreSQL instance to create tables and seed data.

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

5.  **Build:**
    ```bash
    npm run build
    ```

## Development Conventions
*   **Styling:** Utility-first using Tailwind CSS.
*   **Components:** Modular, following shadcn/ui patterns where applicable.
*   **AI Integration:** The AI assistant is context-aware, loaded with product data to answer user queries specifically about the store's inventory.
