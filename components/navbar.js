import React, { useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

const Navbar = ({handleClick = () => {}, handleSave = () => {}}) => {
  const [snsClicked, setSNS] = useState();
  let shareUrl;
  if (localStorage.getItem('currentKey') !== null) {
    const shareKey = localStorage.getItem('currentKey');
    shareUrl = `https://met-zskylarli.vercel.app/savedhome?key=${shareKey}`;
  } else {
    shareUrl = 'https://met-zskylarli.vercel.app/';
  }

  let animationClass;
  if (snsClicked){
    animationClass = "appearPie";
  } else {
    animationClass = "disappearPie";
  }

  return (
    <div>
      <div className="nav flex-column">
        <a className="nav-link" href="/"><i className="bi bi-house"></i></a>
        <a className="nav-link" href="#"><i className="bi bi-clipboard" onClick={() => {handleClick();}}></i></a>
        <a className="nav-link" href="#"><i className="bi bi-key" onClick={() => {handleSave();}}></i></a>
        <a className="nav-link" href="#"><i className="bi bi-share" onClick={() => {handleSave(); setSNS(!snsClicked);}}></i></a>
        <a className="nav-link" href="https://maps.metmuseum.org/" target="_blank" rel="noopener noreferrer"><i className="bi bi-map"></i></a>
      </div>

      <ul className={animationClass}>
        <li className='slice'>
          <div className='slice-contents'><div className='icon'><FacebookShareButton url={shareUrl}><FacebookIcon/></FacebookShareButton></div></div>
        </li>
        <li className='slice'>
          <div className='slice-contents'><div className='icon'><TwitterShareButton url={shareUrl}><TwitterIcon/></TwitterShareButton></div></div>
        </li>
        <li className='slice'>
          <div className='slice-contents'><div className='icon'><EmailShareButton url={shareUrl}><EmailIcon/></EmailShareButton></div></div>
        </li>
        <li className='slice'>
          <div className='slice-contents'></div>
        </li>
        <li className='inner-pie'>
        </li>
      </ul>

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
        top: 36%;
        transform: translate(0, -37.5%);
      }
      .icon {
        position: absolute;
        transform: translateY(28px) translateX(115px) skewY(-180deg); 
        font-size: 2rem;
      }
      .appearPie {
        position: fixed;
        top: calc(36% + 6.5rem);
        left: -5rem;
        margin: 0;
        padding: 0;
        width: 15em;
        height: 15em;
        border-radius: 50%;
        list-style: none;
        overflow: hidden;
        z-index: 6;
        animation: slide-in-anim 1.5s ease-out forwards;
      }
      @keyframes slide-in-anim {
        0% {
          opacity: 0;
          transform: translateX(-30%);
        }
        100% {
          opacity: 0.8;
          transform: translateX(0%);
        }
      }	
      .disappearPie {
        position: absolute;
        top: calc(36% + 6.5rem);
        left: -4rem;
        margin: 0;
        padding: 0;
        width: 15em;
        height: 15em;
        border-radius: 50%;
        list-style: none;
        overflow: hidden;
        z-index: 6;
        animation: slide-out-anim 1.5s ease-out forwards;
      }
      @keyframes slide-out-anim {
        0% {
          opacity: 0.8;
          transform: translateX(0%);
        }
        100% {
          opacity: 0;
          transform: translateX(-30%);
        }
      }	
      .slice {
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%;
        box-sizing: border-box;
        border: 2px solid rgb(51,51,51, 0.6);
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        opacity: 0.8;
      }
  
      .slice:hover {
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        opacity: 1;
        transition: opacity 0.3s ease-in-out;   
      }
  
      .slice:hover:after {
        opacity: 0.8; 
      }
  
      .slice-contents {
        position: fixed;
        left: -100%;
        width: 200%;
        height: 200%;
        border-radius: 50%;
        z-index: 4;
      }
  
      .slice:nth-child(1) {
        transform: rotate(0deg) skewY(30deg) scale(1.2);
      }
  
      .slice:nth-child(1) .slice-contents {
        transform: skewY(-30deg); /* unskew slice contents */
        background-color: #3B5998;
      }
      .slice:nth-child(2) {
        transform: rotate(60deg) skewY(30deg) scale(1.2);
      }
      .slice:nth-child(2) .slice-contents {
        transform: skewY(-30deg); /* unskew slice contents */
          background-color: #00ACED;
      }
      .slice:nth-child(3) {
        transform: rotate(120deg) skewY(30deg) scale(1.2);
      }
      .slice:nth-child(3) .slice-contents {
        transform: skewY(-30deg); /* unskew slice contents */
        background-color: #7F7F7F;
      }
  
      .slice:nth-child(4) {
        transform: rotate(180deg) skewY(30deg) scale(1.2);
      }
      .slice:nth-child(4) .slice-contents {
        transform: skewY(-30deg); /* unskew slice contents */
        background: #333333;
      }
      
      .inner-pie {
        position: absolute;
        width: 3em;
        height: 3em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: white;
      }

      `}</style>

    </div>

  )
}

export default Navbar;
