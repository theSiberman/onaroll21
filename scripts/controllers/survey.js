/**
 * Created by Sandeep Gill on 12/11/14.
 */

app.controller('SurveyCtrl',function($scope, $rootScope, $window, $location, AuthenticationService, SessionService, APICallService){
    //This is the controller to manage pre/post surveys
    $scope.groupid=SessionService.get('currentSelectedGroup')
    $scope.presurveyid=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).survey;
    $scope.postsurveyid=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).postsurvey;
    $scope.survey={
        type: 'pre',
        group: parseInt($scope.groupid),
        surveyid: 0
    };
    $scope.markSurveyCompleted = function(type){
        if(type==='pre') {
            $scope.survey.surveyid=$scope.presurveyid;
            SessionService.set('preSurveyCompleted','1');
            APICallService.markSurveyComplete($scope.survey);
            $location.path('/main');
        } else if(type==='post') {
            $scope.survey.type='post';
            $scope.survey.surveyid=$scope.postsurveyid;
            SessionService.set('postSurveyCompleted','1');
            APICallService.markSurveyComplete($scope.survey);
        }
    };
});