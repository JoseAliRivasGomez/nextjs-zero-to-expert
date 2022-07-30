import { FC, PropsWithChildren, useReducer } from 'react';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [
    {
        _id: uuidv4(),
        description: 'a gsd  s hdf h fd hjd sf sda sdhsd h sd hsd hsd h dhs h s dh s dh s df hh d fh we ew tew  cgx',
        status: 'pending',
        createdAt: Date.now(),
    },
    {
        _id: uuidv4(),
        description: 'a gsd  s hdf h fd hjd sf sda sdhsd h sd hsd hsd h dhs h s dh s dh s df hh d fh we ew tew  cgxdfgh  we ywe  w',
        status: 'in-progress',
        createdAt: Date.now() - 1000000,
    },
    {
        _id: uuidv4(),
        description: 'a gsd  s hdf h fd hjd sf sda sdhsd h sd hsd hsd h dhs h s dh s dh s df hh d',
        status: 'finished',
        createdAt: Date.now() - 2000000,
    }
   ],
}

export const EntriesProvider: FC<PropsWithChildren> = ({children}) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

   

   return (
       <EntriesContext.Provider value={{
           ...state,
       }}>
           {children}
       </EntriesContext.Provider>
   )
}