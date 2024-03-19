export interface Task{
    id?: null;
    title: string;
    description: string;
    priority: string;
    category: string;
    isCompleted: boolean;
    startDate?: Date | null;
    dueDate?: Date | null; 
    estimatedTime: number;
    notes: string;
    timer: string;
    subtasks: SubTask[]
}

export interface SubTask{
    title: string;
    description: string;
    isCompleted: boolean;
    order: number; // Index of the subtask within the parent task
    estimatedTime: number; // (in minutes)
    notes: string;
}