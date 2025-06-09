const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  // Try different connection approaches
  const connectionStrings = [
    process.env.DATABASE_URL,
    'postgres:///tech_inventory',
    `postgres://${process.env.USER}@localhost:5432/tech_inventory`
  ];

  for (const connectionString of connectionStrings) {
    console.log(`Trying connection string: ${connectionString}`);
    
    const client = new Client({ connectionString });
    
    try {
      await client.connect();
      console.log('Connected successfully!');
      
      // Test a simple query
      const result = await client.query('SELECT current_timestamp');
      console.log('Current timestamp:', result.rows[0].current_timestamp);
      
      await client.end();
      console.log('Connection closed');
      
      // If we get here, the connection worked
      console.log('✅ Use this connection string:', connectionString);
      return connectionString;
    } catch (error) {
      console.error('Connection failed:', error.message);
      await client.end().catch(() => {});
    }
  }
  
  console.error('❌ All connection attempts failed');
  return null;
}

testConnection().then(connectionString => {
  if (connectionString) {
    console.log('\nUpdate your .env file with:');
    console.log(`DATABASE_URL=${connectionString}`);
  } else {
    console.log('\nPlease check your PostgreSQL installation and credentials');
  }
}); 