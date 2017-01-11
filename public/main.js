console.log("May the odds be ever in your favor");

$('#ready').click(function() {
  $.get('/challenges', function(data) {
    console.log(data);
    var html = $('<ol>');
    console.log(typeof data);
    data.forEach(function(obj) {
      console.log('ran');
      var challenge = $('<li>');
      challenge.text(obj.body);
      challenge.appendTo(html);
    })
    $('#challenges').append(html);
    var $next = $('<button>').attr('id', 'next').text('next').appendTo('.wrapper');
    var $moar = $('<div>').attr('id', 'moar').appendTo('.wrapper');
    $('#next').click(function() {
      $.get('/challenges?next=true', function(data) {
        var html = $('<ol>');
        data.forEach(function(obj) {
        var challenge = $('<li>');
        if (!obj.body.match(/\s/g)){
          challenge.text(decode(obj.body));
        } else {
        challenge.text(obj.body);
        }
        challenge.appendTo(html);
      })
        html.appendTo('#moar');
        console.log($('li').length);
        if($('li').length === 15){
          var $secret = $('<button>').attr('id', 'secret').text('secret').appendTo('.wrapper');
            $('#secret').click(function() {
              // $.get('https://mighty-caverns-93139.herokuapp.com/help', function(data) {

              // })
              $.ajax({
                type: 'GET',
                url: 'https://mighty-caverns-93139.herokuapp.com/help',
                crossDomain: true,
                dataType: 'json',
                beforeSend: function(request){
                  console.log(request)
                  request.setRequestHeader('x-secret', 'shh')
                },
                  success: function(data) {
                    console.log('success', data)
                  }
              })
          })
            var $decode = $('<button>').attr('id', 'decode').text('decode').appendTo('.wrapper');
            $('#decode').click(function() {
              $.post('https://mighty-caverns-93139.herokuapp.com/solution', {decode: 'SW4gPGNvZGU+cHVibGljL21haW4uanM8L2NvZGU+IHVwZGF0ZSA8Y29kZT5yZW5kZXJDaGFsbGVuZ2U8L2NvZGU+IHRvIG91dHB1dCA8Y29kZT4mbHQ7YSBocmVmPSIvY2hhbGxlbmdlcy9baWRdIiZndDtbQ2hhbGxlbmdlXSZsdDsvYSZndDs8L2NvZGU+', answer: 'CORS'}, function(data) {
                console.log('response', data);
                var decodedMsg = atob("SW4gPGNvZGU+cHVibGljL21haW4uanM8L2NvZGU+IHVwZGF0ZSA8Y29kZT5yZW5kZXJDaGFsbGVuZ2U8L2NvZGU+IHRvIG91dHB1dCA8Y29kZT4mbHQ7YSBocmVmPSIvY2hhbGxlbmdlcy9baWRdIiZndDtbQ2hhbGxlbmdlXSZsdDsvYSZndDs8L2NvZGU+")
              })
            })
      }
    })
  })
console.log('its clicked');
})
})

var decode = function(str) {
  return atob(str);
}




