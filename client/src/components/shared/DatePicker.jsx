// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function PickTheDate({ onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date of Birth"
                onChange={(date) => onChange(date ? date.toDate() : null)}
                sx={{ width: '100%', mt: 1.5 }}
            />
        </LocalizationProvider>
    );
}

PickTheDate.propTypes = {
    onChange: PropTypes.func.isRequired,
};
