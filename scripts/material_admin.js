  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();
  
  
  $(document).ready(function() {
    $('select').material_select();
  });
  
  
  
  
  
function changeMission(outcomeid, taskid){
    
    
    $.get( "/api/outcome/addMissionAjax", { outcomeid: outcomeid, taskid: taskid } )
    .done(function( data ) {
      //alert( "Data Loaded: " + data );
    });
    
}