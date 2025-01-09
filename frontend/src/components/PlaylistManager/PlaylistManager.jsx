import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import ProductList from "./ProductList";
import axios from "axios";
import "./PlaylistManager.css";
import {DndContext,closestCorners,useSensor,useSensors, PointerSensor} from "@dnd-kit/core";
import {horizontalListSortingStrategy,SortableContext,verticalListSortingStrategy,arrayMove,} from "@dnd-kit/sortable";

function PlaylistManager() {
  
  const [playlists, setPlaylists] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Playlist ${i + 1}`,
      videos: Math.floor(Math.random() * 10) + 1,
    }))
  );

  const [products, setProducts] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 7,
      title: `Video ${i + 1}`,
      duration: `0${i + 1}:00:00`,
    }))
  );

  // Save to localStorage (or backend)
  const saveLayout = () => {
    const savedData = {
      playlists,
      products,
    };
    localStorage.setItem("playlistLayout", JSON.stringify(savedData));
    alert("Layout saved successfully!");
  };

  // Load from localStorage
  const loadLayout = () => {
    const savedData = JSON.parse(localStorage.getItem("playlistLayout"));
    if (savedData) {
      setPlaylists(savedData.playlists);
      setProducts(savedData.products);
      alert("Layout loaded successfully!");
    } else {
      alert("No saved layout found.");
    }
  };

  // Drag End Handler
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Reorder playlists
    if (playlists.some((item) => item.id === active.id)) {
      const oldIndex = playlists.findIndex((item) => item.id === active.id);
      const newIndex = playlists.findIndex((item) => item.id === over.id);
      setPlaylists((prev) => arrayMove(prev, oldIndex, newIndex));
    }

    // Reorder products
    if (products.some((item) => item.id === active.id)) {
      const oldIndex = products.findIndex((item) => item.id === active.id);
      const newIndex = products.findIndex((item) => item.id === over.id);
      setProducts((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };
   
  async function handleYoutubeVideos(){
    try {
      const response= await axios.get("https://palcode001.onrender.com/api/youtube/playlists")
      // console.log(response.data[0].snippet.localized);
      // console.log(response.data[0].snippet.thumbnails.default);
      setPlaylists(response.data)

    } catch (error) {
      console.log("not getting videos");
    }
  
  }
  

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >   
    <div className="" style={{display:"flex",justifyContent:"space-between",padding:"0.8em",border:"#017EFA",borderRadius:"1em"}}>
        <h2 style={{color:"white"}}>  PlayList</h2>
        <button onClick={handleYoutubeVideos}
         style={{display:"flex",alignItems:"center",background:"red",padding:"0.5em",gap:"0.5em",borderRadius:"10px",border:"#017EFA",color:"white"}}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
</svg>
          Import From Youtube</button>
    </div>
      <div className="playlist-manager">
        <div className="playlists">
      <SortableContext
            items={playlists.map((playlist) => playlist.id)}
            strategy={horizontalListSortingStrategy}
          >
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} id={playlist.id} playlist={playlist} />
            ))}
          </SortableContext>
        </div>
        <div className="playlist-editor">
          <h3 className="play-title">Thumbnail Title</h3>
          <p className="playsrchInput">Get Sporty in Style</p>
          <h4
            className=""
            style={{
              textAlign: "start",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            Video Status
          </h4>
          <div className="playRadioItem">
            <label className="playRadio">
              <input className="playRadioInput" type="radio" name="status" /> Active
            </label>
            <label className="playRadio">
              <input className="playRadioInput" type="radio" name="status" /> Inactive
            </label>
          </div>
          <ProductList products={products} />
          <button style={{color:"#017EFA"}} onClick={saveLayout}>Save Layout</button>
          <button style={{background:"rgb(126, 126, 18)",color:"white"}}onClick={loadLayout}>Load Layout</button>
        </div>
      </div>
    </DndContext>
  );
}

export default PlaylistManager;
