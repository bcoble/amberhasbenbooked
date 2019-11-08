let previousNumOfGuests = 1;

var $form = $('form#rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbwCTPFpbEd5dODjuqF2JUvRvhETNkj6w1AXrqlcICNkL8yz4hM/exec'

$(document).on('submit', 'form', function(event){
  const _data = $(this).serializeArray();
  const guests = _data.filter(formItem => {
    return formItem.name === 'guest-name';
  });
  console.log(guests);

  _data.push({name: 'group-name', value: guests[0].value});
  _data.push({name: 'date-submitted', value: new Date().toDateString()});

  console.log(_data);
  $('#rsvp-submit-btn').remove();
  $('.submit.rsvp-form__section').append('<p class="thankyou">Submitting your RSVP...</p>');
  event.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: _data
  }).done(function() {
    $('.thankyou').remove();
    $('.submit.rsvp-form__section').append('<p class="thankyou">Thank you so much!</p>');
  });
});

$(document).on('change', '#rsvp-decline', function(event) {
  $('#note-section').show();
  $('#decline-name').addAttr('required');

  $('.number-of-guests').hide();
  $('#guest-name').removeAttr('required');

  $('#guest-info-wrapper').hide();
  $('#plate-type').removeAttr('required');

});

$(document).on('change', '#rsvp-accepts', function(event) {
  $('#note-section').hide();
  $('#decline-name').removeAttr('required');

  $('.number-of-guests').show();
  $('#guest-name').addAttr('required');

  $('#guest-info-wrapper').show();
  $('#plate-type').addAttr('required');
});

$(document).on('change', '#number-of-guests', function(event) {
  const newCount = event.currentTarget.value;
  if (newCount > previousNumOfGuests) {
    $('#guest-info-wrapper').append('<p>test</p>');
  } else if (newCount < previousNumOfGuests) {
    $('#guest-info-wrapper > .guest-item:last-of-type()').remove()
  }
  previousNumOfGuests = newCount;
});
