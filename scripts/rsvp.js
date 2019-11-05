console.log('hook to google sheets');

var $form = $('form#rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbwCTPFpbEd5dODjuqF2JUvRvhETNkj6w1AXrqlcICNkL8yz4hM/exec'

$('#rsvp-submit-btn').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
    // do something
    console.log('api success');
  );
});





$(document).on('change', '#rsvp-decline', function(val) {
  console.log('change');
});

// DO NOT DELETE
// https://script.google.com/macros/s/AKfycbwCTPFpbEd5dODjuqF2JUvRvhETNkj6w1AXrqlcICNkL8yz4hM/exec
