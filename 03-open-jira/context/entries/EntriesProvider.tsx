import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';
import entriesApi from '../../api/entriesApi';

export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({children}) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addEntry = async (description: string) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     status: 'pending',
        //     createdAt: Date.now(),
        // }
        const {data} = await entriesApi.post<Entry>('/entries', {description});
        dispatch({type: 'Entries - Add Entry', payload: data});
    }

    const onEntryUpdated = async ({_id, description, status}: Entry) => {
        try {
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status});

            dispatch({type: 'Entries - Entry updated', payload: data});
        } catch (error) {
            console.log({error});
        }
    }

    const refreshEntries = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: 'Entries - Load Entries', payload: data});
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

   return (
       <EntriesContext.Provider value={{
           ...state,
           addEntry,
           onEntryUpdated,
       }}>
           {children}
       </EntriesContext.Provider>
   )
}