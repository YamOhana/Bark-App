import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import fire from '../Fire';
import { observer, inject } from 'mobx-react'
import NavbarLeftMenu from './Menu/NavbarLeftMenu' 
import Profile from './Profile/Profile'
import Friends from './Profile/Friends'
import Home from './Main Pages/Home'
import Feed from './Main Pages/Feed'
import Maps from './Maps'
import axios from 'axios'
import Footer from './Handlers/Onwalk'
import Chatbox from './Chat/ChatBox'
 

@inject("MainStore")

@observer
class Landing extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
    }


    async componentDidMount() {
        const users = await this.getUsers()
        const currentUser = await this.getCurrentUser()
        this.props.MainStore.getData({owners:users.data,user:currentUser.data})
        const posts = await this.getPosts()
        this.props.MainStore.getPosts(posts.data)
        
    }

    getUsers = async () => {
        return await axios.get('http://localhost:3001/users')
    }
    getCurrentUser = async () => {
        const curUser = await fire.auth().currentUser
        if (curUser) {
            return await axios.get(`http://localhost:3001/user/${curUser.uid}`)
        }
    }

    getPosts = async () => {
        return await axios.get('http://localhost:3001/posts')
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
       
        
        return (
            <Router>
                <div className="landing">
                
                    <div id="main-links">
                        <NavbarLeftMenu logout={this.logout}/>
                    </div>

                    <Route path="/" exact render={() => <Home key='homePage' logout={this.logout}/>}/>
                    <Route path="/Feed" exact render={() => <Feed key='feedPage'/>}/>
                    <Route path="/Profile" exact render={() => <Profile key='profilePage'/>}/>
                    <Route path="/Maps" exact render={() => <Maps key='mappage'/>}/>
                    <Route path="/Friends" exact render={() => <Friends key='friendsPage'/>}/>
                    <Route path="/Chat" exact render={() => <Chatbox key='chatPage'/>}/>
                    {/* <Route path="/Friends/:id" exact render={({ match }) => <Friends match={match} key='friendsPage'/>}/> */}
                    <Footer />
                </div>
            </Router>
        )
    }

}

export default Landing;
