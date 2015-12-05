/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
app.service('AuthenticationService',function($http,$location,SessionService,FlashService, $rootScope, dropdownService){
    var cacheSession = function(data) {
        SessionService.set('authenticated', true);
        SessionService.set('user',JSON.stringify(data));


        usingUniWebView = data.isOnApp;



        //console.log("test");
        //console.log(data.isOnApp);

        if (data.notification == 1){
            SessionService.get('liveAppNotificationSession') == true;
        }else{
            SessionService.get('liveAppNotificationSession') == false;
        }


        SessionService.set('moodCheck',true);
    };

    var uncacheSession = function() {
        /*SessionService.unset('authenticated');
        SessionService.unset('user');
        SessionService.unset('currentSelectedGroup');
        SessionService.unset('currentSelectedGroupDetails');
        SessionService.unset('currentSelectedGroupDetails');
        SessionService.unset('pendingTask');
        SessionService.unset('pendingTaskDetails');
        SessionService.unset('moodmap');
        SessionService.unset('progressPercentage');
        SessionService.unset('missionPending');
        SessionService.unset('usertemp');
        */
        var notType = SessionService.get('notificationType');
        SessionService.clearAll();
        SessionService.set('notificationType', notType);

    };

    var LoginError = function(response) {
        //FlashService.show(response.flash);

        if (response == 'Your account has been suspended'){
            dropdownService.newDropdown("notification", 5000, response.flash);
        }else{
            dropdownService.newDropdown("warning", 5000, response.flash);
        }
        
        // remove ajax loader out of body
        $rootScope.removeAjaxLoader();
    };

    return {
        login: function(credentials) {
            var login=$http.post('/api/auth/login',credentials);
            //////console.log(credentials);
            login.success(cacheSession);

            

            login.error(LoginError);
            return login;
              //return $http.post('/api/auth/login',credentials);
        },
        logout: function() {
            var logout=$http.get('/api/auth/logout');
            logout.success(uncacheSession);
            return logout;
        },
        isLoggedIn: function() {
            return SessionService.get('authenticated');
        }
    };
});