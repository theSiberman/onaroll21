/*
 * This is the posts controller which will control all the post activity
 */
app.controller('PostsCtrl', function ($scope,
                                        $rootScope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService, 
                                        dropdownService,
                                        SessionService) {

    $scope.headTitle='posts';
    $scope.headMessage='Add a new post';
    $scope.hideFileUpload=true;
    $scope.user=angular.fromJson(SessionService.get('user'));
    $scope.showPostAs=false;
    $scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask=SessionService.get('pendingTask');
    $scope.imageSrc='';
    $scope.finalTask = "";
    $scope.posting=false;

    $(document).ready(function() {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid && (usingUniWebView == 'true')) {
            $(".post-new .status_text").focusin(function() {
                $(this).css("height","50%");
            }).focusout(function() {
                $(this).css("height","80%");
            })
        }
    })


    //alert('a');

    $scope.moods = [{
        name: "<img src='/images/icon/emoji/fantastic.png' /> <span class='mood-title'>Fantastic</span>",
        code: 5
    }, {
        name: "<img src='/images/icon/emoji/pretty-good.png' /> <span class='mood-title'>Pretty Good</span>",
        code: 4
    }, {
        name: "<img src='/images/icon/emoji/okey.png' /> <span class='mood-title'>Okay</span>",
        code: 3
    }, {
        name: "<img src='/images/icon/emoji/not-great.png' />  <span class='mood-title'>Not Great</span>",
        code: 2
    }, {
        name: "<img src='/images/icon/emoji/terrible.png' /> <span class='mood-title'>Terrible</span>",
        code: 1
    }];

    //alert("a");
    $('#postForm select').material_select();
    
    // last mission detect
    $rootScope.contentWrapperLoader();
    
    $http.post('/api/mission/detectLastMission', {'taskid': $scope.pendingTask,'groupid': $scope.groupid}).
        success(function(data, status, headers, config) {

            $scope.finalTask = data;

        }).
        error(function(data, status, headers, config) {

            // an error ocurred

        });
			    
		$rootScope.removeContentWrapperLoader();	    

    //Set the current task in session service
    $scope.post = {
        status_text: '',
        status_file: '',
        type: $scope.pendingTask ? 'mission' : 'general',
        //general: $scope.pendingTask ? false : true,
        //private: false,
        //mission_completed: $scope.pendingTask ? true : false,
        display_mission: $scope.pendingTask ? true : false,
        all_teams: false,
        mood: ''
    };
    $scope.modalBox = function () {
        $('#post-image-form').click();
        //console.log('modalBox clicked');
    };

    $scope.toggleDisplayMission = function() {
        if ($scope.post.type == 'mission') {
            $scope.post.display_mission = true;
        } else {
            $scope.post.display_mission = false;
        }
    }

    $scope.showPostAsMenu = function () {
        //$scope.postAs=true;
    };
    $scope.param={};
    $scope.file='';
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            $scope.file=args.file;
            $scope.post.status_file=args.file;
            var fileReader=new FileReader();
            fileReader.onload = function(e) {
                $scope.imageSrc=e.target.result;
                $scope.$apply();
            };
            fileReader.readAsDataURL(args.file);
        });
    });
    
    // add new post
    
    $scope.addPost=function(form) {
          //console.log('posts.js: addPost');
        console.log($scope.post);

          // ajax loader starts
        $rootScope.ajaxLoader();
        $scope.post.userid=$scope.user.id;
        $scope.post.groupid=$scope.groupid;
        $scope.post.taskid= $scope.pendingTask ? $scope.pendingTask : 0;
        var postText = $scope.post.status_text.replace(/(\r\n|\n|\r)/gm,"");


        $log.log($scope.post);
          //form.$setPristine();  //TODO: This is to clean the form (will be implemented later)

        var vimeoEx = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;

        if (!$scope.post.status_text){

            dropdownService.newDropdown("warning", 5000, "Please write a message");
            // remove ajax loader out of body
            $rootScope.removeAjaxLoader();

        } else if ($scope.post.status_text && postText.search(vimeoEx) >= 0) {
            dropdownService.newDropdown("warning", 5000, "This post does not support Vimeo");

            $rootScope.removeAjaxLoader();
        } else {

            $scope.posting=true;

            if ($scope.post.mood) {
              $scope.post.mood = $scope.post.mood.code;
          }

          APICallService.addPost($scope.post).then(function(result){
              $scope.posting=false;

              //alert(result.data.exif.Orientation);

                if($scope.post.type == 'mission') {
                  //console.log('Mission completed');
                  SessionService.unset('pendingTask');
                  SessionService.unset('pendingTaskDetails');
                  SessionService.set('recentMissionCompleted',1);
                  SessionService.set('lastCompletedMission',$scope.post.taskid);

                  $http({url: '/api/group/list', method: 'POST'})
                  .then(function(result){

                            // update numberofDaysPasswd session storage
                            SessionService.set('numOfDaysPassed', result.data[0].daysPassed);

                   });


                }
                  ///////////////////////////



                  if ($scope.finalTask == $scope.post.taskid && $scope.post.mission_completed){



                      location.href= "#/wall";

                      setTimeout(function(){ location.href= "#/postsurveyintro"; }, 3000);

                  }else{

                      $location.path('/wall');

                  }

                  //$location.path('/wall');  //TODO: redirect

                  // remove ajax loader out of body
                  $rootScope.removeAjaxLoader();



              },function(result){
                  console.log('An upload error occured writng post');
                    console.log(result)
                    appViews.progressError('An upload error has occurred.<br/>Tap to continue.')
              });


    }
      //$location.path('/wall');  //TODO: redirect
    };

    //$scope.switchPrivate=function() {
    //    if($scope.post.private) {
    //        $scope.post.private=false;
    //        //$scope.post.all_teams=true;
    //    } else {
    //        $scope.post.private=true;
    //        $scope.post.all_teams=false;
    //    }
    //};
    //$scope.switchGeneral=function() {
    //    if($scope.post.general) {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    } else {
    //        $scope.post.general=true;
    //        $scope.post.mission_completed=false;
    //        $scope.post.display_mission=false;
    //    }
    //};
    //$scope.switchComplete=function() {
    //    if($scope.post.mission_completed) {
    //        $scope.post.mission_completed=false;
    //        $scope.post.general=true;
    //        $scope.post.display_mission=false;
    //
    //    } else {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //        $scope.post.display_mission=true;
    //    }
    //};


    $scope.report = function() {
         alert('sss');
    };



    $scope.switchAllteams=function() {
        if($scope.post.all_teams) {
            $scope.post.all_teams=false
        } else {
            $scope.post.all_teams=true;
            $scope.post.private=false;
        }
    };


    $scope.file_changed = function(element, $scope) {
        var photofile  = document.querySelector('input[type=file]').files[0];
        var photoType  =  photofile.type;
        var imgContent =  "";

        if (photoType.indexOf('image') >= 0) {
            var reader  = new FileReader();

            if (photofile) {
                reader.readAsDataURL(photofile);
            }

            reader.onloadend = function () {
                $('.uploaded-image-source').attr('src', reader.result);
                $('.uploaded-image-source').css('display', "block");

                $('.uploaded-images').css('display', "block");

                //$scope.avatar = preview;
                imgContent = reader.result;



            }
        } else {

            // error dropdown notification
            
            dropdownService.newDropdown("warning", 5000, "Please make sure file is picture!");
            

            // remove HTML DOM element from the DOM list

            //$('.status_file').remove();

            // create a new blank input HTML DOM element

            //$('.button-upload').append('<input type="file"  onchange="angular.element(this).scope().file_changed(this)" class="fileUpload status_file" data-file="post.status_file" upload-file ng-hide="hideFileUpload=0" />');

        }

        
    };


    $scope.removePreviewImage = function (){

        $('.uploaded-image-source').attr('src', "");
        $('.uploaded-image-source').css('display', "none");
        $('.uploaded-images').css('display', "none");
        var input = $(".status_file");

        input.replaceWith(input.val('').clone(true));

        $scope.post.status_file = "";

    };




    




});


