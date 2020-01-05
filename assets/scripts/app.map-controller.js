         var geocoder;
         var geoLocation;
         var map;
         var from = {lat:9.039580, lng:7.503266};
         var to= {lat:9.041658, lng:7.503192};

          function initiateTravel(){
              var newFrom=getAddress('from');
              var newTo=getAddress('to');
              from=newFrom;
              to=newTo;
              initMap();
          }
        
          function getAddress(address){
            var geoAddress= document.getElementById(address).value;
            geocoder.geocode({ 
                'address': geoAddress
            }, 
            function(results, status) {
              if (status == 'OK') {
                   geoLocation=results[0].geometry.location;
              } else {
                  geo=status;
                alert('Geocode was not successful for the following reason: ' + status);
              }
            }); 

            if(typeof geoLocation !== typeof undefined){
              return geoLocation;
            }
            else{
                return 'loading...';
            }
          }
      function initMap() {
          
        geocoder = new google.maps.Geocoder();
        var map = new google.maps.Map(document.getElementById('mapView'), {
          center:from,
          zoom: 8
        });
             
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Set destination, origin and travel mode.
        var request = {
          destination: to,
          origin: from,
          travelMode: 'DRIVING'
        };
          
        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
          
       google.maps.event.addListener(map, 'zoom_changed', function () {
                var maptype = map.getMapTypeId();
                if (map.getZoom() >= map.mapTypes[maptype].maxZoom) {
                    if (map.getMapTypeId() != google.maps.MapTypeId.HYBRID) {
                        map.setMapTypeId(google.maps.MapTypeId.HYBRID)
                        map.setTilt(0); // disable 45 degree imagery
                    }
                }
          });
      } 