import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const Dog = inject("MainStore")(observer((props) => { 

    

    return (

        <div className='dog-container'>
            <ExpansionPanel className='expansion'>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    </ExpansionPanelSummary>
            <span>I'm {props.d.dogName},a {props.d.size} size {props.d.type} {props.d.dogGender} Dog</span>
            <span>I'm {props.d.vaccinated ? null : 'NOT!'} Vaccinated</span>
            <span>I'm {props.d.neutered ? null : 'NOT!'} Neutered</span>
            <span>{props.d.shy ? 'Shy': null}</span>
            <span>{props.d.energetic ? 'Dnergetic': null}</span>
            <span>{props.d.dominant ? 'Dominant': null}</span>

            </ExpansionPanel>
        </div>
    )
}))


export default Dog







