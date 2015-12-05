// @ John Le
// Notification User Admin Controller


app.controller('NotificationAdminCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        SessionService, $rootScope, $timeout) {
                                        	
				// BEGIN THE MAIN FUNCTION
					$scope.headTitle='Account';
    				$scope.headMessage='Notification settings';

					$scope.setHeader("Notification Settings");
					$scope.setActiveMenu("none");

    				$rootScope.contentWrapperLoader();
    				
    				// RETRIVE CONFIGS INFO FROM SERVER 

    				
    				$http.post('/api/notification/getNotification').
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data.notification);

					      // set checkbox value for chrome push notification
					      
					      if (data.push_notification == "0"){
					      	
					      	$scope.pushnotificationcb = false;
					      	SessionService.set('pushnotificationcb', false);


					      }else{
					      	$scope.pushnotificationcb = true;
					      	SessionService.set('pushnotificationcb', true);
					      }
					      
					      // set checkbox value for normal notification
					      
					      if (data.notification == "0"){
					      	
					      	$scope.notificationcb = false;
					      	SessionService.set('liveAppNotificationSession', false);


					      }else{
					      	$scope.notificationcb = true;
					      	SessionService.set('liveAppNotificationSession', true);
					      }
					      
					      // set checkbox value for email notification
					      
					      
					      if (data.notification_email == "0"){
					      	
					      	$scope.emailnotificationcb = false;
					      }else{
					      	$scope.emailnotificationcb = true;
					      }
					      
					      
					      // set checkbox value for web notification
					      
					      
					      if (data.notification_web == "0"){
					      	
					      	$scope.webnotificationcb = false;
					      }else{
					      	$scope.webnotificationcb = true;
					      }
					      
					      
					});
    				
    				// END RETRIVE CONFIGS INFO FROM SERVER 
					$rootScope.removeContentWrapperLoader();
    				$( '.content-wrapper' ).fadeTo( "slow", 1 );
					

					//alert('sss');

					$scope.notificationcbFunction = function(){


						//alert("a");
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.notificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						////console.log($scope.notificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'normal', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					        if(SessionService.get('liveAppNotificationSession') == "true"){
					        		SessionService.set('liveAppNotificationSession', false);
					        }else{
					        		SessionService.set('liveAppNotificationSession', true);
					        }
					      	
					      
					      
					      //console.log(SessionService.get('liveAppNotificationSession'));
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};
					
					
					
					
					$scope.emailnotificationcbFnction = function(){
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.emailnotificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						//console.log($scope.emailnotificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'email', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};



					$scope.pushnotificationcbFnction = function(){



						var notificationcbStatus = 1;
						
						
						
						if ($scope.pushnotificationcb == true){
							notificationcbStatus = 0;

							

						}else{
							notificationcbStatus = 1;
							//registerForPush();
							//pushUsersDeviceToDB();
						}



						$http.post('/api/notification/setNotification', {'type': 'push', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    });

					    // 


					    /*$timeout(function() {

					    	$http.post('/api/service/updateDeviceStatus', {'status': notificationcbStatus, 'playerID': SessionService.get('playerid')}).
						    success(function(data, status, headers, config) {
						      // this callback will be called asynchronously
						      // when the response is available
						      
						      //SessionService.unset('playerid');
						      
						      //console.log(data);
						      
						    });
					        
					    }, 5000);

						*/
					    






					};
					
					
					
					$scope.webnotificationcbFunction = function(){
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.webnotificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						//console.log($scope.webnotificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'web', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};


				// END
				});
				






