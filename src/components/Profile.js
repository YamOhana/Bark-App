import React, { component, Component, Profiler } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import AddDog from './AddDog';
import Mainstore from '../Stores/MainStore'
import { Layout, Divider, Avatar, Icon, Button } from 'antd';



const { Header, Footer, Sider, Content } = Layout;


@inject("MainStore")

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            dogList: true,
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
        await this.props.Mainstore.getOwnerDogs(currUserId)
    }



    render(){

        const state = this.state

            return(
                <div className="ProfileComponent">
                <Layout id="profileLayout" style={{ height: "100vh" }}>
                    <Header id="header" >
                    <div id="profileImgDiv">
                    </div>
                    </Header>

                    <Content className="profileContent">

                        <Route exact path="/owner/dog${ownerId}"> </Route>
                        
                        <Route path="/owner/dog{ownerId}" exact render={({match}) => <ProfileList match = {match} />} />
                        <Route path="/owner/dog{ownerId}" exact render={({match}) => <AddDog match = {match}/>} />

                    </Content>
                </Layout>


            </div>


            )

    }


}

export default Profile;