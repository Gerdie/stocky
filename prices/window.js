// Run this function after the page has loaded
var stocks = [
  "MBOT", // Microbot Medical, http://finance.yahoo.com/quote/MBOT
  "DLB", // Dolby Laboratories, https://finance.yahoo.com/quote/DLB
  "GPS" // The Gap stock... https://finance.yahoo.com/quote/GPS
];

var fields = 'f=pl1'; // Requests the current price and previous closing price

var getPrices = function() {

  var symbols = 's=' + stocks.join('+');
  var url = 'https://finance.yahoo.com/d/quotes.csv?' + fields + '&' + symbols;

  $.ajax(url).done(function (csv) {
    // Split the output up into an array of lines
    var lines = csv.trim().split('\n');
    console.log(lines);

    // Iterate over each line
    for (var i = 0; i < lines.length; i++) {
      //Split the line up by comma
      var prices = lines[i].split(',');

      // Previous closing price of stock symbol
      var previousPrice = parseFloat(prices[0], 10);

      // Current price of stock symbol
      var currentPrice = parseFloat(prices[1], 10);

      // Change between closing price and current price rounded to 2 decimal points.
      var change = Math.round((currentPrice - previousPrice) * 100) / 100;

      // Add a leading + for positive change
      if (change >= 0) {
        change = '+' + change;
      }

      // Add prices and changes to HTML element

      $('#' + i + '-price').text(currentPrice.toLocaleString());
      $('#' + i + '-change').text(change);
      $('#' + i + '-name').text(stocks[i]);

      // if (i == 0) { // Oil
      //   $('#oil-price').text(currentPrice.toLocaleString());
      //   $('#oil-change').text(change);
      // } else if (i == 1) { // Gold
      //   $('#gold-price').text(currentPrice.toLocaleString());
      //   $('#gold-change').text(change);
      // } else if (i == 2) { // Silver
      //   $('#silver-price').text(currentPrice.toLocaleString());
      //   $('#silver-change').text(change);
      // }
    }
  }).fail(function (error) {
    console.error(error);
  });

};

$(function () {

  getPrices();

// $.ajax(url).done(function (csv) {
//   // Split the output up into an array of lines
//   var lines = csv.trim().split('\n');

//   // Iterate over each line
//   for (var i = 0; i < lines.length; i++) {
//     //Split the line up by comma
//     var prices = lines[i].split(',');

//     // Previous closing price of stock symbol
//     var previousPrice = parseFloat(prices[0], 10);

//     // Current price of stock symbol
//     var currentPrice = parseFloat(prices[1], 10);

//     // Change between closing price and current price rounded to 2 decimal points.
//     var change = Math.round((currentPrice - previousPrice) * 100) / 100;

//     // Add a leading + for positive change
//     if (change >= 0) {
//       change = '+' + change;
//     }

//     // Add prices and changes to HTML element
//     if (i == 0) { // Oil
//       $('#oil-price').text(currentPrice.toLocaleString());
//       $('#oil-change').text(change);
//     } else if (i == 1) { // Gold
//       $('#gold-price').text(currentPrice.toLocaleString());
//       $('#gold-change').text(change);
//     } else if (i == 2) { // Silver
//       $('#silver-price').text(currentPrice.toLocaleString());
//       $('#silver-change').text(change);
//     }
//   }
// }).fail(function (error) {
//   console.error(error);
// });

});
