import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const filters = [
    {
        value: 'Age'
    },
    {
        value: 'Size'
    },
    {
        value: 'Nature',
    },
   
];


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '10ch',
        },
    },
}));

const Navbar = () => {

    const classes = useStyles();
    const [filter, setFilter] = React.useState('EUR');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete='off'>
                <TextField
                    id="standard-basic"
                    select
                    label="Age"
                    value={filter}
                    onChange={handleChange}
                >
                    {filters.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="standard-basic" label="Size" />
                <TextField id="standard-basic" label="Nature" />
                <span className='mainFilter'><button>Advanced</button> </span>

            </form>
        </div>
    )
}

export default Navbar