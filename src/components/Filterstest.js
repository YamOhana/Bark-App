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
          <option value={'Small'}>Small</option>
          <option value={'Medium'}>Medium</option>
          <option value={'Large'}>Large</option>
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
          <option value={'Shy'}>Shy</option>
          <option value={'Energetic'}>Energetic</option>
          <option value={'Dominant'}>Dominant</option>
        </NativeSelect>
        <FormHelperText>With visually hidden label</FormHelperText>
      </FormControl>

      
    </div>
  );
}))

export default NativeSelects


// <FormControl className={classes.formControl}>
//         <InputLabel shrink htmlFor="age-native-label-placeholder">
//           Age
//         </InputLabel>
//         <NativeSelect
//           value={state.age}
//           onChange={handleChange}
//           inputProps={{
//             name: 'age',
//             id: 'age-native-label-placeholder',
//           }}
//         >
//           <option value="">None</option>
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </NativeSelect>
//         <FormHelperText>Label + placeholder</FormHelperText>
//       </FormControl>
//       <FormControl className={classes.formControl} disabled>
//         <InputLabel htmlFor="name-native-disabled">Name</InputLabel>
//         <NativeSelect
//           value={state.name}
//           onChange={handleChange}
//           inputProps={{
//             name: 'name',
//             id: 'name-native-disabled',
//           }}
//         >
//           <option value="">None</option>
//           <optgroup label="Author">
//             <option value="hai">Hai</option>
//           </optgroup>
//           <optgroup label="Contributors">
//             <option value="olivier">Olivier</option>
//             <option value="kevin">Kevin</option>
//           </optgroup>
//         </NativeSelect>
//         <FormHelperText>Disabled</FormHelperText>
//       </FormControl>
//       <FormControl className={classes.formControl} error>
//         <InputLabel htmlFor="name-native-error">Name</InputLabel>
//         <NativeSelect
//           value={state.name}
//           onChange={handleChange}
//           name="name"
//           inputProps={{
//             id: 'name-native-error',
//           }}
//         >
//           <optgroup label="Author">
//             <option value="hai">Hai</option>
//           </optgroup>
//           <optgroup label="Contributors">
//             <option value="olivier">Olivier</option>
//             <option value="kevin">Kevin</option>
//           </optgroup>
//         </NativeSelect>
//         <FormHelperText>Error</FormHelperText>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
//         <NativeSelect
//           defaultValue={30}
//           inputProps={{
//             name: 'name',
//             id: 'uncontrolled-native',
//           }}
//         >
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </NativeSelect>
//         <FormHelperText>Uncontrolled</FormHelperText>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <NativeSelect
//           className={classes.selectEmpty}
//           value={state.age}
//           name="age"
//           onChange={handleChange}
//           inputProps={{ 'aria-label': 'age' }}
//         >
//           <option value="" disabled>
//             Placeholder
//           </option>
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </NativeSelect>
//         <FormHelperText>Placeholder</FormHelperText>
//       </FormControl>
//       <FormControl required className={classes.formControl}>
//         <InputLabel htmlFor="age-native-required">Age</InputLabel>
//         <Select
//           native
//           value={state.age}
//           onChange={handleChange}
//           name="age"
//           inputProps={{
//             id: 'age-native-required',
//           }}
//         >
//           <option aria-label="None" value="" />
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </Select>
//         <FormHelperText>Required</FormHelperText>
//       </FormControl>
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
//         <Select
//           native
//           value={state.age}
//           onChange={handleChange}
//           label="Age"
//           inputProps={{
//             name: 'age',
//             id: 'outlined-age-native-simple',
//           }}
//         >
//           <option aria-label="None" value="" />
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </Select>
//       </FormControl>
//       <FormControl variant="filled" className={classes.formControl}>
//         <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
//         <Select
//           native
//           value={state.age}
//           onChange={handleChange}
//           inputProps={{
//             name: 'age',
//             id: 'filled-age-native-simple',
//           }}
//         >
//           <option aria-label="None" value="" />
//           <option value={10}>Ten</option>
//           <option value={20}>Twenty</option>
//           <option value={30}>Thirty</option>
//         </Select>
//       </FormControl>