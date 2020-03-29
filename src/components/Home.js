import React, { Component } from 'react';
import fire from '../Fire';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {

        return (
            <div>
                Hello 
            
            <button onClick={this.logout}>
                Log Out
            </button>

            </div>
        )
    }

}

export default Home;
