import request from "supertest";
import app from "./app";
import * as taskService from "./services/taskService";

jest.mock("./services/taskService");
describe("App Test cases", () => {
    it("should handle task routes", async () => {
        const tasks = [
            { id: "1", name: "Morning walk", description: "go to park", status: "Pending", priority: "Low", deadline: "2026-01-10" }
        ];
        (taskService.getTasks as jest.Mock).mockResolvedValue(tasks);
        const response = await request(app).get("/tasks");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tasks);
    });
    it("should return 404 for unknown routes", async () => {
        const response = await request(app).get("/invalidRoute");
        expect(response.status).toBe(404);
    });
});