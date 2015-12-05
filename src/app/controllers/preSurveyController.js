/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('PreSurveyCtrl',function($scope,$location,SessionService, $http, $rootScope, dropdownService, $timeout){
    $scope.headTitle='pre survey';
    $scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.selectedGroupId=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).id;
    $scope.userid=angular.fromJson(SessionService.get('user')).id;
    $scope.groupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    
    
    
    
    var optionNum = 0;
    var optionCurrent = 0;
    var optionFlag = false;
    var selectedOption = [];


    

    $rootScope.contentWrapperLoader();
    
    // pull the company logo from the database to display on the screen

    console.log($scope.groupDetails.thumbnail);
    
    $scope.logo = decode_base64($scope.groupDetails.thumbnail);
    
    
    
    function decode_base64 (s)
    {
        var e = {}, i, k, v = [], r = '', w = String.fromCharCode;
        var n = [[65, 91], [97, 123], [48, 58], [43, 44], [47, 48]];

        for (var z in n)
        {
            for (i = n[z][0]; i < n[z][1]; i++)
            {
                v.push(w(i));
            }
        }
        for (i = 0; i < 64; i++)
        {
            e[v[i]] = i;
        }

        for (i = 0; i < s.length; i+=72)
        {
            var b = 0, c, x, l = 0, o = s.substring(i, i+72);
            for (x = 0; x < o.length; x++)
            {
                c = e[o.charAt(x)];
                b = (b << 6) + c;
                l += 6;
                while (l >= 8)
                {
                    r += w((b >>> (l -= 8)) % 256);
                }
             }
        }
        return r;
    }

    
	
    
    $http.post('/api/survey/getSurveyList', {'type': 'pre', 'groupid':$scope.selectedGroupId}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      $scope.questions = data;
					      
					      ////console.log(data.length);
					      
					      optionNum = data.length;

                          //alert(optionNum);


                          if (optionNum == 0){
                                $scope.headTitle='TEAM';
                                $scope.template = "/templates/widgets/pre-survey-without-content.html";



                            $http.post('/api/user/survey/completePreSurvey', { groupid: $scope.selectedGroupId, surveyid: 10 }).
                            success(function(data, status, headers, config) {

                                    //alert(data);

                            });



                          }else{
                                $scope.template = "/templates/widgets/pre-survey-with-content.html";
                          }


					      
					    });

	$rootScope.removeContentWrapperLoader();	


    $scope.presurveySwitch = function(){

                          if (optionNum == 0){
                                $location.path('/main');
                          }else{
                                $location.path('/presurvey');
                          }
    };

    
    $scope.saveResponse = function (){


    	// ajax loader starts
        $rootScope.ajaxLoader();
    	
    	if (optionFlag){
			
		    	$.ajax({
		        url: '/api/survey/saveResponse',
		        type: 'post',
		        dataType: 'json',
		        data: $('form#presurveyform').serialize(),
		        success: function(data) {
		                    	
		                    	SessionService.set('preSurveyCompleted', '1');
		                    
		                    	$location.path('/main');

		                    	
		                    	
		                    	
		
		                 }
		    	});

		    	// remove ajax loader out of body
                $rootScope.removeAjaxLoader();

                //$rootScope.notificationGreen("Pre survey completed");
                dropdownService.newDropdown("notification", 5000, "Pre survey completed");

                // remove the top cover

                //$timeout(function() {
                //    $('#footer-disable-buttons').remove();
                //
                //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow-active.svg')");
                //
                //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile-active.svg')");
                //
                //    $('.play-btn').css("background-image", "url('./images/svg/footer-play-active.svg')");
                //
                //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg-active.svg')");
                //
                //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall-active.svg')");
                //
                //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn-active.svg')");
                //
                //}, 3000);


                
    	
    	}else{
    		
    		   // Notification HTML
	      		dropdownService.newDropdown("warning", 3000, "Please answer all questions");

			    // remove ajax loader out of body
                $rootScope.removeAjaxLoader();
    		
    	}
    	
    };
    
    
    $scope.optionSelect = function (id){
    	
    	////console.log(optionNum);
    	
    	var innerFlag = false;
    	
    	for (var i = 0; i < selectedOption.length; i++) {
		    var option = selectedOption[i];
		    
		    ////console.log(option);
		    
		    if (option == id){
		    	
		    	innerFlag = true;
		    	
		    }
		    
		}
    	
    	if (!innerFlag){
    		
    		selectedOption.push(id);
    	}
    	
    	
    	//console.log(selectedOption);
    	////console.log(selectedOption);
    	
    	
    	if (selectedOption.length >= optionNum){
    		
    		
    		
    		//console.log('all options are selected');
    		
    		optionFlag = true;
    		
    	}
    	
    	optionCurrent++;
    	
    };

    ///// disable all the buttons to force user to do the survey


    $scope.$on('$viewContentLoaded', function (FlashService) {


        //$timeout(function() {
        //    $('.footer').append('<div id="footer-disable-buttons"></div>');
        //
        //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow.svg')");
        //
        //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile.svg')");
        //
        //    $('.play-btn').css("background-image", "url('./images/svg/footer-play.svg')");
        //
        //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg.svg')");
        //
        //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall.svg')");
        //
        //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn.svg')");
        //
        //}, 100);

    
        


            
        

    });

    


    // end 


    
    
    
});