(function(){
	var map, panorama,
	  currentPositionMarker,
	  stops = [],
	  currentStop = {};
	  
	function loadMap() {
		if(!map){
			var mapOptions = {
				zoom: 18,
				center: new google.maps.LatLng(53.485594,-2.245434),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
			
			getCurrentPosition();
		}
	}
	
	function updateMapToCurrentPosition(geoposition){
	
	
		var myLatLng = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude) 
	
		map.setCenter(myLatLng);	
		
		getLocalStops(geoposition.coords.latitude, geoposition.coords.longitude);
		
		currentPositionMarker = new google.maps.Marker({
						position: myLatLng,
						map: map,
						title: 'You',
						icon: "/person.png"
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
	
	function getStopsWithinView(){
		var bounds = map.getBounds(),
			ne = bounds.getNorthEast(),
			sw = bounds.getSouthWest();
		
		
		
			
	}
	
	function createStop(stop){
	       var  marker;
        
        
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(stop.latitude, stop.longitude),
				map: map,
				title: stop.common_name,
				draggable: false,
				icon: "http://google-maps-icons.googlecode.com/files/bus.png"
			}); 
			
			google.maps.event.addListener(marker, 'click', function() {
				getBuses(stop.common_name);
	        });	
	        
		return {m: marker};
	}

	function getBuses(stopName){
		$("#stop-name").text(stopName);
		$(".buses .bus").remove();
		
		$("<li class='bus'><a href='#'><strong class='bus-name'>X5</strong> <span class='bus-destination'>Bury</span> <span class='bus-time'>15mins</span></a></li>").appendTo('.buses');
		
		$(".buses").listview('refresh');
		$("#popupMenu").popup("open");
	}
	
	function showStopsOnMap(data){
		var l = data.length;
		
		stops = [];
		
		for(var i=0; i < l; i++){
			stops.push(createStop(data[i]));     
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
	    scroll(0, 0);
	    var header = $(".ui-header:visible");
	    var footer = $(".ui-footer:visible");
	    var content = $(".ui-content:visible");
	    var viewport_height = $(window).height();
	    
	    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
	    
	    content_height -= (content.outerHeight() - content.height());
	    content.height(content_height);
	  };	
	  
	  $( '#map-page' ).live( 'pageshow',function(event){
		  	$('#panorama').click(toggleStreetView);
		  	
		  	fixgeometry();
			loadMap();
	  });
	  
	  $( '#stop-page').live( 'pageshow', function(event){
	  		$("#stop-name").text(currentStop.name);
	  		
	  });
})(); 	 	