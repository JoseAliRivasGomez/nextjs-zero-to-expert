import { Entry } from '../../interfaces/entry';
import { EntriesState } from './EntriesProvider';

type EntriesActionType = 
| { type: 'Entries - Add Entry', payload: Entry}
| { type: 'Entries - Entry updated', payload: Entry}
| { type: 'Entries - Load Entries', payload: Entry[]}
| { type: 'Entries - Delete Entry', payload: string}

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'Entries - Add Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        case 'Entries - Entry updated':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }

        case 'Entries - Load Entries':
            return {
                ...state,
                entries: [...action.payload]
            }

        case 'Entries - Delete Entry':

            const newArray = state.entries.filter(entry => entry._id !== action.payload);
            return {
                ...state,
                entries: newArray
            }

        default:
            return state;
    }

}