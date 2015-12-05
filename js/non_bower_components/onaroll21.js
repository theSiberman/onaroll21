/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// This is form the survy form

$('a').tooltip();

function resizePage() {
    var wrapHeight = $("#wrap").height();
    var wrapperHeight = $(".wrapper").height();
    var page_content_height = $(".page-content").height();
    //console.log(wrapHeight);
    //console.log(page_content_height);
    if((page_content_height - wrapperHeight) > 0) {
        $(".wrapper").height(page_content_height+20);
    }
    
    //console.log('Content height: '+page_content_height);
}

$(document).ready(function(){
    /*Resize wrapper*/
    var wrapHeight = $("#wrap").height();
    var wrapperHeight = $(".wrapper").height();
    //console.log(wrapHeight);
    //console.log(wrapperHeight);
    if((wrapHeight - wrapperHeight) > 135) {
        $(".wrapper").height(wrapHeight-135);
    }
    
    /*This is for link fetching on status page*/
    var a=document.getElementsByTagName("a");
    for(var i=0;i<a.length;i++)
    {
        if(!$(a).hasClass('swipebox')) {
            a[i].onclick=function()
            {
                window.location=this.getAttribute("href");
                return false;
            }
        }
    }
    
    /*Messages page*/
    // Create the dropdown base
    $("<select class=\"form-control\" />").appendTo(".sidebar");

    // Create default option "Go to..."
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Message to..."
    }).appendTo(".sidebar select");

    // Populate dropdown with menu items
    $("ul#nav a").each(function() {
     var el = $(this);
     $("<option />", {
         "value"   : el.attr("href"),
         "text"    : el.text()
     }).appendTo(".sidebar select");
    });
    
    // bind change event to select
      $('.sidebar select').bind('change', function () {
          var url = $(this).val(); // get selected value
          if (url) { // require a URL
              window.location = url; // redirect
          }
          return false;
      });
    /*End Messages page*/
    
    /*Disable Status page*/
    $(".status-container.disabled *").attr("disabled", "disabled").off('click');
    
    //Let's check for keyup and detect the url
    $('#status_box').on('keyup paste',function(e) {
        //e.preventDefault();
    var key = event.keyCode || event.charCode;

    if( key != 8 && key != 46 ) {
        var regexp =  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        var text = $(this).val();
        if(text.match(regexp) && !text.match(/youtube/i) && !text.match(/vimeo/i) && !text.match(/soundcloud/i)) {
            
            $('.loading-img').show();
            //console.log('There is a match');
            setTimeout(function(){
                $('#status_box').preview({key:'32cce9cca4c64c9db56381944a48396b'});
            },1000);
            
            setTimeout(function(){
                $('.loading-img').hide();
            },1000);
        } else {
            //console.log('No match');
        }
    } else {
        //console.log('You pressed backspace');
    }
        
    });
    

    // On submit add hidden inputs to the form.
    $('#addPost').on('submit', function(){
      $(this).addInputs($('#status_box').data('preview'));
      return true;
    });
    if($('#preSurvey').length > 0) {
        $('#preSurvey').modal('show').css(
            {
                'margin-top': function () {
                    return ($(window).height() / 2)-100;
                }
            });
    }
    
    if($('#postSurvey').length > 0) {
        $('#postSurvey').modal('show').css(
            {
                'margin-top': function () {
                    return ($(window).height() / 2 )-100;
                }
        });
    }
    /*Embed audio and video files*/
    if($('video,audio').length !== 0) {
        $('video,audio').mediaelementplayer();
    }
//    }
    
    
//$(".survey-answers").each(function() {
//    var select = $(this).find(".selector");
//    var radios = $(this).find(":radio").hide();
//    var labels = $(this).find("label").hide();
//    // create a select element
//    $("<select />").appendTo(select);
//    // Create default option "Go to..."
//    $("<option />", {
//       "selected": "selected",
//       "value"   : "",
//       "text"    : "Slide to rate"
//    }).appendTo($(this).find(".selector select"));
//    // Now add values to the select element
//    $(radios).each(function(){
//        var radio = $(this);
//        $("<option />",{
//            "value" : radio.val(),
//            "text" : radio.val(),
//        }).appendTo(".selector select");
//    });
//    
//    $(this).find(".slider").slider({
//      min: 0,
//      max: parseInt(radios.last().val(), 10),
//      slide: function(event, ui) {
//        radios.filter("[value=" + ui.value + "]").click();
//          console.log(ui.value);
//          $(this).closest(".survey-answers").find(".selector select").val(ui.value);
//      }
//    }).appendTo(this);
//    $(".selector select").change(function(){
//        $(this).closest(".survey-answers").children(".slider").slider("value",$(this).val());
//    });
//});

    if($(is_ie9_or_newer).length > 0) {
        document.getElementById('externalInterface').remove();
    } else {
        if($('#externalInterface').length > 0) {
            $('externalInterface').css({'display':'block'});
            var rollNumber = 2;
            var newRollNumber = 21;
            var numScale = .8;
            var diceRad = 150;
            var facesColors = "0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8";
            var spinTime = 3;

            document['externalInterface'].initDice(rollNumber, numScale, diceRad, facesColors, spinTime);
            
            $('#dice').on('click','.btn',function(){
                roll();
                setTimeout(showScore,3000);
            });
        }
    }

    
    // Recheck page again
    setTimeout(resizePage,1000);
    
});
