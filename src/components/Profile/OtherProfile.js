import React from 'react';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
const style = {
    width: '50vw',
    height: '50vw'
  };

const OtherProfile = (observer((props) => {
    return (
        <Card className='ProfileComponent'>
            <CardHeader
                title={`${props.o.firstName} ${props.o.lastName}`}
            />
            
           
            <CardMedia
                        image={props.o.images?props.o.images[0]:props.o.image}
                        title={props.o.images?props.o.images[0]:props.o.image}
                        style={style}
                    />
                    
            <Typography>
                Date of Birth: {props.o.birthDate}
                <br></br>
                Gender: {props.o.gender}
                <br></br>
                Hours: {props.o.hours.map(h => h)}
                <br></br>
                Smoker: {`${props.o.smoker}`}
            </Typography>
        </Card>


    )
}))


export default OtherProfile




