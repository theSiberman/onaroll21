/*
 * TODO: remove all debug messages and minify script
 * TODO: Change the button from current mission to play if there is no pending task
 * This is the journal page controller
 */
app.controller('JournalCtrl', function ($scope, $location, $route, $routeParams, $http, $timeout, $log, $rootScope, SessionService, APICallService, dropdownService) {
    $scope.headTitle = 'journal';
    $scope.headMessage = '';
    $scope.displayWordcloud = 0;
    $scope.displayGroupList = 0;
    $scope.displayWall = 0;
    $scope.displayPhotoMontage = 0;
    $scope.displayMoodMap = 0;
    $scope.posts = '';
    //$scope.groups = '';
    $scope.wordCloud = '';
    $scope.photos = '';
    //$scope.currentGroup = SessionService.get('currentSelectedGroup');
    //$scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    //$scope.sessionUser = angular.fromJson(SessionService.get('user'));
    //$scope.pendingTaskDetails = '';
    //$scope.pendingTask = '';
    $scope.progress = 0;
    $scope.weekday = moment().format('dddd');
    $scope.date = moment().format('DD');
    //$rootScope.ajaxLoader();
    $scope.dialProgress = null;
    $scope.userProgress = null;

    $scope.setHeader("Journal");
    $scope.setActiveMenu("journal");

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    //alert(month);
    $scope.month = moment().format('MM');
    $scope.montageCreated = 0;
    $scope.ppb = 0;
    var min = 10000;
    var max = 30000;

    var wellbeingData = null;

    $scope.randomIMG = Math.floor(Math.random() * (max - min + 1)) + min;
    //$scope.disabledFeatureMsg = '<div class="disabled-feature-msg">This feature is not available at the moment.</div>';
    //$scope.noPost = '<div class="disabled-feature-msg">You have no private posts at the moment.</div>';
    //$scope.moodCheck=SessionService.get('moodCheck');
    //$scope.currentGroup=SessionService.get('currentSelectedGroup');
    
    $rootScope.contentWrapperLoader();

    //if (SessionService.get("notificationType") == "null"){
    //    SessionService.unset("notificationType");
    //}

    //Initiate click function on mobile device for progress section
    if ($(window).width() <= 499) {
        $(".progress-circle").click(function() {
            $(this).hide();
            $(".progress-detailed-info").show();
        });

        $(".progress-detailed-info").click(function() {
            $(this).hide();
            $(".progress-circle").show();
        })
    }

    ////console.log($location.path());
    var n = $location.path().search("/main/mood");
    if (n == 0){
            // mood check time

            $http({
                url: 'api/global/moodCheckTime',
                method: 'POST'
            });

            // end mood check time

    }

    if ($scope.sessionUser.role == 1) {
        $scope.complete = true;
        //$rootScope.removeAjaxLoader();
    }

    $scope.resetAll = function () {
        $scope.displayWordcloud = 0;
        $scope.displayGroupList = 0;
        $scope.displayWall = 0;
        $scope.displayPhotoMontage = 0;
        $scope.displayMoodMap = 0;
    };
    $scope.setupCharts = function (groupid) {
        console.log("Set up charts");
        //SessionService.set('currentSelectedGroup', groupid);
        //SessionService.unset('pendingTask');
        //SessionService.unset('pendingTaskDetails');
        //$scope.currentGroup = groupid;
        $scope.flash='';
        ////console.log('group: ' + $scope.groups);
        //angular.forEach($scope.groups, function (group, key) {
        //    if (group.id === groupid) {
        //        //console.log('this was reached');
        //        $scope.currentSelectedGroupDetails = group;
        //        SessionService.set('currentSelectedGroupDetails', angular.toJson(group));
        //
        //    }
        //});

        APICallService.progressBar(groupid);
        APICallService.fetchWellbeingData($scope.currentGroup).success(function(moodDat) {
            wellbeingData = moodDat;

            $scope.getMoodData();
            $scope.startMoodMapAni();
        });
        /////////////////

        $scope.getMoodData = function() {
            $http({
                url: 'api/global/getProgress',
                method: 'POST',
                data: {
                    groupid: $scope.currentGroup
                }
            }).then(function(result){
                console.log('Progress Data');
                console.log(result);
                var progressData = result.data['progress'];

                SessionService.set('progressPercentage', progressData);

                //SessionService.set('numOfDaysPassed', result.data.completed_days);

                $scope.ppb = progressData;
                ////console.log("progress bar"+result.data);

                $scope.InitUserProgress(result.data, $scope);
            });
        }


        
        /////////////////
        //APICallService.fetchPendingTask($scope.sessionUser.id, $scope.currentGroup);

        
        ////console.log(response[0]);
        //$scope.pendingTaskDetails = SessionService.get('pendingTaskDetails');
        //$scope.pendingTask = SessionService.get('pendingTask');
        //$scope.$emit('$viewContentLoaded');
        $scope.resetAll();
        $scope.displayMoodMap = 1;
        //var $currentSelectedG = JSON.parse(SessionService.get('currentSelectedGroupDetails'));

        //$scope.headMessage = $currentSelectedG.name;

        ////console.log($currentSelectedG);
    };

    $scope.setupCharts();
    
    ////console.log($scope.currentGroup);

    $scope.loadProgress = function (groupid) {
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            };
        }
        //Set the pre and post survey status
        $scope.preSurveyCompleted=SessionService.get('preSurveyCompleted');
        $scope.postSurveyCompleted=SessionService.get('postSurveyCompleted');
        if(!$scope.preSurveyCompleted) {
            SessionService.set('preSurveyCompleted',$scope.currentSelectedGroupDetails.preSurveyCompleted);
            //alert($scope.currentSelectedGroupDetails.preSurveyCompleted);
        } else if(!$scope.postSurveyCompleted) {
            SessionService.set('postSurveyCompleted',$scope.currentSelectedGroupDetails.postSurveyCompleted);
        }
        if ($scope.currentGroup) {
            //console.log('Current Selected group details: ' + $scope.currentSelectedGroupDetails);
            var currentDay = Math.floor(21 - ((Math.floor(Date.now() / 1000) - $scope.currentSelectedGroupDetails.timestart) / 86400));
            $scope.headMessage = $scope.currentSelectedGroupDetails.name;
        } else {
            var currentDay = 0;
            $scope.headMessage = 'Please select team';
        }
        $scope.currentDay = currentDay;
        //console.log('Setting current day to: ' + currentDay);
        if ($scope.currentGroup === 0) {
            var progress = 0;
            $scope.progress = 0;
        } else if ($scope.currentDay <= 0) {
            var progress = 100;
            $scope.progress = progress;
            $scope.getWallPosts();
        } else {
            var progress = Math.floor($scope.currentDay / 21);
            $scope.progress = progress;
            $scope.getWallPosts();
        }
        //Not sure why this code is here? Commented out...
        //var canvasProgress = document.getElementById("canvas-progress");
        //var progressInstance = new Processing(canvasProgress, $scope.UserProgress);
    };


    $scope.mysql_to_unix = function(date) {
        return Math.floor(new Date(date).getTime() / 1000);
    }
    
    $scope.getWallPosts = function () {
        var posts = $http({
            method: 'POST',
            url: '/api/group/private/posts',
            data: {
                groupid: $scope.currentGroup
            }
        });
        posts.success(function (data) {

            $scope.posts = data;
            //console.log("lagg");
            //console.log("dtl :"+data.length);
			
			if (data.length < 1){
				$('.journal-wall-posts').html($scope.noPost);
			}

        });


        //$('.journal-wall-posts').html($scope.noPost);
    };
    //$scope.getGroupList = function () {
    //    return $http.post('/api/group/list');
    //};
    $scope.getWordsForCloud = function () {
        /*$http.post('/api/user/words').success(function (data) {
            $scope.wordCloud = data;

            var r = null;
            
            try {
                JSON.parse(data);
                //alert('true');
            } catch (e) {
              //console.log("error:"+e);
              r = e;
                
            }

            ////console.log(r);
            
            if (r != null){
                $('#tagcloud').html($scope.disabledFeatureMsg);
            }
           
            
                
            


            
        });  */
            $('#tagcloud').html($scope.disabledFeatureMsg);
    };
    $scope.getPhotosForMontage = function () {
        $http.post('/api/user/photos').success(function (data) {
            //console.log(data);
            $scope.photos = data;
        });
    };
    $scope.canDisplay = function (type) {
        if (type === 'currentmission') {
            if ($scope.currentGroup && SessionService.get('pendingTask')) {
                return false;
            }
        } else if (type === 'play') {
            if ($scope.currentGroup && !SessionService.get('pendingTask')) {
                return false;
            }
        }
        return true;
    };

    $scope.dothis = function(){

            //alert("aaa");

    };


    $scope.$on('$viewContentLoaded', function (FlashService) {

        console.log('==========');
        console.log($scope.sessionUser);

        if ($scope.sessionUser.notification == '1'){
                SessionService.set('liveAppNotificationSession', 'true');
        }else{
                SessionService.set('liveAppNotificationSession', 'false');

        }




        if ($scope.sessionUser.push_notification == '0' && SessionService.get('chromeReminderFlag') != "true"){



                //dropdownService.newDropdown("pushNotificationReminder", 5000, "Tap to register for <br/>Chrome notification");
                SessionService.set('chromeReminderFlag', "true");
        }


        $timeout(function() {


          //console.log('Journal Page Content Loaded !');

          $http({url: 'api/global/taskCompleted', method: 'POST'})
          .then(function(result){

                    //alert(result.data);
                    SessionService.set('taskCompleted', result.data);

           });





         // $rootScope.contentWrapperLoader();
         $rootScope.removeContentWrapperLoader();

            setTimeout(function(){

                    ////console.log(result.data);

                    ////////////

                    console.log("REGISTRERD USSER DATE "+$scope.mysql_to_unix($scope.sessionUser.created_at));

                    var unix = Math.round(+new Date()/1000);

                    //var range = unix - $scope.mysql_to_unix($scope.sessionUser.created_at);

                    //var numOfDaysPassed = Math.ceil(range / 86400);

                    //console.log("TEST DAYS : ");
                    //console.log(result.data[0]);
                    //alert(numOfDaysPassed);

                    //SessionService.set('numOfDaysPassed', result.data[0].daysPassed);





                    ////////////


                    //var loginRedirect = localStorage.getItem("loginRedirect");
                    //
                    //if (loginRedirect != null){
                    //    $location.path("/"+loginRedirect);
                    //    localStorage.removeItem("loginRedirect");
                    //}


                    $scope.hideGroupSelection=1;

                    //$scope.groups = result.data;

                    console.log("====");

                    console.log(SessionService.get('user'));

                    console.log("====");

                    $scope.getWordsForCloud();
                    $scope.getPhotosForMontage();
                    $scope.resetAll();
                    if($scope.sessionUser.groupCount===1 && $scope.sessionUser.role != 1)
                    {
                        $scope.displayGroupList = 0;
                        //$scope.setCurrentGroup($scope.sessionUser.groups[0].id);
                    }
                    else
                    {
                        $scope.hideGroupSelection=0;
                        $scope.displayGroupList = 1;
                        //if (SessionService.get('currentSelectedGroup') != null)
                        //{
                        //    $scope.setCurrentGroup(SessionService.get('currentSelectedGroup'));
                        //}

                        $rootScope.removeContentWrapperLoader();
                        //$scope.InitUserProgress(0, $scope.weekday.toUpperCase(), $scope.date + '/' + $scope.month, $scope);
                    }






                    if ($scope.currentGroup) {
                        $scope.resetAll();
                        $scope.displayMoodMap = 1;
                        $scope.loadProgress($scope.currentGroup);
                        ////console.log($scope.progress);

                        // search if presurvey has been completed !


                        //$http.post('/api/survey/isPresurveyCompleted', {'groupid':$scope.currentGroup}).
                        //    success(function(data, status, headers, config) {
                        //        // this callback will be called asynchronously
                        //        // when the response is available
                        //        if (data == "true"){
                        //            SessionService.set('preSurveyCompleted', 1);
                        //        }else{
                        //
                        //            $location.path('/presurveyintro');
                        //
                        //        }
                        //
                        //
                        //    });



                        //This is where we should prompt for the survey as well
                        /* if(SessionService.get('preSurveyCompleted')==0) {
                         $location.path('/presurveyintro');
                         } else */
                    } else {
                        $scope.resetAll();
                        $scope.displayGroupList = 1;
                        $scope.currentGroup = 0;
                        //$scope.loadProgress(0);   //TODO: fix this so we can show empty progress canvas
                    }




                    setTimeout(function() {

                        if(!$scope.currentGroup) {
                            dropdownService.newDropdown("notification", 40000000, "Please select a team");
                        }




                    }, 4000);







            }, 1000);






          });


            if (SessionService.get('progressPercentage') == 100){
                //$('.journal-buttons').append('<button ng-show="complete" class="button button-blu view-mission">GOAL COMPLETED!</button>');
                $scope.allCompleted = true;
                $('.button-gre').remove();
            }




    });
    $scope.humanReadable = function (time) {
        return moment(time).fromNow();
    };
    



    
	///////////////////
	/* User Progress */
	///////////////////
	
    $scope.UserProgress = function ( UserProgress )
    {
        var _w = $scope.UserProgress._width
        var _h = $scope.UserProgress._height
        var _day = $scope.UserProgress._day;
        var _date = $scope.UserProgress._date;
        var _percent = $scope.UserProgress._progress;
        var p_count = 0;
		var _completed_days = $scope.UserProgress._completedDays;
		
        UserProgress.lightBlue = UserProgress.color(47, 143, 188);
        UserProgress.darkBlue = UserProgress.color(24, 82, 110);
        UserProgress.cream = UserProgress.color(242, 208, 141);
		
		
        UserProgress.setup = function()
        {
        	
            UserProgress.size( _w, _h);
            UserProgress.frameRate( 35 );
            UserProgress.background(0, 0);

            UserProgress.textFont(UserProgress.createFont("Raleway",30));
        };
        
        UserProgress.draw = function()
        {
            UserProgress.background(0, 0);
            //CIRCLE BG
            UserProgress.strokeWeight( _h/20 );
            //bg
            UserProgress.stroke(UserProgress.darkBlue);
            UserProgress.fill(UserProgress.lightBlue);
            UserProgress.ellipse(_w/2, _h/2, _h*.75, _h*.75);
            //PROG BAR
            
            //otherwise do inimation
        	UserProgress.noFill();
        	UserProgress.strokeWeight( _h/15 );
        	UserProgress.stroke(UserProgress.cream);
        	UserProgress.strokeCap(UserProgress.SQUARE);
        	p_count += (_percent-p_count)/4
        	UserProgress.arc(_w/2, _h/2, _h*.84, _h*.84, UserProgress.radians(270), UserProgress.radians(270+((360/100)*p_count)));
        	
        	if(Math.round(_percent) == Math.round(p_count))
        	{   
        		//update progress bar to be exact on ani complete based on _percent not p_count
        		UserProgress.arc(_w/2, _h/2, _h*.84, _h*.84, UserProgress.radians(270), UserProgress.radians(270+((360/100)*_percent)));
        	}
            
            
            UserProgress.smooth();
			
            //TEXT
            UserProgress.maxFontSize = 20/100;
            //day
            /*UserProgress.textSize(UserProgress.maxFontSize*(_h*.4));
            UserProgress.day_width = UserProgress.textWidth(_day);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(_day, (_w-UserProgress.day_width)*.5, _h*.36);
            //date
            UserProgress.textSize(UserProgress.maxFontSize*(_h*1.2));
            UserProgress.date_width = UserProgress.textWidth(_date);
            UserProgress.text(_date, (_w-UserProgress.date_width)*.5, _h*.56);*/
            
            //percent progress
            UserProgress.textSize(UserProgress.maxFontSize*(_h*1.4));
            UserProgress.prog_str = p_count.toFixed(0)+"%";
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.53);
            
            //completed missions label
            UserProgress.textSize(UserProgress.maxFontSize*(_h*.35));
            UserProgress.prog_str = "complete!";
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.64);
            
            //Completed days label
            UserProgress.textSize(UserProgress.maxFontSize*(_h*.35));
            UserProgress.prog_str = "Day "+_completed_days;
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.darkBlue);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.78);
            
            

			//end animtion and start Moodmap
            if(Math.round(_percent) == Math.round(p_count))
            {   
            	UserProgress.noLoop(); //stop loop animation
                 //display mood map

                var unix = Math.round(+new Date()/1000);
            }
            
        };
    };
    $scope.InitUserProgress = function(data, scope)  //Change parameters to total num of missions, start date, completed missions
    {
        console.log("Init User Progress");
        var progress = data['progress'];
        $scope.progressPercent = data['progress'];
        $scope.totalMissions = data['total_mission'];
        $scope.completedDays = data['completed_days'];
        console.log('PROGRESS DATA');
        console.log(data);
        //console.log('Completed Days');
        //console.log(completedDays);
        //console.log('Start Date');
        //console.log(data['start_date']);
        $scope.completedMissions = data['completed_missions'];
        $scope.totalLikes = data['total_likes'];
        $scope.userProgress = progress;
        $scope.complete = true;
        //$rootScope.removeAjaxLoader();

        $scope.drawProgress(progress);

        //$scope.startMoodMapAni();

        //scope.UserProgress._width = $(".progress").width();
        //scope.UserProgress._height = $(".progress").height();
        //scope.UserProgress._day = day;
        //scope.UserProgress._date = date;
        //scope.UserProgress._progress = progress;
        //scope.UserProgress._completedDays = $scope.completedDays;
        //
        //var canvasProgress = document.getElementById("canvas-progress");
        //var progressInstance = new Processing(canvasProgress, scope.UserProgress);

    };

    $(window).resize(function() {
        $scope.dialProgress = 0;
        $scope.drawProgress();
    })

    $scope.drawProgress = function() {
        $scope.dialProgress = $scope.userProgress;
        if ($(window).width() >= 375) {
            $scope.progressRadius = 75;
        } else {
            $scope.progressRadius = 57;
        }
    }




	/////////////
	/* MoodMap */
	/////////////

	$scope.MoodMap = function (MoodMap) 
	{
      MoodMap.lightBlue = MoodMap.color(47, 143, 188);
      MoodMap.darkBlue = MoodMap.color(24, 82, 110);
      MoodMap.cream = MoodMap.color(242, 208, 141);
      MoodMap.white = MoodMap.color(242, 208, 141);
      MoodMap.title = "MOOD MAP";
      var _w = $scope.MoodMap._width;
      var _h = $scope.MoodMap._height;
      var _moodPoints = $scope.MoodMap._moodPoints;
      var _temp_moodPoints = [];
      var mood_map_x_scroll = 0;

      MoodMap.setup = function()
      {
        MoodMap.size( _w, _h );
        MoodMap.frameRate( 35 );
        MoodMap.background(0,0);

        MoodMap.textFont(MoodMap.createFont("Raleway",30));

        //create empy array same length as _moodPoints
        for(var i=0; i<_moodPoints.length; i++)
        {
          _temp_moodPoints[i] = MoodMap.height;
        }
        
        console.log("moodpoints: "+_moodPoints);
        console.log("MoodMap.height: "+MoodMap.height);
      }

      MoodMap.draw = function()
      {
        MoodMap.background(0,0);
        MoodMap.spacing_h = MoodMap.width/_moodPoints.length;
        MoodMap.spacing_v = (MoodMap.height*.75)/7;
        MoodMap.padding = MoodMap.spacing_h/2;
        MoodMap.moodHigh = new PVector(0, MoodMap.height);
        MoodMap.prevPoints;


         for(var i=0; i<_moodPoints.length; i++)
         {
           //draw points
           MoodMap.noStroke();
           MoodMap.fill(MoodMap.white);
           MoodMap.x = MoodMap.padding+(MoodMap.spacing_h*i);

           var point_final_y_pos = MoodMap.height-(MoodMap.spacing_v*_moodPoints[i]) + 75;
           MoodMap.y = _temp_moodPoints[i] += ((point_final_y_pos-_temp_moodPoints[i])/(8));//animate points with some ease

           MoodMap.ellipse(MoodMap.x, MoodMap.y, 5, 5);

          //draw line
          if(i>0)
          {
            MoodMap.stroke(MoodMap.white);
            MoodMap.strokeWeight(2);
            MoodMap.line(MoodMap.prevPoints.x, MoodMap.prevPoints.y, MoodMap.x, MoodMap.y);
          }

          //check for high point 0 high, 100 low!
          if(MoodMap.y < MoodMap.moodHigh.y)
          {
            MoodMap.moodHigh.x = MoodMap.x;
            MoodMap.moodHigh.y = MoodMap.y;
          }

          //store current points for line points in next loop iteration
           MoodMap.prevPoints = new PVector(MoodMap.x, MoodMap.y);
         }

         //draw high point
         MoodMap.strokeWeight(0);
         MoodMap.stroke(MoodMap.white, 50);
         MoodMap.noFill();
         //MoodMap.ellipse(MoodMap.moodHigh.x, MoodMap.moodHigh.y, 18, 18);


         var num_of_points = $scope.MoodMap._moodPoints.length;
         var orig_y_of_last_point = Math.round(MoodMap.height-(MoodMap.spacing_v*_moodPoints[num_of_points-1]));
         var temp_y_of_last_point = Math.round(_temp_moodPoints[num_of_points-1]);

         //SCROLL DIV
         var x_scroll = mood_map_x_scroll += (MoodMap.width-mood_map_x_scroll)/(num_of_points);
         //$( ".mood-map" ).scrollLeft( x_scroll );


         if( orig_y_of_last_point == temp_y_of_last_point || num_of_points == 0)
         {
           MoodMap.noLoop(); //stop ani
           //ANIMATE EMOJI BARS
           var speed = 1000;
           var one_unit = 10; //as percentage of div width
           $( ".bar1" ).delay( 0 ).animate({ width: one_unit*$scope.MoodMap.bar1_width+"%", overflow: "auto !important"}, speed);
           $( ".bar2" ).delay( 500 ).animate({ width: one_unit*$scope.MoodMap.bar2_width+"%", overflow: "auto !important"}, speed);
           $( ".bar3" ).delay( 1000 ).animate({ width: one_unit*$scope.MoodMap.bar3_width+"%", overflow: "auto !important"}, speed);
           $( ".bar4" ).delay( 1500 ).animate({ width: one_unit*$scope.MoodMap.bar4_width+"%", overflow: "auto !important"}, speed);
           $( ".bar5" ).delay( 2000 ).animate({ width: one_unit*$scope.MoodMap.bar5_width+"%", overflow: "auto !important"}, speed, function(){

                var unix = Math.round(+new Date()/1000);

                //console.log($scope.sessionUser.last_login);

                //alert("callback called");

                //alert(unix - $scope.sessionUser.last_login);


                //if(SessionService.get('moodCheck') == "true"/* && (unix - $scope.sessionUser.last_login) >= 86400*/) {
                //
                //    //alert(parseInt($scope.sessionUser.last_login));
                //
                //
                //
                //
                //        // get the previous day and month
                //
                //        var date = new Date(parseInt($scope.sessionUser.last_login) * 1000),
                //        datevalues = [
                //           date.getFullYear(),
                //           date.getMonth()+1,
                //           date.getDate(),
                //           date.getHours(),
                //           date.getMinutes(),
                //           date.getSeconds(),
                //        ];
                //        //alert(datevalues[3]); //=> [2011, 3, 25, 23, 0, 0]
                //
                //
                //       //alert(date);
                //
                //
                //
                //
                //      //if (SessionService.get('preSurveyCompleted') == 1){
                //      //
                //      //      if (parseInt($scope.sessionUser.last_login) > 0){
                //      //
                //      //
                //      //          if (parseInt(month) > parseInt(datevalues[1])){
                //      //          dropdownService.newDropdown("emotion", 10000, "");
                //      //          }else{
                //      //
                //      //              if (parseInt(day) > parseInt(datevalues[2])){
                //      //                   dropdownService.newDropdown("emotion", 10000, "");
                //      //              }
                //      //
                //      //          }
                //      //
                //      //      }else{
                //      //
                //      //              dropdownService.newDropdown("emotion", 10000, "");
                //      //
                //      //      }
                //      //
                //      //
                //      //
                //      //
                //      //
                //      //      //dropdownService.newDropdown("emotion", 4000000, "");
                //      //}
                //
                //
                //
                //
                //}


            });

           $( ".emoji-usage1" ).html( $scope.MoodMap.bar1_width );
           $( ".emoji-usage2" ).html( $scope.MoodMap.bar2_width );
           $( ".emoji-usage3" ).html( $scope.MoodMap.bar3_width );
           $( ".emoji-usage4" ).html( $scope.MoodMap.bar4_width );
           $( ".emoji-usage5" ).html( $scope.MoodMap.bar5_width );
           
         }
      }

      
    };

    $scope.getRandomMood = function(min, max) {
      return Math.round(min+(Math.random()*max));
    };
    $scope.InitMoodMap = function()
    {
        $scope.MoodMap.bar1_width = 0;
        $scope.MoodMap.bar2_width = 0;
        $scope.MoodMap.bar3_width = 0;
        $scope.MoodMap.bar4_width = 0;
        $scope.MoodMap.bar5_width = 0;
        $scope.MoodMap._moodPoints = new Array();

        //var wellbeingData = angular.fromJson(SessionService.get('moodmap'));
        //$log.log(wellbeingData);

        var arrayLength=wellbeingData.length;
        for(var i=0; i < arrayLength; i++) {
            $scope.MoodMap._moodPoints.push((parseInt(wellbeingData[i].mood,0)+1)*2);

            if(parseInt(wellbeingData[i].mood,0)===1) {
                $scope.MoodMap.bar1_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===2) {
                $scope.MoodMap.bar2_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===3) {
                $scope.MoodMap.bar3_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===4) {
                $scope.MoodMap.bar4_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===5) {
                $scope.MoodMap.bar5_width += 1;
            }
        }

		//remove this while $(".mood-data") has no width in pixel value
		//$scope.MoodMap._width = (($(".mood-data").width()*.9)/7)*$scope.MoodMap._moodPoints.length;
		//and use this instead
      	$scope.MoodMap._width = (500/7)*$scope.MoodMap._moodPoints.length;
      	
      	
      	$scope.MoodMap._height = $(".mood-data").height();
    };

    //$scope.initMoodDropdown = function() {
    //    if(SessionService.get('moodCheck') == "true"/* && (unix - $scope.sessionUser.last_login) >= 86400*/) {
    //        var date = new Date(parseInt($scope.sessionUser.last_login) * 1000),
    //            datevalues = [
    //                date.getFullYear(),
    //                date.getMonth()+1,
    //                date.getDate(),
    //                date.getHours(),
    //                date.getMinutes(),
    //                date.getSeconds(),
    //            ];
    //
    //        if (SessionService.get('preSurveyCompleted') == 1){
    //            if (parseInt($scope.sessionUser.last_login) > 0){
    //
    //                if (parseInt(month) > parseInt(datevalues[1])){
    //                    dropdownService.newDropdown("emotion", 10000, "");
    //                }else{
    //                    if (parseInt(day) > parseInt(datevalues[2])){
    //                        dropdownService.newDropdown("emotion", 1000000, "");
    //                    }
    //                }
    //
    //            }else{
    //                dropdownService.newDropdown("emotion", 10000, "");
    //
    //            }
    //
    //            $scope.$on('$routeChangeStart', function(next, current) {
    //                $("#emoicon").remove();
    //
    //                //SessionService.set('moodCheck',false);
    //
    //                dropdownService.dismissDropdown(1);
    //            });
    //        }
    //    }
    //}
    
    $scope.startMoodMapAni = function() {


      $scope.InitMoodMap();
      
      var canvasMoodMap = document.getElementById("mood-map");
      var moodMapInstance = new Processing(canvasMoodMap, $scope.MoodMap);

        //$scope.initMoodDropdown();
    };
    
    /*
     This will update the mood
     */
    $rootScope.mood = $scope.updateMood=function(currentMood) {
        $log.log(currentMood);
        APICallService.updateMood($scope.currentGroup,currentMood).then(function(data){
            $log.log(data);
            //SessionService.unset('moodCheck');
            //$scope.moodCheck=0;
            $("#emoicon").remove();

            $(".mood-map").empty().append("<canvas class='canvas-mood-map' id='mood-map'></canvas>");

            //$scope.InitMoodMap();

            var canvasMoodMap = document.getElementById("mood-map");
            var moodMapInstance = new Processing(canvasMoodMap, $scope.MoodMap);

            location.reload();

        });

        SessionService.set('moodCheck',false);

        dropdownService.dismissDropdown(1);

    };


    if ($routeParams.moodcode){
        $scope.updateMood($routeParams.moodcode);
    }
    
    
    
    
    
    ///////////////////
    /* Photo Gallery */
    ///////////////////
    
    $scope.photoMontage = function () {
            /*var temp = "<div class='brick' style='width:{width}px;'><img src='images/photo/{index}.jpg' width='100%'></div>";
            var temp2 = "<div class='brick' style='width:{width}px;'><img src='{index}' width='100%'></div>";
            if ($scope.photos.length < 5) {
                /*var w = 1, h = 1, html = '', limitItem = 10;
                for (var i = 0; i < limitItem; ++i)
                {
                    w = 1 + 3 * Math.random() << 0;
                    html += temp.replace(/\{width\}/g, w * 150).replace("{index}", i + 1);
                }
                $("#freewall").append(html);
                
                // show this html tag when there is no images to show
                //$('.photo-container').html("<div id='empty-text-align'>Empty !</div>");


            } else {
                $scope.photos.forEach(function(photo){
                    w = 1 + 3 * Math.random() << 0;
                    html += temp2.replace(/\{width\}/g, w * 150).replace("{index}", photo);
                });
                $("#freewall").append(html);
            }
    
            var wall = new freewall("#freewall");
            wall.reset(
                    {
                        selector: '.brick',
                        animate: true,
                        cellW: 150,
                        cellH: 'auto',
                        gutterX: 15,
                        onResize: function ()
                        {
                            wall.fitWidth();
                        }
                    });
    
            var images = wall.container.find('.brick');
            images.find('img').load(function ()
            {
                wall.fitWidth();
            });

            */

            $('.photo-container').html($scope.disabledFeatureMsg);

    
        };
        
        
        
        ///////////////////
        /* Word Cloud    */
        ///////////////////
        
        $scope.displayWordCloud = function () 
        {
        /*
            $('#tagcloud').css({'height': $('.user-data-btm').height() + 'px', 'width': '100%'});
            var w = $('.user-data-btm').width();
            var h = $('.user-data-btm').height();
            var settings = {
                //height of sphere container
                height: h,
                //width of sphere container
                width: w * .8,
                //radius of sphere
                radius: w / 5,
                //rotation speed
                speed: 2,
                //sphere rotations slower
                slower: 0.9,
                //delay between update position
                timer: 2,
                //dependence of a font size on axis Z
                fontMultiplier: 30,
                //tag css stylies on mouse over
                hoverStyle: {
                    border: '',
                    color: ''
                },
                //tag css stylies on mouse out
                mouseOutStyle: {
                    border: '',
                    color: ''
                }
            };
            $('#tagcloud').tagoSphere(settings);

            //console.log(settings);
            */
        };
    
    
        
    
    
});