import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const {
  NEO4J_URI,
  NEO4J_USER, // Using NEO4J_USER to match your .env file
  NEO4J_PASSWORD,
} = process.env;

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) {
  throw new Error('Missing Neo4j connection details in .env file. Please check NEO4J_URI, NEO4J_USER, and NEO4J_PASSWORD.');
}

const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

export const getDriver = () => driver;

export const closeDriver = () => driver.close();