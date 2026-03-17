import request from "supertest";
import express from "express";
import taskRoutes from "../routes/taskRoutes";
import * as taskService from "../services/taskService";

jest.mock("../services/taskService");
const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);
describe("Task Routes Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("GET /tasks", () => {
    it("should get all tasks", async () => {
      const tasks = [
        { id: "1", name: "Meditation", description: "Daily practice", status: "Pending", priority: "High", deadline: "2026-01-05" }
      ];
      (taskService.getTasks as jest.Mock).mockResolvedValue(tasks);
      const response = await request(app).get("/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(tasks);
    });
  });
  describe("POST /tasks", () => {
    it("should create a task", async () => {
      const newTask = { name: "Guitar practice", status: "Pending", priority: "Medium", description: "", deadline: "" };
      (taskService.addTask as jest.Mock).mockResolvedValue({ id: "2", ...newTask });
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Guitar practice");
    });
    it("should reject task without name", async () => {
      const response = await request(app).post("/tasks").send({ status: "Pending" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Task name is required");
    });
    it("should reject invalid status", async () => {
      const response = await request(app).post("/tasks").send({ name: "Dancing", status: "Done" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid status");
    });
  });
  describe("PUT /tasks/:id", () => {
    it("should update a task", async () => {
      const updated = { id: "1", name: "Singing songs", description: "", status: "Completed", priority: "Low", deadline: "" };
      (taskService.updateTaskById as jest.Mock).mockResolvedValue(updated);
      const response = await request(app).put("/tasks/1").send({ name: "Singing songs", status: "Completed" });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Singing songs");
    });
    it("should return 404 for missing task", async () => {
      (taskService.updateTaskById as jest.Mock).mockResolvedValue(null);
      const response = await request(app).put("/tasks/50").send({ name: "Running" });
      expect(response.status).toBe(404);
    });
  });
  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      (taskService.deleteTaskById as jest.Mock).mockResolvedValue(true);
      const response = await request(app).delete("/tasks/1");
      expect(response.status).toBe(204);
    });
    it("should return 404 for missing task", async () => {
      (taskService.deleteTaskById as jest.Mock).mockResolvedValue(false);
      const response = await request(app).delete("/tasks/55");
      expect(response.status).toBe(404);
    });
  });
});