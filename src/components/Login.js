import React, { Component } from 'react';
import fire from '../Fire';
import AddUser from './Handlers/AddUser';
import AddDog from './Handlers/AddDog';
import axios from 'axios';
import '../styles/Login.css'
import { inject } from 'mobx-react'


@inject('InputStore')
class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
            signOrLog: true
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }
    checkField(field) {
        if (this.props.InputStore[field] == undefined) {
            let val = ""
            switch (field) {
                case "firstName":
                    val = prompt(`You forgot to fill your First Name`)
                    return val
                case "lastName":
                    val = prompt(`You forgot to fill your Last Name`)
                    return val
                case "dogName":
                    val = prompt(`You forgot to fill your Dog's Name`)
                    return val
                case "dogImages":
                    val = prompt(`You forgot to put your Dog's image`)
                    return val
                case "userImages":
                    val = prompt(`You forgot to put your image`)
                    return val
                case "smoker":
                    return false
                case "hours":
                    console.log(`hours false`)
                    return []
                case "vaccinated":
                    return false
                case "neutered":
                    return false
                case "shy":
                    return false
                case "energetic":
                    return false
                case "dominant":
                    return false
                default:
                    return null
            }
        }
        return this.props.InputStore[field]
    }

    signup(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            let newUser = {
                userId: u.user.uid,
                email: this.state.email,
                firstName: this.checkField('firstName'),
                lastName: this.checkField('lastName'),
                birthDate: this.checkField('birthDate'),
                phoneNum: this.checkField('phoneNum'),
                address: this.checkField('address'),
                gender: this.checkField('gender'),
                smoker: this.checkField('smoker'),
                hours: this.checkField('hours'),
                images: this.checkField('userImages'),
                dog: {
                    dogName: this.checkField('dogName'),
                    dogGender: this.checkField('dogGender'),
                    park: this.checkField('park'),
                    vaccinated: this.checkField('vaccinated'),
                    neutered: this.checkField('neutered'),
                    images: this.checkField('dogImages'),
                    dogBirthDate: this.checkField('dogBirthDate'),
                    size: this.checkField('size'),
                    type: this.checkField('type'),
                    shy: this.checkField('shy'),
                    energetic: this.checkField('energetic'),
                    dominant: this.checkField('dominant')
                }
            }
            console.log(this.props.InputStore.gender);
            console.log(newUser.gender);


            axios.post('http://localhost:3001/user', newUser).then(res => {
                // this.props.clients.updateList(res.data)
            })


        })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (

            <div className="col-md-6">
                <button onClick={() => { this.setState({ signOrLog: true }) }} className="chooseLog">Login</button>
                <button onClick={() => { this.setState({ signOrLog: false }) }} style={{ marginLeft: '25px' }} className="chooseSign">Signup</button>
                <div>

                    <div className="form-group1">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    {this.state.signOrLog ? <button type="submit" onClick={this.login} className="btn btn-primary">Send</button> :
                        <div>
                            <AddUser />
                            <div><b>Dog details:</b></div>
                            <AddDog />
                            <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                        </div>
                    }
                </div>

            </div>
        );
    }
}
export default Login;