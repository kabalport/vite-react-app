import  { createContext } from 'react';
import { Todo, TodoDispatchContextType } from "../types/TodoTypes"; // '.ts' 확장자 생략

export const TodoStateContext = createContext<Todo[] | undefined>(undefined);
export const TodoDispatchContext = createContext<TodoDispatchContextType | undefined>(undefined);
