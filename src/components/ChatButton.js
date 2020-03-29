import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Chatroom from './Chatroom'

class ChatButton extends Component {


    render() {

        const goToChat = () => {
            <  Router >
                <Link to='/chat'></Link>
                <Route path='/chat' exact component={Chatroom} />
            </Router>
        }


        return (



            <div className="chatButton">
                <button id="chatBtn" type="primary" onClick={goToChat()}></button>
            </div>
        )

    }

}


export default ChatButton