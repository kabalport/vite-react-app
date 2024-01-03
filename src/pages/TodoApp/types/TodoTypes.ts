//TodoApp/types/TodoTypes.ts
export type Todo = {
    id: number;
    isDone: boolean;
    content: string;
    createdDate: number;
};

export type Action =
    | { type: 'CREATE'; data: Todo }
    | { type: 'UPDATE'; data: number }
    | { type: 'DELETE'; data: number };

export type TodoDispatchContextType = {
    onCreate: (content: string) => void;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
};
