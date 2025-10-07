import { pool } from "../config/database.js";

async function getEvents(req, res) {
  try {
    const results = await pool.query("SELECT * FROM events");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

async function getEventById(req, res) {
  try {
    const results = await pool.query("SELECT * FROM events where id=$1", [
      req.params.id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

async function getEventsByLocation(req, res) {
  try {
    const results = await pool.query(
      "SELECT * FROM events where location_id=$1",
      [req.params.id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

export default { getEvents, getEventById, getEventsByLocation };
