import React, { Component } from 'react';
import fire from '../Fire';
import AddUser from './AddUser';
import axios from 'axios';

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
            password: ''
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
            console.log(u.user.uid);
            let newUser = {

                userId: u.user.uid,
                email: this.state.email

                // firstName: this.props.InputStore.firstName,
                // lastName: req.body.lastName,
                // birthDate: req.body.birthDate,
                // smoker: req.body.smoker,
                // email: req.body.email,
                // phoneNum: req.body.phoneNum,
                // adress: req.body.adress,
                // gender: req.body.gender,
                // hours: [],
                // friends: [],
                // messeges: [],
                // dogs:[]

                //             this.props.InputStore.

                // @observable name
                // @observable birthDate
                // @observable email
                // @observable phoneNum
                // @observable address
                // @observable gender
                // @observable smoker
                // @observable hours

            }
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
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>

                    <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                    <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                </form>

            </div>
        );
    }
}
export default Login;