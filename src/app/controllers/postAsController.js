


app.controller('PostAsCtrl',function($scope,$window,$location,AuthenticationService, SessionService,ajaxService,$rootScope){
	
	//alert('ON');
	//alert($rootScope.recs);
	
	$scope.asPostText = $rootScope.posttext;
	$("#image-post-container").attr('src',postAsImg);
	//alert(postAsImg);
    //alert($scope.asPostText);
});





