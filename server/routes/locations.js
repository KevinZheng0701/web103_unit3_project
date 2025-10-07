import express from "express";
import LocationController from "../controllers/locations.js";

const router = express.Router();

router.get("/", LocationController.getLocations);
router.get("/:id", LocationController.getLocationById);

export default router;
