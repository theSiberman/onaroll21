/**
 * Created by sandy on 14/11/14.
 */
app.controller('SupportTicketCtrl',function($scope,$location,SessionService,APICallService,$log, $http, $rootScope, dropdownService){
    $scope.recentTaskCompleted='';
    $scope.headTitle = 'Support';
    $scope.errorMessage = "";
    $scope.ticket = {};

    $scope.setHeader("Contact Support");
    $scope.setActiveMenu("none");

    //alert("a");

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    


    $scope.sendTicket = function () {

        ////console.log($scope.ticket.name);
        ////console.log($scope.ticket.email);
        ////console.log($scope.ticket.type);
        ////console.log($scope.ticket.feedback);

        $scope.errorMessage = "";

        if (SessionService.get('authenticated') == 'true'){
            if (!$scope.ticket.type){
                dropdownService.newDropdown("warning", 5000, "Please select a subject");
            } else if (!$scope.ticket.feedback){
                dropdownService.newDropdown("warning", 5000, "Please write a message");
            }
                        
        } else {
            if (!$scope.ticket.name) {
                $scope.errorMessage = "Please enter name";
            } else if (!$scope.ticket.email || !$scope.validateEmail($scope.ticket.email)) {
                $scope.errorMessage = "Please enter a valid email ";
            } else if ($scope.ticket.type == undefined) {
                $scope.errorMessage = "Please select subject";
            } else if (!$scope.ticket.feedback) {
                $scope.errorMessage = "Please enter message";
            }
        }

        //$rootScope.ajaxLoader();

        if ($scope.errorMessage == "") {
        //        dropdownService.newDropdown("warning", 4000, error);
        //        $rootScope.removeAjaxLoader();
        //
        //} else {
            $http.post('/api/global/supportFeedback', {name: $scope.ticket.name, email: $scope.ticket.email, type: $scope.ticket.type, feedback: $scope.ticket.feedback}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // return something yo.

                    $rootScope.removeAjaxLoader();

                    if (SessionService.get('authenticated') == 'true'){
                        $location.path("/main");
                    }else{
                        $location.path("/login");
                    }

                    //$rootScope.notificationGreen();
                    dropdownService.newDropdown("notification", 4000, "Feedback sent");

            });
        }
    };
});