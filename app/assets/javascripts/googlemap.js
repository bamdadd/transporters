
      var map,
      	  currentPositionMarker;
      	  
      function loadMap() {
        var mapOptions = {
          zoom: 16,
          center: new google.maps.LatLng(-34.397, 150.644),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
       	getCurrentPosition();
      }
      
      function updateMapToCurrentPosition(geoposition){
      		var myLatLng = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude) 
      		map.setCenter(myLatLng);	
      		
      		currentPositionMarker = new google.maps.Marker({
            	position: myLatLng,
            	map: map,
            	title: 'You'
        	});      
      }
      
      function getCurrentPosition(){
      	if(navigator.geolocation){
	      	navigator.geolocation.getCurrentPosition(updateMapToCurrentPosition,geoLocationFailure);
    	}  
      }
      
      function geoLocationFailure(){
      	alert("could not get your current position");
      }
      
      
      
function fixgeometry() {
    /* Some orientation changes leave the scroll position at something
     * that isn't 0,0. This is annoying for user experience. */
    scroll(0, 0);

    /* Calculate the geometry that our content area should take */
    var header = $(".ui-header:visible");
    var footer = $(".ui-footer:visible");
    var content = $(".ui-content:visible");
    var viewport_height = $(window).height();
    
    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    
    /* Trim margin/border/padding height */
    content_height -= (content.outerHeight() - content.height());
    content.height(content_height);
  }; /* fixgeometry */

  
  $( '#map-page' ).live( 'pageshow',function(event){
	  	fixgeometry();
		loadMap();
  });
