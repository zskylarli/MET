import React, { useEffect, useState } from 'react';

const Navbar = ({handleClick = () => {}}) => {

  return (
    <div>
      <div className="nav flex-column">
        <a className="nav-link" href="/"><i className="bi bi-house"></i></a>
        <a className="nav-link" href="#"><i className="bi bi-share"></i></a>
        <a className="nav-link" href="#"><i className="bi bi-clipboard" onClick={() => {handleClick();}}></i></a>
        <a className="nav-link" href="#"><i className="bi bi-arrow-clockwise"></i></a>
      </div>

      <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
      @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
      @import url(https://use.fontawesome.com/releases/v5.3.1/css/all.css);
      .nav {
        background-color: #333333;
        position: fixed;
        width: 4rem;
        height: 100vh;
        z-index: 20;
      }

      .bi {
        color: #A59768;
        font-size: 2rem;
        margin-top: 0.5rem;
        z-index: 20;
      }

      .nav-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 37.5%;
        transform: translate(0, -37.5%);
      }


      `}</style>

    </div>

  )
}

export default Navbar;
