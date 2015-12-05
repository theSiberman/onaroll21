



app.controller('NotificationCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        SessionService, $rootScope, dropdownService) {
                                        	
                                        	
                    //$rootScope.globalNotification("this is a ext call");
                    $scope.headTitle='notification center';
    				$scope.headMessage='Notification Center';
					$scope.setHeader("Notifications");
					$scope.setActiveMenu("notification");
    				$rootScope.contentWrapperLoader();              	
					
					$http.post('/api/notification/getNotificationList').
				    success(function(data, status, headers, config) {
				      // this callback will be called asynchronously
				      // when the response is available
				      
				      $scope.notifications = angular.fromJson(data);
				      
				      ////console.log("type :"+$scope.notifications.type);
				      //console.log($scope.notifications.length);

				      if ($scope.notifications.length == 0){
				      		$('.notifications').append('<div class="empty-content-message">You currently have no notifications</div>');
				      }
				      
				    }).
				    error(function(data, status, headers, config) {
				      // called asynchronously if an error occurs
				      // or server returns response with an error status.
				    });

				    $rootScope.removeContentWrapperLoader();
    				$( '.content-wrapper' ).fadeTo( "slow", 1 );
				    
				    
				    
				    $scope.filterNewRoller = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterNewRoller');
				    	$("#filter-icon-new-roller").attr("src","images/filter-new-roller-active.png");
				    	
				    	
				    };
				    
				    $scope.filterLike = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterLike');
				    	$("#filter-icon-like").attr("src","images/icon/like-active.png");
				    	
				    };
				    
				    $scope.filterComment = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterComment');
				    	$("#filter-icon-comment").attr("src","images/icon/comment-active.png");
				    };

				    $scope.humanReadable = function(time) {
				        return moment(time).fromNow();
				    };
				    
				    
				    $scope.filterMsg = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterMsg');
				    	$("#filter-icon-message").attr("src","images/icon/nav/message-active.png");
				    };
				    
				    
				    $scope.unsetIcons = function(){

				    	$("#filter-icon-like").attr("src","images/icon/like-inactive.png");
				    	$("#filter-icon-comment").attr("src","images/icon/comment-inactive.png");
				    	$("#filter-icon-message").attr("src","images/icon/nav/message-inactive.png");
				    };

				    $scope.redirectToTarget = function(type, source_id, source_user_id){

						//console.log("sourceid"+source_id);
						//console.log("source_user_id"+source_user_id);
						//console.log("type"+type);


						if (type == "newgroupmessage"){

							location.href= "#/message/view/" + source_id;

						}

						if (type == "message"){
							//SessionService.set("messageid", source_user_id);

							//SessionService.set("messageusername", un);

							location.href= "#/message/" + source_user_id;

							//alert("a");

						}

						if (type == "newlike"){
								//SessionService.set("messageid", source_id);

								//SessionService.set("messageusername", un);

								location.href= "#/wall/"+source_id;

								//alert("a");

						}

						if (type == "newcomment" || type == "newcommentother"){
								//SessionService.set("messageid", source_id);

								//SessionService.set("messageusername", un);

								location.href= "#/wall/"+source_id;

								//alert("a");

						}

				    };



				});