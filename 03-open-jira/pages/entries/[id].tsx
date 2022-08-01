import { Layout } from "../../components/layouts/Layout"
import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton, Divider } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Entry, EntryStatus } from "../../interfaces/entry";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { getEntryById } from '../../database/dbEntries';
import { EntriesContext } from "../../context/entries/EntriesContext";
import { getFormatDistanceToNow } from "../../utils/dateFunctions";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ({entry}) => {    

    const {onEntryUpdated, deleteEntry} = useContext(EntriesContext);

    const router = useRouter();

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        onEntryUpdated(updatedEntry, true);
    }

    const onDelete = () => {
        deleteEntry(entry._id, true);
        router.push('/');
    }

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent='center' sx={{marginTop: 2}}>
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader title={`Entrada:`} subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`} />
                    <Divider />
                    <CardContent>
                        <TextField sx={{marginTop: 1, marginBottom: 1}} fullWidth placeholder="Descripcion" autoFocus multiline label="Descripcion"
                        value={inputValue} onChange={onTextChanged} helperText={isNotValid && 'Ingrese un valor'} 
                        onBlur={() => setTouched(true)} error={isNotValid} />
                        <FormControl sx={{marginTop: 1}}>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup row={true} value={status} onChange={onStatusChanged}>
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button startIcon={<SaveOutlinedIcon />} variant="contained" fullWidth onClick={onSave}
                        disabled={inputValue.length <= 0}>
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton sx={{position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}} onClick={onDelete}>
            <DeleteOutlinedIcon />
        </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const {id} = params as {id: string};

    const entry = await getEntryById(id);

    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage