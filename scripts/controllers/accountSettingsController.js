// @ John Le
// Notification User Admin Controller


app.controller('AccountSettingsCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        $rootScope, AuthenticationService,
                                        SessionService,dropdownService,Upload) {
                                        	
				// BEGIN THE MAIN FUNCTION

					$scope.headTitle='Account';
    				$scope.headMessage='Account settings';
                    $rootScope.contentWrapperLoader();

                    $scope.setHeader("User Settings");
                    $scope.setActiveMenu("none");

                    var userAccount = JSON.parse(SessionService.get("user"));

                    var min = 10000;
                    var max = 30000;

                    $scope.randomIMG = Math.floor(Math.random() * (max - min + 1)) + min;
    				
    				// RETRIVE CONFIGS INFO FROM SERVER 
    				//alert(userAccount);

                    //console.log(userAccount.picture);

                    $scope.userAvatar = userAccount.picture;

                    //$scope.profile.username = userAccount.username;


                    //$scope.profile.firstname = userAccount.firstname;
                    //$scope.profile.lastname = userAccount.lastname;

                    //$scope.profile.email = userAccount.email;

                    //$scope.profile.screenname = userAccount.screenhandle;

                    //$scope.items = ['ACT','JBT','NSW','NT','QLD','SA','TAS','VIC','WA'];
    				
                    //$scope.profile.state = userAccount.state;

                    $("#resetAvatar").css("display", "none");

                    var imgContent = "";
                    var imgType = "";


                    $scope.profile = {
                        username: userAccount.username,
                        firstname: userAccount.firstname,
                        lastname: userAccount.lastname,
                        email: userAccount.email,
                        screenname: userAccount.screenhandle,
                        state: userAccount.state
                        
                    };
                    
                      



                    $scope.populateImageContent = function(obj){

                        //console.log(obj);

                    };



                    $scope.resetAvatar = function(){

                        $("#avatar").attr("src",userAccount['picture']+"?"+$scope.randomIMG);

                        $("#profile img").attr("src",userAccount['picture']+"?"+$scope.randomIMG);
                        ////console.log(userAccount['picture']+"?"+$scope.randomIMG);
                        $("#resetAvatar").css("display", "none");

                        var input = $("#fileInp");

                        input.replaceWith(input.val('').clone(true));

                        imgContent = "";
                        imgType = "";

                    };


                    


                    $scope.file_changed = function(element, $scope) {

                             
                             var photofile = document.querySelector('input[type=file]').files[0];

                             imgType = photofile.type;


                             var reader  = new FileReader();

                             if (photofile) {
                                reader.readAsDataURL(photofile);
                              }

                            reader.onloadend = function () {
                                
                                var preview = $("#avatar").attr("src",reader.result);

                                $("#profile img").attr("src",reader.result);
                                //$scope.avatar = preview;
                                imgContent = reader.result;
                               
                            }

                            $("#resetAvatar").css("display", "block");


                            
                             
                    };

                    var transform = function(data){
                        return $.param(data);
                    }

                    $scope.updateUser = function (post){
                        var passwordCheck = true;
                        var message = '';
                        $scope.errorMessage = '';

                        if (!$scope.profile.firstname) {
                            $scope.errorMessage = "Please enter first name!";
                        } else if (!$scope.profile.lastname) {
                            $scope.errorMessage = "Please enter last name!";
                        } else if (!$scope.profile.email) {
                            $scope.errorMessage = "Please enter email!";
                        } else if ($scope.profile.password && !$scope.profile.confirmpassword) {
                            $scope.errorMessage = "Please confirm new password!";
                        } else if ($.trim($scope.profile.password) != $.trim($scope.profile.confirmpassword)) {
                            $scope.errorMessage = "Passwords did not match!";
                        } else {
                            $rootScope.ajaxLoader();

                            var file = $scope.fileInput;


                            //fd.append('file', file);

                            ////console.log($scope.profile);

                            $scope.profile = {
                                //file: imgContent,
                                fileType: imgType,
                                //username: $scope.profile.username,
                                firstname: $scope.profile.firstname,
                                lastname: $scope.profile.lastname,
                                email: $scope.profile.email,
                                //screenname: $scope.profile.screenname,
                                //state: $scope.profile.state,
                                password: $scope.profile.password

                            };

                            // get file element
                            var photofile = document.querySelector('input[type=file]').files[0];


                            Upload.http({
                                method: 'POST',
                                url: 'api/user/update',
                                headers: {'Content-Type': undefined},
                                transformRequest: function (data) {
                                    var formData = new FormData();
                                    formData.append("post", angular.toJson(data.postData));
                                    formData.append("file", data.file);
                                    return formData;
                                },
                                data: { postData: $scope.profile, file: photofile }
                            })
                                .success(function(data) {

                                    if (data == "OK") {
                                        dropdownService.newDropdown("notification", 2000, "Account settings updated");
                                        dropdownService.newDropdown("notification", 5000, "Please log in");
                                        $("#resetAvatar").css("display", "none");
                                        var input = $("#fileInp");
                                        input.replaceWith(input.val('').clone(true));
                                    } else {
                                        //$rootScope.notificationGreen(data);
                                        dropdownService.newDropdown("notification", 5000, data);
                                    }
                                    // remove ajax loader out of body
                                    $rootScope.removeAjaxLoader();

                                    AuthenticationService.logout();
                                    $location.path("/login");
                                })
                                .progress(function(evt) {
                                    appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                                    //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
                                })
                        }

                        //if ($scope.profile.password) {
                        //    if (!$scope.profile.confirmpassword) {
                        //        passwordCheck = false;
                        //        $scope.errorMessage = "Please confirm new password!";
                        //    } else {
                        //        if ($.trim($scope.profile.password) != $.trim($scope.profile.confirmpassword)) {
                        //            passwordCheck = false;
                        //            $scope.errorMessage = "Passwords did not match!";
                        //        }
                        //    }
                        //}


                        //if (passwordCheck) {


                            //console.log(post);

                            // ajax loader starts

                        //} else {
                        //    dropdownService.newDropdown("warning", 5000, message);
                        //}


                    }

                    $rootScope.removeContentWrapperLoader();
                    $( '.content-wrapper' ).fadeTo( "slow", 1 );



				// END
				});
				






