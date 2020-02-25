$(document).ready(() => {
  $("#tweet-form").on('input', function () {
    const $testAreaCount = $(this).parent().find("#tweet-area").val().length
    $(this).parent().find(".counter").text(140 - $testAreaCount)
    if ($testAreaCount > 140) {
      $(this).parent().find(".counter").addClass("red");
    } else {
      $(this).parent().find(".counter").removeClass("red");
    }
  });
})