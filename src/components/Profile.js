
import React, { Component, Profiler } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import AddDog from './AddDog';
import Mainstore from '../Stores/MainStore'
import { Layout, Divider, Avatar, Icon, Button } from 'antd';
import { observer, inject } from 'mobx-react'
import MyDogs from './MyDog'

const { Header, Footer, Sider, Content } = Layout;

@inject("MainStore")
@observer
class Profile extends Component {

    constructor(props) {
        super();
        this.state = {
            dogs: []
        }
    }

    onToggle = () => {
        let opposite = !this.state.dogList
        this.setState({
            dogList: opposite
        })
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }


    componentDidMount = async () =>{
        const currUserId = this.props.ownerStore.currUser.id
        await props.Mainstore.getOwnerDogs(currUserId)
    }



    render() {

        const state = this.state

        return (
            <div className="ProfileComponent">
                <Layout id="profileLayout" style={{ height: "100vh" }}>
                    <Header id="header" >
                        <div id="profileImgDiv">
                             <Avatar className="profile-avatar" size={50} src={Image}/>
                        </div>
                    </Header>
                        <div className="my-dogs-list">
                            <h3>My Dogs</h3>
                            {this.props.Mainstore.currUser.dogs.map(d => <MyDogs data={d} />)}
                        </div>
                    
                </Layout>


            </div>

        )

    }


}




export default Profile;

// /////MyDog component
// <div >
//     <span>{this.props.data.name}</span>
//     <img src={this.props.data.img}></img>
// </div> */
}

