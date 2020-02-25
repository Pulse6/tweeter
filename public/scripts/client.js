/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const renderTweets = function(tweets) {
//   // loops through tweets
//   // calls createTweetElement for each tweet
//   // takes return value and appends it to the tweets container
// }

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const text = tweetData.content.text
  const date = tweetData.created_at

let $tweet =
  `
<article class="tweet>
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

$(document).ready(() => {
  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
});