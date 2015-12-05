/* 
 * This is the main angular file
 */

app.controller('MainCtrl', function ($scope, $window, $location, $cacheFactory, SessionService, AuthenticationService, $http, $rootScope, globalAppNotification, APICallService, dropdownService) {
    $scope.Lang = $window.Lang;
    $scope.groupname = "Mark's Happy Rollers";
    $scope.message = "This is a test message";
    //$scope.currentGroup=SessionService.get('currentSelectedGroup') ? SessionService.get('currentSelectedGroup') : 0;
    //$scope.sessionUser = angular.fromJson(SessionService.get('user'));
    $scope.headMessage = '';
    //var $httpDefaultCache = $cacheFactory.get('$http');

    //$httpDefaultCache.removeAll();

    $scope.$watch(function() {
        return SessionService.get('currentSelectedGroup');
    }, function(newVal, oldVal) {
        $scope.currentGroup = null;
        $scope.currentGroup = JSON.parse(newVal);

        $http.post('/api/group/user',{id: $scope.currentGroup}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.groupUsers = data;

                //console.log($scope.currentUser.id);

            })
    });

    $scope.$watch(function() {
        return SessionService.get('user');
    }, function(newVal, oldVal) {
        if (newVal) {
            $scope.currentUser = JSON.parse(newVal);
            $scope.sessionUser = JSON.parse(newVal);

            $scope.setupGroup();
        }
    });

    $scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));

    $scope.getGroupList = function () {
        return $http.post('/api/group/list');
    };

    $scope.setCurrentGroup = function (groupid) {
        SessionService.set('currentSelectedGroup', groupid);
        SessionService.unset('pendingTask');
        SessionService.unset('pendingTaskDetails');
        $scope.currentGroup = groupid;
        $scope.flash='';
        ////console.log('group: ' + $scope.groups);
        angular.forEach($scope.groups, function (group, key) {
            if (group.id === groupid) {
                //console.log('this was reached');
                $scope.currentSelectedGroupDetails = group;
                SessionService.set('currentSelectedGroupDetails', angular.toJson(group));

            }
        });

        //APICallService.progressBar(groupid);
        //APICallService.fetchWellbeingData(groupid).success(function(moodDat) {
        //    wellbeingData = moodDat;
        //
        //    $scope.getMoodData();
        //    $scope.startMoodMapAni();
        //});
        /////////////////

        //$scope.getMoodData = function() {
        //    $http({
        //        url: 'api/global/getProgress',
        //        method: 'POST',
        //        data: {
        //            groupid: groupid
        //        }
        //    }).then(function(result){
        //        //console.log('Progress Data');
        //        //console.log(result);
        //        var progressData = result.data['progress'];
        //
        //        SessionService.set('progressPercentage', progressData);
        //
        //        //SessionService.set('numOfDaysPassed', result.data.completed_days);
        //
        //        $scope.ppb = progressData;
        //        ////console.log("progress bar"+result.data);
        //
        //        $scope.InitUserProgress(result.data, $scope);
        //    });
        //}

        /////////////////
        APICallService.fetchPendingTask($scope.sessionUser.id, $scope.currentGroup);


        ////console.log(response[0]);
        $scope.pendingTaskDetails = SessionService.get('pendingTaskDetails');
        $scope.pendingTask = SessionService.get('pendingTask');
        //$scope.$emit('$viewContentLoaded');
        //$scope.resetAll();
        //$scope.displayMoodMap = 1;
        var $currentSelectedG = JSON.parse(SessionService.get('currentSelectedGroupDetails'));

        $scope.headMessage = $currentSelectedG.name;

        ////console.log($currentSelectedG);
    };

    $scope.setupGroup = function() {
        $scope.getGroupList().then(function (result) {
            var unix = Math.round(+new Date()/1000);

            SessionService.set('numOfDaysPassed', result.data[0].daysPassed);

            var loginRedirect = localStorage.getItem("loginRedirect");

            if (loginRedirect != null) {
                $location.path("/"+loginRedirect);
                localStorage.removeItem("loginRedirect");
            }

            $scope.hideGroupSelection=1;

            $scope.groups = result.data;

            $scope.setCurrentGroup($scope.sessionUser.groups[0].id);

            //$scope.resetAll();
            //if ($scope.sessionUser.groupCount===1 && $scope.sessionUser.role != 1) {
                //$scope.displayGroupList = 0;
                //$scope.setCurrentGroup($scope.sessionUser.groups[0].id);
            //} else {
                //$scope.hideGroupSelection=0;
                //$scope.displayGroupList = 1;

                //if (SessionService.get('currentSelectedGroup') != null) {
                //    $scope.setCurrentGroup(SessionService.get('currentSelectedGroup'));
                //}

                //$rootScope.removeContentWrapperLoader();
                //$scope.InitUserProgress(0, $scope.weekday.toUpperCase(), $scope.date + '/' + $scope.month, $scope);
            //}

            if ($scope.currentGroup) {
                //$scope.resetAll();
                //$scope.displayMoodMap = 1;
                //$scope.loadProgress($scope.currentGroup);

                // search if presurvey has been completed !

                $http.post('/api/survey/isPresurveyCompleted', {'groupid':$scope.currentGroup}).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if (data == "true"){
                            SessionService.set('preSurveyCompleted', 1);
                        } else {
                            $location.path('/presurveyintro');
                        }
                    });

                //This is where we should prompt for the survey as well
                /* if(SessionService.get('preSurveyCompleted')==0) {
                 $location.path('/presurveyintro');
                 } else */
            } else {
                //$scope.resetAll();
                $scope.displayGroupList = 1;
                $scope.currentGroup = 0;
                //$scope.loadProgress(0);   //TODO: fix this so we can show empty progress canvas
            }

            //setTimeout(function() {
            //    if(!$scope.currentGroup) {
            //        dropdownService.newDropdown("notification", 40000000, "Please select a team");
            //    }
            //}, 4000);

        });
    };

    if (SessionService.get("notificationType") == "null"){
        SessionService.unset("notificationType");
    }

    $scope.setHeader = function (name) {
        $("#page-title").html(name);
    }

    $scope.navigateTo = function (route) {
        //console.log(route);

        if (route == 'play') {
            if (SessionService.get('progressPercentage') == 100){
                $location.path('/missionCompleted');
                dropdownService.newDropdown("notification", 2500, "Fantastic - goal completed!");

            } else {
                if (SessionService.get('numOfDaysPassed') == SessionService.get('taskCompleted')){
                    if (SessionService.get('pendingTaskDetails')){
                        dropdownService.newDropdown("notification", 2500, "Please complete pending mission");
                    }else{
                        //$location.path('/main');
                        dropdownService.newDropdown("notification", 2500, "Missions up to date. Roll again tomorrow!");
                    }
                } else {
                    $location.path('/play');
                }
            }
        } else {
            $location.path('/' + route);
        }
    };

    $scope.setActiveMenu = function (menu) {
        $("#header ul a").removeClass("active");
        $("#mobile-nav a").removeClass("active");

        if (menu != "none") {
            $("#header ul a#link-" + menu).addClass("active");
            $("#mobile-nav a#menu-" + menu).addClass("active");
        }
    }

    $scope.closeSideMenu = function() {
        if ($("#side-menu").hasClass("menu-slided")) {
            $("#side-menu").hide().toggleClass("menu-default menu-slided");
            $(".side-menu-layer").hide();
        }

        if ($("#group-users-menu").hasClass("menu-slided")) {
            $("#group-users-menu").hide().toggleClass("menu-default menu-slided");
            $(".side-menu-layer").hide();
        }
    }

    $scope.togglePopup = function(type) {
        $(".popup-" + type).toggleClass("popup-inactive popup-active");

        if (type == 'active') {
            $("#full-image img").hide();
        }
    }

    //$.ajax({
    //    url: "",
    //    context: document.body,
    //    success: function(s,x){
    //        $('html[manifest=saveappoffline.appcache]').attr('content', '');
    //        $(this).html(s);
    //    }
    //});
    
    $scope.pendingTask = function(){
			    $http.post('/api/mission/getPendingTask',{groupid: $scope.currentGroup}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			      
			           //alert(SessionService.get("missionPending"));

			           if (data.date == true && SessionService.get("missionPending") != "true"){
			      				//alert("a");
			      				SessionService.set("missionPending", "true");

			      				globalAppNotification.callNotification("You", "missionpending");

			      		}
			      
			      
			           $scope.pendingTaskDetails={
			               title: data.title,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid,
			               date: data.date
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		//console.log($scope.pendingTaskDetails);


			      		// show mission pending notification
			      		
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });
    };
    
    $scope.pendingTask();
    
    
    $scope.currentGroupNotSelected = function () {
        if (SessionService.get('currentSelectedGroup')) {
            return false;
        }

        //alert("aa");
        return true;
    };
    $scope.logout = function() {
        AuthenticationService.logout();
        $location.path('/login');
    };
});