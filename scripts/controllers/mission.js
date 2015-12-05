/**
 * This is the mission controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MissionCtrl', function ($scope,$location,$http,SessionService,APICallService, $rootScope) {
    $scope.todayMission = '';
    $scope.didyouknow = '';
    $scope.reference = '';
    $scope.taskid = '';
    $scope.taskno = '';
    $scope.user=angular.fromJson(SessionService.get('user'));
    $scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask=SessionService.get('pendingTask');
    $scope.headTitle='Mission';
    $scope.headMessage='Add a new post';

    $scope.setHeader("Mission");
    $scope.setActiveMenu("play");

    $rootScope.contentWrapperLoader();

    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    
    if (!todayMission && !SessionService.get('pendingTask')) 
    {
        $location.path('/play');
    } else if(SessionService.get('pendingTask')) {
        var task = angular.fromJson(SessionService.get('pendingTaskDetails'));
        console.log("PENDING TASK");
        console.log(task);
        $scope.missionTitle = task.title;
        $scope.todayMission = task.mission;
        $scope.didyouknow = task.didyouknow;
        $scope.reference = task.reference;
        $scope.taskid = task.taskid;
        $scope.taskno = task.taskno;
        console.log($scope.reference);
    } else
    {
        $scope.missionTitle = missionTitle;
        $scope.todayMission = todayMission;
        $scope.didyouknow = didyouknow;
        $scope.reference = reference;
        $scope.taskid = taskid;
        $scope.taskno = score;
        console.log($scope.reference);
    }
    $scope.displayDidyouknow = false;
    $scope.displayReference = false;


    $scope.toggleSection = function(secName) {
        if (secName == "#didyouknowBtn") {
            if ($scope.displayDidyouknow) {
                $scope.scrollToSection(secName);
            }

        } else {
            if ($scope.displayReference) {
                $scope.scrollToSection(secName);
            }
        }
    }

    $scope.scrollToSection = function(secName) {
        var target = $(secName);
        //console.log(target);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            console.log(target);
            $('.scrollable-wrapper').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }

    $rootScope.removeContentWrapperLoader();
    $( '.content-wrapper' ).fadeTo( "slow", 1 );
    // this is the accept mission event, when accept button clicked
    $scope.acceptMission = function () 
    {
        APICallService.acceptMission($scope.user.id,$scope.groupid,taskid).then(function(response){
           SessionService.set('pendingTask',$scope.taskid);
           $scope.pendingTaskDetails={
               title: $scope.missionTitle,
               mission: $scope.todayMission,
               didyouknow: $scope.didyouknow,
               reference: $scope.reference,
               taskno: $scope.taskno,
               taskid: $scope.taskid
           };
           SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
           $location.path('/wall');
        },function(response){
            
        });

        /////////////////
        var tempTaskCompleted = parseInt(SessionService.get('taskCompleted')) + 1;
        SessionService.set('taskCompleted', tempTaskCompleted);

        

        
    };

});





