import * as React from 'react';
import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { listsOfType } from '../../constants/listsOfSearch'
import { colorType } from '../../constants/colorTypesPokemon'

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 40;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function TypesSelect({ attribute, name, formData, setFormData }) {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormData(
            // On autofill we get a stringified value.
            { ...formData, [attribute]: typeof value === 'string' ? value.split(',') : value, }
        );

    };

    return (
        <FormControl fullWidth>
            <InputLabel>{name}</InputLabel>
            <Select
                multiple
                value={formData[attribute]}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ backgroundColor: colorType[value], color: '#fff', fontWeight: 'bolder' }} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {['All', ...listsOfType.sort()].map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={formData[attribute].indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}