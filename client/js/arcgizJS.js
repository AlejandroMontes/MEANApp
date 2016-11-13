var map;
      var graphic;
      var currLocation;
      var watchId;
      require([
        "esri/map", "esri/geometry/Point", "esri/geometry/webMercatorUtils", "dojo/dom",
        "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/graphic", "esri/Color", "dojo/domReady!"
      ], function(
        Map, Point, webMercatorUtils, dom,
        SimpleMarkerSymbol, SimpleLineSymbol,
        Graphic, Color
      ) {
        map = new Map("map", {
          basemap: "streets",
          center: [-102.271, 21.847],
          zoom: 14
        });

        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        markerSymbol.setColor(new Color("#00FFFF"));

        map.on("load", function() {
                  initFunc();
                  //after map loads, connect to listen to mouse move & drag events
                  map.on("mouse-move", showCoordinates);
                  map.on("mouse-drag", showCoordinates);
                  map.on("click", addDonator);
                });

        map.graphics.on("click", function(e){
          //get the associated node info when the graphic is clicked
          var node = e.graphic.getNode();
          console.log(node);
        });

        function orientationChanged() {
          if(map){
            map.reposition();
            map.resize();
          }
        }
        function showCoordinates(evt) {
          //the map is in web mercator but display coordinates in geographic (lat, long)
          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
          //display mouse coordinates
          dom.byId("info").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
        }

        function addDonator(evt){
          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
          var pt = new Point(mp.x.toFixed(3), mp.y.toFixed(3));
          addGraphic(pt);

        }

        function initFunc(map) {
          if( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
            watchId = navigator.geolocation.watchPosition(showLocation, locationError);
          } else {
            alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
          }
        }


        function locationError(error) {
          //error occurred so stop watchPosition
          if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }

        function zoomToLocation(location) {
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          addGraphic(pt);
          map.centerAndZoom(pt, 16);
        }

        function showLocation(location) {
          //zoom to the users location and add a graphic
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          if ( !graphic ) {
            addGraphic(pt);
          } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
          }
          map.centerAt(pt);
        }

        function addGraphic(pt){
          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE,
            12,
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([0, 0, 255, 0.5]),
              8
            ),
            new Color([0, 0, 255, 0.9])
          );
          graphic = new Graphic(pt, symbol);
          map.graphics.add(graphic);
        }
      });
