import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryStatus } from "../../interfaces/entry";
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from "../../context/ui/UIContext";

import styles from "./EntryList.module.css";

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {

    const {entries, onEntryUpdated} = useContext(EntriesContext);
    const {isDragging, setIsDragging} = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('entryId');
        
        const entry = entries.find(entry => entry._id === id)!;
        entry.status = status;
        onEntryUpdated(entry);
        setIsDragging(false);
        
    }

    return (
        <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
            <Paper sx={{height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent',
                        '&::-webkit-scrollbar': { display: 'none' }, padding: '3px 5px'}}>
                <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
