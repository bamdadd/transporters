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
	  
(function(){
	var map, panorama,
	  currentPositionMarker,
	  stops = [],
	  currentStop = {},
	  directionsDisplay,
	  directionsService = new google.maps.DirectionsService(),
	  myLatLng;
	  
	  
	function loadMap() {
		if(!map){
			var mapOptions = {
				zoom: 18,
				center: new google.maps.LatLng(53.485594,-2.245434),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};
			directionsDisplay = new google.maps.DirectionsRenderer();
			map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
			directionsDisplay.setMap(map);
			getCurrentPosition();
		}
	}
	
	function updateMapToCurrentPosition(geoposition){
	
	
		myLatLng = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude) 
	
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
				getBuses(stop);

	        });
 
		return {m: marker};
	}

	function getBuses(stop){
		$.mobile.loading('show');
        $.get('/stoptime/'+stop.code, function(time_data) {
            $("#stop-name").text(stop.common_name);
            $(".buses .bus").remove();
            for(var i = 0; i < 5; i++){
                $("<li class='bus' data-icon='false'><a href='#'><strong class='bus-name'>"+time_data.bus_numbers[0]+"</strong> <span class='bus-destination'>"+time_data.dir_name+"</span> <span class='bus-time'>"+time_data.bus_times[i].substring(11,16)+"</span></a></li>").appendTo('.buses');
            }
            $(".buses").listview('refresh');
            $.mobile.loading('hide');
            $("#popupMenu").popup("open");
        });

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
          
      
	  
	  
	  
	  function spike(){
	  	$.ajax({url: "/routes/index",
 				dataType: 'json',
			  	success: parseRoute
			});	
	  }
	  
	  function parseRoute(data){
	  	var route = data[0];
	  	var stops = route.stops;
	  	
	  	var subRoute;
	  	for(var loop = 0; loop < 1; loop++){
	  		subRoute =[];
		  	for(var i = 0; i < 10; i++){
		  		console.log(stops[0]);
		  		if(stops[0]){
			  		subRoute.push(stops.shift());	  	
				} else {
					break;
				}
	  		}
	  		console.log(subRoute);
	  		calcRoute(subRoute);
	  	}
	  	
	 // 	alert(route.stops.length);
	  		  	
	  	
	  }
	  
	  
	  function calcRoute(wpts) {
		  var start = wpts.shift();
		  var end = wpts[8];
		var wayPoints = [];
		
		for(var i = 0; i < 8; i++){
			wayPoints.push({
                location:wpts[i].latitude + ',' + wpts[i].longitude,
                stopover:true
			})
		
		}
		   
		  
		  
		  var request = {
		      origin: start.latitude + ',' + start.longitude,
		      destination: end.latitude + ',' + end.longitude,
		      waypoints: wayPoints,
		      travelMode: google.maps.TravelMode.DRIVING
		  };
		  
		  directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		     
		     new google.maps.polyline({
		     	map: map,
		     	
		     
		     });
		     
		      console.log(response.routes[0].overview_path);
		      //directionsDisplay.setDirections(response);
		    } else {
		    	console.log(google.maps.DirectionsStatus);
		    }
		  });
		}
	  
	  $( '#map-page' ).live( 'pageshow',function(event){
		  	$('#panorama').click(toggleStreetView);
		  	
		  	fixgeometry();
			loadMap();
	  });
	  
	  
	  $( '#stop-page').live( 'pageshow', function(event){
	  		$("#stop-name").text(currentStop.name);
	  		
	  });
	  
	  window.calcRoute = calcRoute;
	  window.spike = spike;
})(); 	 	