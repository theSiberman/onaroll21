app.service('APICallService',function($http,$location,$rootScope,SessionService,FlashService,$q,Upload){
    return {
        getNativeAppStatus: function() {
            var status = $http({
                method: 'GET',
                url: '/api/global/isNativeApp',
                data: {

                }
            });

            return status;
        },
        addPost: function(post) {

            return Upload.http({
              method: 'POST',
              url: 'api/add/post',
              headers: {'Content-Type': undefined},
              transformRequest: function (data) {
                  var formData = new FormData();
                  formData.append("post", angular.toJson(data.postData));
                  formData.append("file", data.file);
                  return formData;
              },
              data: { postData: post, file: post.status_file }
            }).progress(function(evt) {
                appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
            })


        },
        fetchPosts: function(userid,groupid) {

        },
        fetchPendingTask: function(userid,groupid) {
            //This function should check if there is any info stored in session
            //storage and return it else call the API and return the values
            
            //alert('aa');
            /*if(SessionService.get('pendingTask')) {
                return SessionService.get('pendingTask');
            } else {
                var response=$http({
                    url: '/api/fetch/currenttask',
                    method: 'POST',
                    data: {userid: userid, groupid: groupid}
                });
                response.success(function(data){
                    if(data.pendingTask) {
                        $rootScope.pendingTask=data;
                        SessionService.set('pendingTask',data.taskid);
                        SessionService.set('pendingTaskDetails',angular.toJson(data));
                    }
                });
            }
            */
           console.log('fetchPendingTask')
           $http.post('/api/mission/getPendingTask',{groupid: groupid}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			         
			           console.log("getPendingTask-success");
			      
			      
			           var pendingTaskDetails={
			               title: data.title,
                           mission: data.mission,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson(pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		////console.log(pendingTaskDetails);
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log('error');
			    });
        },
        fetchPendingT: function(userid,groupid) {
            
            	
			    $http.post('/api/mission/getPendingTask',{groupid: groupid}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			         
			           
			      
			      
			           $scope.pendingTaskDetails={
			               title: data.title,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		////console.log($scope.pendingTaskDetails);
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });
            
            
        },
        likePost: function(userid,groupid,postid) {
            var like = $http({
                method: 'POST',
                url: '/api/user/post/like',
                data: {
                    userid: userid,
                    groupid: groupid,
                    postid: postid
                }
            });
            //Return the like promise
            return like;
        },
        acceptMission: function(userid,groupid,taskid) {
            ////console.log('userid: '+userid);
            ////console.log('groupid: '+groupid);
            ////console.log('taskid: '+taskid);
            if(SessionService.get('pendingTask')) {
                //Do nothing for now as we already have a pending task
            } else {
                return $http({
                    url: '/api/user/acceptmission',
                    method: 'POST',
                    data: {userid: userid, groupid: groupid, taskid: taskid}
                });
            }
        },
        fetchWellbeingTracks: function(groupid) {
            console.log('Groupid: '+groupid);
            $http({
                url: 'api/user/wellbeingtracks',
                method: 'POST',
                data: {groupid: groupid}
            }).then(function(result){
                console.log('Wellbeing data fetched')
                console.log(result.data);
                SessionService.set('moodmap',angular.toJson(result.data));
            });
        },
        fetchWellbeingData: function(groupid) {
            console.log('Groupid: '+groupid);

            return $http({
                url: 'api/user/wellbeingtracks',
                method: 'POST',
                data: {groupid: groupid}
            });
        },
        addComment: function(comment) {
            ////console.log('APICALLSERVICE add comment');
            var newComment={
                comment: comment.comment,
                post_id: comment.post_id,
                user_id: comment.user_id
            };
            $http({
                url: 'api/add/comment',
                method: 'POST',
                data: {
                    comment: comment.comment,
                    post_id: comment.post_id,
                    user_id: comment.user_id
                }
            }).then(function(result){
                ////console.log('comment added');
            })
        },
        markSurveyComplete: function(survey) {
            ////console.log('Marking survey complete');
            ////console.log(survey);
            $http({
                url: 'api/user/survey/complete',
                method: 'POST',
                data: {survey: survey}
            }).then(function(){
                $location.path('/main');
            });
        },
        updateMood: function(groupid,mood) {
            ////console.log('Updating mood to API');
            return $http({
                url: 'api/user/mood/update',
                method: 'POST',
                data: {
                    groupid: groupid,
                    mood: mood
                }
            });
        },
        updateTaskScore: function(task,score) {
            ////console.log('Sending the feedback');
            return $http({
                url: 'api/user/taskscore',
                method: 'POST',
                data: {
                    taskid: task,
                    score: score
                }
            });
        },
        progressBar: function(groupid) {
            console.log('Sending the feedback');
            return "string"
        },
        sendFeedback: function(feedbackText) {
            ////console.log('Sending the feedback');
            return $http({
                url: 'api/user/feedback',
                method: 'POST',
                data: {
                    feedback: feedbackText
                }
            });
        }
    };
});
