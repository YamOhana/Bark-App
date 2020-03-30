
import React, { Component, Profiler } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import AddDog from './AddDog';
import Mainstore from '../Stores/MainStore'
// import { Layout, Divider, Avatar, Icon, Button } from 'antd';
import { observer, inject } from 'mobx-react'
import MyDogs from './MyDog'
// const { Header, Footer, Sider, Content } = Layout;



@inject("MainStore")
@observer
class Profile extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         dogs: []
    //     }
    // }

    // onToggle = () => {
    //     let opposite = !this.state.dogList
    //     this.setState({
    //         dogList: opposite
    //     })
    // }

    // onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // }


    // componentDidMount = async () =>{
    //     const currUserId = this.props.ownerStore.currUser.id
    //     await this.props.Mainstore.getOwnerDogs(currUserId)
    // }



    // render() {

    //     const state = this.state

    //     return (
    //         <div className="ProfileComponent">
    //             <Layout id="profileLayout" style={{ height: "100vh" }}>
    //                 <Header id="header" >
    //                     <div id="profileImgDiv">
    //                     </div>
    //                 </Header>

    //                 <Content className="profileContent">
    //                     <div>
    //                         <h3>My Dogs</h3>
    //                         {this.props.Mainstore.currUser.dogs.map(d => <MyDogs data={d} />)}
    //                     </div>


    //                     <div>

    //                     <Route exact path="/owner/dog${ownerId}"> </Route>
    //                     {/* <MyDogs /> */}
    //                     {/* <Route path="/owner/dog{ownerId}" exact render={({match}) => <ProfileList match = {match} />} /> */}
    //                     <Route path="/owner/dog{ownerId}" exact render={({match}) => <AddDog match = {match}/>} />

    //                     </div>
                      
    //                 </Content>
    //             </Layout>


    //         </div>


    //     )

    // }


// }

// export default Profile;

// /////MyDogs component

// {/* <div>
//     <h3>My Dogs</h3>
//     {props.Mainstore.curUser.dogs.map(d => <MyDog data={d} />)}
// </div>

// /////MyDog component
// <div >
//     <span>{this.props.data.name}</span>
//     <img src={this.props.data.img}></img>
// </div> */
}
