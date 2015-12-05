/**
 * Created by sandy on 14/11/14.
 */
app.controller('SupportCtrl',function($scope,$location,SessionService,APICallService,$log, $rootScope){
    
    $scope.headTitle = 'Support';
    $scope.headMessage = 'FAQ & Support';
    $scope.setHeader("FAQ");
    $scope.setActiveMenu("none");

    $('.collapsible').collapsible({
        accordion : true
    });

    $rootScope.contentWrapperLoader();
    // do something
    $rootScope.removeContentWrapperLoader();
    
});