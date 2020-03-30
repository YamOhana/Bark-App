import React, { Component } from 'react';
import { Layout, Divider, Avatar, Icon, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { Checkbox } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

@inject("MainStore")
@observer

class ProfileList extends Component {
    constructor(){
        super()
            this.state = {
                dogsOfOwner: []
            }
        
    }
    
    componentDidMount = async () => {
        const ownerId = this.props.match.params.ownerId
        await this.props.ownerStore.getOwnerDogs(ownerId)
        const dogsOfOwner = this.props.ownerStore.dogs
        this.setState({dogsOfOwner})
    }

    render() {
        const dogsOfOwner = this.state.dogsOfOwner
        const ownerId = this.props.match.params.ownerId
        return (
            <div>
                <Link to={`/profile/${ownerId}`}><div id="back-button"></div></Link>

                <span id="dogListHeader"> My Dogs</span>

                <Route exact to="/dog-profiles/add-dog/:id">
                    <Button id="addDog" type="primary" shape="circle" onClick={this.props.onToggle}>
                        <Link to={`/dog-profiles/add-dog/${ownerId}`}>
                        </Link>
                    </Button>
                </Route>

            </div>
            );
    }
}
export default ProfileList;