/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const data = [
  {
    "user": {
      "name": "いつき",
      "avatars": "https://img.favpng.com/10/0/3/anime-icon-away-icon-face-icon-png-favpng-kQqBnHR7jN8TxGRq3TJhqzewe.jpg"
      ,
      "handle": "@い"
    },
    "content": {
      "text": "おはようございます。"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "あきら",
      "avatars": "https://www.pinclipart.com/picdir/middle/72-727796_chibi-clipart-cat-cat-anime-png-download.png",
      "handle": "@あ"
    },
    "content": {
      "text": "おねがいします。"
    },
    "created_at": 1461113959088
  }
]

function convertMS(milliseconds) {
  let diff = Date.now() - milliseconds
  var day, hour, minute, seconds;
  seconds = Math.floor(diff / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  year = Math.floor(day / 365);
  return {
    year: year,
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds
  };
}

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const text = tweetData.content.text
  const { year, day, hour, minute, seconds } = convertMS(tweetData.created_at)
  const date = `${year}year ${day}days ${hour}hours ${minute}mins ${seconds}s`

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
  ${escape(text)}
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
    $('#tweets-container').prepend($tweet);
  }
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', datatype: 'json' })
    .then((data) => {
      renderTweets(data)
    })
}
// toggle-input   toggle-in-and-out
$(document).ready(() => {

  // $('#toggle-input').on('click', () => {
  //   $('.animation').toggleClass('toggle-in-and-out')
  // })

  $("#toggle-input").click(function () {
    $(".animation").slideToggle("slow", function () {
    });
  });

  loadTweets()

  const $form = $('#tweet-form');
  const $area = $('#tweet-area');

  $form.on('submit', () => {
    event.preventDefault()
    // console.log($area.val().length)
    if ($area.val().length > 140) {
      $(".alert").text("You have input more than 140 text!!!!!");
      return;
    } else if ($area.val() === "" || $area.val() === null) {
      $(".alert").text("Please input a tweet before tweeting!!!!!");
      return;
    }
    // console.log($('#tweet-area').val())
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $form.serialize(),
      success: () => {
        $area.val('')
        $area.parent().find(".counter").text(140)
        $(".alert").text('')
        loadTweets();
      }
    })
  })
});