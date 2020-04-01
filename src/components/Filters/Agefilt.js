import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Adefilt() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={AgeFilter}
      getOptionLabel={(option) => option.Age}
      style={{ width: 95 }}
      renderInput={(params) => <TextField {...params} label="Age" variant="outlined" />}
    />
  );
}

const AgeFilter = [
    { Age: '0.5-4' },
    { Age: '5-10' },
    { Age: '11-15' }
]

