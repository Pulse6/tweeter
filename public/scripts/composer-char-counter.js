$(document).ready(() => {
  $("#tweet-form").on('input', function () {
    const $testAreaCount = $(this).parent().find("#tweet-area").val().length
    $(this).parent().find(".counter").text(140 - $testAreaCount)
    if ($testAreaCount > 140) {
      $(this).parent().find(".counter").addClass("red");
      // $("#toggle-input").addClass("red")
    } else {
      $(this).parent().find(".counter").removeClass("red");
      // $("#toggle-input").removeClass("red")
    }
  });

  //Get the button
  const mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  $("#myBtn").on('click', function () {
    topFunction()
  })
})