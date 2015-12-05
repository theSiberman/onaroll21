/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageSelectGroupCtrl',function($scope,$location, $http, SessionService, $rootScope){
    $scope.setHeader("Select Group");
    $scope.setActiveMenu("message");

    $scope.headTitle='Select Team';
    $scope.headMessage='';
    
    $rootScope.contentWrapperLoader();
    $http.post('/api/group/list').
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      
      
      
      $scope.groups = data;


      //console.log(data);

      if (data.length == 1){

        SessionService.set("messageGroupUser", data[0].id);
      
        location.href= "#/nmSelectUser";

      }


      
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    $rootScope.removeContentWrapperLoader();
    
    
    $scope.messageGroupUser = function(id){
    	
    	SessionService.set("messageGroupUser", id);
    	
    	location.href= "#/nmSelectUser";
    	
    };
    
});