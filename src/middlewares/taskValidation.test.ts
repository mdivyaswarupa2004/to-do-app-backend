import { validateCreateTask, validateUpdateTask } from "../middlewares/taskValidation";
describe("Task Validation tests", () => {
    let req: any;
    let res: any;
    let next: any;
    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    describe("validateCreateTask", () => {
        it("should pass valid task", () => {
            req.body = { name: "Morning jogging", status: "Pending", priority: "Medium" };
            validateCreateTask(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });
        it("should reject empty name", () => {
            req.body = { name: "" };
            validateCreateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Task name is required" });
            expect(next).not.toHaveBeenCalled();
        });
        it("should reject missing name", () => {
            req.body = { status: "Pending" };
            validateCreateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Task name is required" });
        });
        it("should reject invalid status", () => {
            req.body = { name: "Guitar practice", status: "Doing" };
            validateCreateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid status" });
        });
        it("should reject invalid priority", () => {
            req.body = { name: "Singing lesson", priority: "Urgent" };
            validateCreateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid priority" });
        });
    });
    describe("validateUpdateTask", () => {
        it("should pass valid update", () => {
            req.body = { name: "Evening meditation", status: "Completed" };
            validateUpdateTask(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });
        it("should reject empty name", () => {
            req.body = { name: "" };
            validateUpdateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Task name cannot be empty" });
        });
        it("should reject invalid status", () => {
            req.body = { status: "Running" };
            validateUpdateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid status" });
        });
        it("should reject invalid priority", () => {
            req.body = { priority: "Critical" };
            validateUpdateTask(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid priority" });
        });
        it("should pass empty body", () => {
            req.body = {};
            validateUpdateTask(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});