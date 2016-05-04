
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

  // Hubway XML station feed
  var url = 'http://www.thehubway.com/data/stations/bikeStations.xml';

  // TO-DO: LOAD DATA
  var yql = 'http://query.yahooapis.com/v1/public/yql?q='     + encodeURIComponent('SELECT * FROM xml WHERE url="' + url + '"')     + '&format=json&callback=?';

  var stations;

  // AJAX call
  $.getJSON(yql, function(jsonData) {

    console.log(jsonData);

    stations = jsonData.query.results.stations.station;
    console.log(stations);

    // Convert strings to numbers
    stations.forEach(function(station) {
      for (var key in station) {
        if (key != "id" && !isNaN(station[key])) {
          station[key] = +station[key];
        }
      }
    });

    // Station count
    $("#station-count").html(stations.length);

    allData = stations;

    // Create the vis
    createVis()

  });
}


function createVis() {

  // TO-DO: INSTANTIATE VISUALIZATION
  stationMap = new StationMap("station-map", allData, [42.360082, -71.058880]);

}
