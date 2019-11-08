var $form = $('form#rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbwCTPFpbEd5dODjuqF2JUvRvhETNkj6w1AXrqlcICNkL8yz4hM/exec'

const guestInputHTML = `
<div class="guest-item">
  <div class="split">
    <label for="guest-name">First and Last Name</label>
    <input type="text" id="guest-name" name="guest-name" class="guest-name" required/>
  </div>
  <div class="split">
    <label for="plate-type">Plate Type</label>
    <select type="select" id="plate-type" name="plate-type" class="plate-type" required>
      <option value="">Select</option>
      <option value="brisket">Brisket</option>
      <option value="vegetarian">Vegetarian</option>
    </select>
  </div>
</div>
`;
let previousNumOfGuests = 1;

// Form submit
$(document).on('submit', 'form', function(event){
  const _data = $(this).serializeArray();
  const guests = _data.filter(formItem => formItem.name === 'guest-name');

  _data.push({name: 'group-name', value: guests[0].value});
  _data.push({name: 'date-submitted', value: new Date().toDateString()});

  $('#rsvp-submit-btn').remove();
  $('.submit.rsvp-form__section').append('<p class="thankyou">Submitting your RSVP...</p>');
  event.preventDefault();

  for (let i = 0; i < guests.length; i++) {
    const dataRef = _data;
    const formNoGuests = dataRef.filter(function(item) { return item.name !== 'guest-name'; });
    formNoGuests.push(guests[i]);

    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: formNoGuests
    });

    if (i === guests.length - 1) {
      jqxhr.done(function() {
        $('.thankyou').remove();
        $('.submit.rsvp-form__section').append('<p class="thankyou">Thank you so much!</p>');
      });
    }
  }
});

// Toggle required when selecting rsvp-decline
$(document).on('change', '#rsvp-decline', function(event) {
  $('#note-section').show();
  $('#decline-name').attr('required', 'required');

  $('.number-of-guests').hide();
  $('.guest-name').removeAttr('required');
  $('#guest-info-wrapper').hide();
  $('.plate-type').removeAttr('required');
});

// Toggle required when selecting rsvp-accept
$(document).on('change', '#rsvp-accepts', function(event) {
  $('#note-section').hide();
  $('#decline-name').removeAttr('required');

  $('.number-of-guests').show();
  $('.guest-name').attr('required', 'required');

  $('#guest-info-wrapper').show();
  $('.plate-type').attr('required', 'required');
});

// Add or remove guest row inputs
$(document).on('change', '#number-of-guests', function(event) {
  const newCount = event.currentTarget.value;
  if (newCount > previousNumOfGuests) {
    $('#guest-info-wrapper').append(guestInputHTML);
  } else if (newCount < previousNumOfGuests) {
    $('#guest-info-wrapper > .guest-item:last-of-type()').remove()
  }
  previousNumOfGuests = newCount;
});
