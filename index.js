 L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
// var map = L.mapbox.map('map', 'examples.map-i86nkdio')
//     .setView([40, -74.50], 9);


var center = {
	location: [51.505, -0.09],
	zoom: 11
};

var tileJsonA = {
	tiles: [
		'https://a.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
		'https://b.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
		'https://c.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
		'https://d.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png'
	],
	legend: "Dangerous zones are red, safe zones are green",
	minzoom: 8,
	maxzoom: 14,
    //center: [-0.09, 51.505, 11],
};

var tileJsonB = {
    tilejson: "2.1.0",
    name: "OpenStreetMap",
    description: "A free editable map of the whole world.",
    tiles: [
        "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ],
    minzoom: 10,
    maxzoom: 14,
    //center: [-0.09, 51.505, 11],
}

var map = L.mapbox.map('map')
			.setView(center.location, center.zoom);

var layerA = L.mapbox.tileLayer(tileJsonA);
var layerB = L.mapbox.tileLayer(tileJsonB);

map.addLayer(layerA);



var geoJson = [{
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-0.09, 51.505]
      },
      properties: {
          	title: 'Marker One',
          	'marker-color': '#228b22',
	        "marker-size": "large",
	        "marker-symbol": "building"
      }
  },
  {
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-0.095, 51.55]
      },
      properties: {
          title: 'Marker Two',
          'marker-color': '#ba1a1a'
  }
}];

var myLayer = L.mapbox.featureLayer().addTo(map);
myLayer.setGeoJSON(geoJson);


/*
map.addControl(L.mapbox.infoControl().addInfo('foo fweuif bwiu fiwu fiwufiwb'));

map.addControl(L.mapbox.shareControl());
*/


L.Control.BackboneView = L.Control.extend({
	options: {
		position: "bottomright"				
	},

	initialize: function(options){
		console.log("control initialize");
//debugger;
		L.Util.setOptions(this, options);

		if(options.view){
			this._view = options.view;	
			options.view.map = this;
		}
		
		
	},

	onAdd: function (map) {
		console.log("control onAdd");
//debugger;
	    return this._view.el;
	},

	onRemove: function(map){
		console.log("control onRemove");
//debugger;
		//this.view.destroy();
		//this.view = undefined;
	},

	getView: function(){
		return this._view;
	},

	// this is essentially the locally already implemented in the addTo method in L.Control
	resetView: function(view){
//debugger;
		var map = this._map,
			container, pos, corner;

		if (map) {
			this._view = view;	
			view.map = map;
			pos = this.getPosition();
		    corner = map._controlCorners[pos];

		    // remove the current element
			corner.removeChild(this._container);

			// update the element to the the one relative to the passed view
			container = this._container = view.el;
			L.DomUtil.addClass(container, 'leaflet-control');

			if (pos.indexOf('bottom') !== -1) {
				corner.insertBefore(container, corner.firstChild);
			} else {
				corner.appendChild(container);
			}
		}

		return this;
	}

});


// create an instance of a backbone model
var myModel = new Backbone.Model({
	now: Date.now()
});

var MyView = Mn.ItemView.extend({
	className: "info",
	template: _.template("<h1 class='title'>The control title was clicked</h1><span>The time is <%= now %></span>"),
	modelEvents: {
		"change": "render"
	},
	triggers: {
		"click .title": "control:clicked"
	},
	onControlClicked: function(){
		this.model.set("now", Date.now());
	}
});

// instead of working with an HTMLElement directly (this.div), we work with a Marionette View (this.el);
// the manipulation of the element is done through Marionette
var myView = new MyView({
	model: myModel
});


// when the control instance is created we must pass the backbone view in the options; later
// we can reset the view with info.resetView(view)
var info = new L.Control.BackboneView({
	view: myView,
	position: "topright"
});

info.addTo(map);
myView.render();



var MyView2 = Mn.ItemView.extend({
	className: "info",
	template: _.template("<h1 class='title'>Hello world! This is view 2!</h1><span>The time is <%= now %></span>"),
	modelEvents: {
		"change": "render"
	},
	triggers: {
		"click .title": "control:clicked"
	},
	onControlClicked: function(){
		this.model.set("now", Date.now());
	}
});

// instead of working with an HTMLElement directly (this.div), we work with a Marionette View (this.el);
// the manipulation of the element is done through Marionette
var myView2 = new MyView2({
	model: myModel
});
myView2.render();
