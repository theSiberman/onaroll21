/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('GroupMessageListCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){
    $scope.setHeader("messages");
    $scope.setActiveMenu("message");

    $scope.headTitle='conversations';
    $scope.headMessage='All Conversations';
    
    $rootScope.contentWrapperLoader();

    $scope.messageList = function (){
        
            $http.post('/api/groupMessage/searchByUserID').
            success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              
              $scope.messages = angular.fromJson(data);
              
              //console.log(data);


              if ($scope.messages.length == 0 && $location.path() == "/groupMessageList"){
                            $('.messages').html('<div class="empty-content-message">You currently have no conversations.<br> To create a conversation use the NEW CONVERSATION buton below.</div>');
                            //console.log($location.path());
               }
              
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    };

    $scope.messageList();

    $rootScope.removeContentWrapperLoader();


    $scope.humanReadable = function(time) {
                        return moment(time).fromNow();
    };



    $scope.groupMessageView = function(id, title){

        SessionService.set('conversationid', id);
        SessionService.set('conversationtitle', title);

        location.href = "/#/groupmessage/"+id;

    };


    $scope.navigateWithCondition = function (url){

        SessionService.set('conversationid', "");
        SessionService.set('conversationtitle', "");

        location.href = "/#/groupmessage";

    };
    
    
});