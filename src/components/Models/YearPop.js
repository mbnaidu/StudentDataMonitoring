import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, FormControl, Select } from "@material-ui/core";
import { movingText } from '../../Globals/Globals';

export default function YearPop({ onYearChange }) {
    const [open, setOpen] = React.useState(false);
    const [selectedYear, setSelectedYear] = React.useState('');
    const [years, setYears] = React.useState([]);
    React.useEffect(() => {
        var d = (new Date().getFullYear())
        var elements = [''];
        var i;
        for (i = d - 4; i < d + 1; i++) {
            elements.push(i)
        }
        setYears(elements);
    }, [])

    const handleChange = (event) => {
        setSelectedYear(event);
        onYearChange(event)
        handleClose()
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <div>
            <Button color="primary" variant="contained" style={{ backgroundColor: 'white' }} onClick={() => { setOpen(true) }} >{movingText(selectedYear ? `Year - ${selectedYear}` : 'Select Year')}</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Year</DialogTitle>
                <DialogContent>
                    <FormControl style={{ width: 300, }}>
                        <Select
                            native
                            value={selectedYear}
                            onChange={(e) => { handleChange(e.target.value) }}
                            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                        >
                            {years && years.map((id) => {
                                return (
                                    <option key={id} value={id}>{id}</option>
                                )
                            })}
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
