$(function () {
  // Digits only in the mobile field
  $('#mobile').on('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });

  // Waitlist form validation
  $('#join').on('click', function () {
    var name = $.trim($('#name').val()),
        mobile = $.trim($('#mobile').val()),
        interest = $('#interest').val(),
        city = $.trim($('#city').val()),
        $msg = $('#msg'),
        err = '', $bad = null;

    $('.f').css('border-color', '#cfdcf0');

    if (!name) { err = 'Please enter your name.'; $bad = $('#name'); }
    else if (!/^[6-9]\d{9}$/.test(mobile)) { err = 'Enter a valid 10-digit mobile number.'; $bad = $('#mobile'); }
    else if (!interest) { err = 'Please select your interest.'; $bad = $('#interest'); }
    else if (!city) { err = 'Please enter your city.'; $bad = $('#city'); }

    if (err) {
      $bad.closest('.f').css('border-color', '#c62828');
      $msg.attr('class', 'msg err').text(err).slideDown(150);
      return;
    }

    $.ajax({
      url: 'https://api.web3forms.com/submit',
      method: 'POST',
       dataType: 'json',
  data: {
    access_key: '21863e89-d2ea-4a81-a14f-06060f81eb76',
    subject: 'New LifeTime Waitlist Signup',
    from_name: 'LifeTime Website',
    name: name,
    mobile: mobile,
    interest: interest,
    city: city
  },
      success: function (response) {
        if (response.success) {
          $msg.attr('class', 'msg ok')
            .text('Thank you! You are on the waitlist.').slideDown(150);
          $('.f input').val('');
          $('#interest').val('');
        } else {
          $msg.attr('class', 'msg err')
            .text(response.message || 'Something went wrong. Please try again.').slideDown(150);
        }
      },
      error: function (xhr) {
        var message = (xhr.responseJSON && xhr.responseJSON.message) ||
          'Something went wrong. Please try again.';
        $msg.attr('class', 'msg err').text(message).slideDown(150);
      }
    });
  });

  // Enter key submits the form
  $('.fields input').on('keypress', function (e) {
    if (e.which === 13) $('#join').click();
  });

  // Keep placeholder links from jumping to the top
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });
});
