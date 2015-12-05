/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageViewCtrl',function($scope,$location, $http, SessionService, $rootScope, $routeParams){
	$scope.setHeader("Message");
	$scope.setActiveMenu("message");

	$scope.headTitle='View Message';
    $scope.headMessage=SessionService.get("messageusername");
	$scope.selectedUsers = {};

	$scope.$watch(function() {
		return SessionService.get("selectedUsers");
	}, function(newVal, oldVal) {
		$scope.selectedUsers = {};
		$scope.selectedUsers = JSON.parse(newVal);
	});

    var active = 0;

    $rootScope.contentWrapperLoader();

    var notificationFlag = false;

    conversationID = $routeParams.id;

	$('.setting-btn').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: false, // Does not change width of dropdown to that of the activator
			hover: true, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: false, // Displays dropdown below the button
			alignment: 'left' // Displays dropdown with edge aligned to the left of button
		}
	);

    /*$scope.$watch('notificationStatus', function (val){
	    
	    		$http.post('/api/service/groupmessage/updateNotificationStatus', {conversationID : conversationID, status : val}).
			    success(function(data, status, headers, config) {
			      
			     


			      $scope.notificationStatus = data;


			    });


	});
	*/


	$scope.notificationSTT = function(){
			var statusVar = "false";

			if ($scope.notificationStatus == false){
				statusVar = "true";
				$scope.notificationStatus == true;
			} else {
				$scope.notificationStatus == false;
			}

			$http.post('/api/service/groupmessage/updateNotificationStatus', {conversationID : conversationID, st : statusVar}).
			success(function(data, status, headers, config) {

				//$scope.notificationStatus =

			});
	}

    
    
    $scope.retrieveConversation = function(){

    	

    	if (currentRoute == "/message/view/:id"){


    	
		    	$http.post('/api/service/groupmessage/retriveGroupMessage', {conversationID : conversationID}).
			    success(function(data, status, headers, config) {
			      //console.log(data);
			      $scope.messages = data['mlist'];
			      SessionService.set("selectedUsers", data['user_list']);

					var selectedUsers = JSON.parse(data['user_list']);

					angular.forEach($scope.groupUsers, function(userVal,userKey) {
						userVal.checked = false;

						angular.forEach(selectedUsers, function(selectedVal, selectedKey) {
							//console.log("USER ID: " + userVal[0].id + ", SELECTED ID: " + selectedVal.id);

							if (userVal[0].id == selectedVal.id) {
								userVal.checked = true;
							}
						})
					})

			      $scope.notificationStatus = data['status'];


			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });

	    }



    };

    $scope.retrieveConversation();

    setInterval(function() {
	    $scope.retrieveConversation();
	}, 5000);

    $rootScope.removeContentWrapperLoader();


    //$scope.openUsersList = function() {
	//	$(".popup-inactive").toggleClass("popup-inactive popup-active");
	//}

	$scope.showDropdown = function() {
		$("#settings-dropdown").toggleClass("hide ");
		$("#invisible-cover").toggleClass("hide ");
	}

	$scope.hideDropdown = function() {
		$("#invisible-cover").addClass("hide");
		$("#settings-dropdown").addClass("hide");
	}

    $scope.sendMessage = function(){




		// get selected user list 

		var selectedUsers = SessionService.get("selectedUsers");

    	var tempMessage = $scope.commentnewtext;

    	$scope.commentnewtext = "";


    	if (tempMessage){
    			$http.post('/api/service/groupmessage/sendGroupMessage', {id : $routeParams['id'], message : tempMessage , userList : selectedUsers, conversationID : conversationID}).
			    success(function(data, status, headers, config) {
			      
			      $scope.retrieveConversation();
			      
			      $scope.commentnewtext = "";

				  $(".private-messages").animate({ scrollTop: 0 }, 'slow');

				  $scope.retrieveConversation();

			     			      
			    });
    	}

    	
		       
    };
    
    


    $scope.humanReadable = function(time) {
                        return moment(time).fromNow();
    };
    
    
    
});