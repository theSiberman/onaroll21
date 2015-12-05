app.factory('FlashService', function($rootScope) {
    return {
        show: function(message) {
            ////console.log('Flash service was called');
            //dropdownService.newDropdown("warning", 5000, message);
            $rootScope.removeAjaxLoader();
        },
        showSuccess: function(message) {
            $rootScope.successMessage = message;
        },
        showError: function(message) {
            $rootScope.errorMessage = message;
        },
        clear: function() {
            $rootScope.flash = '';
            $rootScope.successMessage = '';
            $rootScope.errorMessage = '';
        }
    };
});