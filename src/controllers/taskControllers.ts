import { Request, Response } from "express";
import { addTask, getTasks, updateTaskById, deleteTaskById } from "../services/taskService";

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};
export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await addTask(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create task" });
    }
};
export const updateTask = async (req: Request, res: Response) => {
    try {
        const updatedTask = await updateTaskById(req.params.id, req.body);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
};
export const removeTask = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteTaskById(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};