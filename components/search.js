import React, { useState } from 'react';
import Link from 'next/link';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [begin, setDate1] = useState('');
  const [end, setDate2] = useState('');
  const [theme, setTheme] = useState('');
  const [time, setTime] = useState(2);
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    console.log("sent");
  }

  const toggleTheme = (value) => {
    if (value === "medium") {
			setDisplay(true);
		} else if (value === "geolocation") {
			setDisplay(true);
		} else if (value === "period") {
			setDisplay(true);
		}
  }


  return (
  <div>
  <div id="container">
  <h1> Concierge </h1>
  <div className="underline"></div>
  <form action="#" method="post" id="query_form">

    <div class="left" className="left">
      <label for="name"></label>
      <input type="text" placeholder="My name is" name="name" id="name_input" onInput={(e) => {setName(e.target.value);}} />
    </div>
    <div class="right" className="right">
      <label for="number"></label>
      <input type="text" placeholder="Duration of stay (hrs)" name="duration" id="duration_input" onInput={(e) => {setTime(e.target.value);}} />
    </div>
    <div class="subject">
      <label for="subject"></label>
      <select placeholder="Category" name="subject" id="subject_input" onChange={(e) => {toggleTheme(e.target.value); setTheme(e.target.value);}} required>
        <option disabled hidden selected>Filter by...</option>
        <option value="artistculture">Artist</option>
        <option value="artistculture">Culture</option>
        <option value="medium">Medium</option>
        <option value="geolocation">Geolocation</option>
        <option value="period">Time period</option>
      </select>
    </div>

    <div class="keyword">
      <label for="keyword"></label>
      <input type="text" placeholder="Plan my trip around..." id="name_input" onInput={(e) => {setKeyword(e.target.value);}} required/>
    </div>

    {display && theme !== "period" && (
    <div class="keyword">
      <label for="keyword"></label>
      <input type="text" placeholder="Keyword" id="name_input" onInput={(e) => {setQuery(e.target.value);}} required/>
    </div>
    )}

    {theme === "period" && (
    <div className="dateContainer">
      <div className="left">
        <label for="begin date"></label>
        <input type="text" placeholder="Begin date" onChange={(e) => {setDate1(e.target.value);}} required/>
      </div>
      <div className="right">
        <label for="end date"></label>
        <input type="text" placeholder="End date" onChange={(e) => {setDate2(e.target.value);}} required/>
      </div>
    </div>
    )}

    <div class="submit">
    <Link
      href={{
        pathname: '/home',
        query: {
          keyword: keyword,
          theme: theme,
          query: query,
          name: name,
          begin: begin,
          end: end,
          time: time,
        },
      }}
      as={`/${name}strip`}
    >
      <input value="Send" id="form_button" onClick={handleClick}/>
    </Link>
    </div>
  </form>
</div>
  

  <style jsx global>{`
    @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);

    body {
      background: #F2F3EB;
    }

    button {
      overflow: visible;
    }

    button, select {
      text-transform: none;
    }

    button, input, select, textarea {
      color: #5A5A5A;
      font: inherit;
      margin: 0;
    }

    input {
      line-height: normal;
    }

    textarea {
      overflow: auto;
    }

    #container {
      border: solid 3px #474544;
      max-width: 768px;
      margin: 60px auto;
      position: relative;
    }

    form {
      padding: 37.5px;
      margin: 50px 0;
    }

    #container h1 {
      margin-top: 2rem;
      color: #474544;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 7px;
      text-align: center;
      text-transform: uppercase;
    }

    .underline {
      border-bottom: solid 2px black;
      margin: -0.512em auto;
      width: 80px;
    }

    .icon_wrapper {
      margin: 50px auto 0;
      width: 100%;
    }

    .icon {
      display: block;
      fill: #474544;
      height: 50px;
      margin: 0 auto;
      width: 50px;
    }

    .right {
      float: right;
      width: 45%;
    }

    input[type='text'], [type='email'], select, textarea {
      background: none;
      border: none;
      border-bottom: solid 2px #474544;
      color: #474544;
      font-size: 1.000em;
      font-weight: 400;
      letter-spacing: 1px;
      margin: 0em 0 1.875em 0;
      padding: 0 0 0.875em 0;
      text-transform: uppercase;
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }

    input[type='text']:focus, [type='email']:focus, textarea:focus {
      outline: none;
      padding: 0 0 0.875em 0;
    }

    select {
      background: url('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-32.png') no-repeat right;
      outline: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }

    select::-ms-expand {
      display: none;
    }

    .subject {
      width: 100%;
    }

    .left {
      float: left;
      width: 45%;
    }

    .dateContainer {
      width: 80%;
      margin: 0 auto;
    }

    textarea {
      line-height: 150%;
      height: 150px;
      resize: none;
      width: 100%;
    }

    ::-webkit-input-placeholder {
      color: #474544;
    }

    :-moz-placeholder { 
      color: #474544;
      opacity: 1;
    }

    ::-moz-placeholder {
      color: #474544;
      opacity: 1;
    }

    :-ms-input-placeholder {
      color: #474544;
    }

    #form_button {
      transform: translate(100%, 0);
      text-align: center;
      background: none;
      border: solid 2px #474544;
      color: #474544;
      cursor: pointer;
      display: inline-block;
      font-family: 'Helvetica', Arial, sans-serif;
      font-size: 0.875em;
      font-weight: bold;
      outline: none;
      padding: 20px 35px;
      text-transform: uppercase;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }

    #form_button:hover {
      background: #474544;
      color: #F2F3EB;
    }

    @media screen and (max-width: 768px) {
      #container {
        margin: 20px auto;
        width: 95%;
      }
    }

    @media screen and (max-width: 480px) {
      h1 {
        font-size: 26px;
      }
      
      .underline {
        width: 68px;
      }
      
      #form_button {
        padding: 15px 25px;
      }
    }

    @media screen and (max-width: 420px) {
      h1 {
        font-size: 18px;
      }
      
      .icon {
        height: 35px;
        width: 35px;
      }
      
      .underline {
        width: 53px;
      }
      
      input[type='text'], [type='email'], select, textarea {
        font-size: 0.875em;
      }
    }
      
    `}</style>
  </div>
  )
}

export default SearchForm;