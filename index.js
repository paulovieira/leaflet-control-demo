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



		L.Control.BackboneView = L.Control.extend({
			options: {
				position: "bottomright"				
			},

			initialize: function(options){
				console.log("control initialize");
//debugger;
				L.Util.setOptions(this, options);
				this.view = options.view;
				

				//this.div = this.view.el;


				// var div1 = this.view.el;
				// var div2 = L.DomUtil.create('div', this.options.className || "");

				// debugger;

				// this.div = this.view.el;
			},

			onAdd: function (map) {
//				debugger;
				console.log("control onAdd");

			    //this.div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
			    //this.update();
			    this.view.render();

			    return this.view.el;
			},

			onRemove: function(map){
				debugger;
				//this.view.destroy();
				//this.view = undefined;
			},

			// method that we will use to update the control based on feature properties passed
			update: function (props) {
				console.log("control update");
//debugger;
				this.model.set("now", Date.now());
				//debugger;
			    // this.div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
			    //     '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
			    //     : 'Hover over a state');

				//this.div.innerHTML = "control contents @ " + Date.now();

				//this.

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



		var info = new L.Control.BackboneView({
			view: myView,
			position: "topright"
		});

		info.addTo(map);


		var scaleControl = new L.Control.Scale({
			position: "bottomright",
			xyz: "abd"
		});
		scaleControl.addTo(map);


*/