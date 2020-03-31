import React, { useState } from 'react';
import Age from './Agefilt'
import Size from './Sizefilt'
import Nature from './Naturefilt'
import Test from './Filterstest'
// import { observer, inject } from 'mobx-react'
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
// import Checkbox from '@material-ui/core/Checkbox';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import { makeStyles } from '@material-ui/core/styles';


// const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option) => option.Age,
//     stringify: (option) => option.Size,
//     stringify: (option) => option.Nature,

//   });
  
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Navbar = () => {


    return (
        <div>
            {/* <Age />
            <Size />
            <Nature /> */}
            <Test />
        </div> 
        
    )
}

export default Navbar

