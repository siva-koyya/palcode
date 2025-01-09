import React, { useState } from "react";
import videoImg from "../../assets/playlist/vidIcon.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./PlaylistManager.css";

function PlaylistCard({ playlist }) {
  let [playlis, setPlaylis] = useState(playlist);
  let { id } = playlist;
  
  const urlImg = playlist.snippet?.thumbnails?.medium?.url || "./img/pushp-2.jpg";
  const title = playlist.snippet?.localized?.title;

  const videoCount = playlist.videos ? playlist.videos.length : 0;

  let { listeners, attributes, transform, transition, setNodeRef } = useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners} className="playlist-card">
      <div className="playlist-items">
        <img className="cardImg" src={urlImg} alt="Playlist" />
        <h4 className="cartTitle">{title || playlist.title}</h4>
      </div>
      <div className="playlist-bottom">
        <img className="videoImg" src={videoImg} alt="Video Icon" />
        <p>{videoCount} Videos</p> {/* Show video count dynamically */}
      </div>
    </div>
  );
}

export default PlaylistCard;
