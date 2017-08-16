function myMap() {
    var mapCanvas = document.getElementById("map");    
    var geocoder;
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': 'Ομήρου 9, Ταύρος, Ελλάδα'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    var mapOptions = ({
        //center: myCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var map = new google.maps.Map(mapCanvas, mapOptions);
};