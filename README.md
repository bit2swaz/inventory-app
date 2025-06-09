# Tech Gadget Inventory Manager

A full-featured web application for managing tech gadget inventory in a store. Built with Express.js and PostgreSQL.

![Tech Gadget Inventory Manager Screenshot](https://placeholder.com/tech-gadget-inventory-manager.jpg)

## Features

- **Category Management**: Create, view, update, and delete product categories
- **Item Management**: Add, view, update, and delete items with details like price, quantity, and images
- **Admin Protection**: Password protection for destructive actions (delete/update)
- **Responsive Design**: Mobile-friendly interface with modern dark mode styling
- **Database Integration**: PostgreSQL for reliable data storage
- **Form Validation**: Client and server-side validation for data integrity

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **View Engine**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS with responsive design
- **Validation**: express-validator
- **Environment**: dotenv for configuration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/bit2swaz/inventory-app.git
   cd inventory-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a PostgreSQL database:
   ```
   createdb gadget_inventory
   ```

4. Set up environment variables:
   - Create a `.env` file in the project root
   - Add the following variables:
     ```
     DATABASE_URL=postgres://username:password@localhost:5432/gadget_inventory
     PORT=3000
     NODE_ENV=development
     ```
   - Replace `username` and `password` with your PostgreSQL credentials

5. Initialize the database:
   ```
   psql -d gadget_inventory -f db/init.sql
   ```

6. Seed the database with sample data:
   ```
   node scripts/seed.js
   ```

7. Start the application:
   ```
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:3000`

## Admin Password Protection

The application uses a simple password protection system for destructive actions:

- Default admin password: `admin123`
- This password is required when deleting categories or items
- You can change the default password in the `config.js` file

## Deployment

The application is configured for deployment on Render:

1. Create a new PostgreSQL database on Render
2. Create a new Web Service and connect it to your GitHub repository
3. Set the environment variables:
   - `DATABASE_URL`: Your Render PostgreSQL connection string
   - `NODE_ENV`: `production`
4. Set the build command: `npm install`
5. Set the start command: `npm start`

## License

ISC

## Author

Made with ❤ by [bit2swaz](https://github.com/bit2swaz)