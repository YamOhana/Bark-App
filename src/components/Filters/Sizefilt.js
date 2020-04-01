import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Sizefilt() {
    return (
        <Autocomplete
        id="filter-demo"
        options={SizeFilter}
        getOptionLabel={(option) => option.Size}
        style={{ width: 95 }}
        renderInput={(params) => <TextField {...params} label="Size" variant="outlined" />}
        />
    );
  }

  const SizeFilter = [
    { Size: 'Small' },
    { Size: 'Medium' },
    { Size: 'Big' }
]