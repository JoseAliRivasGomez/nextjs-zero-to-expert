import { Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box } from "@mui/system";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const {addEntry} = useContext(EntriesContext);
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;
        addEntry(inputValue);
        setInputValue('');
        setIsAddingEntry(false);
        setTouched(false);
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>

        {
            (isAddingEntry) ? (
                <>
                    <TextField 
                        fullWidth sx={{marginTop: 2, marginBottom: 1}} placeholder="Nueva entrada" 
                        autoFocus multiline label="Nueva entrada" 
                        value={inputValue} onChange={onTextChange} error={inputValue.length <= 0 && touched} 
                        helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
                        onBlur={() => setTouched(true)}
                        />
                    <Box display='flex' justifyContent='space-between'>
                        <Button variant='text' onClick={() => setIsAddingEntry(false)}>
                            Cancelar
                        </Button>
                        <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={onSave}>
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button fullWidth variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setIsAddingEntry(true)}>
                    Agregar Tarea
                </Button>
            )
        }


        
        
    </Box>
  )
}
