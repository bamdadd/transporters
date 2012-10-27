
	var map, panorama,
	  currentPositionMarker,
	  stops = [];
	  
	function loadMap() {
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(53.485594,-2.245434),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		
		getCurrentPosition();
	}
	
	function updateMapToCurrentPosition(geoposition){
		var myLatLng = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude) 
		map.setCenter(myLatLng);	
		
		getLocalStops(geoposition.coords.latitude, geoposition.coords.longitude);
		
		currentPositionMarker = new google.maps.Marker({
						position: myLatLng,
						map: map,
						title: 'You'
					}); 
		setUpPanorama(myLatLng);     
		
	}
	
	
	function getAllStops(){
		$.ajax({
  			url: '/stops',
 			dataType: 'json',
			  success: showStopsOnMap
			});		
	}
	
	function getLocalStops(lat, lon){
		$.ajax({
  			url: '/stops/find/'+lat +'/'+lon,
 			dataType: 'json',
			success: showStopsOnMap
		});		
	
	}
	
	function showStopsOnMap(data){
		var l = data.length,
			marker;	
		
		for(var i=0; i < l; i++){

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
					map: map,
					title: data[i].common_name,
					draggable: false
				}); 
				stops.push(marker);     
		}		
	}
	function setUpPanorama(myLatLng){
        panorama = map.getStreetView();
        panorama.setPosition(myLatLng);
        panorama.setPov({
          heading: 265,
          zoom:1,
          pitch:0}
        );
	
	}
	function toggleStreetView() {
        var toggle = panorama.getVisible();
        if (toggle == false) {
          panorama.setVisible(true);
        } else {
          panorama.setVisible(false);
        }
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
		  	$('#panorama').click(toggleStreetView);
		  	fixgeometry();
			loadMap();
	  });
 	 	