
      var map;
      function initialize() {
        var mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(-34.397, 150.644),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
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
    console.log(content_height);
      		initialize();
  }; /* fixgeometry */

  
  $( '#map-page' ).live( 'pageshow',function(event){
	  	fixgeometry();

  });
