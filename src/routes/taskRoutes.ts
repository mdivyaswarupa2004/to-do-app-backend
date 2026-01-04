import { Router } from "express";
import { getAllTasks, createTask, updateTask, removeTask } from "../controllers/taskController";
import { validateCreateTask, validateUpdateTask } from "../middlewares/taskValidation";

const router = Router();
router.get("/", getAllTasks);
router.post("/", validateCreateTask, createTask);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", removeTask);

export default router;