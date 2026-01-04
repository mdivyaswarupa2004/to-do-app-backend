import { Request, Response, NextFunction } from "express";
import { TaskStatus } from "../types/taskTypes";
import { TaskPriority } from "../types/taskTypes";

const validStatuses: TaskStatus[] = ["Pending", "In-Progress", "Completed"];
const validPriorities: TaskPriority[] = ["Low", "Medium", "High"];
export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
    const { name, status, priority } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Task name is required" });
    }
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority" });
    }
    next();
};
export const validateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
    const { name, status, priority } = req.body;
    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
        return res.status(400).json({ error: "Task name cannot be empty" });
    }
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority" });
    }
    next();
};