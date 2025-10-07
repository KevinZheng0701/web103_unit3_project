import express from "express";
import EventController from "../controllers/events.js";

const router = express.Router();

router.get("/", EventController.getEvents);
router.get("/:id", EventController.getEventById);
router.get("/location/:id", EventController.getEventsByLocation);

export default router;
