export interface TodoItem {
    id: string;
    creationDate: string;
    title: string;
    description: string;
    isDone: boolean;
}

export interface AddTodoRequest {
    title: string;
    description: string;
}

export class Api {
    public static async getTodos(): Promise<TodoItem[]> {

        const response = await fetch("/web-api/todos");
        return response.json();
    }
    public static async addTodo(request: AddTodoRequest): Promise<TodoItem> {
        const response = await fetch("/web-api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(request),
        });
        return response.json();
    }
    public static async moveToDone(id: string): Promise<void> {
        await fetch(`/web-api/todos/done/${id}`, {
            method: "POST",
        });
    }
}
