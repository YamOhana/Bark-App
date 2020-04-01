import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 95,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NativeSelects = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: '',
        size: '',
        nature: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        props.MainStore.updateFilters(event.target.name, event.target.value)
        setState({
            ...state,
            [name]: event.target.value,
        });
        props.MainStore.filterOwners()
    };


    return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
            native
            value={state.age}
            onChange={handleChange}
            className={classes.formControl}
            inputProps={{
            name: 'age',
            id: 'age-native-simple',
            }}
            >
            <option aria-label="None" value="" />
            <option value={'none'}>None</option>
            <option value={'0.5-4'}>0.5-4</option>
            <option value={'5-10'}>5-10</option>
            <option value={'11-15'}>11-15</option>
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="size-native-helper">Size</InputLabel>
        <NativeSelect
            value={state.size}
            onChange={handleChange}
            className={classes.selectEmpty}
            inputProps={{
            name: 'size',
            id: 'size-native-helper',
            }}
            >
            <option aria-label="None" value="" />
            <option value={'none'}>None</option>
            <option value={'small'}>Small</option>
            <option value={'medium'}>Medium</option>
            <option value={'large'}>Large</option>
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="nature-native-simple">Nature</InputLabel>
        <NativeSelect
            value={state.nature}
            onChange={handleChange}
            className={classes.selectEmpty}
            inputProps={{ 
            name: 'nature',
            id: 'nature-native-helper',
            }}
            >
            <option aria-label="None" value="" />
            <option value={'none'}>None</option>
            <option value={'shy'}>Shy</option>
            <option value={'energetic'}>Energetic</option>
            <option value={'dominant'}>Dominant</option>
        </NativeSelect>
        <FormHelperText>With visually hidden label</FormHelperText>
        </FormControl>
        
    </div>
);
}))

export default NativeSelects
