import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, FormControl, Select } from "@material-ui/core";

export default function SectionPop({ onSectionChange }) {
    const [open, setOpen] = React.useState(false);
    const [section, setSection] = React.useState('');

    const handleChange = (event) => {
        setSection(event);
        onSectionChange(event)
        handleClose()
    };
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <div>
            <Button color="primary" variant="contained" onClick={() => { setOpen(true) }}>{section ? `Section - ${section}` : 'Select Section'}</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Section</DialogTitle>
                <DialogContent>
                    <FormControl style={{ width: 300 }}>
                        <Select
                            native
                            value={section}
                            onChange={(e) => { handleChange(e.target.value) }}
                            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                        >
                            <option aria-label="None" value="" />
                            <option value={'A'}>Section A</option>
                            <option value={'B'}>Section B</option>
                            <option value={'C'}>Section C</option>
                            <option value={'D'}>Section D</option>
                            <option value={'E'}>Section E</option>
                            <option value={'F'}>Section F</option>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
