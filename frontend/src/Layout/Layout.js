import React from 'react'
import "./Layout.css";
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import  PlaylistManager from "../components/PlaylistManager/PlaylistManager"
function Layout() {
  return (
    <div className="sideBar" >
    <Sidebar/>
    <div className="rightSide" >
    <div className="topBar">
    <Header/>
      </div>
      <div className="bottom">
     <PlaylistManager/>
    </div>
    </div>
  </div>
  )
}

export default Layout