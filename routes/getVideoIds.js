const express = require('express')
const router = express.Router()
const {
  google
} = require('googleapis');
const {
  ids
} = require('googleapis/build/src/apis/ids');
const youtube = google.youtube('v3')
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
});
const api_key = process.env.API_KEY;

// id = playlist id
router.get('/:id', async (req, res) => {
  try {
    let length = 0
    let nextPageToken = null
    let totalSeconds = 0
    let totalSeconds_1_25 = 0
    let totalSeconds_1_50 = 0
    let totalSeconds_1_75 = 0
    let totalSeconds_2_00 = 0
    let hourRegex = /(\d+)H/g;
    let minuteRegex = /(\d+)M/g;
    let secondRegex = /(\d+)S/g;
    let title = ''


    const titleFetch = await youtube.playlists.list({
      key: api_key,
      part: "snippet",
      id: req.params.id,
    });

    title = titleFetch.data.items[0].snippet.title;
    // console.log(title)

    while (true) {
      const Response = await youtube.playlistItems.list({
        part: "contentDetails, snippet",
        playlistId: req.params.id,
        key: api_key,
        maxResults: 50,
        pageToken: nextPageToken
      })

      let videoIds = []
      Response.data.items.forEach(item => videoIds.push(item.snippet.resourceId.videoId))
      length += videoIds.length

      const videotime = await youtube.videos.list({
        part: 'contentDetails',
        id: videoIds.join(','),
        key: api_key
      })
      videotime.data.items.forEach((item) => {
        // ? -> can be undefined
        const hour =
          item.contentDetails.duration.match(hourRegex)?.[0].replace("H", "") || 0;
        const min =
          item.contentDetails.duration.match(minuteRegex)?.[0].replace("M", "") || 0;
        const sec =
          item.contentDetails.duration.match(secondRegex)?.[0].replace("S", "") || 0;

        durationSeconds =
          parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(sec);

        totalSeconds += durationSeconds;
      });
      // console.log(length)
      nextPageToken = Response.data.nextPageToken
      if (!nextPageToken) {
        break;
      }
      // console.log(nextPageToken)
    }

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);

    totalSeconds_1_25 = Math.floor(totalSeconds / 1.25)
    totalSeconds_1_50 = Math.floor(totalSeconds / 1.50)
    totalSeconds_1_75 = Math.floor(totalSeconds / 1.75)
    totalSeconds_2_00 = Math.floor(totalSeconds / 2)

    let minutes_1_50 = Math.floor(totalSeconds_1_50 / 60);
    let seconds_1_50 = Math.floor(totalSeconds_1_50 % 60);
    let hours_1_50 = Math.floor(minutes_1_50 / 60);
    minutes_1_50 = Math.floor(minutes_1_50 % 60);

    let minutes_1_25 = Math.floor(totalSeconds_1_25 / 60);
    let seconds_1_25 = Math.floor(totalSeconds_1_25 % 60);
    let hours_1_25 = Math.floor(minutes_1_25 / 60);
    minutes_1_25 = Math.floor(minutes_1_25 % 60);

    let minutes_1_75 = Math.floor(totalSeconds_1_75 / 60);
    let seconds_1_75 = Math.floor(totalSeconds_1_75 % 60);
    let hours_1_75 = Math.floor(minutes_1_75 / 60);
    minutes_1_75 = Math.floor(minutes_1_75 % 60);

    let minutes_2_00 = Math.floor(totalSeconds_2_00 / 60);
    let seconds_2_00 = Math.floor(totalSeconds_2_00 % 60);
    let hours_2_00 = Math.floor(minutes_2_00 / 60);
    minutes_2_00 = Math.floor(minutes_2_00 % 60);

    let Response = {
      title: title,
      length: length,
      duration: [{
          hours,
          minutes,
          seconds,
          speed : '1x'
        },
        {
          hours: hours_1_25,
          minutes: minutes_1_25,
          seconds: seconds_1_25,
          speed : '1.25x'
        },
        {
          hours : hours_1_50,
          minutes: minutes_1_50,
          seconds: seconds_1_50,
          speed : '1.50x'
        },
        {
          hours: hours_1_75,
          minutes: minutes_1_75,
          seconds: seconds_1_75,
          speed : '1.75x'
        }, {
          hours: hours_2_00,
          minutes: minutes_2_00,
          seconds: seconds_2_00,
          speed : '2x'
        }
      ]
    }

    res.status(200).json(Response);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })

  }
})


module.exports = router