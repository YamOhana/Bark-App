import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import AddDog from './AddDog';



const AddUser = inject("MainStore", "InputStore")(observer((props) => { 

    const [firstName, setFirstName] = useState(props.InputStore.firstName)
    const [lastName, setLastName] = useState(props.InputStore.lastName)
    const [birthDate, setbirthDate] = useState(props.InputStore.birthDate)
    const [email, setEmail] = useState(props.InputStore.email)
    const [phoneNum, setPhoneNum] = useState(props.InputStore.phoneNum)
    const [address, setAddress] = useState(props.InputStore.address)
    const [gender , setGender] = useState(props.InputStore.gender)
    const [smoker, setSmoker] = useState(props.InputStore.smoker)
    const [hours , setHours] = useState(props.InputStore.hours)
 
    
    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        e.target.name === "firstName" ?
        setFirstName(e.target.value) :
        e.target.name === "lastName" ?
        setLastName(e.target.value) :
        e.target.name === "gender" ?
        setGender(e.target.value) :
        e.target.name === "birthDate" ?
        setbirthDate(e.target.value) :
        e.target.name === "email" ? 
        setEmail(e.target.value) :
        e.target.name === "phoneNum" ?
        setPhoneNum(e.target.value) :
        e.target.name === "address" ?
        setAddress(e.target.value) :
        e.target.name === "smoker" ?
        setSmoker(e.target.value) :
        setHours(e.target.value) 
    }
        
    return (
        <div>


        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" value={firstName} name="firstName" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" value={lastName} name="lastName" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="gender">Gender:</label>
        <select type="text" id="gender" value={gender} name="gender" onChange={inputHandler}>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        <br></br>

        <label htmlFor="birthDate">Date of Birth:</label>
        <input type="date" id="birthDate" value={birthDate} name="birthDate" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} name="email" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="phoneNum">Phone Number:</label>
        <input type="text" id="phoneNum" value={phoneNum} name="phoneNum" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} name="address" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="smoker">Smoking?</label>
        <input type="checkbox" id="smoker" value={smoker} name="smoker" onChange={inputHandler}></input>
        <br></br>

        <label htmlFor="hours">Prefered Hours</label>
        <input type="text" id="hours" value={hours} name="hours" onChange={inputHandler}></input>
        <br></br>
        
        <div><b>Dog details:</b></div>
        <AddDog />
    </div>
    )
}))

export default AddUser