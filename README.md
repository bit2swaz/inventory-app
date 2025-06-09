# Tech Gadget Inventory

A simple inventory management system for tech gadgets built with Express.js, EJS, and PostgreSQL.

## Features

- Express.js backend
- EJS templating
- PostgreSQL database
- Custom CSS styling
- Organized MVC-like structure

## Installation

1. Clone the repository
   ```
   git clone https://github.com/bit2swaz/inventory-app.git
   cd inventory-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   
   # Database configuration
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tech_inventory
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=tech_inventory
   ```

4. Set up PostgreSQL
   - Make sure PostgreSQL is installed and running
   - Create a new database: `createdb tech_inventory` (or use pgAdmin/another tool)
   - Initialize the database schema: `npm run init-db`
   - Seed the database with sample data: `npm run seed-db`
   - Alternatively, run both steps with: `npm run setup-db`

5. Start the development server
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `views/` - EJS templates
- `public/` - Static assets (CSS, JS, images)
- `routes/` - Express routes
- `controllers/` - Route controllers
- `db/` - Database configuration and models
  - `db/index.js` - Database connection
  - `db/init.sql` - Database schema
  - `db/models/` - Data models
- `scripts/` - Utility scripts
  - `scripts/init-db.js` - Initialize database schema
  - `scripts/seed.js` - Seed database with sample data
- `bin/www` - Server startup script

## Database Schema

### Categories
- `id` - Serial primary key
- `name` - Varchar(100), unique
- `description` - Text

### Items
- `id` - Serial primary key
- `name` - Varchar(100)
- `description` - Text
- `price` - Decimal(10,2)
- `category_id` - Foreign key to categories
- `stock` - Integer
- `added_at` - Timestamp

## License

ISC

## Author

[bit2swaz](https://github.com/bit2swaz) 