import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
   sideMenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
   sideMenuOpen: false,
   isAddingEntry: false,
   isDragging: false,
}

export const UIProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type: 'UI - Open SideBar'});
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close SideBar'});
    }

    const setIsAddingEntry = (value: boolean) => {
        dispatch({type: 'UI - Set isAddingEntry', payload: value});
    }

    const setIsDragging = (value: boolean) => {
        dispatch({type: 'UI - Set isDragging', payload: value});
    }

   return (
       <UIContext.Provider value={{
           ...state,
           openSideMenu,
           closeSideMenu,
           setIsAddingEntry,
           setIsDragging,
       }}>
           {children}
       </UIContext.Provider>
   )
}