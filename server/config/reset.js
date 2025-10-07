import { pool } from "./database.js";
import locationsData from "../data/locations.js";
import eventsData from "../data/events.js";
import "./dotenv.js";

async function createLocationTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      address VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(50),
      zip VARCHAR(20)
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Location table created!");
  } catch (error) {
    console.log(`Error creating location table: ${error}`);
  }
}

async function seedLocationsTable() {
  try {
    for (const location of locationsData) {
      const insertQuery =
        "INSERT INTO locations (id, name, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [
        location.id,
        location.name,
        location.address,
        location.city,
        location.state,
        location.zip,
      ];
      await pool.query(insertQuery, values);
      console.log(`✅ ${location.name} added successfully`);
    }
  } catch (error) {
    console.error("⚠️ error inserting location", error);
  }
}

async function createEventTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date TIMESTAMP NOT NULL,
      image VARCHAR(255) NOT NULL,
      location_id INT REFERENCES locations(id) ON DELETE CASCADE
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Event table created!");
  } catch (error) {
    console.log(`Error creating event table: ${error}`);
  }
}

async function seedEventsTable() {
  try {
    for (const event of eventsData) {
      const insertQuery =
        "INSERT INTO events (id, name, date, location_id, image) VALUES ($1, $2, $3, $4, $5)";
      const values = [
        event.id,
        event.name,
        event.date,
        event.location_id,
        event.image,
      ];
      await pool.query(insertQuery, values);
      console.log(`✅ ${event.name} added successfully`);
    }
  } catch (error) {
    console.error("⚠️ error inserting event", error);
  }
}

async function resetTables() {
  try {
    await pool.query("DROP TABLE IF EXISTS events CASCADE");
    await pool.query("DROP TABLE IF EXISTS locations CASCADE");
    await createLocationTable();
    await seedLocationsTable();
    await createEventTable();
    await seedEventsTable();
  } catch (error) {
    console.log(`Error resetting tables: ${error}`);
  } finally {
    pool.end();
  }
}

await resetTables();