// edit post controller 
// get the post id, fetch the post information and allow user to submit the edited information to the server


app.controller('PostEditCtrl', function ($scope,
                                        $rootScope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService, 
                                        dropdownService, Upload,
                                        SessionService) {



          $rootScope.contentWrapperLoader();

          $scope.headTitle='posts';
          $scope.headMessage='Edit a post';
          $scope.hideFileUpload=true;
          $scope.user=angular.fromJson(SessionService.get('user'));
          $scope.showPostAs=false;
          $scope.groupid=SessionService.get('currentSelectedGroup');
          $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
          $scope.pendingTask=SessionService.get('pendingTask');
          $scope.imageSrc='';
          $scope.finalTask = "";
          var imgContent = "";

    $('#editForm select').material_select();


    $http.post('/api/post/fetchPostByID', {'postid': SessionService.get('postedit.id')}).
          success(function(data, status, headers, config) {
            
              $scope.post = data;
              

              //console.log($scope.post);

              console.log(data);

              if (data.mission_completed == true) {
                  $scope.post.type = 'mission';
              }

              if (data.general == true) {
                  $scope.post.type = 'general'
              }

              if (data.private == true) {
                  $scope.post.type = 'note'
              }

              // put the existing image on the image div if exist

              if (data.image != ''){
                  $('.uploaded-image-source').attr('src', data.image);
                  $('.uploaded-image-source').css('display', "block");

                  $('.uploaded-images').css('display', "block");
              }

              

              // end

              $rootScope.removeContentWrapperLoader();    


              
            
          }).
          error(function(data, status, headers, config) {
            
              // an error ocurred
              alert("An error ocurred !, please try again !");
            
          });


          $scope.file_changed = function(element, $scope) {
            var photofile = document.querySelector('input[type=file]').files[0];
            var photoType =  photofile.type;

            if (photoType.indexOf('image') >= 0) {
                var reader  = new FileReader();

                if (photofile) {
                    reader.readAsDataURL(photofile);
                }

                reader.onloadend = function () {
                    $('.uploaded-image-source').attr('src', reader.result);
                    $('.uploaded-image-source').css('display', "block");

                    $('.uploaded-images').css('display', "block");

                    //$scope.avatar = preview;
                    imgContent = reader.result;
                }
            } else {

                // error dropdown notification
                
                dropdownService.newDropdown("warning", 5000, "Please make sure file is picture!");
                

                // remove HTML DOM element from the DOM list

                $('.status_file').remove();

                // create a new blank input HTML DOM element

                $('.fileUpload').append('<input type="file"  onchange="angular.element(this).scope().file_changed(this)" class="status_file" data-file="post.status_file" upload-file ng-hide="hideFileUpload=0" />');

            }
        };


    $scope.removePreviewImage = function (){

        $('.uploaded-image-source').attr('src', "");
        $('.uploaded-image-source').css('display', "none");
        $('.uploaded-images').css('display', "none");
        var input = $(".status_file");

        input.replaceWith(input.val('').clone(true));

        $scope.post.status_file = '';
        $scope.post.imgContent = '';

    };


              
    //$scope.switchPrivate=function() {
    //    if($scope.post.private) {
    //        $scope.post.private=false;
    //        //$scope.post.all_teams=true;
    //    } else {
    //        $scope.post.private=true;
    //        $scope.post.all_teams=false;
    //    }
    //};
    //$scope.switchGeneral=function() {
    //    if($scope.post.general) {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    } else {
    //        $scope.post.general=true;
    //        $scope.post.mission_completed=false;
    //    }
    //};
    //$scope.switchComplete=function() {
    //    if($scope.post.mission_completed) {
    //        $scope.post.mission_completed=false;
    //        $scope.post.general=true;
    //    } else {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    }
    //};


    $scope.report = function() {
         alert('sss');
    };



    $scope.switchAllteams=function() {
        if($scope.post.all_teams) {
            $scope.post.all_teams=false
        } else {
            $scope.post.all_teams=true;
            $scope.post.private=false;
        }
    };


    $scope.editPost=function(form) {

      // ajax loader starts
        console.log("ADD LOADER")
      $rootScope.ajaxLoader();

        var postText = $scope.post.status.replace(/(\r\n|\n|\r)/gm,"");
        var vimeoEx = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;


        if (!$scope.post.status){

          dropdownService.newDropdown("warning", 5000, "Please write a message");
          // remove ajax loader out of body
           $rootScope.removeAjaxLoader();


        } else if ($scope.post.status && postText.search(vimeoEx) >= 0) {
            dropdownService.newDropdown("warning", 5000, "This post does not support Vimeo");

            $rootScope.removeAjaxLoader();
        } else {


            // post the form data to the server

            $scope.post.id = SessionService.get('postedit.id');
            //$scope.post.imgContent = imgContent;

            /*
            $http.post('/api/post/submitEditedContent', $scope.post).
            success(function(data, status, headers, config) {
                
            // this is the core function 
                if (data == "OK"){
                    location.href= "#/wall";
                    $rootScope.removeAjaxLoader();
                }
                
            
            });

            */

            var photofile = document.querySelector('input[type=file]').files[0];

            console.log(photofile);


            Upload.http({
                                  method: 'POST',
                                  url: '/api/post/submitEditedContent',
                                  headers: {'Content-Type': undefined},
                                  transformRequest: function (data) {
                                      var formData = new FormData();
                                      formData.append("post", angular.toJson(data.postData));
                                      formData.append("file", data.file);
                                      return formData;
                                  },
                                  data: { postData: $scope.post, file: photofile }
                                })
                                .success(function(data) {
                                    if (data == "OK"){
                                        location.href= "#/wall";
                                        $rootScope.removeAjaxLoader();
                                    }
                                })
                                .progress(function(evt) {
                                  appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                                  //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
                                })
                                .error(function(data, status, headers, config) {

                                    console.log('An error occured writng post');
                                    console.log(data)
                                    appViews.progressError('An error has occurred.<br/>Tap to continue.')

                                });

                                $rootScope.removeContentWrapperLoader();
                                $( '.content-wrapper' ).fadeTo( "slow", 1 );                 


      }
      //$location.path('/wall');  //TODO: redirect
    };





});
