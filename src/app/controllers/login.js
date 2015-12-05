/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('LoginCtrl', function ($scope, $window, $routeParams, $location, $cacheFactory, APICallService, AuthenticationService, SessionService, $http, $rootScope, dropdownService) {
    $scope.Lang = $window.Lang;
    var storeUsernameLocally = "";
    var username = localStorage.getItem("username");
    if (username){
    	storeUsernameLocally = localStorage.getItem("username");
    	////console.log($scope.credentials.remember);
    }

    //var $httpDefaultCache = $cacheFactory.get('$http');
    $scope.loginMessage = "";

    //$httpDefaultCache.removeAll();

    APICallService.getNativeAppStatus().success(function(status) {
        usingUniWebView = status;
    })

    //window.location.reload(true);
    //$.ajax({
    //    url: "",
    //    context: document.body,
    //    success: function(s,x){
    //        $('html[manifest=saveappoffline.appcache]').attr('content', '');
    //        $(this).html(s);
    //    }
    //});

    //alert("a");

                var path = $location.path();
                ////console.log(path);

                if (path != "/forgot-pwd"){

                    AuthenticationService.logout();
                    
                }

    $rootScope.contentWrapperLoader();
    
    SessionService.set('preSurveyCompleted', 0);
    SessionService.set('postSurveyCompleted', 0);
   
    $scope.remember_username = true;
    
    $scope.credentials = {username: storeUsernameLocally, password: ""};

    ////console.log($rootScope.fromResetPwd );

    if ($rootScope.fromResetPwd == 1){
        
        //$rootScope.notificationGreen("Success. Check email");
        dropdownService.newDropdown("notification", 5000, "Success. Check email");
        $rootScope.fromResetPwd = 0;
    }

    if (!$scope.credentials.username) {
        $("#uname").focus();
    } else {
        $("#pword").focus();
    }

    $rootScope.removeContentWrapperLoader();
    
    $scope.login = function () {
        var userandpass = $scope.credentials;
        $scope.loginMessage = "";

        //alert($scope.playerid_hidden);

        //alert($routeParams.pid)

        // get playserid from url

        if (!userandpass.username){
            $scope.loginMessage = "Please enter email";
            $("#uname").focus();
        } else if (!userandpass.password){
            $scope.loginMessage = "Please enter password";
            $("#pword").focus();
        }

        if ($scope.loginMessage == ""){
            // ajax loader starts
            $rootScope.ajaxLoader();

            AuthenticationService.login($scope.credentials)
            .success(function (data) {
                $location.path("/main");
                $scope.storeUsername();

                // write playerID on the database


                    // get the playerID

                    //alert("cool");
                    //sessionStorage.setItem("playerid_field", playerIDArr[1]);
                    //location.href = "uniwebview://loginform?loaded=tes5t";

                    //alert(SessionService.get('playerid_field'));



                    //alert($('#playerID').val());

                    /*if ($('#playerID').val() != ""){


                            //alert("CONTENT : "+$('#playerID').val());

                            $http.post('/api/service/writeMobilePNtoDB', {'userID': data.id, 'playerID': $('#playerID').val()}).
                            success(function(data, status, headers, config) {
                              // this callback will be called asynchronously
                              // when the response is available


                              //alert("SUCCESS : "+$('#playerID').val());

                            }).error(function(data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                //alert("PLayer ID is in wrong format");


                                //alert("FAIL : "+data);
                              });

                            SessionService.unset('playerid_field');
                        }*/


                // remove ajax loader out of body

                $rootScope.removeAjaxLoader();
            })
            .error(function (data) {
                //console.log(data);

            });
        }else{
            var path = $location.path();
            ////console.log(path);

            if (path != "/newAccount"){

                //$rootScope.warningRed(message);
                //dropdownService.newDropdown("warning", 5000, message);


            }
        }
    };


    $scope.resetPwd = function () {
        $scope.errorMessage = "";

        var expression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

        if ($scope.emailforreset && expression.test($scope.emailforreset)) {
            // ajax loader starts
            $rootScope.ajaxLoader();

            $http.post('/api/service/forgotpwd', {email: $scope.emailforreset}).
                success(function(data, status, headers, config) {

                    // this is the core function
                    if (data == "OK"){
                        $rootScope.fromResetPwd = 1;

                        $location.path("/login");
                    } else {
                        //$rootScope.warningRed(data);
                        dropdownService.newDropdown("warning", 5000, data);
                    }

                    // remove ajax loader out of body
                    $rootScope.removeAjaxLoader();
                })
        } else {
            $scope.errorMessage = "Please enter a valid email";
        }
    };


    $scope.logout = function () {
        AuthenticationService.logout();
    };
    $scope.navigateTo = function (path) {
        $location.path('/' + path);
    };
    
    $scope.rememberUsername = function ()
    {
    	if (!$scope.remember_username) $scope.remember_username = true;
    	else $scope.remember_username = false;
    };
    
    $scope.storeUsername = function ()
    {
    	if ($scope.remember_username) localStorage.setItem("username", $scope.credentials.username);
    	else localStorage.setItem("username", "");
    };


    

                


                



     $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            $("#page-loader").hide();
            $('.content-wrapper').css('display', '0');


            

     });           






    $rootScope.removeAjaxLoader();

   
    
});




