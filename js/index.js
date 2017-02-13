/* <!-- REMOVE THE s FROM THE HTTPS LINK TO MAKE IT WORK EXAMPLE https://codepen.. has to be http://codepen.... -->*/

$(document).ready(function() {

  var url = "http://ip-api.com/json";
  $.getJSON(url, function(data) {
    console.log(data);
    var city = data.city;
    var cCode = data.countryCode;
    var country = data.country;
    $('#city').html(city);
    $('#country').html(country);

    var url2 = "http://api.openweathermap.org/data/2.5/forecast/city?q=" + city + "," + cCode + "+&APPID=0e8682a11cf28a7f98e8593f48df8c16&units=metric";

    $.getJSON(url2, function(data2) {
      console.log(data2);
      var temp = Math.round(data2.list[0].main.temp);

      if (temp > 25) {
        $('body').css('background-image', 'url(http://bit.ly/2k2tu2l)');
      } else if (temp < 25 & temp > 5) {
        $('body').css('background-image', 'url(http://bit.ly/2kE66J3)');
      } else if (temp < 5) {
        $('body').css('background-image', 'url(http://bit.ly/2komBZF)');
      }

   $('#temp').html(temp + " °C");
      
   $('#F').click(function() {
   $('#temp').html(Math.round((temp * (9 / 5) + 32)) + " °F");

   $('#C').click(function() {
   $('#temp').html(temp + " °C");

        });
      });
    });
  });
});