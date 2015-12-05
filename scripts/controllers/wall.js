app.controller('WallCtrl',function($scope,$http,SessionService,APICallService,FlashService,$route, $location, $rootScope, $routeParams, dropdownService, $sce){
    $scope.headTitle='Wall Posts';
    //$scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.posts='';
    $scope.user=SessionService.get('user');
    //$scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.displayLoading=1;
    $scope.loadingData=false;
    $scope.feedbackPopdown=0;
    $scope.pendingTask=SessionService.get('pendingTask');
    var currentActiveDropdown = 0;

    $scope.currentUser=angular.fromJson($scope.user);

    $scope.setHeader("Wall");
    $scope.setActiveMenu("wall");

    if (SessionService.get('progressPercentage') == 100){
                $('.button-gre').html('GOAL COMPLETED!');
                
    }

    $scope.testYoutube = function(link) {
        var youtubeExpression = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/ig;

        return youtubeExpression.test(link);
    }


    $scope.displayPosts=function() {
       //console.log('Display posts called',{groupid: $scope.groupid});

       $rootScope.contentWrapperLoader();
       
       //console.log("Location hash : "+$location.hash());

       //alert($routeParams.postid);
       
       if ($routeParams.postid){
       		//console.log("hash is available !");


       		
       		var result=$http({
	           method: 'POST',
	           url: '/api/group/postByID',
	           data: {postid: $routeParams.postid, groupid: $scope.currentGroup}
	       });
	       
	       result.success(function(data) {
	           //console.log(data);
               $("#team-posts .loading-spinner").hide();
	           $scope.posts=data;
	           $scope.displayLoading=0;
            
	       });
       		
       } else {
       		var result=$http({
	           method: 'POST',
	           url: '/api/group/posts',
	           data: {groupid: $scope.currentGroup}
	       });
	       
	       result.success(function(data) {
	           console.log(data);

               $("#team-posts .loading-spinner").hide();

               if (data.length > 0){

                    $scope.posts= data;

                   for (var i in data) {
                       if (data[i].status && $scope.testYoutube(data[i].status)) {
                           if (data[i].status.indexOf('v=') >= 0) {
                               var vidID = data[i].status.split("v=")[1];
                           } else {
                               var vidID = data[i].status.split(".be/")[1];
                           }

                           $scope.posts[i].status = "<iframe width='560' height='315' class='youtube-player' type='text/html' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";

                       }
                   }

                   var count = $http({
                       method: 'POST',
                       url: '/api/group/countPosts',
                       data: {groupid: $scope.currentGroup}
                   });

                   count.success(function(total) {
                       $scope.totalPosts = total;
                   })
                    
               }else{
                    $('.team-posts').html('<div class="empty-content-message">You currently have no wall posts.<br> To create a new post use the NEW POST buton below.</div>');

               }
               $scope.displayLoading=0;
	       });


       }
       
       
       $rootScope.removeContentWrapperLoader();
        $( '.content-wrapper' ).fadeTo( "slow", 1 );
       
    };
    $scope.likePost=function(post) {
        //console.log('Like post: '+post.id);
        var data={
            postid: post.id,
            type: 'like'
        };

        

        //alert(currentLike);

        if(post.like) {
            data.type='unlike';
            var currentLike = post.likeCount--;
        }else{
            var currentLike = post.likeCount++;
        }
        var response=$http.post('/api/user/post/like',data);
        //console.log(response);
        post.like= !post.like;
    };
    $scope.humanReadable = function(time) {
        //return moment(time).fromNow();
        var time = moment(time).fromNow();
        var timePos = time.indexOf("in a minute");

        if (timePos > -1){
            time = "a few seconds ago";
        }

        return time;

    };

    $scope.showDropdown = function(id) {
        currentActiveDropdown = id;

        $("#dropdown-" + id).toggleClass("hide ");
        $("#invisible-cover").toggleClass("hide ");
    }

    $scope.hideDropdown = function() {
        $("#invisible-cover").addClass("hide");
        $("#dropdown-" + currentActiveDropdown).addClass("hide");
    }

    $scope.zoomImage = function(orImg) {
        $(".popup-inactive").toggleClass("popup-inactive popup-active");
        $("#image-spinner").show();

        var imgWrap = $("#full-image");
        imgWrap.html(orImg);
        var wrapWidth = imgWrap.width();
        var wrapHeight = imgWrap.height();

        setTimeout(function() {
            var img = imgWrap.children();
            var imgWidth = img.width();
            var imgHeight = img.height();

            //console.log(wrapWidth + ',' + wrapHeight + ',' + imgWidth + ',' + imgHeight);

            if (imgWidth < wrapWidth && imgHeight < wrapHeight) {
                imgWrap.addClass("image-normal");
                img.addClass("size-auto");
            } else if (imgWidth >= wrapWidth && imgHeight >= wrapHeight) {
                if (imgWidth >= imgHeight) {
                    img.css("width", "100%");
                } else {
                    img.css("height", "100%");
                }

            } else {
                if (imgWidth <= wrapWidth) {
                    img.addClass("width-auto");
                } else {
                    img.addClass("width-full");
                }

                if (imgHeight <= wrapHeight) {
                    img.addClass("height-auto");
                } else {
                    img.addClass("height-full");
                }
            }

            $("#image-spinner").hide();
            $("#full-image img").show();

            // else {
            //    imgWrap.addClass("image-cropped");
            //    img.addClass("zoomed");
            //}

        }, 1000);
    }

    $scope.$on('$viewContentLoaded', function () {
        setTimeout(function() {
            $scope.displayPosts();
        }, 1000);

        if(SessionService.get('recentMissionCompleted')) {
            $scope.feedbackPopdown=1;
            SessionService.unset('recentMissionCompleted');
        }
    });

    // report post
    $scope.report = function(post_id, user_id, group_id) {





        dropdownService.newDropdown("reportPostConfirmation", 12000, "Tap here to report the post! ");
        postReportIDs['post_id'] = post_id;
        postReportIDs['user_id'] = user_id;
        postReportIDs['group_id'] = group_id;

        console.log(postReportIDs);


         // send http request to the server
          
         

         //alert('a');
    };

    //focus cursor on comment textbox
    $scope.focusComment = function(id) {
        $('#post-' + id + ' .comment-new input').focus();
    }

    // report comment ng-click
    $scope.reportComment = function(post_id, comment_id, user_id, group_id) {

        dropdownService.newDropdown("reportCommentConfirmation", 12000, "Tap here to report the comment!  ");
        commentReportIDs['post_id'] = post_id;
        commentReportIDs['comment_id'] = comment_id;
        commentReportIDs['user_id'] = user_id;
        commentReportIDs['group_id'] = group_id;

        console.log(commentReportIDs);

         
    };


    $scope.loadMoreData=function() {
        
        if(!$routeParams.postid){

              $scope.displayLoading=true;

              var data={
                  groupid: $scope.currentGroup,
                  limitfrom: $scope.posts.length
              };
              if($scope.loadingData===false) {
                  $scope.loadingData=true;
                  $http.post('/api/group/posts',data).then(function(result){
                      angular.forEach(result.data,function(post,key) {

                          if (post.status && $scope.testYoutube(post.status)) {
                              if (post.status.indexOf('v=') >= 0) {
                                  var vidID = post.status.split("v=")[1];
                              } else {
                                  var vidID = post.status.split(".be/")[1];
                              }

                              post.status = "<iframe width='560' height='315' class='youtube-player' type='text/html' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";
                          }


                          $scope.posts.push(post);
                      });
                      $scope.loadingData=false;
                      $scope.displayLoading=false;
                  });
              }

        }
    };
    $scope.addComment = function(event,post) {
        event.preventDefault();

        console.log(post.activecomment);

        //console.log('You are trying to add comment');
        if (post.activecomment != ""){





              var currentUser=angular.fromJson($scope.user);
              var comment = {
                  comment: post.activecomment,
                  user: currentUser,
                  time: moment().fromNow(),
                  user_id: currentUser.id,
                  post_id: post.id
              }
              post.comments.push(comment);
              post.activecomment='';
              APICallService.addComment(comment);


        }
        post.activecomment='';
    };
    $scope.closePopup = function() {
        //console.log('Close');
        $scope.feedbackPopdown=0;
        SessionService.unset('recentMissionCompleted');
        $route.reload();
    };


    $scope.editPost = function(id){

        
        SessionService.set('postedit.id', id);

        location.href= "#/editpost";

    };

    $scope.toggleText = function (id){
        $("#post-mission-" + id).toggleClass("open closed").toggleClass("orange ");
        $("#post-mission-" + id).find('.mission-content').slideToggle();
        $("#post-mission-" + id).find('.mission-title .icon').toggleClass('plus minus');
    };


    $scope.deletePost = function(postid){

        var txt;
        var r = confirm("Are you sure you want to delete !");
        if (r == true) {
            $http.post('/api/post/delete', {postid: postid}).then(function(result){

                      $http({url: 'api/global/taskCompleted', method: 'POST'})
                      .then(function(result){

                                console.log('taskCompleted called !');

                                //alert(result.data);
                                SessionService.set('taskCompleted', result.data);

                       });


                       $( "#post-"+ postid).fadeOut( "slow", function() {
                          // Animation complete.
                        });
            });
        } 


        /*$http.post('/api/post/delete', {postid: postid}).then(function(result){
                   $( "#post-"+ postid).fadeOut( "slow", function() {
                      // Animation complete.
                    });
        });*/
              
    };





});
app.factory('postFactory',function($http){
    return {
        getPosts: $http({
            method: 'POST'
        })
    };
});

//app.directive('cropImage', function() {
//    return {
//        link: function(scope, element, attr) {
//            var imgWrap = element;
//            var wrapWidth = imgWrap.width();
//            var wrapHeight = imgWrap.height();
//
//            setTimeout(function() {
//                var img = imgWrap.children();
//                var imgWidth = img.width();
//                var imgHeight = img.height();
//
//                //console.log(wrapWidth + ',' + wrapHeight + ',' + imgWidth + ',' + imgHeight);
//
//                if (imgWidth < wrapWidth && imgHeight < wrapHeight) {
//                    imgWrap.addClass("image-normal");
//                    img.addClass("size-auto");
//                }
//
//                if (imgWidth > wrapWidth && imgHeight > wrapHeight) {
//                    img.addClass("size-full");
//                }
//
//                if (imgWidth <= wrapWidth) {
//                    img.addClass("width-auto");
//                } else {
//                    img.addClass("width-full");
//                }
//
//                if (imgHeight <= wrapHeight) {
//                    img.addClass("height-auto");
//                } else {
//                    img.addClass("height-full");
//                }
//
//                // else {
//                //    imgWrap.addClass("image-cropped");
//                //    img.addClass("zoomed");
//                //}
//
//            }, 200);
//        }
//    }
//})