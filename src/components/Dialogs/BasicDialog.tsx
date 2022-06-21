import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React from 'react';

interface Field {
    id: string,
    label: string,
    type: string,
}

interface Props {
    caption: string,
    isOpen: boolean,
    fields: Field[],
    onClose: () => void,
    onSubmit: () => void
}

const BasicDialog : React.FC<Props> = ({caption, isOpen, fields, onClose, onSubmit}) => {
    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>{caption}</DialogTitle>
            <DialogContent>
                <Grid container flexDirection="column" spacing={2} mt={1}>
                    {fields.map((field, index) =>
                        <Grid item key={index}>
                            <TextField 
                                required
                                fullWidth
                                id={field.id}
                                type={field.type}
                                label={field.label}
                                variant="outlined" />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>{caption}</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
)}

export default BasicDialog;