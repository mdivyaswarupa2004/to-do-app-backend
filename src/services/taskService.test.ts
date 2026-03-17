import { getTasks, addTask, updateTaskById, deleteTaskById } from "../services/taskService";
jest.mock("../config/firebaseConfig", () => {
    const mockDoc = {
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
    const mockCollection = {
        get: jest.fn(),
        add: jest.fn(),
        doc: jest.fn(() => mockDoc)
    };
    return {
        db: {
            collection: jest.fn(() => mockCollection)
        }
    };
});
import { db } from "../config/firebaseConfig";
describe("Task Service", () => {
    let mockCollection: any;
    let mockDoc: any;
    beforeEach(() => {
        mockCollection = (db.collection as jest.Mock)();
        mockDoc = mockCollection.doc();
        jest.clearAllMocks();
    });
    describe("getTasks", () => {
        it("should return all tasks", async () => {
            const mockDocs = [
                {
                    id: "1",
                    data: () => ({
                        name: "Yoga class",
                        description: "Morning session",
                        status: "Pending",
                        priority: "Medium",
                        deadline: "2024-01-08"
                    })
                },
                {
                    id: "2",
                    data: () => ({
                        name: "Play piano",
                        status: "In-Progress",
                        priority: "Low"
                    })
                }
            ];
            mockCollection.get.mockResolvedValue({ docs: mockDocs });
            const tasks = await getTasks();
            expect(tasks).toHaveLength(2);
            expect(tasks[0].name).toBe("Yoga class");
            expect(tasks[1].description).toBe("");
        });
        it("should return empty array when no tasks", async () => {
            mockCollection.get.mockResolvedValue({ docs: [] });
            const tasks = await getTasks();
            expect(tasks).toHaveLength(0);
        });
    });
    describe("addTask", () => {
        it("should add a new task", async () => {
            const newTask = {
                name: "Swimming",
                description: "Evening pool",
                status: "Pending" as const,
                priority: "High" as const,
                deadline: "2024-01-10"
            };
            mockCollection.add.mockResolvedValue({ id: "3" });
            const result = await addTask(newTask);
            expect(result.id).toBe("3");
            expect(result.name).toBe("Swimming");
            expect(mockCollection.add).toHaveBeenCalledWith(newTask);
        });
    });
    describe("updateTaskById", () => {
        it("should update a task", async () => {
            const updates = { name: "Meditation", status: "Completed" as const };
            mockDoc.get
                .mockResolvedValueOnce({ exists: true })
                .mockResolvedValueOnce({
                    id: "1",
                    data: () => ({
                        name: "Meditation",
                        description: "Morning practice",
                        status: "Completed",
                        priority: "High",
                        deadline: "2024-01-05"
                    })
                });
            const result = await updateTaskById("1", updates);
            expect(result).not.toBeNull();
            expect(result?.name).toBe("Meditation");
            expect(result?.status).toBe("Completed");
            expect(mockDoc.update).toHaveBeenCalledWith(updates);
        });
        it("should return null for non-existent task", async () => {
            mockDoc.get.mockResolvedValue({ exists: false });
            const result = await updateTaskById("50", { name: "Running" });
            expect(result).toBeNull();
            expect(mockDoc.update).not.toHaveBeenCalled();
        });
    });
    describe("deleteTaskById", () => {
        it("should delete a task", async () => {
            mockDoc.get.mockResolvedValue({ exists: true });
            const result = await deleteTaskById("1");
            expect(result).toBe(true);
            expect(mockDoc.delete).toHaveBeenCalled();
        });
        it("should return false for non-existent task", async () => {
            mockDoc.get.mockResolvedValue({ exists: false });
            const result = await deleteTaskById("55");
            expect(result).toBe(false);
            expect(mockDoc.delete).not.toHaveBeenCalled();
        });
    });
});