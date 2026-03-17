import { db } from "../config/firebaseConfig";
import { Task, CreateTaskToDo, UpdateTaskToDo } from "../types/taskTypes";

const tasksCollection = db.collection("tasks");
export const getTasks = async (): Promise<Task[]> => {
    const documents = await tasksCollection.get();
    return documents.docs.map((doc) => {
        const taskData = doc.data();
        return {
            id: doc.id,
            name: taskData.name,
            description: taskData.description ?? "",
            status: taskData.status,
            priority: taskData.priority,
            deadline: taskData.deadline ?? ""
        };
    });
};
export const addTask = async (newTask: CreateTaskToDo): Promise<Task> => {
    const taskToSave = {
        name: newTask.name,
        description: newTask.description ?? "",
        status: newTask.status,
        priority: newTask.priority,
        deadline: newTask.deadline ?? ""
    };
    const docRef = await tasksCollection.add(taskToSave);
    return {
        id: docRef.id,
        ...taskToSave
    };
};
export const updateTaskById = async (id: string, updates: UpdateTaskToDo): Promise<Task | null> => {
    const task = await tasksCollection.doc(id).get();
    if (!task.exists) {
        return null;
    }
    await tasksCollection.doc(id).update(updates as any);
    const updatedTask = await tasksCollection.doc(id).get();
    const data = updatedTask.data() as any;
    return {
        id: updatedTask.id,
        name: data.name,
        description: data.description ?? "",
        status: data.status,
        priority: data.priority,
        deadline: data.deadline ?? ""
    };
};
export const deleteTaskById = async (id: string): Promise<boolean> => {
    const taskRef = tasksCollection.doc(id);
    const existingTask = await taskRef.get();
    if (!existingTask.exists) {
        return false;
    }
    await taskRef.delete();
    return true;
};