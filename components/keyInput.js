import React, { useState } from 'react';
import Link from 'next/link';

const KeyInput = () => {
  const [key, setKey] = useState('');

  const handleClick = () => {
    console.log("sent");
  }

  return(
    <div>
      <div id="keySearch">
        <h1>Trip Key</h1>
        <p>Revisiting a saved trip? Enter your 24-character key, and we'll fetch it for you!</p>
        <form>
          <input className="form-field" type="key" placeholder="Key" onInput={(e) => {setKey(e.target.value);}} required/>
          <button id="submit" type="submit">
            <Link
            href={{
              pathname: '/savedhome',
              query: {
                key: key,
              },
            }}
            as={`/your-saved-trip`}
          >
            <i className="bi bi-arrow-right" onClick={() => {handleClick();}}></i>
          </Link>
        </button>
        </form>
      </div>

    <style jsx>{`
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
    @import url(https://use.fontawesome.com/releases/v5.3.1/css/all.css);

    #keySearch {
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #E4022B;
      width: 100%;
      color: white;
    }

    #keySearch h1 {
      padding-top: 2rem;
      color: white;
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 7px;
      text-align: center;
      text-transform: uppercase;
    }

    #keySearch p {
      padding-top: 2rem;
      color: white;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 3px;
      text-align: center;
      text-transform: uppercase;
    }

    form {
      margin: 0;
    }
    
    input[type='key'] {
      transform: translate(50%, 0);
      width: 50%;
      position: relative;
      line-height: 1;
      height: 2.25rem;
      margin: 0 auto;
      border-radius: 2px;
      padding: 1.4rem 2rem 1.6rem;
      border-color: #30A3F1;
    }

    button[type='submit'] {
      position:relative;
      top: 0.75rem;
      right: -22%;
      border: none;
      background-color: transparent;
     }
	 
    button[type='submit'] i {
      position:relative;
      color: black;
      font-size: 2.5rem;
     }


    `}</style>
    </div>
  )
}

export default KeyInput;
