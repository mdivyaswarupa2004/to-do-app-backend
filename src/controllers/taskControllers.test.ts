import { getAllTasks, createTask, updateTask, removeTask } from "../controllers/taskController";
import * as taskService from "../services/taskService";

jest.mock("../services/taskService");
describe("Task Controller tests", () => {
    let req: any;
    let res: any;
    beforeEach(() => {
        req = { body: {}, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
    });
    describe("getAllTasks", () => {
        it("should return all tasks", async () => {
            const tasks = [
                { id: "1", name: "meditation", description: "10 minutes breathing", status: "Completed", priority: "High", deadline: "2026-01-05" },
                { id: "2", name: "Listen to songs", description: "peacefullness", status: "Pending", priority: "Low", deadline: "2026-01-06" }
            ];
            (taskService.getTasks as jest.Mock).mockResolvedValue(tasks);
            await getAllTasks(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tasks);
        });
        it("should handle errors", async () => {
            (taskService.getTasks as jest.Mock).mockRejectedValue(new Error("error"));
            await getAllTasks(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Failed to fetch tasks" });
        });
    });
    describe("createTask", () => {
        it("should create a new task", async () => {
            const newTask = { name: "Practice guitar", description: "Learn guitar", status: "Pending", priority: "Medium", deadline: "2026-01-10" };
            req.body = newTask;
            (taskService.addTask as jest.Mock).mockResolvedValue({ id: "3", ...newTask });
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: "3", ...newTask });
        });
        it("should handle errors", async () => {
            req.body = { name: "Dance practice" };
            (taskService.addTask as jest.Mock).mockRejectedValue(new Error("save failed"));
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Failed to create task" });
        });
    });
    describe("updateTask", () => {
        it("should update a task", async () => {
            const updated = { id: "1", name: "Evening meditation", description: "20 minutes", status: "Completed", priority: "High", deadline: "2026-01-05" };
            req.params.id = "1";
            req.body = { name: "Evening meditation", description: "20 minutes" };
            (taskService.updateTaskById as jest.Mock).mockResolvedValue(updated);
            await updateTask(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updated);
        });
        it("should return 404 when task not found", async () => {
            req.params.id = "5";
            req.body = { name: "Singing" };
            (taskService.updateTaskById as jest.Mock).mockResolvedValue(null);
            await updateTask(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });
        });
    });
    describe("removeTask", () => {
        it("should delete a task", async () => {
            req.params.id = "1";
            (taskService.deleteTaskById as jest.Mock).mockResolvedValue(true);
            await removeTask(req, res);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
        it("should return 404 when task not found", async () => {
            req.params.id = "50";
            (taskService.deleteTaskById as jest.Mock).mockResolvedValue(false);
            await removeTask(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });
        });
        it("should handle errors", async () => {
            req.params.id = "1";
            (taskService.deleteTaskById as jest.Mock).mockRejectedValue(new Error("delete failed"));
            await removeTask(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Failed to delete task" });
        });
    });
});