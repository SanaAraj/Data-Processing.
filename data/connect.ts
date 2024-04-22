// Import the drizzle function from the drizzle-orm/bun-sqlite package
import { drizzle } from "drizzle-orm/bun-sqlite";

// Import the Database class from bun:sqlite for SQLite database connection
import { Database } from "bun:sqlite";

// Define the path to the SQLite database file
const dbFilePath = "./data/dev.db";

// Create a new instance of the SQLite database using the defined file path
const sqlite = new Database(dbFilePath);

// Use the drizzle function to create a Drizzle ORM instance connected to the SQLite database
const db = drizzle(sqlite);

// Export the Drizzle ORM instance as the default export of the module
export default db;
