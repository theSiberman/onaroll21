
// this is the dropdown service 

app.service('dropdownService', function( $http,$location,SessionService,FlashService, $rootScope, $timeout, $compile) {
    	
	    	var dropdown_stack = [];
			var current_dropdown = null; //hold html of dropdown container div from array
			var current_dropdown_id = null; //May be helpfull when targeting animation
			var dropdown_timeout; //store reference to timeout function if it needs to be cancelled 
			var dropdown_height; //May be good to dynamically store height of div
			var dropdown_duration = 4000000;
			var dropdown_type = "";
			var dropdownFlag = 0;

			//Build dropdown_stack array
			//type: needs to work with Notification, Warning, MoodData, Mission rating/Feedback

			//alert("ss");

			//newDropdown("notification", 2000, "this is the test");



			

			var newDropdownRef = this.newDropdown = function(type, duration, message, notType, id)
			{
				var html;
				
				dropdown_type = type;

				switch(type)
				{
					//option 1. get html of type. Set html var.
					case 'notification':
						var link = '';

						switch(notType) {
							case 'message':
								link = '/#/message/' + id;
								break;
							case 'newgroupmessage':
								link = '/#/message/view/' +id;
								break;
							case 'newlike':
							case 'newcomment':
							case 'newcommentother':
								link = '/#/wall/' + id;
								break;
						}

						html = "<a href='" + link + "'><div class='popdown notification-green'><div class='notification-msg'><h4>"+message+"</h4></div></div></a>";
						



						break;
					case 'warning':
						html = '<div class="popdown warning-red"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						break;
					case 'emotion':

						html = '<div class="popdown container" id="emoicon"><div class="notification-type"><h3>How are you feeling?</h3></div><div class="notification-msg"><a href="#/main/mood/1"><div class="emoji-mood-container"><div class="mood-emoji emoji-5">&nbsp;</div><div class="mood-description"><p>Terrible</p></div></div></a><a href="#/main/mood/2"><div class="emoji-mood-container"><div class="mood-emoji emoji-4">&nbsp;</div><div class="mood-description"><p>Not Great</p></div></div></a><a href="#/main/mood/3"><div class="emoji-mood-container"><div class="mood-emoji emoji-3">&nbsp;</div><div class="mood-description"><p>Okay</p></div></div></a><a href="#/main/mood/4"><div class="emoji-mood-container"><div class="mood-emoji emoji-2">&nbsp;</div><div class="mood-description"><p>Good</p></div></div></a><a href="#/main/mood/5"><div class="emoji-mood-container"><div class="mood-emoji emoji-1">&nbsp;</div><div class="mood-description"><p>Fantastic</p></div></div></a></div></div>';

						break;


					case 'pushNotificationReminder':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						break;	

					case 'reportCommentConfirmation':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						
						break;		


					case 'reportPostConfirmation':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';

						break;		

					case 'reportCompletedNotification':
						html = "<div class='popdown notification-green'><div class='notification-msg'><h4>"+message+"</h4></div></div>";
						
						break;		

					

					//option 2. could have all dropdown html hardcoded here, and insert message. Set html var.
				}
				
				
				//option 2

				// escape duoble quote character

				html = html.replace(/['"]/g, "&quot;");

				//if (SessionService.get('notificationType') == message){
				//	console.log("Same message");
				//}else{

				if (SessionService.get('notificationType') != message){
						dropdown_stack.push('{"html" : "'+html+'", "duration" : '+duration+' }'); //message included in html

						
						SessionService.set('notificationType', message);

						
						dropdownFlag++;
				//}
				

				//}


				
				//call dropdownIn

				//console.log(dropdown_stack.length);

				//if (dropdown_stack.length == 1){

					if(dropdown_stack.length <= 1 )
					{
						//$rootScope.dropdownIn();
						



						dropDownInRef();
					} 


				}

				

				
			};


			//start display of new dropdown
			var dropDownInRef = this.dropdownIn = function ()
			{
				////console.log("Next item :");
				////console.log(dropdown_stack);

				//alert("a");


				if(dropdown_stack.length > 0)
				{

					var html = JSON.parse(dropdown_stack[0]).html;

					html = html.replace(/&quot;/g, "\"");

					////console.log(html);

					var link = html;

					$("body").append(link);

					if (dropdown_type != "emotion"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();

						    if (dropdown_type == "pushNotificationReminder"){
						    	//$location.path("/notificationUserAdmin");
						    	window.location.href = "#/notificationUserAdmin";
						    }

						    SessionService.unset('notificationType');
						    
						});


					}


					// dropdown 
					if (dropdown_type == "reportCommentConfirmation"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();
						    SessionService.unset('notificationType');

						    //alert('comment report');

						    // send http request to the server
          
					         $http.post('/api/comment/report', {postid : commentReportIDs['post_id'], commentid : commentReportIDs['comment_id'], userid : commentReportIDs['user_id'], groupid : commentReportIDs['group_id']}).then(function(result){
					                console.log(result);
					                

					                // show notification to logged in user



					                setTimeout(function() { 

					                	newDropdownRef("reportCompletedNotification", 10000, "The comment has been reported as inappropriate");

					                }, 1200);



					          });

					         $('#comment-report-'+commentReportIDs['comment_id']).remove();
					         //alert('a');

						    SessionService.unset('notificationType');
						    
						});


					}





					// dropdown 
					if (dropdown_type == "reportPostConfirmation"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();
						    SessionService.unset('notificationType');

						    //alert('comment report');
						    console.log("ss");
						    console.log(postReportIDs);

						    // send http request to the server
          
					         $http.post('/api/post/report', {postid : postReportIDs['post_id'], userid : postReportIDs['user_id'], groupid : postReportIDs['group_id']}).then(function(result){
					                console.log("Send Email : OK");
					                

					                


					                setTimeout(function() { 

					                	newDropdownRef("reportCompletedNotification", 5000, "The post has been reported as inappropriate");

					                }, 1200);
					          });


					         $('#post-report-'+postReportIDs['post_id']).remove();
					         //alert('a');

						    SessionService.unset('notificationType');
						    
						});


					}
					

					activeDropDownRef(JSON.parse(dropdown_stack[0]).duration);


                    //alert("aaa");





				}
			};



			var dismissDropdownRef = this.dismissDropdown = function  (duration){

					$(".popdown").css("top", "-14%"); 

					setTimeout(function() { 

								        $(".popdown").remove(); 

									        dropdown_stack.shift();

									        ////console.log("left over");

									        ////console.log(dropdown_stack);

									        dropDownInRef();


								        

					}, 1000);

			};


			


			var activeDropDownRef = this.activeDropDown = function  (duration){


					dropdown_duration = duration;

					function makeTimeoutFunc() {
						    return function() {
						        // does something with param
						        $(".popdown").css("top", "0");

							        setTimeout(function() { 

							        $(".popdown").css("top", "-14%"); 

								        setTimeout(function() { 

								        $(".popdown").remove(); 



									        dropdown_stack.shift();

									        ////console.log("left over");

									        ////console.log(dropdown_stack);


									        SessionService.unset('notificationType');

									        dropdownFlag = 0;

									        	dropDownInRef();


								        

								    	}, 1000);


							    	}, dropdown_duration);




						    }
						}

					setTimeout(makeTimeoutFunc(), 500);




			};



			

			


});



























			/*
			var dropdown_stack = [];
			var current_dropdown = null; //hold html of dropdown container div from array
			var current_dropdown_id = null; //May be helpfull when targeting animation
			var dropdown_timeout; //store reference to timeout function if it needs to be cancelled 
			var dropdown_height; //May be good to dynamically store height of div




			//Build dropdown_stack array
			//type: needs to work with Notification, Warning, MoodData, Mission rating/Feedback
			$rootScope.newDropdown = function(type, duration, message)
			{
				var html;
				
				switch(type)
				{
					//option 1. get html of type. Set html var.
					case 'notification':
						html = $('#notification-green-wrapper').html();
						break;
					case 'warning':
						html = $('#warning-red-wrapper').html();
						break;
					

					//option 2. could have all dropdown html hardcoded here, and insert message. Set html var.
				}
				
				
				//option 2
				//dropdown_stack.push({html, duration}); //message included in html
				
				//call dropdownIn
				if(current_dropdown == null)
				{
					//$rootScope.dropdownIn();
				} 
			};


			//start display of new dropdown
			$rootScope.dropdownIn = function()
			{
				if(dropdown_stack.length > 0)
				{
					//get/remove first object in array
					current_dropdown_obj = dropdown_stack.shift();
					//store html in current_dropdown var
					current_dropdown = current_dropdown_obj.html;
					current_dropdown_id = "some_id_name"; // may not need?
					
					//START DOWNWARD ANIMATION
					//May be good to dynamically store height of div in dropdown_height
					
					dropdown_timeout = //store ref of timeout function doing the animation
					
					//on timer complete call dropdownOut(true)
				}
			};

			//hides dropdown called from timer
			//or user interaction
			$rootScope.dropdownIn = function(loop:Boolean) //loop - if false don't call next dropdown in stack
			{
				//clear or cancel dropdown_timeout (timeout animation function) 
				//in case dropdownOut has been called externally
				
				//START UPWARD ANIMATION
				//using dropdown_height
				//using current_dropdown or current_dropdown_id
				//create new timer
				
				//on timer complete 
				current_dropdown = current_dropdown_id = null;
				if(loop) //call dropdownIn() to trigger next dropdown if it exists
			};

			//cancel dropdown loop. dropdownIn() can be called at any time to restart stack loop
			$rootScope.stopAllDropdowns = function()
			{
				//clear or cancel dropdown_timeout (timeout animation function) 
				
				//reset current vars
				current_dropdown = current_dropdown_id = null;
			};*/


