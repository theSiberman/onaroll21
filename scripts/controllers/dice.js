app.controller('DiceCtrl', function ($scope, $rootScope, $window, $location, $timeout, AuthenticationService, SessionService, FlashService, $http, dropdownService) {
    $scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    $scope.headTitle = 'play';
    $scope.headMessage = $scope.currentSelectedGroupDetails.name;
    $scope.user = angular.fromJson(SessionService.get('user'));
    $scope.groupid = SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask = SessionService.get('pendingTask');
    //Redirect the user back to journal page

    //if (SessionService.get('progressPercentage') == 100){
    //    $location.path('/missionCompleted');
    //    dropdownService.newDropdown("notification", 2500, "Fantastic - goal completed!");
    //}else{
    //
    //    if (SessionService.get('numOfDaysPassed') == SessionService.get('taskCompleted')){
    //        //alert("rolling");
    //        //dropdownService.newDropdown("notification", 3000, "Please select a team");
    //    //}else{
    //
    //
    //        if (SessionService.get('pendingTaskDetails')){
    //                dropdownService.newDropdown("notification", 2500, "Please complete pending mission");
    //        }else{
    //                //$location.path('/main');
    //                dropdownService.newDropdown("notification", 2500, "Missions up to date. Roll again tomorrow!");
    //        }
    //
    //
    //    }
    //
    //}


    $scope.setHeader("Roll");
    $scope.setActiveMenu("play");

    if ($scope.groupid) {
        if ($scope.pendingTask) {
            $location.path('/mission');
        }
    } else {
        $location.path('/main');
    }
    //Variables for the dice page
    userid = $scope.user.id;
    groupid = $scope.groupid;
    
    ////console.log("User ID :"+userid);



    
    /**
     * This function will get the task
     * @returns {undefined}
     */
    $scope.getTask = function () {

    };
    
    
    
    $scope.areAllTasksDone = function(){
	      		
	      		
	      		
	      		$http.post('/api/global/areAllTasksDone', {'groupid': $scope.groupid}).
			    success(function(data, status, headers, config) {
			     
			 		////console.log(data);
			 	  	// return something yo.
			 	  	
			 	  	if (data == "false"){
			 	  		
			 	  		$(".top-layer-dice").css("display", "none");
			 	  		
			 	  		
			 	  	}else{
			 	  		
			 	  		//$rootScope.warningRed("All missions have been completed");
                        //dropdownService.newDropdown("warning", 5000, "All missions have been completed");
                        $location.path('/missionCompleted');

			 	  		
			 	  	}
			 		
			 	
			 	});     
			       
	      	
	};
	
	$scope.areAllTasksDone();

    $scope.$on('$viewContentLoaded', function () {
        ////console.log('dice page content loaded');
        $rootScope.contentWrapperLoader();
        init();         //This function is defined in dice.js
        initDiceNum();  //This function is defined in dice.js
        render();       //This function is defined in dice.js
        $timeout(FlashService.clear,5000);
        $rootScope.removeContentWrapperLoader();
    
    });
});
