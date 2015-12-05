/**
 * Created by John @ Enmasse On 20 Appril 2015
 */
app.controller('GroupMessageCtrl',function($scope,$location,SessionService,APICallService,$log, $rootScope, $http, $timeout){

    $scope.setActiveMenu("message");

    var active_member_stack = [];
    
    $scope.headTitle = 'Group Message';
    $scope.headMessage = 'Group Message';

    $scope.groupid=SessionService.get('currentSelectedGroup');

    $scope.user=SessionService.get('user');
    $scope.user = angular.fromJson($scope.user);


    setInterval(function() {
              $scope.messageList();
              $(".group-message-content-chat-container-chatscreen").scrollTop($(".group-message-content-chat-container-chatscreen")[0].scrollHeight);
    }, 3000);


    $scope.init = function (){

            console.log($scope.user);

            var memberObj = new Object();
                memberObj.uid = $scope.user.id;
                memberObj.name = $scope.user.firstname+' '+$scope.user.lastname;


            active_member_stack.push(memberObj);

            $scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));

            // send request to the server to create the room and send initial data

            if (!SessionService.get("conversationid")){

              $http.post('/api/groupMessage/initRoomData', {gid : $scope.groupid}).
              success(function(data, status, headers, config) {

                      SessionService.set("conversationid", data.roomid);
                      SessionService.set("conversationtitle", data.title);

                      

                      

              });

            }



            

            $scope.title = SessionService.get("conversationtitle");



    };

    $scope.init();


    
    $scope.memberList = function (){
    	
	    	$http.post('/api/groupMessage/memberList', {gid : $scope.groupid}).
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		      
		      
		      
		      $scope.members = angular.fromJson(data);

              var initMember = "";

              jQuery.each($scope.members, function(index, value) {
                   
                   if (this[0].id == $scope.user.id){
                        initMember = this[0].id;
                   }
               
               });

              if (initMember != ""){
                    
                    //alert(initMember);
                    /*$timeout(function() {
                        $("#group-list-item-number-"+initMember).css('background-color', '#1B4C63');
                    }, 500);
                    */
              }




              
		      
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
    };

    $scope.memberList();

    



    $scope.addMemberToList = function(uid, name){


    		
    		// search for the existing user id

    		var searchFlag = false;

        console.log(active_member_stack);
            console.log("++++++");
    		
    		jQuery.each(active_member_stack, function(index, value) {
               console.log(this.name);
               if (this.name == name){
                    searchFlag = true;
               }
               
           });
            

            if (searchFlag == false){
            

                var memberObj = new Object();
                memberObj.uid = uid;
                memberObj.name = name;
        		

        		$("#group-list-item-number-"+uid).css('background-color', '#1B4C63');

        		active_member_stack.push(memberObj);

        		//console.log(active_member_stack);

        		$scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));

                //console.log(active_member_stack.length);




                $('.num-of-members').html(active_member_stack.length);
            }

            // add member to the database


            $http.post('/api/groupMessage/newMember', {roomid :  SessionService.get("conversationid"), newmemberid : memberObj.uid, newmemberfname : memberObj.name , userList : active_member_stack}).
            success(function(data, status, headers, config) {
              
              
                  
                  // retrive the message list

                  $scope.messageList();
                      

                  // end retrive message list

              
  
            });

            // end






    };


    $scope.removeMember = function(uid, name){


                if (active_member_stack.length <= 1){

                    alert("Error !");

                }else{

                    var active_member_stack_temp = [];


                    $("#group-list-item-number-"+uid).css('background-color', '');
                    $("#group-list-member-"+uid).remove();

                    jQuery.each(active_member_stack, function(index, value) {
                       
                       if (this.uid != uid){
                            active_member_stack_temp.push(this);
                       }
                       
                     });

                     active_member_stack  =  active_member_stack_temp;

                     $scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));


                     $('.num-of-members').html(active_member_stack.length);
                 }



                 // add new remove member notification to the database


                 // add member to the database


                $http.post('/api/groupMessage/removeMember', {roomid :  SessionService.get("conversationid"), newmemberid : uid, newmemberfname : name , userList : active_member_stack}).
                success(function(data, status, headers, config) {
                  
                  
                      
                      // retrive the message list

                      $scope.messageList();
                          

                      // end retrive message list

                  
      
                });

                // end

    };


    $scope.sendMessage = function(){

        var tempMessage = $scope.commentnewtext;


        if (tempMessage){
            $http.post('/api/groupMessage/send', {id : SessionService.get("conversationid"), message : tempMessage, userList : active_member_stack}).
            success(function(data, status, headers, config) {
              
              
                  $scope.commentnewtext = "";


                  // retrive the message list

                  $scope.messageList();
                      

                  // end retrive message list

              
  
            });
        }

    };




    $scope.messageList = function(){

        $http.post('/api/groupMessage/messageList', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      $scope.messages = data;

                      $scope.getTheCurrentUserLIst();

        });

    };




    $scope.messageList();

    $scope.humanReadable = function(time) {
                        return moment(time).fromNow();
    };


    $scope.getTheCurrentUserLIst = function(){

        $http.post('/api/groupMessage/getTheCurrentUserLIst', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      

                      
                            $scope.avtivemembers = angular.fromJson(data.userlist);

                            console.log("+++++"+$scope.avtivemembers);

                            /////////////////////

                            var initMember = "";

                            jQuery.each($scope.avtivemembers, function(index, value) {
                                 
                                 //console.log(value['uid']);
                                 $("#group-list-item-number-"+value['uid']).css('background-color', '#1B4C63');
                             
                             });

                            active_member_stack = $scope.avtivemembers;

                            $('.num-of-members').html(active_member_stack.length);
                            //console.log("++++++++++++++");

                            


                            ////////////////////
                      


        });

    };


    $scope.leaveChat = function (){
        
        // send request to the server 
        $http.post('/api/groupMessage/leaveChat', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      $scope.avtivemembers = angular.fromJson(data);
                      // retrieving data from the server 

                      active_member_stack = $scope.avtivemembers;

                      location.href="/#/groupMessageList";
                      

        });
    };

    



    
    
});