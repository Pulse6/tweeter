/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

//making sure what user input wont affect our webpage
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// converts milliseconds to year/day/hour/sec
function convertMS(milliseconds) {
  let diff = Date.now() - milliseconds;
  let day, hour, minute, seconds;
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
// mock up for a new tweet
const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const text = tweetData.content.text;
  const { year, day, hour, minute, seconds } = convertMS(tweetData.created_at);
  const date = `${year}year ${hour}hours ${minute}mins ${seconds}s`;
  let $tweet =
    `
<article class="tweet">
<section class="adding-form">
<header class="flex-and-spacebetween">
  <div class="flex-and-spacebetween">
    <img src=${avatars} alt="icon">
    <h3>${name}</h3>
  </div>
  <div class="show-when-hover">
    <h3>${handle}</h3>
  </div>
</header>
<body>
  <p class="adding-form-display">
  ${escape(text)}
  </p>
</body>
<hr>
<footer class="flex-and-spacebetween">
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
</footer>
</article>
`;
  return $tweet;
};
// adding new tweets at the top of the page
const renderTweets = (data) => {
  $('#tweets-container').empty();
  for (let key of data) {
    const $tweet = createTweetElement(key);
    $('#tweets-container').prepend($tweet);
  }
};

// geting data and put data to renderTweets function
const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', datatype: 'json' })
    .then((data) => {
      renderTweets(data);
    });
};

$(document).ready(() => {
  // what happens when its click
  $("#toggle-input").click(function () {
    $(".animation").slideToggle("slow", function () {
      $(".alert").text('').slideUp("slow");
      $("#toggle-input").removeClass("red");
      $("#tweet-area").focus();
      $area.val('');
      $area.parent().find(".counter").text(140);
      $area.parent().find(".counter").removeClass("red");
    });
  });
  // calling funciton
  loadTweets();

  const $form = $('#tweet-form');
  const $area = $('#tweet-area');

  $form.on('submit', () => {
    event.preventDefault();
    $(".alert").text("").slideUp("slow", () => {
      if ($area.val().length > 140) {
        $(".alert").text("💣 You have input more than 140 text!!!!! 💣").slideDown("slow");
        $("#toggle-input").addClass("red");
        return;
      } else if ($area.val() === "" || $area.val() === null) {
        $(".alert").text("🧨 Please input a tweet before tweeting!!!!! 🧨").slideDown("slow");
        $("#toggle-input").addClass("red");
        return;
      }

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $form.serialize(),
        success: () => {
          $(".animation").slideUp("slow");
          $(".alert").text('').slideUp("slow");
          $area.parent().find(".counter").text(140);
          $area.val('');
          $("#toggle-input").removeClass("red");
          loadTweets();
        }
      });
    });
  });
});