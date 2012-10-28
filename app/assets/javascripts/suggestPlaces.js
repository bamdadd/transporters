function fromTo(){
      var from = document.getElementById('from');
      var from_ac = new google.maps.places.Autocomplete(from);

      var to = document.getElementById('to');
      var to_ac = new google.maps.places.Autocomplete(to);
      
      google.maps.event.addListener(from_ac, 'place_changed', function() {
					var place_from = from_ac.getPlace();
					if(place_from.geometry){
					    $(from).attr('lat', place_from.geometry.location.lat());
					    $(from).attr('long', place_from.geometry.location.lng());
					}
					    
					});
      
      google.maps.event.addListener(to_ac, 'place_changed', function() {
					var place_to = to_ac.getPlace();
					if(place_to.geometry){
					    $(to).attr('lat', place_to.geometry.location.lat());
					    $(to).attr('long', place_to.geometry.location.lng());
					}
					    
					});

      
      $("#search").click(function(){
      			$.mobile.loading('show');
			     $.mobile.changePage("/routes/search/" + $(from).attr('lat')+ "/" +
				 $(from).attr('long') + "/" + $(to).attr('lat') + "/" +
				 $(to).attr('long'));
			 });

  };    
  
  $( '#find-route').live( 'pageshow', fromTo);