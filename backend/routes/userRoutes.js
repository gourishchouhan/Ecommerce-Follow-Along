import express from "express"
import { signup, login } from "../controllers/userController.js"
import { validateLoginInput } from "../middlewares/validateInput.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", validateLoginInput, login)

export default router

