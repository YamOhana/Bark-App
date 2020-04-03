import React, { Component, Profiler } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'



const Chat = inject("MainStore", "InputStore")(observer((props) =>{






    
    renderListUser = () => {
        if (this.listUser.length > 0) {
          let viewListUser = []
          this.listUser.forEach((item, index) => {
            if (item.data().id !== this.curUser.id) {
              viewListUser.push(
                <button
                  key={index}
                  className={
                    this.state.currentPeerUser &&
                      this.state.currentPeerUser.id === item.data().id
                      ? 'viewWrapItemFocused'
                      : 'viewWrapItem'
                  }
                  onClick={() => {
                    this.setState({ currentPeerUser: item.data() })
                  }}
                >
                  <img
                    className="viewAvatarItem"
                    src={item.data().photoUrl}
                    alt="icon avatar"
                  />
                  <div className="viewWrapContentItem">
                    <span className="textItem">{`Nickname: ${
                      item.data().nickname
                      }`}</span>
                    <span className="textItem">{`About me: ${
                      item.data().aboutMe ? item.data().aboutMe : 'Not available'
                      }`}</span>
                  </div>
                </button>
              )
            }
          })
          return viewListUser
        } else {
          return null
        }
      }

    return(



        <div>



        </div>
    )

}))