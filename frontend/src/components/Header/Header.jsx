import React from "react";
import "./Header.css";
import SearchIcon from "../../assets/header/search.png"
import cs from "../../assets/header/cs.png"
import al from "../../assets/header/al.png"
import hnoti from "../../assets/header/hnoti.png"
function Header() {
  return (
    <header className="header">
      <div className="c-1">
      <h2 className="header-title">Design Studio</h2>
      </div>

      <div className="actions">

        <button className="btn">
            <img className="btnImg" src={cs}></img>
          <p>
          SupportRequest
          </p>
          </button>
        <button className="btn">
        <img  className='btnImg' src={al}></img>
          <p>
          Product Tour
          </p>
          </button>
      <div className="h-srContainer">
        <input  className='header-searchInp' type="text" placeholder="Search Project..." /> 
        <img className="h-img" src={SearchIcon}/> 
     </div>
     <div>
      <img className="h-img" src={hnoti}/>
     </div>
        <div className="user-info">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="user-avatar"
          />
          <p className="userText">Leonardo C</p>
        </div>
      </div>
    </header>
  );
}

export default Header;