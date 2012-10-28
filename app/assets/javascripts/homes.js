// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



$( '#find-bus').live( 'pageshow', function(event){
      var getRoute = function(){
        var search = $("#searchRoute").val();
        
        if(search){
		    $.ajax({
			     url: '/routes/filter/'+search,
			     dataType: 'json',
			     success: loadRouteList
			 });
		} else {
			clearList();
		}
      };
      var clearList = function(){
      	$("#routesList").empty();      
      };
      var loadRouteList = function(data){
	  var list = $("#routesList");
	  list.empty();
	  	$.each(data, function(index, value) { 
			   
			list.append("<li><a href='/routes/show/"+ value.route_name +"'>"+value.route_name +"</a></li>");
		});
	  	list.listview('refresh');
      };
      // $("#searchRoute").change(getRoute);
      var typingTimer;                //timer identifier
      var doneTypingInterval = 5;  //time in ms, 5 second for example


      
      //on keyup, start the countdown
      $('#searchRoute').keyup(function(){
				  typingTimer = setTimeout(getRoute, doneTypingInterval);
			      });
      
      //on keydown, clear the countdown 
      $('#searchRoute').keydown(function(){
				    clearTimeout(typingTimer);
				});
 	  $('.ui-input-clear').live('click', clearList);
      
  });
