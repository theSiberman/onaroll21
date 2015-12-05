/**
 * This is the session service for our single page app (OAR21)
 * @param {type} param1
 * @param {type} param2
 */

app.factory('SessionService', function() {
    return {
        get: function(key) {
            return sessionStorage.getItem(key);
        },
        set: function(key, val) {
            return sessionStorage.setItem(key, val);
        },
        unset: function(key) {
            return sessionStorage.removeItem(key);
        },


        clearAll: function() {
            return sessionStorage.clear();
        }
    };
});