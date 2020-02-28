$(document).ready(() => {
  $("#tweet-form").on('input', function() {
    const $testAreaCount = $(this).parent().find("#tweet-area").val().length;
    $(this).parent().find(".counter").text(140 - $testAreaCount);
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
  const nav = document.getElementById("show-and-hide");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      nav.style.display = "none";
      mybutton.style.display = "block";
    } else {
      nav.style.display = "flex";
      mybutton.style.display = "none";
    }
  };
  // when botton click brings you to the top
  $("#myBtn").on('click', function() {
    $(".animation").slideDown("slow");
    $(".alert").text('').slideUp("slow");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});