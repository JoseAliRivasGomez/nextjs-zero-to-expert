import { createContext } from "react";

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (value: boolean) => void;
    setIsDragging: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);