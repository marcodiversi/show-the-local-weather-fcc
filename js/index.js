/*A local weather web-app that generates your local weather based on your IP. 
 */
$(document).ready(function() {

  //get location by ip sadasda
  $.ajax({
    type: 'GET',
    url: 'https://ipinfo.io/json/',
    success: coordinates
  });
  //coordinates callback

  function coordinates(point) {
    var coords = point.loc.split(',');
    var lat = parseFloat(coords[0]);
    var lon = parseFloat(coords[1]);
    var city = point.city;
    var region = point.region;
    var country = point.country;

    //forecast.io api
    var api = 'https://api.forecast.io/forecast/7c693e97458b09a53aa5f7e2cd0af4a0/' + lat + ',' + lon + '?units=si';

    //display city, region and country
    displayLocation(city, region, country);

    //insert location into getWeather function
    getWeather(api);

  } //end coordinates

  function displayLocation(city, region, country) {

    //country code to full country
    $.ajax({
      type: 'GET',
      url: 'https://restcountries.eu/rest/v1/alpha?codes=' + country,
      success: function(data) {
        //spit this out to website
        $('#city').text(city + "," + region);
        $('#country').text(data[0].name);
      }
    });
  } //end displayLocation

  //get the  weather
  function getWeather(url) {
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      success: weather
    });

    function weather(data) {

      //main forecast
      var temp = Math.round(data.currently.temperature),
        conditions = data.currently.icon.split('-').join(' '),
        icon = data.currently.icon,
        low = Math.round(data.daily.data[0].temperatureMin),
        high = Math.round(data.daily.data[0].temperatureMax);

     

      //display weather on website
      displayWeather(icon, temp.toFixed(0), conditions, low, high);

      //convert daily units
      $('#F').on('click', function() {
        displayWeather(icon, toFah(temp.toFixed(0)));
        $('#F').prop('disabled', true);
        $('#C').prop('disabled', false);

      });

      $('#C').on('click', function() {

        displayWeather(icon, temp.toFixed(0));
        $('#C').prop('disabled', true);
        $('#F').prop('disabled', false);
       
      });
    } 

    function displayWeather(icon, temp, condition, low, high) {
      //plop to website

      $('#temp').text(temp + '\xB0');

    } //end displayWeather

    function toFah(temp) {
      return parseInt(temp * (9 / 5) + 32);
    } //end convert to fahrenheit

  } //end getWeather

});