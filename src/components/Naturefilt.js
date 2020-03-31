import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Naturefilt() {
    const [nature, setNature] = React.useState([]);

    const handleChange = (event) => {
        console.log(event);
        setNature(event.target.value)
        
    }
    
    return (
        <Autocomplete
            id="filter-demo"
            options={NatureFilter}
            getOptionLabel={(option) => option.Nature}
            style={{ width: 95 }}
            value={nature}
            renderInput={(params) => <TextField {...params} label="Nature" variant="outlined" />}
        />
    );
  }

 
const NatureFilter = [
    { Nature: 'Shy' },
    { Nature: 'Energetic' },
    { Nature: 'Dominant' }
]