
import React, { Component, Profiler } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import AddDog from '../AddDog';
import { Layout, Divider, Avatar, Icon, Button } from 'antd';
import { observer, inject } from 'mobx-react'
import MyDogs from './MyDog'

const { Header, Footer, Sider, Content } = Layout;

const Profile = inject("MainStore", "InputStore")(observer((props) => {



        // const ownerId = this.props.Mainstore.currUser
       
        return (
            <div className="ProfileComponent">
                {console.log(props.MainStore.curUser)}
                <span>{props.MainStore.curUser.firstName  }  </span>
                <span>{props.MainStore.curUser.lastName  }  </span>
                <div>{props.MainStore.curUser.dogs.map(d => {
                    return <div>{d.dogName}<span>{d.park}</span></div>
                })}</div>

            </div>

        )

}))




export default Profile;


// onToggle = () => {
//     let opposite = !this.state.dogList
//     this.setState({
//         dogList: opposite
//     })
// }
// I Didnt know if to delete so i left it to you (there was no dogList...)



{/* <Layout id="profileLayout" style={{ height: "100vh" }}>
                <Header id="header" >
                    <div id="profileImgDiv">
                            <Avatar className="profile-avatar" size={50} src={Image}/>
                    </div>
                </Header>
                    <div className="my-dogs-list">
                        <h3>My Dogs</h3>
                        {this.props.Mainstore.currUser.dogs.map(d => <MyDogs data={d} />)}
                    </div>
                
            </Layout> */}

