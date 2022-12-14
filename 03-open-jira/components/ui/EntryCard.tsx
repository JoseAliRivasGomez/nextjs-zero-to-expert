import { Card, CardActionArea, Typography, CardContent, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { Entry } from '../../interfaces/entry';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

    const {setIsDragging} = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('entryId', entry._id);
        setIsDragging(true);
    }

    const onDragEnd = () => {
        setIsDragging(false);
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    }

  return (
    <Card onClick={onClick} sx={{marginBottom: 1}} draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>{getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
