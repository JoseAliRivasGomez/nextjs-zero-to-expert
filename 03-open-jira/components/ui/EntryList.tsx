import { List, Paper } from "@mui/material"
import { EntryCard } from './EntryCard';

export const EntryList = () => {



    return (
        <div>
            <Paper sx={{height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent',
                        '&::-webkit-scrollbar': { display: 'none' }, padding: '3px 5px'}}>
                <List sx={{opacity: 1}}>
                    <EntryCard />
                </List>
            </Paper>
        </div>
    )
}
