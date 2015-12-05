/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('SignUpCtrl', function ($scope, $window, $location, AuthenticationService, FlashService, SessionService,  $http, $routeParams, $rootScope, dropdownService, $timeout) {
    $scope.Lang = $window.Lang;
    var storeUsernameLocally = "";
    var username = localStorage.getItem("username");
    
  	var receiveNotifications = false;

    $scope.lastID = "";
    $scope.errorMessage = "";
    $scope.showStep1 = true;
    $scope.showStep2 = false;
    $scope.showStep3 = false;
    $("#signup-firstname").focus();
    
    //$scope.newuser.state = "VIC";
    
    //$scope.newuser.state = "ACT";


    SessionService.unset('liveAppNotificationSession');
    SessionService.unset('lastCompletedMission');
    SessionService.unset('messageGroupUser');
    SessionService.unset('messageid');
    SessionService.unset('messageusername');
    SessionService.unset('moodCheck');
    SessionService.unset('postSurveyCompleted');
    SessionService.unset('preSurveyCompleted');
    SessionService.unset('usertemp');


    //$(document).ready(function() {
    //    var ua = navigator.userAgent.toLowerCase();
    //    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //    if(isAndroid && (usingUniWebView == 'true')) {
    //        $("input[type='text'], input[type='password'], input[type='email']").focusin(function() {
    //            $(".scrollable-wrapper").animate({bottom: 200}, 0);
    //        }).focusout(function() {
    //            $(".scrollable-wrapper").animate({bottom: 0}, 0);
    //        })
    //    }
    //})
    
    
    ////console.log$routeParams.cc);
    $rootScope.contentWrapperLoader();
    
    $scope.isDisabled = "false";
    
    //$("#keycode").val('aa');

        $scope.newuser = {
            firstname : SessionService.get("temp.fname"),
            lastname : SessionService.get("temp.lname"),
            username : SessionService.get("temp.uname"),
            password : SessionService.get("temp.pword"),
            email : SessionService.get("temp.email"),
            confirmemail : SessionService.get("temp.cemail")

        };


        $scope.keycode = SessionService.get("temp.kcode");

        

    //sign user up for OneSignal notifications account
    $scope.receiveNotifications = function()
    {
    	receiveNotifications = document.getElementById('receive-chrome-pn').checked;
    	
    	if(receiveNotifications == true) registerForPush();
    }
    


    //$scope.keycode = "ss";

    
    if ($routeParams.cc){
    	
    	//$scope.newuser.keycode = $routeParams.cc;
    	$scope.keycode = $routeParams.cc;
        $scope.token = $routeParams.token;
    	$scope.isDisabled = "true";
    	////console.log$scope.newuser);
    	
    }
    
    $scope.checkKeyCode = function(obj){
    	
    	
    	
    	//console.log$scope.keycode);
    	
    };

    //Initiate when Enter key is pressed in any step
    $("#signup-form input[type='text'], #signup-form input[type='password']").on('keyup keydown keypress', function (e) {
        var formStep = $(this).parents(".form-step").attr("id");

        if (e.keyCode == 13) {
            e.preventDefault();

            //if (formStep == 'signup-step1') {
            //    $scope.enterStep2();
            //
            //} else if (formStep == 'signup-step2') {
            //    $scope.enterStep3();
            //
            //} else if (formStep == 'signup-step3') {
            //    $scope.signUp();
            //}
        }
    });

    //Return to previous step in registration process
    $scope.previousStep = function(step) {
        var previousStep = "showStep" + step;
        var currentStep = "showStep" + (step + 1);

        $scope[previousStep] = true;
        $scope[currentStep] = false;
    }

    //Validate each step in registration
    $scope.enterStep2 = function() {
        $scope.errorMessage1 = "";

        if ($scope.newuser.firstname && $scope.newuser.lastname) {
            $scope.showStep1 = false;
            $scope.showStep2 = true;
            //$("#signup-email").focus();

        } else {
            if (!$scope.newuser.firstname) {
                $scope.errorMessage1 = "Please enter first name";
                $("#signup-firstname").focus();
            } else if (!$scope.newuser.lastname) {
                $scope.errorMessage1 = "Please enter last name";
                $("#signup-lastname").focus();
            }
        }
    }

    $scope.enterStep3 = function() {
        $scope.errorMessage2 = "";

        var expression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

        if ($scope.newuser.email && expression.test($scope.newuser.email)) {
            // send request to the server
            $http.post('/api/signup/isEmailExist', {email : $scope.newuser.email}).
                success(function(data, status, headers, config) {
                    if (data == "true"){
                        $scope.errorMessage2 = "This email already exists";
                        $("#signup-email").focus();
                    } else {
                        if (!$scope.newuser.password) {
                            $scope.errorMessage2 = "Please enter password";
                            $("#signup-pass").focus();
                        } else if (!$scope.newuser.confirmpassword || ($scope.newuser.confirmpassword != $scope.newuser.password)) {
                            $scope.errorMessage2 = "Password does not match!";
                            $("#signup-confirmpass").focus();
                        } else {
                            $scope.showStep2 = false;
                            $scope.showStep3 = true;
                        }
                    }
                });
        } else {
            $scope.errorMessage2 = "Please enter a valid email";
            $("#signup-email").focus();
        }
    }

    //$scope.openTerms = function() {
    //    $(".popup-inactive").toggleClass("popup-inactive popup-active");
    //}
    
    $scope.signUp = function () {
        $scope.errorMessage3 = "";

        //FlashService.show('Please accept a new mission before creating a post');
        ////console.log$scope.newuser.lname);
        $scope.newuser.keycode = $scope.keycode;
        $scope.newuser.token = $scope.token;
        //console.log$scope.newuser);

        if ($scope.newuser.keycode && $scope.newuser.securitycode && $scope.newuser.tos) {
            $rootScope.ajaxLoader();

            $http.post('/api/servcie/signup', $scope.newuser).
                success(function(data, status, headers, config) {
                    SessionService.set("lastID",data.user_id);

                    if (data.status == "true") {
                        //$rootScope.fromResetPwd = 1;

                        $location.path("/login");

                        dropdownService.newDropdown("notification",5000, "Thanks. You can login below");

                        //////////

                        //on signup save users device details to our DB and update users OneSignal tags
                        if(receiveNotifications) pushUsersDeviceToDB();

                        // write the push notification device data

                        $timeout(function() {
                            var playerid = SessionService.get("playerid");

                            $http.get('https://onesignal.com/api/v1/players/'+playerid).
                                success(function(data, status, headers, config) {

                                    $http.post('/api/service/writePNtoDB',data).
                                        success(function(data, status, headers, config) {

                                        });

                                });

                        }, 3000);

                    } else {
                        //dropdownService.newDropdown("warning", 5000, data.status);
                        $scope.errorMessage3 = data.status;

                        if (data.status == "Incorrect answer") {
                            $("#signup-security").focus();
                        } else if (data.status == "Your keycode is invalid") {
                            $("#keycode").focus();
                        }
                    }
                    // remove ajax loader out of body
                    $rootScope.removeAjaxLoader();

                    document.getElementById('secuimage').src = '/securimage/securimage_show.php?' + Math.random(); return false;

                    document.getElementById('securityinput').value = "";

                });
        } else {
            if (!$scope.newuser.securitycode) {
                $scope.errorMessage3 = "Please answer the question in the picture";
                $("#signup-security").focus();
            } else if (!$scope.newuser.keycode) {
                $scope.errorMessage3 = "Please enter key code";
                $("#keycode").focus();
            } else if (!$scope.newuser.tos) {
                $scope.errorMessage3 = "Please agree to agreement";
            }
        }


        SessionService.unset("temp.fname");
        SessionService.unset("temp.lname");
        SessionService.unset("temp.uname");
        SessionService.unset("temp.pword");
        SessionService.unset("temp.email");
        SessionService.unset("temp.cemail");
        SessionService.unset("temp.kcode");
        SessionService.unset("temp.state");
    	
    };

    $rootScope.removeContentWrapperLoader();


    $scope.saveTemporaryData = function (){

        ////console.log$scope.newuser);
        if ($scope.newuser.firstname != ""){
                $scope.userTemp = {firstname : $scope.newuser.firstname};
                SessionService.set("usertemp", $scope.userTemp);
        }
    };



    //$scope.readTOS = function(){
    //
    //
    //
    //    if ($scope.newuser.firstname != undefined){
    //
    //            SessionService.set("temp.fname",$scope.newuser.firstname);
    //    }else{
    //        SessionService.unset("temp.fname");
    //    }
    //
    //    if ($scope.newuser.lastname != undefined){
    //
    //            SessionService.set("temp.lname",$scope.newuser.firstname);
    //    }else{
    //        SessionService.unset("temp.lname");
    //    }
    //
    //    if ($scope.newuser.username != undefined){
    //
    //            SessionService.set("temp.uname",$scope.newuser.username);
    //    }else{
    //        SessionService.unset("temp.uname");
    //    }
    //
    //    if ($scope.newuser.password != undefined){
    //
    //            SessionService.set("temp.pword",$scope.newuser.password);
    //    }else{
    //        SessionService.unset("temp.pword");
    //    }
    //
    //    if ($scope.newuser.email != undefined){
    //
    //            SessionService.set("temp.email",$scope.newuser.email);
    //    }else{
    //        SessionService.unset("temp.email");
    //    }
    //
    //    if ($scope.newuser.confirmemail != undefined){
    //
    //            SessionService.set("temp.cemail",$scope.newuser.confirmemail);
    //    }else{
    //        SessionService.unset("temp.cemail");
    //    }
    //
    //    if ($scope.keycode != undefined){
    //
    //            SessionService.set("temp.kcode",$scope.keycode);
    //    }else{
    //        SessionService.unset("temp.kcode");
    //    }
    //
    //    if ($scope.newuser.state != undefined || $scope.newuser.state !== ""){
    //
    //            SessionService.set("temp.state",$scope.newuser.state);
    //    }else{
    //        SessionService.unset("temp.state");
    //    }
    //
    //
    //
    //
    //
    //    $scope.navigateTo("legal");
    //
    //
    //};
   
    
});



