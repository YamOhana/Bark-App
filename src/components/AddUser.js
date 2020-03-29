import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'



const AddUser = inject("MainStore", "InputStore")(observer((props) => { 

    const [dogName, setDogName] = useState(props.InputStore.dogName)
    const [dogGender, setGender] = useState(props.InputStore.dogGender)
    const [park, setPark] = useState(props.InputStore.park)
    const [vaccinated, setVaccinated] = useState(props.InputStore.vaccinated)
    const [neutered, setNeutered] = useState(props.InputStore.neutered)
    const [image, setImage] = useState(props.InputStore.image)
    const [dogBirthDate , setBirthDate] = useState(props.InputStore.dogBirthDate)
    const [size, setSize] = useState(props.InputStore.size)
    const [type , setType] = useState(props.InputStore.type)
    const [shy , setShy] = useState(props.InputStore.shy)
    const [energetic , setEnergetic] = useState(props.InputStore.energetic)
    const [dominant , setDominant] = useState(props.InputStore.dominant)

    
    
    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        e.target.name === "dogName" ?
        setDogName(e.target.value) :
        e.target.name === "dogGender" ?
        setGender(e.target.value) :
        e.target.name === "park" ?
        setPark(e.target.value) :
        e.target.name === "vaccinated" ?
        setVaccinated(e.target.value) :
        e.target.name === "neutered" ? 
        setNeutered(e.target.value) :
        e.target.name === "image" ?
        setImage(e.target.value) :
        e.target.name === "dogBirthDate" ?
        setBirthDate(e.target.value) :
        e.target.name === "size" ?
        setSize(e.target.value) :
        e.target.name === "type" ?
        setType(e.target.value) :
        e.target.name === "shy" ?
        setShy(e.target.value) :
        e.target.name === "energetic" ?
        setEnergetic(e.target.value) :
        setDominant(e.target.value)
    }
        
    return (
        <div>

        <label for="dogName">Dog's name:</label>
        <input type="text" id="dogName" value={dogName} name="dogName" onChange={inputHandler}></input>
        <br></br>

        <label for="dogGender">Dog's gender:</label>
        <input type="text" id="dogGender" value={dogGender} name="dogGender" onChange={inputHandler}></input>
        <br></br>

        <label for="park">Favorie park:</label>
        <input type="text" id="park" value={park} name="park" onChange={inputHandler}></input>
        <br></br>

        <label for="vaccinated">Vaccinated:</label>
        <input type="text" id="vaccinated" value={vaccinated} name="vaccinated" onChange={inputHandler}></input>
        <br></br>

        <label for="neutered">Neutered:</label>
        <input type="text" id="neutered" value={neutered} name="neutered" onChange={inputHandler}></input>
        <br></br>

        <label for="image">Image src:</label>
        <input type="text" id="image" value={image} name="image" onChange={inputHandler}></input>
        <br></br>

        <label for="dogBirthDate">Dog Birth Date :</label>
        <input type="text" id="dogBirthDate" value={dogBirthDate} name="dogBirthDate" onChange={inputHandler}></input>
        <br></br>
        
        <label for="size">Dog Size :</label>
        <input type="text" id="size" value={size} name="size" onChange={inputHandler}></input>
        <br></br>

        <label for="type">Dog type :</label>
        <input type="text" id="type" value={type} name="type" onChange={inputHandler}></input>
        <br></br>

        <label for="shy">Dog shy :</label>
        <input type="text" id="shy" value={shy} name="shy" onChange={inputHandler}></input>
        <br></br>

        <label for="energetic">Dog energy :</label>
        <input type="text" id="energetic" value={energetic} name="energetic" onChange={inputHandler}></input>
        <br></br>

        <label for="dominant">Dog dominant :</label>
        <input type="text" id="dominant" value={dominant} name="dominant" onChange={inputHandler}></input>
        <br></br>


        {/* <label for="lname">Last name:</label>
        <input type="text" id="lname" value={props.InputStore.lname} name="lname" onChange={inputHandler}></input>
        <br></br>

        <label for="countryInput">Country:</label>
        <input type="text" list='countryList' name="newCountry" onChange={inputHandler}></input>
        <datalist value={props.InputStore.newCountry} onChange={inputHandler} id='countryList'>
            {props.MainStore.countries.map(c => <option value={c}></option>)}
        </datalist>
        <br></br>

        <label for="ownerInput">Owner:</label>
        <input type='text' list='ownerList' name='newOwner' onChange={inputHandler}></input>
        <datalist value={props.InputStore.owner} onChange={inputHandler} id="ownerList">
            {props.MainStore.owners.map(o => <option value={o}>{o}</option>)}
        </datalist>
        <br></br>

        <button onClick={addUser}>Add New Client</button> */}

    </div>
    )
}))

export default AddUser