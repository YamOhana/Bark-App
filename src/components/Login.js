import React, { Component } from 'react';
import fire from '../Fire';
import AddUser from './AddUser';
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

    signup(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            let newUser = {
                userId: u.user.uid,
                email: this.state.email,
                firstName: this.props.InputStore.firstName,
                lastName: this.props.InputStore.lastName,
                birthDate: this.props.InputStore.birthDate,
                phoneNum: this.props.InputStore.phoneNum,
                address: this.props.InputStore.address,
                gender: this.props.InputStore.gender,
                smoker: this.props.InputStore.smoker,
                hours: this.props.InputStore.hours,
                dog:{
                    dogName: this.props.InputStore.dogName,
                    dogGender: this.props.InputStore.dogGender,
                    park: this.props.InputStore.park,
                    vaccinated: this.props.InputStore.vaccinated,
                    neutered: this.props.InputStore.neutered,
                    image: this.props.InputStore.image,
                    dogBirthDate: this.props.InputStore.dogBirthDate,
                    size: this.props.InputStore.size,
                    type: this.props.InputStore.type,
                    shy: this.props.InputStore.shy,
                    energetic: this.props.InputStore.energetic,
                    dominant: this.props.InputStore.dominant
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
                <form>

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
                            <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                        </div>
                    }
                </form>

            </div>
        );
    }
}
export default Login;