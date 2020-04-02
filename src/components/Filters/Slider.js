import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '1k',
  },
  {
    value: 40,
    label: '2k',
  },
  {
    value: 60,
    label: '3k',
  },
  {
    value: 80,
    label: '4k',
  },
  {
    value: 100,
    label: '5k',
  },
];

function valuetext(value) {
    return `${value}`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="onClick"
      />
      <Typography id="discrete-slider-always" gutterBottom>
            Range
      </Typography>
    </div>
  );
}
