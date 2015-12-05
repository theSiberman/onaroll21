/*
 * Author John Le
 * This is the error Notification Warning
 * it pops up when the user missing an input
 * params : none
 * return none
 */

app.factory('globalAppNotification', function(dropdownService) {
        return {
            callNotification: function(name, type, id) {
                var msg = "sent you a message";

                if (type == "newgroupmessage"){
                    msg = "sent you a group message";
                }

                if (type == "newlike"){
                    msg = "likes your post";
                }

                if (type == "newcomment"){
                    msg = "has commented on your post";
                }

                if (type == "newcommentother"){
                    msg = "has commented on a post you commented on";
                }

                if (type == "newgroupmember"){
                    msg = "has joined your team";
                }

                if (type == "missionpending"){
                    msg = "have one mission pending";
                }



                // Notification HTML

                if (type != "missionpending"){
                        dropdownService.newDropdown("notification", 5000, name+' '+msg, type, id);
                        
                        //console.log('dropdown service call');
                }
            },
            webNotification: function(message){

                      // Let's check if the browser supports notifications
                      if (!("Notification" in window)) {
                        alert("This browser does not support desktop notification");
                      }
                    
                      // Let's check if the user is okay to get some notification
                      else if (Notification.permission === "granted") {
                        // If it's okay let's create a notification
                        var notification = new Notification(message);
                      }
                    
                      // Otherwise, we need to ask the user for permission
                      // Note, Chrome does not implement the permission static property
                      // So we have to check for NOT 'denied' instead of 'default'
                      else {
                        Notification.requestPermission(function (permission) {
                          // If the user is okay, let's create a notification
                          if (permission === "granted") {
                            var notification = new Notification(message);
                          }
                        });
                      }

            }
        };
    });
    


/*
 * Author John Le
 * This is the global service auto request the number of notifications every 10 secs
 * params : none
 * return none
 */
app.factory('requestNotificationService', function($http, SessionService, globalAppNotification) {
        var temp = 0;

        var tempISE = 0;

        return {
            notification: function() {

                   //console.log('cool');
                    


                    // send request to the server to get the new notification status

                    $http.post('/api/global/notificationNum').
                    success(function(data, status, headers, config) {
                            console.log('Notification Data');
                            console.log(data);
                            //////////////

                            if (data != 'false'){
                                    $('.notification-alert').css('display', "block");
                                    $('#side-nav-notification-number').css('display', "block");
                                    
                               }else{
                                    $('.notification-alert').css('display', "none");
                                    $('#side-nav-notification-number').css('display', "none");
                               }
                               
                               // set the number to 10+ if notification number more than 10
                               if (data.count > 10){
                                    
                                    $('.notification-alert').html("10+");
                                    $('#side-nav-notification-number').html("10+");
                                    
                               }else{
                                    
                                    $('.notification-alert').html(data.count);
                                    $('#side-nav-notification-number').html(data.count);
                                    
                               }
                               
                               //if (data.message_count != 0){
                               //     $('.message-alert').css('display', "block").html(data.message_count);
                               //
                               //} else {
                               //     $('.message-alert').css('display', "none");
                               //}
                               //
                               //if (data.message_count > 10){
                               //
                               //     $('.message-alert').html("10+");
                               //
                               //}else{
                               //
                               //     $('.message-alert').html(data.message_count);
                               //
                               //}

                            /////////////

                            // check if live notification mode enable / disable

                           var userSessonService = JSON.parse(SessionService.get('user'));

                           ////console.log"test user session service");
                           //////console.loguserSessonService.notification);

                            //SessionService.set('liveAppNotificationSession', 'true');

                           if (SessionService.get('liveAppNotificationSession') == "true"){


                                    if (data == 'false'){
                                          tempISE = 1;
                                          ////console.logstatus);
                                          
                                          $('#side-nav-notification-number').css('display', "none");
                                          $('#side-nav-message-number').css('display', "none");


                                    }else{

                           
                                   
                                           if (data.count == 1 && tempISE == 1 && temp != 1){
                                                //////console.log"this is the test :"+data.count);
                                                globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_id);

                                                // web notification
                                                //globalAppNotification.webNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type);
                                           }
                                           
                                           //console.log("=========================");
                                           //console.log("Count : "+data.count);
                                           //console.log("Temp : "+temp);
                                           //console.log("========================="); 

                                           
                                           if (data.count > temp && temp != 0){
                                            // this is the test this is the test this is the test
                                                //$rootScope.globalWebNotification(data.user[0].firstname+" "+data.user[0].lastname+" just sent you a message !");
                                                //$rootScope.sendMail(data.user[0].firstname+" "+data.user[0].lastname+" just sent you a message !", userArray);
                                                if (data.type == 'message') {
                                                    globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_user_id);
                                                } else {
                                                    globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_id);
                                                }

                                                // web notification
                                                //globalAppNotification.webNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type);

                                                temp = 0;
                                           }




                                        }



                           }
                           
                            
                            temp = data.count;


                            
                    });

                    // end request


            }
        };
    });