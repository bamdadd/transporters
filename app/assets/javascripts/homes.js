// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
      // $("#searchStops").change(getStops);
      var getStops = function(){
	  console.log($("#searchStops").val());
	  $.ajax({
		     url: '/stops/find/'+$("#searchStops").val(),
		     dataType: 'json',
		     success: loadStopList
		 });
      };
      var loadStopList = function(data){
	  var list = $("#stopList");
	  list.empty();
	  $.each(data, function(index, value) { 
		     list.append("<li>"+value.common_name +"</li>");
		 });
	  list.listview('refresh');
      };

      var typingTimer;                //timer identifier
      var doneTypingInterval = 500;  //time in ms, 5 second for example
      
      //on keyup, start the countdown
      $('#searchStops').keyup(function(){
				  typingTimer = setTimeout(getStops, doneTypingInterval);
			      });
      
      //on keydown, clear the countdown 
      $('#searchStops').keydown(function(){
				    clearTimeout(typingTimer);
				});
      
});
