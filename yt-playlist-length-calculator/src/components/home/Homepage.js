import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './homepage.css'

function Homepage() {

  const [details, setDetails] = useState(null);
  const [id, setId] = useState('');
  const  fetchDetails = async (e) => {
    e.preventDefault();
    const url = new URL(id);
    const searchParam = new URLSearchParams(url.search);
    const playlistId = searchParam.get('list');
    console.log(playlistId);  
    await axios.get(`${window.location.href}getId/${playlistId}`)
    .then(async res => await setDetails(res.data))
  }

  return (
    <div className='home-container'>
      <h1>Youtube Playlist Length</h1>
      <form className='url-form' onSubmit= {fetchDetails}>
        <input type='text' placeholder='youtube.com/playlist?list=ID' value={id} onChange={event => setId(event.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>

      { details && <div className='data-container'>
        <ul>
          <li>
            Title : {details.title}
          </li>
          <li>
            Number of Videos : {details.length}
          </li>
            {details.duration && details.duration.map((item, index) => <li key={index}>At {item.speed} speed: {item.hours} hours {item.minutes} minutes {item.seconds} seconds</li>)}
        </ul>
      </div>}
  
    </div>
  )
}

export default Homepage
