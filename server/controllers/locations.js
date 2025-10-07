import { pool } from "../config/database.js";

async function getLocations(req, res) {
  try {
    const results = await pool.query("SELECT * FROM locations");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

async function getLocationById(req, res) {
  try {
    const results = await pool.query("SELECT * FROM locations where id=$1", [
      req.params.id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

export default { getLocations, getLocationById };
