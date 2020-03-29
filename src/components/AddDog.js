import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'



const AddDog = inject("MainStore", "InputStore")(observer((props) => { 

    const [dogName, setDogName] = useState(props.InputStore.dogName)
    const [dogGender, setDogGender] = useState(props.InputStore.dogGender)
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
        setDogGender(e.target.value) :
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
        <select type="text" id="dogGender" value={dogGender} name="dogGender" onChange={inputHandler}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        <br></br>

        <label for="park">Favorie park:</label>
        <input type="text" id="park" value={park} name="park" onChange={inputHandler}></input>
        <br></br>

        <label for="vaccinated">Vaccinated:</label>
        <input type="checkbox" id="vaccinated" value={vaccinated} name="vaccinated" onChange={inputHandler}></input>
        <br></br>

        <label for="neutered">Neutered:</label>
        <input type="checkbox" id="neutered" value={neutered} name="neutered" onChange={inputHandler}></input>
        <br></br>

        <label for="image">Image src:</label>
        <input type="text" id="image" value={image} name="image" onChange={inputHandler}></input>
        <br></br>

        <label for="dogBirthDate">Dog Birth Date :</label>
        <input type="date" id="dogBirthDate" value={dogBirthDate} name="dogBirthDate" onChange={inputHandler}></input>
        <br></br>
        
        <label for="size">Dog Size :</label>
        <select type="text" id="size" value={size} name="size" onChange={inputHandler}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
        <br></br>

        <label for="type">Dog type :</label>
        <input type="text" id="type" value={type} name="type" onChange={inputHandler}></input>
        <br></br>

        <label for="shy">Dog shy :</label>
        <input type="checkbox" id="shy" value={shy} name="shy" onChange={inputHandler}></input>
        <br></br>

        <label for="energetic">Dog energy :</label>
        <input type="checkbox" id="energetic" value={energetic} name="energetic" onChange={inputHandler}></input>
        <br></br>

        <label for="dominant">Dog dominant :</label>
        <input type="checkbox" id="dominant" value={dominant} name="dominant" onChange={inputHandler}></input>
        <br></br>


    </div>
    )
}))

export default AddDog