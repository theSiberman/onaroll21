/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){
    $scope.setHeader("messages");
    $scope.setActiveMenu("message");

    $scope.headTitle='messages';
    $scope.headMessage='All Messages';

    //$scope.userLogin = SessionService.get('user');
        
    //$scope.userLogin = angular.fromJson($scope.userLogin);
    
    $rootScope.contentWrapperLoader();

    
    $scope.messageListInt = function (){
    	var timer = $interval(function(){
	            
	            $scope.messageList();
	            
	        
	      },5000);
    };
    
    $scope.messageListInt();

    $rootScope.removeContentWrapperLoader();
    $( '.content-wrapper' ).fadeTo( "slow", 1 );
    
    $scope.messageList = function (){
            //$scope.messages = [];

            if (currentRoute == "/messages"){
    	
    	    	$http.post('/api/service/groupmessage/getConversationList').
    		    success(function(data, status, headers, config) {
    		      // this callback will be called asynchronously
    		      // when the response is available

    		      //console.log(data);

                  if (!$scope.messages) {
                      setTimeout(function() {
                          var mesListHeight = $(".collection.messages-list").height();
                          $("#messages-list-wrap").css("height", mesListHeight + "px");
                      }, 1);
                  } else if ($scope.messages && $scope.messages.length != data.length) {
                      var mesListHeight = $(".collection.messages-list").height();
                      $("#messages-list-wrap").css("height", mesListHeight + "px");
                  }

                    $scope.messages = angular.fromJson(data);
                        
                    angular.forEach($scope.messages, function(val,key) {
                        var arrName = JSON.parse(val.members);

                        $scope.messages[key].members = arrName;
                    })

                  if ($scope.messages.length == 0 && $location.path() == "/messages"){
                                $('.messages').html('<div class="empty-content-message">You currently have no messages.<br> To send a message use the NEW MESSAGE buton below.</div>');
                                //console.log($location.path());
                   }
    		      
    		    }).
    		    error(function(data, status, headers, config) {
    		      // called asynchronously if an error occurs
    		      // or server returns response with an error status.
    		    });

            }
    };
    
    $scope.messageList();
    
    $scope.messageView = function(id, un){
    	
    	//SessionService.set("messageid", id);
    	//
    	//SessionService.set("messageusername", un);

        var recipient = [{
            id: id,
            full_name: un
        }]

        SessionService.set("selectedUsers", JSON.stringify(recipient));
    	
    	location.href= "#/message/" + id;
    	
    	
    };

    $scope.humanReadable = function(time) {
        var time = moment(time).fromNow();
        var timePos = time.indexOf("in a minute");

        if (timePos > -1){
            time = "a few seconds ago";
        }

        return time;
    };


    $scope.openMessage = function(id){
        location.href = "#/message/view/"+id;
    };




    $scope.createNewConversation = function(){
        location.href = "#/nmSelectUser";

        //$http.post('/api/service/groupmessage/createNewConversation').
        //success(function(data, status, headers, config) {
        //
        //    conversationID = JSON.parse(data);
        //
        //    location.href = "#/nmSelectUser";
        //
        //});

    };
  
    
});




app.controller('MessageLocationCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){

    // get the message ID from the URL

    var string = location.href.split('/');

    // set the messageid to the session storage

    SessionService.set('messageid', string[5]);

    // redirect user to message view page

    location.href = "#/messageView";


});


