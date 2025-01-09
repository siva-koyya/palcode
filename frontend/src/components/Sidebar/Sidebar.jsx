import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">bleash</h1>
      <nav>
        <ul>
          <li>Revenue</li>
          <li>Shoppable Video</li>
          <li>Story</li>
          <li>Live Commerce</li>
          <li className="active">Playlist Manager</li>
          <li>One Click Post</li>
          <li>Calendar</li>
          <li>Hire Influencer</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;