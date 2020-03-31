import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';


const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.Age,
    stringify: (option) => option.Size,
    stringify: (option) => option.Nature,

  });
  
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Navbar = () => {


    return (
        <div>
            <Autocomplete
            id="filter-demo"
            options={AgeFilter}
            getOptionLabel={(option) => option.Age}
            filterOptions={filterOptions}
            style={{ width: 95 }}
            renderInput={(params) => <TextField {...params} label="Age" variant="outlined" />}
            />
            <Autocomplete
            id="filter-demo"
            options={SizeFilter}
            getOptionLabel={(option) => option.Size}
            filterOptions={filterOptions}
            style={{ width: 95 }}
            renderInput={(params) => <TextField {...params} label="Size" variant="outlined" />}
            />
            <Autocomplete
            id="filter-demo"
            options={NatureFilter}
            getOptionLabel={(option) => option.Nature}
            filterOptions={filterOptions}
            style={{ width: 95 }}
            renderInput={(params) => <TextField {...params} label="Nature" variant="outlined" />}
            />

         
        </div>
    )
}

export default Navbar


const AgeFilter = [
    { Age: '0.5-4' },
    { Age: '5-10' },
    { Age: '11-15' }
]

const SizeFilter = [
    { Size: 'Small' },
    { Size: 'Medium' },
    { Size: 'Big' }
]


const NatureFilter = [
    { Nature: 'Shy' },
    { Nature: 'Energetic' },
    { Nature: 'Dominant' }
]



