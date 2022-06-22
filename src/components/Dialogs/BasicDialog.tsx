import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, SvgIconTypeMap, TextField, Typography } from '@mui/material';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Field {
    id: string,
    label: string,
    type: string,
    icon: OverridableComponent<SvgIconTypeMap>
}

interface Props {
    caption: string,
    isOpen: boolean,
    fields: Field[],
    action: string,
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
            <DialogTitle textAlign="center" variant='h5' mt={2}>{caption}</DialogTitle>
            <DialogContent>
                <Grid container flexDirection="column" spacing={2} mt={1} px={3}>
                    {fields.map((field, index) =>
                        <Grid item key={index}>
                            <TextField 
                                required
                                fullWidth
                                id={field.id}
                                type={field.type}
                                label={field.label}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
<field.icon />
                                        
                                    </InputAdornment>,
                                  }}
                                />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container mb={5} px={3} spacing={2}>
                    <Grid item container spacing={1}>
                        <Grid item xs={10}>
                            <Button fullWidth onClick={onSubmit} variant="outlined">{caption}</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth onClick={onClose} variant="text">Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
)}

export default BasicDialog;