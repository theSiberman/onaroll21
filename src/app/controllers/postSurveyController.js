/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('PostSurveyCtrl',function($scope,$location,SessionService, $http, $rootScope, dropdownService, $timeout){
    $scope.headTitle='post survey';
    $scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.selectedGroupId=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).id;
    $scope.userid=angular.fromJson(SessionService.get('user')).id;
    $rootScope.contentWrapperLoader();
    
    var optionNumEx = 0;
    var optionCurrent = 0;
    var optionFlag = false;
    var selectedOptionEx = [];


    $http({
                url: 'api/global/getProgress',
                method: 'POST',
                data: {
                    groupid: $scope.selectedGroupId
                }
            }).then(function(result){
                
                SessionService.set('progressPercentage', result.data);
                
            });





    $http.post('/api/survey/getSurveyList', {'type': 'post', 'groupid':$scope.selectedGroupId}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available

                          
					      $scope.questions = data;
                          
                          ////console.log(data.length);
                          
                          optionNumEx = data.length;

                          //alert(optionNum);


                          if (optionNumEx == 0){
                                $scope.headTitle='TEAM';
                                $scope.template = "/templates/widgets/post-survey-without-content.html";



                            $http.post('/api/user/survey/completePostSurvey', { groupid: $scope.selectedGroupId, surveyid: 10 }).
                            success(function(data, status, headers, config) {

                                    //alert(data);

                            });



                          }else{
                                $scope.template = "/templates/widgets/post-survey-with-content.html";
                          }


					      
					    });


     $rootScope.removeContentWrapperLoader();   


     $scope.postsurveySwitch = function(){

                           

                          if (optionNumEx == 0){
                                $location.path('/main');
                          }else{
                                $location.path('/postsurvey');
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
        data: $('form#postsurveyform').serialize(),
        success: function(data) {
                    
                        SessionService.set('postSurveyCompleted','1');
                    	$location.path('/main');
                    
                    
                    
                 }
    	});

        // remove ajax loader out of body
        $rootScope.removeAjaxLoader();

         dropdownService.newDropdown("notification", 4000, "Post survey completed");
         dropdownService.newDropdown("notification", 4000, "Fantastic - goal completed!");



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
                //alert('a');
                $rootScope.removeAjaxLoader();
    		
    	}
    	
    };
    
    
    
    $scope.optionSelect = function (id){
    	
    	////console.logoptionNum);
    	
    	var innerFlag = false;
    	
    	for (var i = 0; i < selectedOptionEx.length; i++) {
		    var option = selectedOptionEx[i];
		    
		    ////console.logoption);
		    
		    if (option == id){
		    	
		    	innerFlag = true;
		    	
		    }
		    
		}
    	
    	if (!innerFlag){
    		
    		selectedOptionEx.push(id);
    	}
    	
    	
    	//console.logselectedOptionEx);
    	////console.logselectedOption);
    	
    	
    	if (selectedOptionEx.length >= optionNumEx){
    		
    		
    		
    		//console.logoptionNumEx);
    		
    		optionFlag = true;
    		
    	}
    	
    	optionCurrent++;
    	
    };



    ///// disable all the buttons to force user to do the survey


    $scope.$on('$viewContentLoaded', function () {


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
        //}, 200);


        //alert("a");
    
        


            
        

    });

    


    // end 
    
    
});