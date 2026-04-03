import { createContext } from "react";

export type DeleteTaskContextType = {
    deleteTask: (id: string) => void;
    checkedTask: (id: string) => void;
    editTitle: (id: string, newTitle: string) => void;
}

export const DeleteTaskContext = createContext<DeleteTaskContextType | null>(null)