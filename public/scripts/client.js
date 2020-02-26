/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

function convertMS( milliseconds ) {
  var day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds
  };
}

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const text = tweetData.content.text
  const {day, hour, minute, seconds} = convertMS(tweetData.created_at)
  const date = `${day}days ${hour}hours ${minute}mins ${seconds}s`

let $tweet =
  `
<article class="tweet">
<section class="adding-form">
<section class="flex-and-spacebetween">
  <div class="flex-and-spacebetween">
    <img src=${avatars} alt="icon">
    <h3>${name}</h3>
  </div>
  <div class="show-when-hover">
    <h3>${handle}</h3>
  </div>
</section>
<section>
  <p class="adding-form-display">
  ${text}
  </p>
</section>
<hr>
<section class="flex-and-spacebetween">
  <div>
    <p class="adding-form-info">${date}</p>
  </div>
  <div class="adding-form-info">
    <ul class="media">
      <li><i class="fab fa-font-awesome-flag"></i></li>
      <li><i class="fas fa-retweet"></i></li>
      <li><i class="fas fa-heart"></i></li>
    </ul>
  </div>
</section>
</article>
`
return $tweet;
}
const renderTweets = (data) => {
  for (let key of data) {
    const $tweet = createTweetElement(key);
    $('#tweets-container').append($tweet);
  }
}

$(document).ready(() => {
  // const $tweet = createTweetElement(tweetData);
  // // Test / driver code (temporary)
  // // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet);
  renderTweets(data);
});

