import express from "express"
import {
 createEarning,
 getUserEarnings,
 getAllEarnings,
 updateEarningStatus,
 deleteEarning
} from "../controllers/earningsController.js"
import protect from "../middleware/auth.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/", protect, adminMiddleware, createEarning)

router.get("/my", protect, getUserEarnings)

router.get("/", protect, adminMiddleware, getAllEarnings)

router.put("/:id", protect, adminMiddleware, updateEarningStatus)

router.delete("/:id", protect, adminMiddleware, deleteEarning)

export default router