/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageSelectUserCtrl',function($scope,$location, $http, SessionService, $rootScope){
    $scope.setHeader("Select User");
    $scope.setActiveMenu("message");

    $scope.headTitle='Select User';
    //$scope.headMessage='Mark\'s Happy Rollers';

    $rootScope.contentWrapperLoader();

    //SessionService.unset("selectedUsers");
    
    //$http.post('/api/group/user',{id: SessionService.get('messageGroupUser')}).
    //success(function(data, status, headers, config) {
    //  // this callback will be called asynchronously
    //  // when the response is available
    //
    //  $scope.currentUser = JSON.parse(SessionService.get('user'));
    //
    //  $scope.users = data;
    //
    //  //console.log(data);
    //
    //  //console.log($scope.currentUser.id);
    //
    //}).
    //error(function(data, status, headers, config) {
    //  // called asynchronously if an error occurs
    //  // or server returns response with an error status.
    //});


    $rootScope.removeContentWrapperLoader();
    
    $scope.openMessage = function() {
        alert('dasfds');
    }
    
    $scope.messageView = function(id, un){
    	
    	//SessionService.set("messageid", id);
    	//
    	



        location.href= "#/message/" + id;
    	
    	
    };
    
});