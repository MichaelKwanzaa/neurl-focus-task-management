export interface Task{
    title: string;
    description: string;
    priority: string;
    category: string;
    isCompleted: boolean;
    startDate: Date;
    dueDate: Date;
    estimatedTime: number;
    notes: string;
    timer: string;
    subtasks: Array<any>
}
