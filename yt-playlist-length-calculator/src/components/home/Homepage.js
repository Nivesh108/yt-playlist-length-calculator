import React, { useState } from "react";
import axios from "axios";
import "./homepage.css";
import { TextField, Button } from "@mui/material";

function Homepage() {
  const [details, setDetails] = useState(null);
  const [id, setId] = useState("");
  const fetchDetails = async (e) => {
    e.preventDefault();
    const url = new URL(id);
    const searchParam = new URLSearchParams(url.search);
    const playlistId = searchParam.get("list");
    await axios
      .get(`${window.location.href}getId/${playlistId}`)
      .then(async (res) => await setDetails(res.data));
  };

  return (
    <>
    <div className="heading"><h1>Youtube Playlist Length</h1></div>
      <div className="container">
        <div className="home-container">
          <form className="url-form" onSubmit={fetchDetails}>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              type="text"
              sx={{ marginRight: "1rem" }}
              fullWidth
              placeholder="youtube.com/playlist?list=ID"
              value={id}
              onChange={(event) => setId(event.target.value)}
            ></TextField>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>

          <div className="data-container">
            {details && (
              <div className="details-container">
                <div className="row">
                  <div className="row-title">Title : </div>
                  <div style={{wordWrap : 'break-word'}} className='row-value'>{details.title} </div>
                </div>
                <div className="row">
                  <div className="row-title">Number of Videos : </div>
                  <div className='row-value'>{details.length} </div>
                </div>

                {details.duration &&
                  details.duration.map((data, index) => (
                    <div className="row" key={index}>
                      <div className="row-title">At {data.speed} speed : </div>
                      <div className='row-value'>
                        {data.hours} hours {data.minutes} minutes {data.seconds}{" "}
                        seconds
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Homepage;
