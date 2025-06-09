# Tech Gadget Inventory Manager

A complete inventory management system for tech gadgets with full CRUD operations, admin protection, and a clean dark mode UI.

## Features

- **Category Management**
  - Create, read, update, and delete categories
  - View all items within a category

- **Item Management**
  - Create, read, update, and delete items
  - Assign items to categories
  - Track price and quantity

- **Admin Protection**
  - Password protection for destructive actions
  - Configurable admin password via environment variables

- **User Interface**
  - Clean, modern dark mode design
  - Responsive layout for all devices
  - Animated transitions and hover effects

## Tech Stack

- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Frontend**: EJS templates, Custom CSS
- **Other Tools**: 
  - dotenv (environment configuration)
  - express-validator (form validation)
  - pg (PostgreSQL client)

## Screenshots

_Coming soon_

## Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tech-gadget-inventory.git
   cd tech-gadget-inventory
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/tech_gadget_inventory
   ADMIN_PASSWORD=your_secure_password
   PORT=3000
   ```

4. Create the PostgreSQL database:
   ```
   createdb tech_gadget_inventory
   ```

5. Initialize the database:
   ```
   psql tech_gadget_inventory < db/init.sql
   ```

6. Seed the database with initial data:
   ```
   node scripts/seed.js
   ```

7. Start the application:
   ```
   npm start
   ```

   Or for development with auto-reload:
   ```
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:3000`

## Deployment on Render

1. Create a new Web Service on Render
2. Link your GitHub repository
3. Configure the following settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following environment variables:
   - `DATABASE_URL` (from your Render PostgreSQL instance)
   - `ADMIN_PASSWORD` (your secure admin password)
   - `NODE_ENV=production`

## Admin Access

To perform destructive actions (delete/update), use the admin password you configured in your `.env` file.

## License

MIT

## Author

Made with ❤ by [bit2swaz](https://github.com/bit2swaz) 