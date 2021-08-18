import React, { useEffect, useState } from 'react';
const Footsteps = () => {

    // Images asset
  const footstepImages = {
    0:'/footsteps/footstep1.png',
    1:'/footsteps/footstep2.png',
    2:'/footsteps/footstep3.png',
    3:'/footsteps/footstep4.png',
    4:'/footsteps/footstep5.png',
    5:'/footsteps/footstep6.png',
    6:'/footsteps/footstep7.png',
    7:'/footsteps/footstep8.png',
    8:'/footsteps/footstep9.png',
    9:'/footsteps/footstep10.png',
    10:'/footsteps/footstep11.png',
    11:'/footsteps/footstep12.png',
    12:'/footsteps/footstep13.png',
    13:'/footsteps/footstep14.png',
    14:'/footsteps/footstep15.png',
    15:'/footsteps/footstep16.png',
    16:'/footsteps/footstep17.png',
    17:'/footsteps/footstep18.png',
    18:'/footsteps/footstep19.png',
    19:'/footsteps/footstep20.png',
    20:'/footsteps/footstep21.png',
  }

  const[imageToUse, setImage] = useState('/footsteps/footstep23.png');

  // Global variable to control the scrolling behavior
  const step = 80; // For each 30px, change an image

  function trackScrollPosition() {
    const y = window.scrollY;
    const max = 1600;
    let label;
    if ( y > max ){
      const yMod = window.scrollY % max;
      if (yMod >= 0 && yMod <= 160){
        label = 20;
      } else {
      label = Math.min(Math.max(Math.floor(yMod/step), 1), 20);
      }
    } else {
      label = Math.min(Math.floor(y/step)+1, 20);
    }
    const image = footstepImages[label];
    setImage(image);

  }

  useEffect(() => {
    window.addEventListener('scroll', trackScrollPosition, { passive: true })
  })

  return (
    <div>
    <div className='img-container'>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
      <img src={imageToUse} className='footstep odd'/>
      <img src={imageToUse} className='footstep even'/>
    </div>

    <style jsx>{`
    body {
      margin: 0;
      font-family: 'Permanent Marker', cursive;
    }

    .img-container {
      height: 0;
      position: sticky;
      z-index: 0;
    }
    
    .footstep {
      width: 100vw; 
      height: 99.5vh; 
      object-fit: cover;
      object-position: left top;
      margin: 0;
      border-color: transparent;
    }

    .even {
      transform: scaleX(-1);
    }

      `}

    </style>

    </div>

  )
}

export default Footsteps;