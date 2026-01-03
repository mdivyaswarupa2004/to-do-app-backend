export type TaskStatus = 'Pending' | 'In-Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export interface Task {
    id?: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
}
export interface CreateTaskToDo {
    id?: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
}
export interface UpdateTask {
    id?: string;
    name?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    deadline?: string;
}