# Tech Gadget Inventory

A comprehensive inventory management system for tech gadgets built with Express.js, EJS, and PostgreSQL.

## Features

- **Express.js** backend with structured MVC architecture
- **EJS** templating for dynamic views
- **PostgreSQL** database with proper relationships
- **Full CRUD Operations** for categories and items
- **Admin Authentication** system for protected actions
- **Responsive Design** that works on all devices
- **Dark/Light Theme** with system preference detection
- **Smooth Animations** with CSS transitions
- **SEO Optimized** with proper metadata

## Live Demo

Visit [https://tech-inventory.onrender.com](https://tech-inventory.onrender.com) to see the application in action.

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bit2swaz/inventory-app.git
   cd inventory-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your database credentials and settings
   nano .env  # or use your preferred editor
   ```

4. Set up PostgreSQL
   - Make sure PostgreSQL is installed and running
   - Create a new database: `createdb tech_inventory` (or use pgAdmin)
   - Initialize the database schema: `npm run init-db`
   - Seed the database with sample data: `npm run seed-db`
   - Alternatively, run both steps with: `npm run setup-db`

5. Start the application
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Admin Access

The application includes an admin area for managing inventory:

1. Default admin credentials are in your `.env` file (`ADMIN_PASSWORD`)
2. Navigate to `/admin/auth` or click on "Admin Login" to access the admin area
3. After logging in, you'll have access to create, update, and delete functionality

## Project Structure

- `app.js` - Main application entry point
- `bin/www` - Server startup script
- `views/` - EJS templates
  - `partials/` - Reusable template components
- `public/` - Static assets (CSS, JS, images)
- `routes/` - Express routes
- `controllers/` - Route controllers
- `middleware/` - Custom middleware (auth, etc.)
- `db/` - Database configuration and models
  - `db/index.js` - Database connection
  - `db/init.sql` - Database schema
  - `db/models/` - Data models
- `scripts/` - Utility scripts

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
- `added_at` - Timestamp with default current_timestamp

## Deployment

### Deploying to Render

This repository includes a `render.yaml` file for easy deployment to [Render](https://render.com):

1. Fork this repository to your GitHub account
2. Create a new account on Render if you don't have one
3. Click "New" and select "Blueprint" from the Render dashboard
4. Connect your GitHub account and select your forked repository
5. Render will automatically detect the `render.yaml` configuration
6. Click "Apply" to deploy the web service and PostgreSQL database
7. Once deployed, set your admin password in the Render dashboard:
   - Go to your web service -> Environment
   - Set `ADMIN_PASSWORD` to a secure value

### Manual Deployment

You can also deploy to any platform that supports Node.js and PostgreSQL:

1. Set up a PostgreSQL database
2. Set environment variables for your platform
3. Build and start the application
   ```bash
   npm install
   npm start
   ```

## License

ISC

## Author

[bit2swaz](https://github.com/bit2swaz) 