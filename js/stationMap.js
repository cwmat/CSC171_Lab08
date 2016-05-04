
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data, _center) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.center = _center
  this.zoomLevel = 13;

  this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
  var vis = this;

  // Change images location
  L.Icon.Default.imagePath = 'img';

  vis.map = L.map(vis.parentElement).setView(vis.center, vis.zoomLevel);
  vis.basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contrib utors' }).addTo(vis.map);

  // Layers
  vis.lines = L.layerGroup().addTo(vis.map);
  vis.stations = L.layerGroup().addTo(vis.map);

  // Load MBTA lines
  function lineStyle(feature, layer) {
    return {color: feature.properties.LINE};
  }
  function linePopup(feature, layer) {
    layer.bindPopup("Route: " + feature.properties.ROUTE);
  }
  $.getJSON("../data/MBTA-Lines.json", function(data) {
    vis.lines.addLayer(L.geoJson(data, {
      style: lineStyle,
      onEachFeature: linePopup
    }));
  });

  vis.data.forEach(function(station) {
    var latlng = [station.lat, station.long];
    var popupContent = "Station: " + station.name + "<br>" +
                        "Bikes: " + station.nbBikes + "<br>" +
                        "Docks: " + station.nbEmptyDocks;

    vis.stations.addLayer(L.marker(latlng).bindPopup(popupContent));
  });

  vis.wrangleData();
}


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
  var vis = this;

  // Currently no data wrangling/filtering needed
  // vis.displayData = vis.data;

  // Update the visualization
  vis.updateVis();
}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
  var vis = this;
  
  vis.lines = L.layerGroup().addTo(vis.map);
  vis.stations = L.layerGroup().addTo(vis.map);

  vis.lines.addLayer(L.geoJSON);

  vis.data.forEach(function(station) {
    var latlng = [station.lat, station.long];
    var popupContent = "Station: " + station.name + "<br>" +
                        "Bikes: " + station.nbBikes + "<br>" +
                        "Docks: " + station.nbEmptyDocks;

    vis.stations.addLayer(L.marker(latlng).bindPopup(popupContent));
  });


}
