'use strict';
/**
 * On A Roll 21 main file
 */
// This is the global defined javascript variable by John Le
var userid = "";
var groupid = "";
var missionTitle = "";
var todayMission = "";
var didyouknow = "";
var reference = "";
var taskid = "";
var postAsImg = "";
var usingUniWebView = "false"; //Boolean as String: Is the user viewing app on mobile device using webview?
var postReportIDs = "";
var commentReportIDs = [];
var postReportIDs = [];
var currentUnixTIme = Math.floor(Date.now() / 1000);
var conversationID = "";
var currentRoute = "";
// End of global variable definition

// This is the global defined javascript function
// Only called from mobile app using uniweview 
function updateUsingUniWebView(_bool)
{
	usingUniWebView = _bool;
	return "usingUniWebView: "+usingUniWebView;
}
// End of global function definition

var appViews={
    updateProgress: function(value){
        $('.progress-bar').css({width:value+"%"});
    },
    progressError: function(msg){
        $('#progressMsg').html(msg);
        $('#progressMsg').show();
        $('#progressLoader').on('click',function(){
            console.log('PL: Click')
            $('#progressMsg').hide();
            $(this).off('click');
            $("#progressLoader").remove();

        })
    }
}

var app = angular.module('oar21', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngUpload',
    'shoppinpal.mobile-menu',
    'ngDialog',
    'ngFileUpload',
    'angular-svg-round-progress'
]).config(function ($routeProvider, $compileProvider) {
	
    $routeProvider
        .when('/loadApp', {
            templateUrl: 'templates/loading-app.html?v='+currentUnixTIme,
            controller: 'LoadAppCtrl'
        })
        .when('/IEDetected', {
            templateUrl: 'templates/iedetected.html?v='+currentUnixTIme
        })
        .when('/login', {
            templateUrl: 'templates/login.html?v='+currentUnixTIme,
            controller: 'LoginCtrl'
        })
        .when('/login/playerID/:pid', {
            templateUrl: 'templates/login.html?v='+currentUnixTIme,
            controller: 'LoginCtrl'
        })
        .when('/forgot-pwd', {
            templateUrl: 'templates/forgotPwd.html?v='+currentUnixTIme,
            controller: 'LoginCtrl'
        })
        .when('/newAccount', {
            templateUrl: 'templates/sign-up.html?v='+currentUnixTIme,
            controller: 'SignUpCtrl'
        })
        .when('/newAccount/:cc', {
            templateUrl: 'templates/sign-up.html?v='+currentUnixTIme,
            controller: 'SignUpCtrl'
        })
        .when('/newAccount/:cc/:token', {
            templateUrl: 'templates/sign-up.html?v='+currentUnixTIme,
            controller: 'SignUpCtrl'
        })
        .when('/bypasslogin/:user/:password/:url', {
            templateUrl: 'templates/login.html?v='+currentUnixTIme,
            controller: 'LoginCtrl'
        })
        .when('/main', {
            templateUrl: 'templates/posts.html?v='+currentUnixTIme,
            controller: 'WallCtrl'
        })
        //.when('/main/mood/:moodcode', {
        //    templateUrl: 'templates/journal.html?v='+currentUnixTIme,
        //    controller: 'JournalCtrl'
        //})
        .when('/journal', {
            templateUrl: 'templates/journal.html?v='+currentUnixTIme,
            controller: 'JournalCtrl'
        })
        .when('/play', {
            templateUrl: 'templates/dice.html?v='+currentUnixTIme,
            controller: 'DiceCtrl'
        })
        .when('/profile', {
            templateUrl: 'templates/profile.html?v='+currentUnixTIme,
            controller: 'MainCtrl'
        })
        .when('/missionCompleted', {
            templateUrl: 'templates/mission-completed.html?v='+currentUnixTIme,
            controller: 'MissionCompletedCtrl'
        })
        .when('/messages', {
            templateUrl: 'templates/messages.html?v='+currentUnixTIme,
            controller: 'MessageCtrl'
        })
        .when('/messages/:id', {
            templateUrl: 'templates/messages.html?v='+currentUnixTIme,
            controller: 'MessageLocationCtrl'
        })
        .when('/notifications', {
            templateUrl: 'templates/notifications.html?v='+currentUnixTIme,
            controller: 'NotificationCtrl'

        })
        .when('/nmSelectGroup', {
            templateUrl: 'templates/messagesSelectGroup.html?v='+currentUnixTIme,
            controller: 'MessageSelectGroupCtrl'
        })
        .when('/nmSelectUser', {
            templateUrl: 'templates/messagesSelectUser.html?v='+currentUnixTIme,
            controller: 'MessageSelectUserCtrl'
        })
        .when('/groupmessage', {
            templateUrl: 'templates/groupMessage.html?v='+currentUnixTIme,
            controller: 'GroupMessageCtrl'
        })
        .when('/groupmessage/:roomid', {
            templateUrl: 'templates/groupMessage.html?v='+currentUnixTIme,
            controller: 'GroupMessageCtrl'
        })
        .when('/groupMessageList', {
            templateUrl: 'templates/groupMessageList.html?v='+currentUnixTIme,
            controller: 'GroupMessageListCtrl'
        })
        //.when('/messageView', {
        //    templateUrl: 'templates/messageView.html',
        //    controller: 'MessageViewCtrl'
        //})
        .when('/message/:id', {
            templateUrl: 'templates/messageView.html?v='+currentUnixTIme,
            controller: 'MessageViewCtrl'
        })
        .when('/message/view/:id', {
            templateUrl: 'templates/messageView.html?v='+currentUnixTIme,
            controller: 'MessageViewCtrl'
        })
        .when('/mission', {
            templateUrl: 'templates/mission.html?v='+currentUnixTIme,
            controller: 'MainCtrl'
        })
        .when('/wall', {
            templateUrl: 'templates/posts.html?v='+currentUnixTIme,
            controller: 'WallCtrl'
        })
        .when('/wall/:postid', {
            templateUrl: 'templates/posts.html?v='+currentUnixTIme,
            controller: 'WallCtrl'
        })
        .when('/montage', {
            templateUrl: 'templates/photo-montage.html?v='+currentUnixTIme,
            controller: 'MainCtrl'
        })
        .when('/groups', {
            templateUrl: 'templates/group-list.html?v='+currentUnixTIme,
            controller: 'MainCtrl'
        })
        .when('/newpost', {
            templateUrl: 'templates/post-new.html?v='+currentUnixTIme,
            controller: 'PostsCtrl'
        })
        .when('/editpost', {
            templateUrl: 'templates/editPost.html?v='+currentUnixTIme,
            controller: 'PostEditCtrl'
        })
        .when('/accountSettings', {
            templateUrl: 'templates/accountSettings.html?v='+currentUnixTIme,
            controller: 'AccountSettingsCtrl'
        })
        .when('/postas', {
            templateUrl: 'templates/post-as.html?v='+currentUnixTIme,
            controller: 'PostAsCtrl'
        })
        .when('/presurveyintro', {
            templateUrl: 'templates/presurveyintro.html?v='+currentUnixTIme,
            controller: 'PreSurveyCtrl'
        })
        .when('/postsurveyintro', {
            templateUrl: 'templates/postsurveyintro.html?v='+currentUnixTIme,
            controller: 'PostSurveyCtrl'
        })
        .when('/postsurvey', {
            templateUrl: 'templates/postsurvey.html?v='+currentUnixTIme,
            controller: 'PostSurveyCtrl'
        })
        .when('/presurvey', {
            templateUrl: 'templates/presurvey.html?v='+currentUnixTIme,
            controller: 'PreSurveyCtrl'
        })
        .when('/howto', {
            templateUrl: 'templates/how-to-play.html?v='+currentUnixTIme,
            controller: 'HowtoCtrl'
        })
        .when('/supportTicket', {
            templateUrl: 'templates/support-ticket.html?v='+currentUnixTIme,
            controller: 'SupportTicketCtrl'
        })
        .when('/supportTicketOut', {
            templateUrl: 'templates/support-ticket-outside.html?v='+currentUnixTIme,
            controller: 'SupportTicketCtrl'
        })
        .when('/about', {
            templateUrl: 'templates/about.html?v='+currentUnixTIme,
            controller: 'MainCtrl'
        })
        .when('/support', {
            templateUrl: 'templates/support.html?v='+currentUnixTIme,
            controller: 'SupportCtrl'

        })
        .when('/legal', {
            templateUrl: 'templates/legal.html?v='+currentUnixTIme,
            controller: 'LegalCtrl'
        })
        .when('/howtoOutside', {
            templateUrl: 'templates/how-to-play-outside.html?v='+currentUnixTIme,
            controller: 'HowtoOutsideCtrl'

        })
        .when('/notificationUserAdmin', {
            templateUrl: 'templates/notificationUserAdmin.html?v='+currentUnixTIme,
            controller: 'NotificationAdminCtrl'
        })
        .otherwise({
            redirectTo: '/main'
        });

        $compileProvider.directive('compile', function($compile) {
            return function(scope, element, attrs) {
                scope.$watch(
                    function(scope) {
                        return scope.$eval(attrs.compile);
                    },
                    function(value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    }
                );
            };
        });
});

app.directive('showsMessageWhenHovered', function () {
    return {
        Restrict: "A",
        link: function (scope, element, attributes) {
            var originalMessage = scope.message;
            element.bind("mouseover", function () {
                scope.message = attributes.message;
                scope.$apply();
            });
            element.bind("mouseout", function () {
                scope.message = attributes.message;
                scope.$apply();
            });
        }
    };
});


app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        currentRoute = current.$$route.originalPath
    });
});

app.run(function($rootScope) {
    angular.element(document).on("click", function(e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
});

angular.module('oar21').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});


app.directive('fluidvids', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            video: '@'
        },
        template: '<div class="fluidvids">' +
                    '<iframe ng-src="{{ video }}"></iframe>' +
                  '</div>',
        link: function (scope, element, attrs) {
            var ratio = (attrs.height / attrs.width) * 100;
            element[0].style.paddingTop = ratio + '%';
        }
    };
});

app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                //call the function that was passed
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

app.directive("loadMoreData", [function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs, ctrl) {
            var raw = element;
            var location = window.location.hash;

            $("body").scroll(function () {
                //if (((raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) || (raw.scrollHeight - (raw.scrollTop + raw.offsetHeight) < 10))) {
                //    $scope.$apply("loadMoreData()");
                //}

                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();
                var elemTop = raw.offset().top;
                var elemBottom = elemTop + raw.height();

                if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
                    $scope.$apply("loadMoreData()");
                }
            });
        }
    };

}])

app.directive('termsAgreement', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/legal.html'
    };
});

app.directive('moodMap', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/moodmap.html'
    };
});

angular.module('loaded', [])
  .directive('repeatHelloWorld', function () {
    return {
      link: function (scope, elem, attrs, ctrl) {
        var hello = function () {
          for (var i = 0; i < attrs.repeatHelloWorld; i++) {
            //////console.log"Hello world!");
          }
        }
        hello();
      }
    }
  });

//filter lengthy text
angular.module('ng').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

app.directive('pageHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/page-header.html?v='+currentUnixTIme,
        controller: function($scope, $location, SessionService) {
            $scope.sessionUser = angular.fromJson(SessionService.get('user'));
            var noHeaderPages = ['login', 'forgot-pwd', 'newAccount', 'about', 'legal','supportTicketOut', 'presurveyintro', 'presurvey', 'postsurveyintro', 'postsurvey'];
            var dropdown = $("#dropdownMenu");

            $scope.toggleLeftMenu = function() {
                if ($("#side-menu").hasClass("menu-default")) {
                    $("#side-menu").show().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").show();
                } else {
                    $("#side-menu").hide().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").hide();
                }
            };

            $scope.toggleRightMenu = function() { 
                if ($("#group-users-menu").hasClass("menu-default")) {
                    $("#group-users-menu").show().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").show();
                } else {
                    $("#group-users-menu").hide().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").hide();
                }
            };

            $scope.$watch(function() {
                return $location.path();
            }, function(url) {
                $scope.noHeader = false;
                $scope.noFooter = false;

                for (var i in noHeaderPages) {
                    if (url.indexOf(noHeaderPages[i]) >= 0) {
                        $scope.noHeader = true;
                        $scope.noFooter = true;
                    }
                }
            });

        }
    };
});

app.directive('notificationCont', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/notification.html?v='+currentUnixTIme
    };
});

app.directive('postasHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/alerts/post-as-ckboxs.html?v='+currentUnixTIme
    };
});
//app.directive('pageFooter', function () {
//    return {
//        restrict: 'E',
//        templateUrl: 'templates/widgets/page-footer.html?v='+currentUnixTIme
//    };
//});
app.directive('sideMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/side-menu.html?v='+currentUnixTIme,
        link: function() {
            $("#side-menu a, #side-menu .close-link").click(function() {
                if ($("#side-menu").hasClass("menu-slided")) {
                    $("#side-menu").hide().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").hide();
                }
            });

            //$(document).click(function(e) {
            //    e.preventDefault();
            //
            //    if (!($(e.target).hasClass("menu-slided")) && $("#side-menu").hasClass("menu-slided")) {
            //        $("#side-menu").animate({left: -180}, 200).toggleClass("menu-default menu-slided");
            //    }
            //});
        }
    };
});
app.directive('groupUsers', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/group-users.html?v='+currentUnixTIme,
        controller: function($scope, $filter, SessionService, $http) {
            $("#group-users-menu .close-link").click(function() {
                if ($("#group-users-menu").hasClass("menu-slided")) {
                    $("#group-users-menu").hide().toggleClass("menu-default menu-slided");
                    $(".side-menu-layer").hide();
                }
            });

            $scope.openSingleMessage = function(recipient) {
                var currentUser = JSON.parse(SessionService.get('user'));
                var messageUsers = [];
                var conversationID = null;

                messageUsers.push({
                    id: currentUser.id,
                    full_name: currentUser.firstname + " " + currentUser.lastname
                }, {
                    id: recipient.id,
                    full_name: recipient.firstname + " " + recipient.lastname
                });

                SessionService.set("selectedUsers", JSON.stringify(messageUsers));

                $http.post('/api/service/groupmessage/addUserToConversation', { userlist : JSON.stringify(messageUsers), conversationID: conversationID, type: 'single'}).
                    success(function(data, status, headers, config) {

                        location.href= "#/message/view/"+ JSON.parse(data);

                    });
            }
        }
    };
});
app.directive('quicklinksHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/quicklinks-header.html?v='+currentUnixTIme
    };
});
app.directive('groupList', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/group-list.html?v='+currentUnixTIme
    };
});
app.directive('wallWidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/wall-widget.html?v='+currentUnixTIme
    };
});
app.directive('photoMontage', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/photo-montage.html?v='+currentUnixTIme
    };
});
app.directive('wordCloud', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/word-cloud.html?v='+currentUnixTIme
    };
});
app.directive('goBack', function () {
    return {
        restrict: "A",
        link: function (scope, element, attributes) {
            element.on('click', function () {
                if (window.location.hash != "#/main") {
                    window.history.go(-1);
                }
            });
        }
    };
});
app.directive('scrollTop', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/scroll-top.html',
        scope: {
            id: '='
        },
        link: function() {
            var scrollBtn = angular.element('.scroll-to-top');
            var wrapper = angular.element('.scrollable-wrapper');

            scrollBtn.on('click', goTop);
            wrapper.on('scroll', detectPos);

            function detectPos() {
                if (wrapper.scrollTop() > 200) {
                    scrollBtn.fadeIn();
                } else {
                    scrollBtn.fadeOut();
                }
            }

            function goTop() {
                wrapper.animate({scrollTop : 0},500);
            }
        }
    };
});

app.directive('selectUsers', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/widgets/select-users.html',
        scope: {
            users: '=',
            currentUser: '='
        },
        controller: function($scope, $filter, SessionService, $http) {

            $scope.openMessage = function(users) {
                $scope.checkMessage = "";

                var checked  = $filter('filter')(users, {checked: true});

                var currentUser = JSON.parse(SessionService.get('user'));

                if (checked.length) {
                    var selectedUsers = [];
                    var type = (checked.length == 1) ? 'single' : 'group';
                    var conversationID = null;

                    if (location.href.indexOf('message/view') >= 0) {
                        conversationID = location.href.split('message/view/')[1];
                    }

                    selectedUsers.push({
                        id: currentUser.id,
                        full_name: currentUser.firstname + " " + currentUser.lastname
                    });

                    for (var i in checked) {
                        selectedUsers.push({
                            id: checked[i][0].id,
                            full_name: checked[i][0].firstname + " " + checked[i][0].lastname
                        })
                    }

                    SessionService.set("selectedUsers", JSON.stringify(selectedUsers));

                    $(".popup-active").toggleClass("popup-inactive popup-active");


                    // add user conversation
                    //console.log(selectedUsers);

                    $http.post('/api/service/groupmessage/addUserToConversation', { userlist : JSON.stringify(selectedUsers), conversationID: conversationID, type: type}).
                    success(function(data, status, headers, config) {

                        location.href= "#/message/view/"+ JSON.parse(data);

                    });



                    // end 

                    
                } else {
                    $scope.checkMessage = "Please select at least one user!";
                }
            }
        }
    };
});

app.directive("dropdown", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "templates/widgets/select-dropdown.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function(scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function(item) {
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.isSelected = function(item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function() {
                scope.listVisible = true;
            };

            $rootScope.$on("documentClicked", function(inner, target) {
                //console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
                if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
                    scope.$apply(function() {
                        scope.listVisible = false;
                    });
            });

            scope.$watch("selected", function(value) {
                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
            });
        }
    }
});

//Alerts
app.directive('alertSuccess', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/alerts/success.html'
    };
});
app.directive('alertError', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/alerts/error.html'
    };
});
app.directive('alertFeedback', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/alerts/feedback.html'
    };
});
app.directive('alertMoodcheck', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/alerts/mood-check.html'
    };
});
app.directive('showWordcloud', function () {
    return {
        restrict: "A",
        link: function () {
            element.on('click', function () {

            });
        }
    };
});

app.directive('toggle', function () {
    return {
        restrict: "A",
        link: function (scope, element, attributes) {
            element.on('click', function () {
                var target = element.data('target');
                scope.resetAll();
                if(scope.currentGroup) {    //This will prevent the load before a group has been selected
                    scope[target] = 1;
                    if(target==='displayPhotoMontage') {
                        scope.photoMontage();
                    } else if(target==='displayWordcloud') {
                        scope.displayWordCloud();
                    }
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('uploadFile', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                //////console.log'Getting files');
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file.name : undefined;
                scope.$emit("fileSelected", {file: files[0]});  //TODO: allow it to select multiple files
            });
        }
    };
});

app.directive('postScroll', function ($window) {
    return {
        restrict: "A",
        link: function () {

        }
    };
});

//Session check on server
app.config(function ($httpProvider) {
    var logsOutUserOn401 = function ($location, $q, SessionService, FlashService) {
        var success = function (response) {
            return response;
        };
        var error = function (response) {
            if (response.status === 401) { //HTTP NotAuthorised
                SessionService.unset('authenticated');
                SessionService.unset('currentSelectedGroup');
                SessionService.unset('currentSelectedGroupDetails');
                SessionService.unset('user');
                SessionService.unset('surveyskipped');
                FlashService.show(response.data.flash);
                $location.path('/login');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        };
        return function (promise) {
            return promise.then(success, error);
        };
    };
    $httpProvider.responseInterceptors.push(logsOutUserOn401);
});

// Redirect the user back to login page if the user is not logged in
app.run(function ($rootScope, $location, AuthenticationService, FlashService, SessionService, dropdownService, requestNotificationService, $templateCache, $cacheFactory) {

    var routesThatDontRequireAuth = ['/login','/IEDetected','/about','/loadApp','/newAccount','/newAccount/:cc', '/newAccount/:cc/:token', '/forgot-pwd', '/supportTicketOut', '/legal', '/howtoOutside', '/bypasslogin/:user/:password/:url', '/login/playerID/:pid'];
    var routesThatNeedPendingTask = ['/newpost'];


    
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();

      if ($location.path() == '/login'){
           //$cacheFactory('templates').removeAll();
      }

      // end 


   });


    $rootScope.$on('$routeChangeStart', function (event, next, current) {
    	
    	// check path /newAccount/:cc
    	var tmpPath = $location.path();
    	
    	var n = tmpPath.search('/newAccount/');
        var m = tmpPath.search('/bypasslogin/');
        var l = tmpPath.search('/login/playerID/');

    	
    	// End Check
    	////////console.logn);
    	
        if (!_(routesThatDontRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn() && n != 0 && m != 0 && l != 0) {
            $location.path('/login');
            //FlashService.show('Please login to continue!!');
        }

        //if (_(routesThatNeedPendingTask).contains($location.path()) && !SessionService.get('pendingTask')) {
        //    $location.path('/play');
        //    //FlashService.show('Please accept a new mission before creating a post');
        //
        //    //alert(SessionService.get('progressPercentage'));
        //
        //    if (parseInt(SessionService.get('progressPercentage')) < 100 && SessionService.get('numOfDaysPassed') > SessionService.get('taskCompleted')){
        //        dropdownService.newDropdown("notification", 5000, "Please accept a new mission before creating a post",'');
        //    }
        //
        //
        //}
    });
});

app.factory('formDataObject', function () {
    return function (data) {
        var fd = new FormData();
        angular.forEach(data, function (value, key) {
            fd.append(key, value);
        });
        return fd;
    };
});

// Notification service
// Call notification service every 10 secs

app.run(function($interval, $http, $rootScope, SessionService, $timeout, dropdownService, requestNotificationService) {
        
     var userArray = SessionService.get("user");

     var timer = $interval(function(){

            requestNotificationService.notification();


      },10000);

     requestNotificationService.notification();

     $rootScope.emoicon = function(message){
        var html = $('#emoicon-wrapper').html();

        $("body").append(html);

        //alert(html);

        $timeout(function(){

            $(".popdown").css("top", "0");

        },500);

     };

      $rootScope.ajaxLoader =  function(){
            var html = "";

            html += '<div id="progressLoader"><div class="progress-loader"><div class="progress-bar"></div></div><div id="ajax-loader-cover"></div><div id="loader-item"><div id="loader-icon"></div><div id="loader-message" class="theme-text center-align">Please wait</div></div></div>';

            // attach the div to the body
            $("body").prepend(html);

      }

      $rootScope.removeAjaxLoader =  function(){

            // remove the div of of the body
            $("#progressLoader").remove();

      }

      $rootScope.contentWrapperLoader =  function(){
            var html = "";

            html += '<div id="content-wrapper-loader"></div> ';

            $("body").prepend(html);

      }

      $rootScope.removeContentWrapperLoader = function(){
            $("#content-wrapper-loader").fadeOut( "fast" , function(){
                $(this).remove();
            });
            $( '.content-wrapper' ).fadeTo( "slow", 1 );

      }

      $rootScope.contentNotAvailable = function(targetDiv, content, active){
            var html = "";

            html += '<div class="contentNotAvailable">'+content+'</div>';

            $("#"+targetDiv).prepend(html);

            if (active == 1){

                    $(".contentNotAvailable").css("display", "block");

            }else{
                    $(".contentNotAvailable").css("display", "none");

            }
      };
        
});

//@codekit-append "angular-upload.js";
//@codekit-append "services/authenticationService.js";
//@codekit-append "services/globalService.js";
//@codekit-append "services/dropDownService.js";
//@codekit-append "services/flashService.js";
//@codekit-append "services/sessionService.js";
//@codekit-append "services/APICallService.js";

//@codekit-append "filters/filters.js";

//@codekit-append "controllers/login.js";
//@codekit-append "controllers/bypasslogin.js";
//@codekit-append "controllers/SignUpController.js";
//@codekit-append "controllers/main.js";
//@codekit-append "controllers/journal.js";
//@codekit-append "controllers/dice.js";
//@codekit-append "controllers/mission.js";
//@codekit-append "controllers/message.js";
//@codekit-append "controllers/messageSelectGroup.js";
//@codekit-append "controllers/messageSelectUser.js";
//@codekit-append "controllers/messageView.js";
//@codekit-append "controllers/groupMessage.js";
//@codekit-append "controllers/wall.js";
//@codekit-append "controllers/posts.js";
//@codekit-append "controllers/survey.js";
//@codekit-append "controllers/supportTicket.js";
//@codekit-append "controllers/howto.js";
//@codekit-append "controllers/notificationAdminController.js";
//@codekit-append "controllers/accountSettingsController.js";
//@codekit-append "controllers/notificationController.js";
//@codekit-append "controllers/mood.js";
//@codekit-append "controllers/support.js";
//@codekit-append "controllers/legal.js";
//@codekit-append "controllers/howtoOutside.js";
//@codekit-append "controllers/missionsCompleted.js";
//@codekit-append "controllers/groupmessagelist.js";
//@codekit-append "controllers/postNewController.js";
//@codekit-append "controllers/postAsController.js";
//@codekit-append "controllers/preSurveyController.js";
//@codekit-append "controllers/postSurveyController.js";


// Version (see package.json)
// AngularJS simple file upload directive
// this directive uses an iframe as a target
// to enable the uploading of files without
// losing focus in the ng-app.
//
// <div ng-app="app">
//   <div ng-controller="mainCtrl">
//    <form ng-attr-action="/uploads"
//      ng-upload="completed(content)">
//      ng-upload-loading="loading()"
//      <input type="file" name="avatar"></input>
//      <input type="submit" value="Upload"
//         ng-disabled="$isUploading"></input>
//    </form>
//  </div>
// </div>
//
//  angular.module('app', ['ngUpload'])
//    .controller('mainCtrl', function($scope) {
//      $scope.loading = function() {
//        //console.log('loading...');
//      }
//      $scope.completed = function(content) {
//        //console.log(content);
//      };
//  });
//
angular.module('ngUpload', [])
  .directive('uploadSubmit', ["$parse", function($parse) {
    // Utility function to get the closest parent element with a given tag
    function getParentNodeByTagName(element, tagName) {
      element = angular.element(element);
      var parent = element.parent();
      tagName = tagName.toLowerCase();

      if ( parent && parent[0].tagName.toLowerCase() === tagName ) {
          return parent;
      } else {
          return !parent ? null : getParentNodeByTagName(parent, tagName);
      }
    }
    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        element.bind('click', function($event) {
          // prevent default behavior of click
          if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
          }

          if (element.attr('disabled')) { return; }
          var form = getParentNodeByTagName(element, 'form');
          form.triggerHandler('submit');
          form[0].submit();
        });
      }
    };
  }])
  .directive('ngUpload', ["$log", "$parse", "$document",
    function ($log, $parse, $document) {
    var iframeID = 1;
    // Utility function to get meta tag with a given name attribute
    function getMetaTagWithName(name) {
      var head = $document.find('head');
      var match;

      angular.forEach(head.find('meta'), function(element) {
        if ( element.getAttribute('name') === name ) {
            match = element;
        }
      });

      return angular.element(match);
    }

    return {
      restrict: 'AC',
      link: function (scope, element, attrs) {
        // Give each directive instance a new id
        iframeID++;

        function setLoadingState(state) {
          scope.$isUploading = state;
        }

        var options = {};
        // Options (just 1 for now)
        // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
        // {
        //    // add the Rails CSRF hidden input to form
        //    enableRailsCsrf: bool
        // }
        var fn = attrs.ngUpload ? $parse(attrs.ngUpload) : angular.noop;
        var loading = attrs.ngUploadLoading ? $parse(attrs.ngUploadLoading) : null;

        if ( attrs.hasOwnProperty( "uploadOptionsConvertHidden" ) ) {
            // Allow blank or true
            options.convertHidden = attrs.uploadOptionsConvertHidden != "false";
        }

        if ( attrs.hasOwnProperty( "uploadOptionsEnableRailsCsrf" ) ) {
            // allow for blank or true
            options.enableRailsCsrf = attrs.uploadOptionsEnableRailsCsrf != "false";
        }

        if ( attrs.hasOwnProperty( "uploadOptionsBeforeSubmit" ) ) {
            options.beforeSubmit = $parse(attrs.uploadOptionsBeforeSubmit);
        }

        element.attr({
          'target': 'upload-iframe-' + iframeID,
          'method': 'post',
          'enctype': 'multipart/form-data',
          'encoding': 'multipart/form-data'
        });

        var iframe = angular.element(
          '<iframe name="upload-iframe-' + iframeID + '" ' +
          'border="0" width="0" height="0" ' +
          'style="width:0px;height:0px;border:none;display:none">'
        );

        // If enabled, add csrf hidden input to form
        if ( options.enableRailsCsrf ) {
          var input = angular.element("<input />");
            input.attr("class", "upload-csrf-token");
            input.attr("type", "hidden");
            input.attr("name", getMetaTagWithName('csrf-param').attr('content'));
            input.val(getMetaTagWithName('csrf-token').attr('content'));

          element.append(input);
        }
        element.after(iframe);

        setLoadingState(false);
        // Start upload
        element.bind('submit', function uploadStart() {
          var formController = scope[attrs.name];
          // if form is invalid don't submit (e.g. keypress 13)
          if(formController && formController.$invalid) return false;
          // perform check before submit file
          if (options.beforeSubmit && options.beforeSubmit(scope, {}) == false) return false;

          // bind load after submit to prevent initial load triggering uploadEnd
          iframe.bind('load', uploadEnd);

          // If convertHidden option is enabled, set the value of hidden fields to the eval of the ng-model
          if (options.convertHidden) {
            angular.forEach(element.find('input'), function(el) {
              var _el = angular.element(el);
              if (_el.attr('ng-model') &&
                _el.attr('type') &&
                _el.attr('type') == 'hidden') {
                _el.attr('value', scope.$eval(_el.attr('ng-model')));
              }
            });
          }

          if (!scope.$$phase) {
            scope.$apply(function() {
              if (loading) loading(scope);
              setLoadingState(true);
            });
          } else {
            if (loading) loading(scope);
            setLoadingState(true);
          }
        });

        // Finish upload
       function uploadEnd() {
          // unbind load after uploadEnd to prevent another load triggering uploadEnd
           alert('UPLAOD DONE')
          iframe.unbind('load');
          if (!scope.$$phase) {
            scope.$apply(function() {
              setLoadingState(false);
            });
          } else {
            setLoadingState(false);
          }
          // Get iframe body contents
          var bodyContent = (iframe[0].contentDocument ||
            iframe[0].contentWindow.document).body;
          var content;
          try {
            content = angular.fromJson(bodyContent.innerText || bodyContent.textContent);
          } catch (e) {
            // Fall back to html if json parse failed
            content = bodyContent.innerHTML;
            $log.warn('Response is not valid JSON');
          }
          // if outside a digest cycle, execute the upload response function in the active scope
          // else execute the upload response function in the current digest
          if (!scope.$$phase) {
             scope.$apply(function () {
                 fn(scope, { content: content});
             });
          } else {
            fn(scope, { content: content});
          }
        }
      }
    };
  }]);

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

/*
 * Author John Le
 * This is the error Notification Warning
 * it pops up when the user missing an input
 * params : none
 * return none
 */

app.factory('globalAppNotification', function(dropdownService) {
        return {
            callNotification: function(name, type, id) {
                var msg = "sent you a message";

                if (type == "newgroupmessage"){
                    msg = "sent you a group message";
                }

                if (type == "newlike"){
                    msg = "likes your post";
                }

                if (type == "newcomment"){
                    msg = "has commented on your post";
                }

                if (type == "newcommentother"){
                    msg = "has commented on a post you commented on";
                }

                if (type == "newgroupmember"){
                    msg = "has joined your team";
                }

                if (type == "missionpending"){
                    msg = "have one mission pending";
                }



                // Notification HTML

                if (type != "missionpending"){
                        dropdownService.newDropdown("notification", 5000, name+' '+msg, type, id);
                        
                        //console.log('dropdown service call');
                }
            },
            webNotification: function(message){

                      // Let's check if the browser supports notifications
                      if (!("Notification" in window)) {
                        alert("This browser does not support desktop notification");
                      }
                    
                      // Let's check if the user is okay to get some notification
                      else if (Notification.permission === "granted") {
                        // If it's okay let's create a notification
                        var notification = new Notification(message);
                      }
                    
                      // Otherwise, we need to ask the user for permission
                      // Note, Chrome does not implement the permission static property
                      // So we have to check for NOT 'denied' instead of 'default'
                      else {
                        Notification.requestPermission(function (permission) {
                          // If the user is okay, let's create a notification
                          if (permission === "granted") {
                            var notification = new Notification(message);
                          }
                        });
                      }

            }
        };
    });
    


/*
 * Author John Le
 * This is the global service auto request the number of notifications every 10 secs
 * params : none
 * return none
 */
app.factory('requestNotificationService', function($http, SessionService, globalAppNotification) {
        var temp = 0;

        var tempISE = 0;

        return {
            notification: function() {

                   //console.log('cool');
                    


                    // send request to the server to get the new notification status

                    $http.post('/api/global/notificationNum').
                    success(function(data, status, headers, config) {
                            console.log('Notification Data');
                            console.log(data);
                            //////////////

                            if (data != 'false'){
                                    $('.notification-alert').css('display', "block");
                                    $('#side-nav-notification-number').css('display', "block");
                                    
                               }else{
                                    $('.notification-alert').css('display', "none");
                                    $('#side-nav-notification-number').css('display', "none");
                               }
                               
                               // set the number to 10+ if notification number more than 10
                               if (data.count > 10){
                                    
                                    $('.notification-alert').html("10+");
                                    $('#side-nav-notification-number').html("10+");
                                    
                               }else{
                                    
                                    $('.notification-alert').html(data.count);
                                    $('#side-nav-notification-number').html(data.count);
                                    
                               }
                               
                               //if (data.message_count != 0){
                               //     $('.message-alert').css('display', "block").html(data.message_count);
                               //
                               //} else {
                               //     $('.message-alert').css('display', "none");
                               //}
                               //
                               //if (data.message_count > 10){
                               //
                               //     $('.message-alert').html("10+");
                               //
                               //}else{
                               //
                               //     $('.message-alert').html(data.message_count);
                               //
                               //}

                            /////////////

                            // check if live notification mode enable / disable

                           var userSessonService = JSON.parse(SessionService.get('user'));

                           ////console.log"test user session service");
                           //////console.loguserSessonService.notification);

                            //SessionService.set('liveAppNotificationSession', 'true');

                           if (SessionService.get('liveAppNotificationSession') == "true"){


                                    if (data == 'false'){
                                          tempISE = 1;
                                          ////console.logstatus);
                                          
                                          $('#side-nav-notification-number').css('display', "none");
                                          $('#side-nav-message-number').css('display', "none");


                                    }else{

                           
                                   
                                           if (data.count == 1 && tempISE == 1 && temp != 1){
                                                //////console.log"this is the test :"+data.count);
                                                globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_id);

                                                // web notification
                                                //globalAppNotification.webNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type);
                                           }
                                           
                                           //console.log("=========================");
                                           //console.log("Count : "+data.count);
                                           //console.log("Temp : "+temp);
                                           //console.log("========================="); 

                                           
                                           if (data.count > temp && temp != 0){
                                            // this is the test this is the test this is the test
                                                //$rootScope.globalWebNotification(data.user[0].firstname+" "+data.user[0].lastname+" just sent you a message !");
                                                //$rootScope.sendMail(data.user[0].firstname+" "+data.user[0].lastname+" just sent you a message !", userArray);
                                                if (data.type == 'message') {
                                                    globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_user_id);
                                                } else {
                                                    globalAppNotification.callNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type, data.source_id);
                                                }

                                                // web notification
                                                //globalAppNotification.webNotification(data.user[0].firstname+" "+data.user[0].lastname, data.type);

                                                temp = 0;
                                           }




                                        }



                           }
                           
                            
                            temp = data.count;


                            
                    });

                    // end request


            }
        };
    });


// this is the dropdown service 

app.service('dropdownService', function( $http,$location,SessionService,FlashService, $rootScope, $timeout, $compile) {
    	
	    	var dropdown_stack = [];
			var current_dropdown = null; //hold html of dropdown container div from array
			var current_dropdown_id = null; //May be helpfull when targeting animation
			var dropdown_timeout; //store reference to timeout function if it needs to be cancelled 
			var dropdown_height; //May be good to dynamically store height of div
			var dropdown_duration = 4000000;
			var dropdown_type = "";
			var dropdownFlag = 0;

			//Build dropdown_stack array
			//type: needs to work with Notification, Warning, MoodData, Mission rating/Feedback

			//alert("ss");

			//newDropdown("notification", 2000, "this is the test");



			

			var newDropdownRef = this.newDropdown = function(type, duration, message, notType, id)
			{
				var html;
				
				dropdown_type = type;

				switch(type)
				{
					//option 1. get html of type. Set html var.
					case 'notification':
						var link = '';

						switch(notType) {
							case 'message':
								link = '/#/message/' + id;
								break;
							case 'newgroupmessage':
								link = '/#/message/view/' +id;
								break;
							case 'newlike':
							case 'newcomment':
							case 'newcommentother':
								link = '/#/wall/' + id;
								break;
						}

						html = "<a href='" + link + "'><div class='popdown notification-green'><div class='notification-msg'><h4>"+message+"</h4></div></div></a>";
						



						break;
					case 'warning':
						html = '<div class="popdown warning-red"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						break;
					case 'emotion':

						html = '<div class="popdown container" id="emoicon"><div class="notification-type"><h3>How are you feeling?</h3></div><div class="notification-msg"><a href="#/main/mood/1"><div class="emoji-mood-container"><div class="mood-emoji emoji-5">&nbsp;</div><div class="mood-description"><p>Terrible</p></div></div></a><a href="#/main/mood/2"><div class="emoji-mood-container"><div class="mood-emoji emoji-4">&nbsp;</div><div class="mood-description"><p>Not Great</p></div></div></a><a href="#/main/mood/3"><div class="emoji-mood-container"><div class="mood-emoji emoji-3">&nbsp;</div><div class="mood-description"><p>Okay</p></div></div></a><a href="#/main/mood/4"><div class="emoji-mood-container"><div class="mood-emoji emoji-2">&nbsp;</div><div class="mood-description"><p>Good</p></div></div></a><a href="#/main/mood/5"><div class="emoji-mood-container"><div class="mood-emoji emoji-1">&nbsp;</div><div class="mood-description"><p>Fantastic</p></div></div></a></div></div>';

						break;


					case 'pushNotificationReminder':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						break;	

					case 'reportCommentConfirmation':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';
						
						break;		


					case 'reportPostConfirmation':
						html = '<div class="popdown notification-green"><div class="notification-msg"><h4>'+message+'</h4></div></div>';

						break;		

					case 'reportCompletedNotification':
						html = "<div class='popdown notification-green'><div class='notification-msg'><h4>"+message+"</h4></div></div>";
						
						break;		

					

					//option 2. could have all dropdown html hardcoded here, and insert message. Set html var.
				}
				
				
				//option 2

				// escape duoble quote character

				html = html.replace(/['"]/g, "&quot;");

				//if (SessionService.get('notificationType') == message){
				//	console.log("Same message");
				//}else{

				if (SessionService.get('notificationType') != message){
						dropdown_stack.push('{"html" : "'+html+'", "duration" : '+duration+' }'); //message included in html

						
						SessionService.set('notificationType', message);

						
						dropdownFlag++;
				//}
				

				//}


				
				//call dropdownIn

				//console.log(dropdown_stack.length);

				//if (dropdown_stack.length == 1){

					if(dropdown_stack.length <= 1 )
					{
						//$rootScope.dropdownIn();
						



						dropDownInRef();
					} 


				}

				

				
			};


			//start display of new dropdown
			var dropDownInRef = this.dropdownIn = function ()
			{
				////console.log("Next item :");
				////console.log(dropdown_stack);

				//alert("a");


				if(dropdown_stack.length > 0)
				{

					var html = JSON.parse(dropdown_stack[0]).html;

					html = html.replace(/&quot;/g, "\"");

					////console.log(html);

					var link = html;

					$("body").append(link);

					if (dropdown_type != "emotion"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();

						    if (dropdown_type == "pushNotificationReminder"){
						    	//$location.path("/notificationUserAdmin");
						    	window.location.href = "#/notificationUserAdmin";
						    }

						    SessionService.unset('notificationType');
						    
						});


					}


					// dropdown 
					if (dropdown_type == "reportCommentConfirmation"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();
						    SessionService.unset('notificationType');

						    //alert('comment report');

						    // send http request to the server
          
					         $http.post('/api/comment/report', {postid : commentReportIDs['post_id'], commentid : commentReportIDs['comment_id'], userid : commentReportIDs['user_id'], groupid : commentReportIDs['group_id']}).then(function(result){
					                console.log(result);
					                

					                // show notification to logged in user



					                setTimeout(function() { 

					                	newDropdownRef("reportCompletedNotification", 10000, "The comment has been reported as inappropriate");

					                }, 1200);



					          });

					         $('#comment-report-'+commentReportIDs['comment_id']).remove();
					         //alert('a');

						    SessionService.unset('notificationType');
						    
						});


					}





					// dropdown 
					if (dropdown_type == "reportPostConfirmation"){

					
						$(".popdown").click( function() {
						    // do something
						    dismissDropdownRef();
						    SessionService.unset('notificationType');

						    //alert('comment report');
						    console.log("ss");
						    console.log(postReportIDs);

						    // send http request to the server
          
					         $http.post('/api/post/report', {postid : postReportIDs['post_id'], userid : postReportIDs['user_id'], groupid : postReportIDs['group_id']}).then(function(result){
					                console.log("Send Email : OK");
					                

					                


					                setTimeout(function() { 

					                	newDropdownRef("reportCompletedNotification", 5000, "The post has been reported as inappropriate");

					                }, 1200);
					          });


					         $('#post-report-'+postReportIDs['post_id']).remove();
					         //alert('a');

						    SessionService.unset('notificationType');
						    
						});


					}
					

					activeDropDownRef(JSON.parse(dropdown_stack[0]).duration);


                    //alert("aaa");





				}
			};



			var dismissDropdownRef = this.dismissDropdown = function  (duration){

					$(".popdown").css("top", "-14%"); 

					setTimeout(function() { 

								        $(".popdown").remove(); 

									        dropdown_stack.shift();

									        ////console.log("left over");

									        ////console.log(dropdown_stack);

									        dropDownInRef();


								        

					}, 1000);

			};


			


			var activeDropDownRef = this.activeDropDown = function  (duration){


					dropdown_duration = duration;

					function makeTimeoutFunc() {
						    return function() {
						        // does something with param
						        $(".popdown").css("top", "0");

							        setTimeout(function() { 

							        $(".popdown").css("top", "-14%"); 

								        setTimeout(function() { 

								        $(".popdown").remove(); 



									        dropdown_stack.shift();

									        ////console.log("left over");

									        ////console.log(dropdown_stack);


									        SessionService.unset('notificationType');

									        dropdownFlag = 0;

									        	dropDownInRef();


								        

								    	}, 1000);


							    	}, dropdown_duration);




						    }
						}

					setTimeout(makeTimeoutFunc(), 500);




			};



			

			


});



























			/*
			var dropdown_stack = [];
			var current_dropdown = null; //hold html of dropdown container div from array
			var current_dropdown_id = null; //May be helpfull when targeting animation
			var dropdown_timeout; //store reference to timeout function if it needs to be cancelled 
			var dropdown_height; //May be good to dynamically store height of div




			//Build dropdown_stack array
			//type: needs to work with Notification, Warning, MoodData, Mission rating/Feedback
			$rootScope.newDropdown = function(type, duration, message)
			{
				var html;
				
				switch(type)
				{
					//option 1. get html of type. Set html var.
					case 'notification':
						html = $('#notification-green-wrapper').html();
						break;
					case 'warning':
						html = $('#warning-red-wrapper').html();
						break;
					

					//option 2. could have all dropdown html hardcoded here, and insert message. Set html var.
				}
				
				
				//option 2
				//dropdown_stack.push({html, duration}); //message included in html
				
				//call dropdownIn
				if(current_dropdown == null)
				{
					//$rootScope.dropdownIn();
				} 
			};


			//start display of new dropdown
			$rootScope.dropdownIn = function()
			{
				if(dropdown_stack.length > 0)
				{
					//get/remove first object in array
					current_dropdown_obj = dropdown_stack.shift();
					//store html in current_dropdown var
					current_dropdown = current_dropdown_obj.html;
					current_dropdown_id = "some_id_name"; // may not need?
					
					//START DOWNWARD ANIMATION
					//May be good to dynamically store height of div in dropdown_height
					
					dropdown_timeout = //store ref of timeout function doing the animation
					
					//on timer complete call dropdownOut(true)
				}
			};

			//hides dropdown called from timer
			//or user interaction
			$rootScope.dropdownIn = function(loop:Boolean) //loop - if false don't call next dropdown in stack
			{
				//clear or cancel dropdown_timeout (timeout animation function) 
				//in case dropdownOut has been called externally
				
				//START UPWARD ANIMATION
				//using dropdown_height
				//using current_dropdown or current_dropdown_id
				//create new timer
				
				//on timer complete 
				current_dropdown = current_dropdown_id = null;
				if(loop) //call dropdownIn() to trigger next dropdown if it exists
			};

			//cancel dropdown loop. dropdownIn() can be called at any time to restart stack loop
			$rootScope.stopAllDropdowns = function()
			{
				//clear or cancel dropdown_timeout (timeout animation function) 
				
				//reset current vars
				current_dropdown = current_dropdown_id = null;
			};*/




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

app.service('APICallService',function($http,$location,$rootScope,SessionService,FlashService,$q,Upload){
    return {
        getNativeAppStatus: function() {
            var status = $http({
                method: 'GET',
                url: '/api/global/isNativeApp',
                data: {

                }
            });

            return status;
        },
        addPost: function(post) {

            return Upload.http({
              method: 'POST',
              url: 'api/add/post',
              headers: {'Content-Type': undefined},
              transformRequest: function (data) {
                  var formData = new FormData();
                  formData.append("post", angular.toJson(data.postData));
                  formData.append("file", data.file);
                  return formData;
              },
              data: { postData: post, file: post.status_file }
            }).progress(function(evt) {
                appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
            })


        },
        fetchPosts: function(userid,groupid) {

        },
        fetchPendingTask: function(userid,groupid) {
            //This function should check if there is any info stored in session
            //storage and return it else call the API and return the values
            
            //alert('aa');
            /*if(SessionService.get('pendingTask')) {
                return SessionService.get('pendingTask');
            } else {
                var response=$http({
                    url: '/api/fetch/currenttask',
                    method: 'POST',
                    data: {userid: userid, groupid: groupid}
                });
                response.success(function(data){
                    if(data.pendingTask) {
                        $rootScope.pendingTask=data;
                        SessionService.set('pendingTask',data.taskid);
                        SessionService.set('pendingTaskDetails',angular.toJson(data));
                    }
                });
            }
            */
           console.log('fetchPendingTask')
           $http.post('/api/mission/getPendingTask',{groupid: groupid}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			         
			           console.log("getPendingTask-success");
			      
			      
			           var pendingTaskDetails={
			               title: data.title,
                           mission: data.mission,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson(pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		////console.log(pendingTaskDetails);
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log('error');
			    });
        },
        fetchPendingT: function(userid,groupid) {
            
            	
			    $http.post('/api/mission/getPendingTask',{groupid: groupid}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			         
			           
			      
			      
			           $scope.pendingTaskDetails={
			               title: data.title,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		////console.log($scope.pendingTaskDetails);
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });
            
            
        },
        likePost: function(userid,groupid,postid) {
            var like = $http({
                method: 'POST',
                url: '/api/user/post/like',
                data: {
                    userid: userid,
                    groupid: groupid,
                    postid: postid
                }
            });
            //Return the like promise
            return like;
        },
        acceptMission: function(userid,groupid,taskid) {
            ////console.log('userid: '+userid);
            ////console.log('groupid: '+groupid);
            ////console.log('taskid: '+taskid);
            if(SessionService.get('pendingTask')) {
                //Do nothing for now as we already have a pending task
            } else {
                return $http({
                    url: '/api/user/acceptmission',
                    method: 'POST',
                    data: {userid: userid, groupid: groupid, taskid: taskid}
                });
            }
        },
        fetchWellbeingTracks: function(groupid) {
            console.log('Groupid: '+groupid);
            $http({
                url: 'api/user/wellbeingtracks',
                method: 'POST',
                data: {groupid: groupid}
            }).then(function(result){
                console.log('Wellbeing data fetched')
                console.log(result.data);
                SessionService.set('moodmap',angular.toJson(result.data));
            });
        },
        fetchWellbeingData: function(groupid) {
            console.log('Groupid: '+groupid);

            return $http({
                url: 'api/user/wellbeingtracks',
                method: 'POST',
                data: {groupid: groupid}
            });
        },
        addComment: function(comment) {
            ////console.log('APICALLSERVICE add comment');
            var newComment={
                comment: comment.comment,
                post_id: comment.post_id,
                user_id: comment.user_id
            };
            $http({
                url: 'api/add/comment',
                method: 'POST',
                data: {
                    comment: comment.comment,
                    post_id: comment.post_id,
                    user_id: comment.user_id
                }
            }).then(function(result){
                ////console.log('comment added');
            })
        },
        markSurveyComplete: function(survey) {
            ////console.log('Marking survey complete');
            ////console.log(survey);
            $http({
                url: 'api/user/survey/complete',
                method: 'POST',
                data: {survey: survey}
            }).then(function(){
                $location.path('/main');
            });
        },
        updateMood: function(groupid,mood) {
            ////console.log('Updating mood to API');
            return $http({
                url: 'api/user/mood/update',
                method: 'POST',
                data: {
                    groupid: groupid,
                    mood: mood
                }
            });
        },
        updateTaskScore: function(task,score) {
            ////console.log('Sending the feedback');
            return $http({
                url: 'api/user/taskscore',
                method: 'POST',
                data: {
                    taskid: task,
                    score: score
                }
            });
        },
        progressBar: function(groupid) {
            console.log('Sending the feedback');
            return "string"
        },
        sendFeedback: function(feedbackText) {
            ////console.log('Sending the feedback');
            return $http({
                url: 'api/user/feedback',
                method: 'POST',
                data: {
                    feedback: feedbackText
                }
            });
        }
    };
});


//HTML Stripping filter

app. filter('htmlStripper', function() {
    return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    }
});

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('LoginCtrl', function ($scope, $window, $routeParams, $location, $cacheFactory, APICallService, AuthenticationService, SessionService, $http, $rootScope, dropdownService) {
    $scope.Lang = $window.Lang;
    var storeUsernameLocally = "";
    var username = localStorage.getItem("username");
    if (username){
    	storeUsernameLocally = localStorage.getItem("username");
    	////console.log($scope.credentials.remember);
    }

    //var $httpDefaultCache = $cacheFactory.get('$http');
    $scope.loginMessage = "";

    //$httpDefaultCache.removeAll();

    APICallService.getNativeAppStatus().success(function(status) {
        usingUniWebView = status;
    })

    //window.location.reload(true);
    //$.ajax({
    //    url: "",
    //    context: document.body,
    //    success: function(s,x){
    //        $('html[manifest=saveappoffline.appcache]').attr('content', '');
    //        $(this).html(s);
    //    }
    //});

    //alert("a");

                var path = $location.path();
                ////console.log(path);

                if (path != "/forgot-pwd"){

                    AuthenticationService.logout();
                    
                }

    $rootScope.contentWrapperLoader();
    
    SessionService.set('preSurveyCompleted', 0);
    SessionService.set('postSurveyCompleted', 0);
   
    $scope.remember_username = true;
    
    $scope.credentials = {username: storeUsernameLocally, password: ""};

    ////console.log($rootScope.fromResetPwd );

    if ($rootScope.fromResetPwd == 1){
        
        //$rootScope.notificationGreen("Success. Check email");
        dropdownService.newDropdown("notification", 5000, "Success. Check email");
        $rootScope.fromResetPwd = 0;
    }

    if (!$scope.credentials.username) {
        $("#uname").focus();
    } else {
        $("#pword").focus();
    }

    $rootScope.removeContentWrapperLoader();
    
    $scope.login = function () {
        var userandpass = $scope.credentials;
        $scope.loginMessage = "";

        //alert($scope.playerid_hidden);

        //alert($routeParams.pid)

        // get playserid from url

        if (!userandpass.username){
            $scope.loginMessage = "Please enter email";
            $("#uname").focus();
        } else if (!userandpass.password){
            $scope.loginMessage = "Please enter password";
            $("#pword").focus();
        }

        if ($scope.loginMessage == ""){
            // ajax loader starts
            $rootScope.ajaxLoader();

            AuthenticationService.login($scope.credentials)
            .success(function (data) {
                $location.path("/main");
                $scope.storeUsername();

                // write playerID on the database


                    // get the playerID

                    //alert("cool");
                    //sessionStorage.setItem("playerid_field", playerIDArr[1]);
                    //location.href = "uniwebview://loginform?loaded=tes5t";

                    //alert(SessionService.get('playerid_field'));



                    //alert($('#playerID').val());

                    /*if ($('#playerID').val() != ""){


                            //alert("CONTENT : "+$('#playerID').val());

                            $http.post('/api/service/writeMobilePNtoDB', {'userID': data.id, 'playerID': $('#playerID').val()}).
                            success(function(data, status, headers, config) {
                              // this callback will be called asynchronously
                              // when the response is available


                              //alert("SUCCESS : "+$('#playerID').val());

                            }).error(function(data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                //alert("PLayer ID is in wrong format");


                                //alert("FAIL : "+data);
                              });

                            SessionService.unset('playerid_field');
                        }*/


                // remove ajax loader out of body

                $rootScope.removeAjaxLoader();
            })
            .error(function (data) {
                //console.log(data);

            });
        }else{
            var path = $location.path();
            ////console.log(path);

            if (path != "/newAccount"){

                //$rootScope.warningRed(message);
                //dropdownService.newDropdown("warning", 5000, message);


            }
        }
    };


    $scope.resetPwd = function () {
        $scope.errorMessage = "";

        var expression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

        if ($scope.emailforreset && expression.test($scope.emailforreset)) {
            // ajax loader starts
            $rootScope.ajaxLoader();

            $http.post('/api/service/forgotpwd', {email: $scope.emailforreset}).
                success(function(data, status, headers, config) {

                    // this is the core function
                    if (data == "OK"){
                        $rootScope.fromResetPwd = 1;

                        $location.path("/login");
                    } else {
                        //$rootScope.warningRed(data);
                        dropdownService.newDropdown("warning", 5000, data);
                    }

                    // remove ajax loader out of body
                    $rootScope.removeAjaxLoader();
                })
        } else {
            $scope.errorMessage = "Please enter a valid email";
        }
    };


    $scope.logout = function () {
        AuthenticationService.logout();
    };
    $scope.navigateTo = function (path) {
        $location.path('/' + path);
    };
    
    $scope.rememberUsername = function ()
    {
    	if (!$scope.remember_username) $scope.remember_username = true;
    	else $scope.remember_username = false;
    };
    
    $scope.storeUsername = function ()
    {
    	if ($scope.remember_username) localStorage.setItem("username", $scope.credentials.username);
    	else localStorage.setItem("username", "");
    };


    

                


                



     $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            $("#page-loader").hide();
            $('.content-wrapper').css('display', '0');


            

     });           






    $rootScope.removeAjaxLoader();

   
    
});






app.controller('ByPassCtrl', function ($scope, $window, $routeParams, $location, AuthenticationService, SessionService, $http, $rootScope, dropdownService) {

            

            var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

            console.log($routeParams);

            //$scope.credentials = {username : Base64.decode($routeParams.user), password: Base64.decode($routeParams.password)};

            $scope.credentials = {username : 'Master Roller lp001', password: 'Master123$'};

            var userandpass = $scope.credentials;
            var message = "";



            AuthenticationService.login($scope.credentials)
                    .success(function (data) {
                        $location.path("/main");
                        $scope.storeUsername();

                        // remove ajax loader out of body
                        //$rootScope.removeAjaxLoader();
                    });
                    

                      

            $scope.storeUsername = function ()
            {
                if ($scope.remember_username) localStorage.setItem("username", $scope.credentials.username);
                else localStorage.setItem("username", "");
            };



        

});


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('SignUpCtrl', function ($scope, $window, $location, AuthenticationService, FlashService, SessionService,  $http, $routeParams, $rootScope, dropdownService, $timeout) {
    $scope.Lang = $window.Lang;
    var storeUsernameLocally = "";
    var username = localStorage.getItem("username");
    
  	var receiveNotifications = false;

    $scope.lastID = "";
    $scope.errorMessage = "";
    $scope.showStep1 = true;
    $scope.showStep2 = false;
    $scope.showStep3 = false;
    $("#signup-firstname").focus();
    
    //$scope.newuser.state = "VIC";
    
    //$scope.newuser.state = "ACT";


    SessionService.unset('liveAppNotificationSession');
    SessionService.unset('lastCompletedMission');
    SessionService.unset('messageGroupUser');
    SessionService.unset('messageid');
    SessionService.unset('messageusername');
    SessionService.unset('moodCheck');
    SessionService.unset('postSurveyCompleted');
    SessionService.unset('preSurveyCompleted');
    SessionService.unset('usertemp');


    //$(document).ready(function() {
    //    var ua = navigator.userAgent.toLowerCase();
    //    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //    if(isAndroid && (usingUniWebView == 'true')) {
    //        $("input[type='text'], input[type='password'], input[type='email']").focusin(function() {
    //            $(".scrollable-wrapper").animate({bottom: 200}, 0);
    //        }).focusout(function() {
    //            $(".scrollable-wrapper").animate({bottom: 0}, 0);
    //        })
    //    }
    //})
    
    
    ////console.log$routeParams.cc);
    $rootScope.contentWrapperLoader();
    
    $scope.isDisabled = "false";
    
    //$("#keycode").val('aa');

        $scope.newuser = {
            firstname : SessionService.get("temp.fname"),
            lastname : SessionService.get("temp.lname"),
            username : SessionService.get("temp.uname"),
            password : SessionService.get("temp.pword"),
            email : SessionService.get("temp.email"),
            confirmemail : SessionService.get("temp.cemail")

        };


        $scope.keycode = SessionService.get("temp.kcode");

        

    //sign user up for OneSignal notifications account
    $scope.receiveNotifications = function()
    {
    	receiveNotifications = document.getElementById('receive-chrome-pn').checked;
    	
    	if(receiveNotifications == true) registerForPush();
    }
    


    //$scope.keycode = "ss";

    
    if ($routeParams.cc){
    	
    	//$scope.newuser.keycode = $routeParams.cc;
    	$scope.keycode = $routeParams.cc;
        $scope.token = $routeParams.token;
    	$scope.isDisabled = "true";
    	////console.log$scope.newuser);
    	
    }
    
    $scope.checkKeyCode = function(obj){
    	
    	
    	
    	//console.log$scope.keycode);
    	
    };

    //Initiate when Enter key is pressed in any step
    $("#signup-form input[type='text'], #signup-form input[type='password']").on('keyup keydown keypress', function (e) {
        var formStep = $(this).parents(".form-step").attr("id");

        if (e.keyCode == 13) {
            e.preventDefault();

            //if (formStep == 'signup-step1') {
            //    $scope.enterStep2();
            //
            //} else if (formStep == 'signup-step2') {
            //    $scope.enterStep3();
            //
            //} else if (formStep == 'signup-step3') {
            //    $scope.signUp();
            //}
        }
    });

    //Return to previous step in registration process
    $scope.previousStep = function(step) {
        var previousStep = "showStep" + step;
        var currentStep = "showStep" + (step + 1);

        $scope[previousStep] = true;
        $scope[currentStep] = false;
    }

    //Validate each step in registration
    $scope.enterStep2 = function() {
        $scope.errorMessage1 = "";

        if ($scope.newuser.firstname && $scope.newuser.lastname) {
            $scope.showStep1 = false;
            $scope.showStep2 = true;
            //$("#signup-email").focus();

        } else {
            if (!$scope.newuser.firstname) {
                $scope.errorMessage1 = "Please enter first name";
                $("#signup-firstname").focus();
            } else if (!$scope.newuser.lastname) {
                $scope.errorMessage1 = "Please enter last name";
                $("#signup-lastname").focus();
            }
        }
    }

    $scope.enterStep3 = function() {
        $scope.errorMessage2 = "";

        var expression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

        if ($scope.newuser.email && expression.test($scope.newuser.email)) {
            // send request to the server
            $http.post('/api/signup/isEmailExist', {email : $scope.newuser.email}).
                success(function(data, status, headers, config) {
                    if (data == "true"){
                        $scope.errorMessage2 = "This email already exists";
                        $("#signup-email").focus();
                    } else {
                        if (!$scope.newuser.password) {
                            $scope.errorMessage2 = "Please enter password";
                            $("#signup-pass").focus();
                        } else if (!$scope.newuser.confirmpassword || ($scope.newuser.confirmpassword != $scope.newuser.password)) {
                            $scope.errorMessage2 = "Password does not match!";
                            $("#signup-confirmpass").focus();
                        } else {
                            $scope.showStep2 = false;
                            $scope.showStep3 = true;
                        }
                    }
                });
        } else {
            $scope.errorMessage2 = "Please enter a valid email";
            $("#signup-email").focus();
        }
    }

    //$scope.openTerms = function() {
    //    $(".popup-inactive").toggleClass("popup-inactive popup-active");
    //}
    
    $scope.signUp = function () {
        $scope.errorMessage3 = "";

        //FlashService.show('Please accept a new mission before creating a post');
        ////console.log$scope.newuser.lname);
        $scope.newuser.keycode = $scope.keycode;
        $scope.newuser.token = $scope.token;
        //console.log$scope.newuser);

        if ($scope.newuser.keycode && $scope.newuser.securitycode && $scope.newuser.tos) {
            $rootScope.ajaxLoader();

            $http.post('/api/servcie/signup', $scope.newuser).
                success(function(data, status, headers, config) {
                    SessionService.set("lastID",data.user_id);

                    if (data.status == "true") {
                        //$rootScope.fromResetPwd = 1;

                        $location.path("/login");

                        dropdownService.newDropdown("notification",5000, "Thanks. You can login below");

                        //////////

                        //on signup save users device details to our DB and update users OneSignal tags
                        if(receiveNotifications) pushUsersDeviceToDB();

                        // write the push notification device data

                        $timeout(function() {
                            var playerid = SessionService.get("playerid");

                            $http.get('https://onesignal.com/api/v1/players/'+playerid).
                                success(function(data, status, headers, config) {

                                    $http.post('/api/service/writePNtoDB',data).
                                        success(function(data, status, headers, config) {

                                        });

                                });

                        }, 3000);

                    } else {
                        //dropdownService.newDropdown("warning", 5000, data.status);
                        $scope.errorMessage3 = data.status;

                        if (data.status == "Incorrect answer") {
                            $("#signup-security").focus();
                        } else if (data.status == "Your keycode is invalid") {
                            $("#keycode").focus();
                        }
                    }
                    // remove ajax loader out of body
                    $rootScope.removeAjaxLoader();

                    document.getElementById('secuimage').src = '/securimage/securimage_show.php?' + Math.random(); return false;

                    document.getElementById('securityinput').value = "";

                });
        } else {
            if (!$scope.newuser.securitycode) {
                $scope.errorMessage3 = "Please answer the question in the picture";
                $("#signup-security").focus();
            } else if (!$scope.newuser.keycode) {
                $scope.errorMessage3 = "Please enter key code";
                $("#keycode").focus();
            } else if (!$scope.newuser.tos) {
                $scope.errorMessage3 = "Please agree to agreement";
            }
        }


        SessionService.unset("temp.fname");
        SessionService.unset("temp.lname");
        SessionService.unset("temp.uname");
        SessionService.unset("temp.pword");
        SessionService.unset("temp.email");
        SessionService.unset("temp.cemail");
        SessionService.unset("temp.kcode");
        SessionService.unset("temp.state");
    	
    };

    $rootScope.removeContentWrapperLoader();


    $scope.saveTemporaryData = function (){

        ////console.log$scope.newuser);
        if ($scope.newuser.firstname != ""){
                $scope.userTemp = {firstname : $scope.newuser.firstname};
                SessionService.set("usertemp", $scope.userTemp);
        }
    };



    //$scope.readTOS = function(){
    //
    //
    //
    //    if ($scope.newuser.firstname != undefined){
    //
    //            SessionService.set("temp.fname",$scope.newuser.firstname);
    //    }else{
    //        SessionService.unset("temp.fname");
    //    }
    //
    //    if ($scope.newuser.lastname != undefined){
    //
    //            SessionService.set("temp.lname",$scope.newuser.firstname);
    //    }else{
    //        SessionService.unset("temp.lname");
    //    }
    //
    //    if ($scope.newuser.username != undefined){
    //
    //            SessionService.set("temp.uname",$scope.newuser.username);
    //    }else{
    //        SessionService.unset("temp.uname");
    //    }
    //
    //    if ($scope.newuser.password != undefined){
    //
    //            SessionService.set("temp.pword",$scope.newuser.password);
    //    }else{
    //        SessionService.unset("temp.pword");
    //    }
    //
    //    if ($scope.newuser.email != undefined){
    //
    //            SessionService.set("temp.email",$scope.newuser.email);
    //    }else{
    //        SessionService.unset("temp.email");
    //    }
    //
    //    if ($scope.newuser.confirmemail != undefined){
    //
    //            SessionService.set("temp.cemail",$scope.newuser.confirmemail);
    //    }else{
    //        SessionService.unset("temp.cemail");
    //    }
    //
    //    if ($scope.keycode != undefined){
    //
    //            SessionService.set("temp.kcode",$scope.keycode);
    //    }else{
    //        SessionService.unset("temp.kcode");
    //    }
    //
    //    if ($scope.newuser.state != undefined || $scope.newuser.state !== ""){
    //
    //            SessionService.set("temp.state",$scope.newuser.state);
    //    }else{
    //        SessionService.unset("temp.state");
    //    }
    //
    //
    //
    //
    //
    //    $scope.navigateTo("legal");
    //
    //
    //};
   
    
});





/* 
 * This is the main angular file
 */

app.controller('MainCtrl', function ($scope, $window, $location, $cacheFactory, SessionService, AuthenticationService, $http, $rootScope, globalAppNotification, APICallService, dropdownService) {
    $scope.Lang = $window.Lang;
    $scope.groupname = "Mark's Happy Rollers";
    $scope.message = "This is a test message";
    //$scope.currentGroup=SessionService.get('currentSelectedGroup') ? SessionService.get('currentSelectedGroup') : 0;
    //$scope.sessionUser = angular.fromJson(SessionService.get('user'));
    $scope.headMessage = '';
    //var $httpDefaultCache = $cacheFactory.get('$http');

    //$httpDefaultCache.removeAll();

    $scope.$watch(function() {
        return SessionService.get('currentSelectedGroup');
    }, function(newVal, oldVal) {
        $scope.currentGroup = null;
        $scope.currentGroup = JSON.parse(newVal);

        $http.post('/api/group/user',{id: $scope.currentGroup}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.groupUsers = data;

                //console.log($scope.currentUser.id);

            })
    });

    $scope.$watch(function() {
        return SessionService.get('user');
    }, function(newVal, oldVal) {
        if (newVal) {
            $scope.currentUser = JSON.parse(newVal);
            $scope.sessionUser = JSON.parse(newVal);

            $scope.setupGroup();
        }
    });

    $scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));

    $scope.getGroupList = function () {
        return $http.post('/api/group/list');
    };

    $scope.setCurrentGroup = function (groupid) {
        SessionService.set('currentSelectedGroup', groupid);
        SessionService.unset('pendingTask');
        SessionService.unset('pendingTaskDetails');
        $scope.currentGroup = groupid;
        $scope.flash='';
        ////console.log('group: ' + $scope.groups);
        angular.forEach($scope.groups, function (group, key) {
            if (group.id === groupid) {
                //console.log('this was reached');
                $scope.currentSelectedGroupDetails = group;
                SessionService.set('currentSelectedGroupDetails', angular.toJson(group));

            }
        });

        //APICallService.progressBar(groupid);
        //APICallService.fetchWellbeingData(groupid).success(function(moodDat) {
        //    wellbeingData = moodDat;
        //
        //    $scope.getMoodData();
        //    $scope.startMoodMapAni();
        //});
        /////////////////

        //$scope.getMoodData = function() {
        //    $http({
        //        url: 'api/global/getProgress',
        //        method: 'POST',
        //        data: {
        //            groupid: groupid
        //        }
        //    }).then(function(result){
        //        //console.log('Progress Data');
        //        //console.log(result);
        //        var progressData = result.data['progress'];
        //
        //        SessionService.set('progressPercentage', progressData);
        //
        //        //SessionService.set('numOfDaysPassed', result.data.completed_days);
        //
        //        $scope.ppb = progressData;
        //        ////console.log("progress bar"+result.data);
        //
        //        $scope.InitUserProgress(result.data, $scope);
        //    });
        //}

        /////////////////
        APICallService.fetchPendingTask($scope.sessionUser.id, $scope.currentGroup);


        ////console.log(response[0]);
        $scope.pendingTaskDetails = SessionService.get('pendingTaskDetails');
        $scope.pendingTask = SessionService.get('pendingTask');
        //$scope.$emit('$viewContentLoaded');
        //$scope.resetAll();
        //$scope.displayMoodMap = 1;
        var $currentSelectedG = JSON.parse(SessionService.get('currentSelectedGroupDetails'));

        $scope.headMessage = $currentSelectedG.name;

        ////console.log($currentSelectedG);
    };

    $scope.setupGroup = function() {
        $scope.getGroupList().then(function (result) {
            var unix = Math.round(+new Date()/1000);

            SessionService.set('numOfDaysPassed', result.data[0].daysPassed);

            var loginRedirect = localStorage.getItem("loginRedirect");

            if (loginRedirect != null) {
                $location.path("/"+loginRedirect);
                localStorage.removeItem("loginRedirect");
            }

            $scope.hideGroupSelection=1;

            $scope.groups = result.data;

            $scope.setCurrentGroup($scope.sessionUser.groups[0].id);

            //$scope.resetAll();
            //if ($scope.sessionUser.groupCount===1 && $scope.sessionUser.role != 1) {
                //$scope.displayGroupList = 0;
                //$scope.setCurrentGroup($scope.sessionUser.groups[0].id);
            //} else {
                //$scope.hideGroupSelection=0;
                //$scope.displayGroupList = 1;

                //if (SessionService.get('currentSelectedGroup') != null) {
                //    $scope.setCurrentGroup(SessionService.get('currentSelectedGroup'));
                //}

                //$rootScope.removeContentWrapperLoader();
                //$scope.InitUserProgress(0, $scope.weekday.toUpperCase(), $scope.date + '/' + $scope.month, $scope);
            //}

            if ($scope.currentGroup) {
                //$scope.resetAll();
                //$scope.displayMoodMap = 1;
                //$scope.loadProgress($scope.currentGroup);

                // search if presurvey has been completed !

                $http.post('/api/survey/isPresurveyCompleted', {'groupid':$scope.currentGroup}).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if (data == "true"){
                            SessionService.set('preSurveyCompleted', 1);
                        } else {
                            $location.path('/presurveyintro');
                        }
                    });

                //This is where we should prompt for the survey as well
                /* if(SessionService.get('preSurveyCompleted')==0) {
                 $location.path('/presurveyintro');
                 } else */
            } else {
                //$scope.resetAll();
                $scope.displayGroupList = 1;
                $scope.currentGroup = 0;
                //$scope.loadProgress(0);   //TODO: fix this so we can show empty progress canvas
            }

            //setTimeout(function() {
            //    if(!$scope.currentGroup) {
            //        dropdownService.newDropdown("notification", 40000000, "Please select a team");
            //    }
            //}, 4000);

        });
    };

    if (SessionService.get("notificationType") == "null"){
        SessionService.unset("notificationType");
    }

    $scope.setHeader = function (name) {
        $("#page-title").html(name);
    }

    $scope.navigateTo = function (route) {
        //console.log(route);

        if (route == 'play') {
            if (SessionService.get('progressPercentage') == 100){
                $location.path('/missionCompleted');
                dropdownService.newDropdown("notification", 2500, "Fantastic - goal completed!");

            } else {
                if (SessionService.get('numOfDaysPassed') == SessionService.get('taskCompleted')){
                    if (SessionService.get('pendingTaskDetails')){
                        dropdownService.newDropdown("notification", 2500, "Please complete pending mission");
                    }else{
                        //$location.path('/main');
                        dropdownService.newDropdown("notification", 2500, "Missions up to date. Roll again tomorrow!");
                    }
                } else {
                    $location.path('/play');
                }
            }
        } else {
            $location.path('/' + route);
        }
    };

    $scope.setActiveMenu = function (menu) {
        $("#header ul a").removeClass("active");
        $("#mobile-nav a").removeClass("active");

        if (menu != "none") {
            $("#header ul a#link-" + menu).addClass("active");
            $("#mobile-nav a#menu-" + menu).addClass("active");
        }
    }

    $scope.closeSideMenu = function() {
        if ($("#side-menu").hasClass("menu-slided")) {
            $("#side-menu").hide().toggleClass("menu-default menu-slided");
            $(".side-menu-layer").hide();
        }

        if ($("#group-users-menu").hasClass("menu-slided")) {
            $("#group-users-menu").hide().toggleClass("menu-default menu-slided");
            $(".side-menu-layer").hide();
        }
    }

    $scope.togglePopup = function(type) {
        $(".popup-" + type).toggleClass("popup-inactive popup-active");

        if (type == 'active') {
            $("#full-image img").hide();
        }
    }

    //$.ajax({
    //    url: "",
    //    context: document.body,
    //    success: function(s,x){
    //        $('html[manifest=saveappoffline.appcache]').attr('content', '');
    //        $(this).html(s);
    //    }
    //});
    
    $scope.pendingTask = function(){
			    $http.post('/api/mission/getPendingTask',{groupid: $scope.currentGroup}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			      
			           //alert(SessionService.get("missionPending"));

			           if (data.date == true && SessionService.get("missionPending") != "true"){
			      				//alert("a");
			      				SessionService.set("missionPending", "true");

			      				globalAppNotification.callNotification("You", "missionpending");

			      		}
			      
			      
			           $scope.pendingTaskDetails={
			               title: data.title,
			               didyouknow: data.didyouknow,
			               reference: data.reference,
			               taskid: data.taskid,
			               date: data.date
			           };
			            SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
			      
			      		SessionService.set('pendingTask', data.taskid);
			      		//console.log($scope.pendingTaskDetails);


			      		// show mission pending notification
			      		
			      		
			      		
			      		$('#hideCurrentMission').css("display", "none");
			      
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });
    };
    
    $scope.pendingTask();
    
    
    $scope.currentGroupNotSelected = function () {
        if (SessionService.get('currentSelectedGroup')) {
            return false;
        }

        //alert("aa");
        return true;
    };
    $scope.logout = function() {
        AuthenticationService.logout();
        $location.path('/login');
    };
});

/*
 * TODO: remove all debug messages and minify script
 * TODO: Change the button from current mission to play if there is no pending task
 * This is the journal page controller
 */
app.controller('JournalCtrl', function ($scope, $location, $route, $routeParams, $http, $timeout, $log, $rootScope, SessionService, APICallService, dropdownService) {
    $scope.headTitle = 'journal';
    $scope.headMessage = '';
    $scope.displayWordcloud = 0;
    $scope.displayGroupList = 0;
    $scope.displayWall = 0;
    $scope.displayPhotoMontage = 0;
    $scope.displayMoodMap = 0;
    $scope.posts = '';
    //$scope.groups = '';
    $scope.wordCloud = '';
    $scope.photos = '';
    //$scope.currentGroup = SessionService.get('currentSelectedGroup');
    //$scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    //$scope.sessionUser = angular.fromJson(SessionService.get('user'));
    //$scope.pendingTaskDetails = '';
    //$scope.pendingTask = '';
    $scope.progress = 0;
    $scope.weekday = moment().format('dddd');
    $scope.date = moment().format('DD');
    //$rootScope.ajaxLoader();
    $scope.dialProgress = null;
    $scope.userProgress = null;

    $scope.setHeader("Journal");
    $scope.setActiveMenu("journal");

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    //alert(month);
    $scope.month = moment().format('MM');
    $scope.montageCreated = 0;
    $scope.ppb = 0;
    var min = 10000;
    var max = 30000;

    var wellbeingData = null;

    $scope.randomIMG = Math.floor(Math.random() * (max - min + 1)) + min;
    //$scope.disabledFeatureMsg = '<div class="disabled-feature-msg">This feature is not available at the moment.</div>';
    //$scope.noPost = '<div class="disabled-feature-msg">You have no private posts at the moment.</div>';
    //$scope.moodCheck=SessionService.get('moodCheck');
    //$scope.currentGroup=SessionService.get('currentSelectedGroup');
    
    $rootScope.contentWrapperLoader();

    //if (SessionService.get("notificationType") == "null"){
    //    SessionService.unset("notificationType");
    //}

    //Initiate click function on mobile device for progress section
    if ($(window).width() <= 499) {
        $(".progress-circle").click(function() {
            $(this).hide();
            $(".progress-detailed-info").show();
        });

        $(".progress-detailed-info").click(function() {
            $(this).hide();
            $(".progress-circle").show();
        })
    }

    ////console.log($location.path());
    var n = $location.path().search("/main/mood");
    if (n == 0){
            // mood check time

            $http({
                url: 'api/global/moodCheckTime',
                method: 'POST'
            });

            // end mood check time

    }

    if ($scope.sessionUser.role == 1) {
        $scope.complete = true;
        //$rootScope.removeAjaxLoader();
    }

    $scope.resetAll = function () {
        $scope.displayWordcloud = 0;
        $scope.displayGroupList = 0;
        $scope.displayWall = 0;
        $scope.displayPhotoMontage = 0;
        $scope.displayMoodMap = 0;
    };
    $scope.setupCharts = function (groupid) {
        console.log("Set up charts");
        //SessionService.set('currentSelectedGroup', groupid);
        //SessionService.unset('pendingTask');
        //SessionService.unset('pendingTaskDetails');
        //$scope.currentGroup = groupid;
        $scope.flash='';
        ////console.log('group: ' + $scope.groups);
        //angular.forEach($scope.groups, function (group, key) {
        //    if (group.id === groupid) {
        //        //console.log('this was reached');
        //        $scope.currentSelectedGroupDetails = group;
        //        SessionService.set('currentSelectedGroupDetails', angular.toJson(group));
        //
        //    }
        //});

        APICallService.progressBar(groupid);
        APICallService.fetchWellbeingData($scope.currentGroup).success(function(moodDat) {
            wellbeingData = moodDat;

            $scope.getMoodData();
            $scope.startMoodMapAni();
        });
        /////////////////

        $scope.getMoodData = function() {
            $http({
                url: 'api/global/getProgress',
                method: 'POST',
                data: {
                    groupid: $scope.currentGroup
                }
            }).then(function(result){
                console.log('Progress Data');
                console.log(result);
                var progressData = result.data['progress'];

                SessionService.set('progressPercentage', progressData);

                //SessionService.set('numOfDaysPassed', result.data.completed_days);

                $scope.ppb = progressData;
                ////console.log("progress bar"+result.data);

                $scope.InitUserProgress(result.data, $scope);
            });
        }


        
        /////////////////
        //APICallService.fetchPendingTask($scope.sessionUser.id, $scope.currentGroup);

        
        ////console.log(response[0]);
        //$scope.pendingTaskDetails = SessionService.get('pendingTaskDetails');
        //$scope.pendingTask = SessionService.get('pendingTask');
        //$scope.$emit('$viewContentLoaded');
        $scope.resetAll();
        $scope.displayMoodMap = 1;
        //var $currentSelectedG = JSON.parse(SessionService.get('currentSelectedGroupDetails'));

        //$scope.headMessage = $currentSelectedG.name;

        ////console.log($currentSelectedG);
    };

    $scope.setupCharts();
    
    ////console.log($scope.currentGroup);

    $scope.loadProgress = function (groupid) {
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            };
        }
        //Set the pre and post survey status
        $scope.preSurveyCompleted=SessionService.get('preSurveyCompleted');
        $scope.postSurveyCompleted=SessionService.get('postSurveyCompleted');
        if(!$scope.preSurveyCompleted) {
            SessionService.set('preSurveyCompleted',$scope.currentSelectedGroupDetails.preSurveyCompleted);
            //alert($scope.currentSelectedGroupDetails.preSurveyCompleted);
        } else if(!$scope.postSurveyCompleted) {
            SessionService.set('postSurveyCompleted',$scope.currentSelectedGroupDetails.postSurveyCompleted);
        }
        if ($scope.currentGroup) {
            //console.log('Current Selected group details: ' + $scope.currentSelectedGroupDetails);
            var currentDay = Math.floor(21 - ((Math.floor(Date.now() / 1000) - $scope.currentSelectedGroupDetails.timestart) / 86400));
            $scope.headMessage = $scope.currentSelectedGroupDetails.name;
        } else {
            var currentDay = 0;
            $scope.headMessage = 'Please select team';
        }
        $scope.currentDay = currentDay;
        //console.log('Setting current day to: ' + currentDay);
        if ($scope.currentGroup === 0) {
            var progress = 0;
            $scope.progress = 0;
        } else if ($scope.currentDay <= 0) {
            var progress = 100;
            $scope.progress = progress;
            $scope.getWallPosts();
        } else {
            var progress = Math.floor($scope.currentDay / 21);
            $scope.progress = progress;
            $scope.getWallPosts();
        }
        //Not sure why this code is here? Commented out...
        //var canvasProgress = document.getElementById("canvas-progress");
        //var progressInstance = new Processing(canvasProgress, $scope.UserProgress);
    };


    $scope.mysql_to_unix = function(date) {
        return Math.floor(new Date(date).getTime() / 1000);
    }
    
    $scope.getWallPosts = function () {
        var posts = $http({
            method: 'POST',
            url: '/api/group/private/posts',
            data: {
                groupid: $scope.currentGroup
            }
        });
        posts.success(function (data) {

            $scope.posts = data;
            //console.log("lagg");
            //console.log("dtl :"+data.length);
			
			if (data.length < 1){
				$('.journal-wall-posts').html($scope.noPost);
			}

        });


        //$('.journal-wall-posts').html($scope.noPost);
    };
    //$scope.getGroupList = function () {
    //    return $http.post('/api/group/list');
    //};
    $scope.getWordsForCloud = function () {
        /*$http.post('/api/user/words').success(function (data) {
            $scope.wordCloud = data;

            var r = null;
            
            try {
                JSON.parse(data);
                //alert('true');
            } catch (e) {
              //console.log("error:"+e);
              r = e;
                
            }

            ////console.log(r);
            
            if (r != null){
                $('#tagcloud').html($scope.disabledFeatureMsg);
            }
           
            
                
            


            
        });  */
            $('#tagcloud').html($scope.disabledFeatureMsg);
    };
    $scope.getPhotosForMontage = function () {
        $http.post('/api/user/photos').success(function (data) {
            //console.log(data);
            $scope.photos = data;
        });
    };
    $scope.canDisplay = function (type) {
        if (type === 'currentmission') {
            if ($scope.currentGroup && SessionService.get('pendingTask')) {
                return false;
            }
        } else if (type === 'play') {
            if ($scope.currentGroup && !SessionService.get('pendingTask')) {
                return false;
            }
        }
        return true;
    };

    $scope.dothis = function(){

            //alert("aaa");

    };


    $scope.$on('$viewContentLoaded', function (FlashService) {

        console.log('==========');
        console.log($scope.sessionUser);

        if ($scope.sessionUser.notification == '1'){
                SessionService.set('liveAppNotificationSession', 'true');
        }else{
                SessionService.set('liveAppNotificationSession', 'false');

        }




        if ($scope.sessionUser.push_notification == '0' && SessionService.get('chromeReminderFlag') != "true"){



                //dropdownService.newDropdown("pushNotificationReminder", 5000, "Tap to register for <br/>Chrome notification");
                SessionService.set('chromeReminderFlag', "true");
        }


        $timeout(function() {


          //console.log('Journal Page Content Loaded !');

          $http({url: 'api/global/taskCompleted', method: 'POST'})
          .then(function(result){

                    //alert(result.data);
                    SessionService.set('taskCompleted', result.data);

           });





         // $rootScope.contentWrapperLoader();
         $rootScope.removeContentWrapperLoader();

            setTimeout(function(){

                    ////console.log(result.data);

                    ////////////

                    console.log("REGISTRERD USSER DATE "+$scope.mysql_to_unix($scope.sessionUser.created_at));

                    var unix = Math.round(+new Date()/1000);

                    //var range = unix - $scope.mysql_to_unix($scope.sessionUser.created_at);

                    //var numOfDaysPassed = Math.ceil(range / 86400);

                    //console.log("TEST DAYS : ");
                    //console.log(result.data[0]);
                    //alert(numOfDaysPassed);

                    //SessionService.set('numOfDaysPassed', result.data[0].daysPassed);





                    ////////////


                    //var loginRedirect = localStorage.getItem("loginRedirect");
                    //
                    //if (loginRedirect != null){
                    //    $location.path("/"+loginRedirect);
                    //    localStorage.removeItem("loginRedirect");
                    //}


                    $scope.hideGroupSelection=1;

                    //$scope.groups = result.data;

                    console.log("====");

                    console.log(SessionService.get('user'));

                    console.log("====");

                    $scope.getWordsForCloud();
                    $scope.getPhotosForMontage();
                    $scope.resetAll();
                    if($scope.sessionUser.groupCount===1 && $scope.sessionUser.role != 1)
                    {
                        $scope.displayGroupList = 0;
                        //$scope.setCurrentGroup($scope.sessionUser.groups[0].id);
                    }
                    else
                    {
                        $scope.hideGroupSelection=0;
                        $scope.displayGroupList = 1;
                        //if (SessionService.get('currentSelectedGroup') != null)
                        //{
                        //    $scope.setCurrentGroup(SessionService.get('currentSelectedGroup'));
                        //}

                        $rootScope.removeContentWrapperLoader();
                        //$scope.InitUserProgress(0, $scope.weekday.toUpperCase(), $scope.date + '/' + $scope.month, $scope);
                    }






                    if ($scope.currentGroup) {
                        $scope.resetAll();
                        $scope.displayMoodMap = 1;
                        $scope.loadProgress($scope.currentGroup);
                        ////console.log($scope.progress);

                        // search if presurvey has been completed !


                        //$http.post('/api/survey/isPresurveyCompleted', {'groupid':$scope.currentGroup}).
                        //    success(function(data, status, headers, config) {
                        //        // this callback will be called asynchronously
                        //        // when the response is available
                        //        if (data == "true"){
                        //            SessionService.set('preSurveyCompleted', 1);
                        //        }else{
                        //
                        //            $location.path('/presurveyintro');
                        //
                        //        }
                        //
                        //
                        //    });



                        //This is where we should prompt for the survey as well
                        /* if(SessionService.get('preSurveyCompleted')==0) {
                         $location.path('/presurveyintro');
                         } else */
                    } else {
                        $scope.resetAll();
                        $scope.displayGroupList = 1;
                        $scope.currentGroup = 0;
                        //$scope.loadProgress(0);   //TODO: fix this so we can show empty progress canvas
                    }




                    setTimeout(function() {

                        if(!$scope.currentGroup) {
                            dropdownService.newDropdown("notification", 40000000, "Please select a team");
                        }




                    }, 4000);







            }, 1000);






          });


            if (SessionService.get('progressPercentage') == 100){
                //$('.journal-buttons').append('<button ng-show="complete" class="button button-blu view-mission">GOAL COMPLETED!</button>');
                $scope.allCompleted = true;
                $('.button-gre').remove();
            }




    });
    $scope.humanReadable = function (time) {
        return moment(time).fromNow();
    };
    



    
	///////////////////
	/* User Progress */
	///////////////////
	
    $scope.UserProgress = function ( UserProgress )
    {
        var _w = $scope.UserProgress._width
        var _h = $scope.UserProgress._height
        var _day = $scope.UserProgress._day;
        var _date = $scope.UserProgress._date;
        var _percent = $scope.UserProgress._progress;
        var p_count = 0;
		var _completed_days = $scope.UserProgress._completedDays;
		
        UserProgress.lightBlue = UserProgress.color(47, 143, 188);
        UserProgress.darkBlue = UserProgress.color(24, 82, 110);
        UserProgress.cream = UserProgress.color(242, 208, 141);
		
		
        UserProgress.setup = function()
        {
        	
            UserProgress.size( _w, _h);
            UserProgress.frameRate( 35 );
            UserProgress.background(0, 0);

            UserProgress.textFont(UserProgress.createFont("Raleway",30));
        };
        
        UserProgress.draw = function()
        {
            UserProgress.background(0, 0);
            //CIRCLE BG
            UserProgress.strokeWeight( _h/20 );
            //bg
            UserProgress.stroke(UserProgress.darkBlue);
            UserProgress.fill(UserProgress.lightBlue);
            UserProgress.ellipse(_w/2, _h/2, _h*.75, _h*.75);
            //PROG BAR
            
            //otherwise do inimation
        	UserProgress.noFill();
        	UserProgress.strokeWeight( _h/15 );
        	UserProgress.stroke(UserProgress.cream);
        	UserProgress.strokeCap(UserProgress.SQUARE);
        	p_count += (_percent-p_count)/4
        	UserProgress.arc(_w/2, _h/2, _h*.84, _h*.84, UserProgress.radians(270), UserProgress.radians(270+((360/100)*p_count)));
        	
        	if(Math.round(_percent) == Math.round(p_count))
        	{   
        		//update progress bar to be exact on ani complete based on _percent not p_count
        		UserProgress.arc(_w/2, _h/2, _h*.84, _h*.84, UserProgress.radians(270), UserProgress.radians(270+((360/100)*_percent)));
        	}
            
            
            UserProgress.smooth();
			
            //TEXT
            UserProgress.maxFontSize = 20/100;
            //day
            /*UserProgress.textSize(UserProgress.maxFontSize*(_h*.4));
            UserProgress.day_width = UserProgress.textWidth(_day);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(_day, (_w-UserProgress.day_width)*.5, _h*.36);
            //date
            UserProgress.textSize(UserProgress.maxFontSize*(_h*1.2));
            UserProgress.date_width = UserProgress.textWidth(_date);
            UserProgress.text(_date, (_w-UserProgress.date_width)*.5, _h*.56);*/
            
            //percent progress
            UserProgress.textSize(UserProgress.maxFontSize*(_h*1.4));
            UserProgress.prog_str = p_count.toFixed(0)+"%";
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.53);
            
            //completed missions label
            UserProgress.textSize(UserProgress.maxFontSize*(_h*.35));
            UserProgress.prog_str = "complete!";
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.cream);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.64);
            
            //Completed days label
            UserProgress.textSize(UserProgress.maxFontSize*(_h*.35));
            UserProgress.prog_str = "Day "+_completed_days;
            UserProgress.percent_width = UserProgress.textWidth(UserProgress.prog_str);
            UserProgress.fill(UserProgress.darkBlue);
            UserProgress.text(UserProgress.prog_str , (_w-UserProgress.percent_width)*.5, _h*.78);
            
            

			//end animtion and start Moodmap
            if(Math.round(_percent) == Math.round(p_count))
            {   
            	UserProgress.noLoop(); //stop loop animation
                 //display mood map

                var unix = Math.round(+new Date()/1000);
            }
            
        };
    };
    $scope.InitUserProgress = function(data, scope)  //Change parameters to total num of missions, start date, completed missions
    {
        console.log("Init User Progress");
        var progress = data['progress'];
        $scope.progressPercent = data['progress'];
        $scope.totalMissions = data['total_mission'];
        $scope.completedDays = data['completed_days'];
        console.log('PROGRESS DATA');
        console.log(data);
        //console.log('Completed Days');
        //console.log(completedDays);
        //console.log('Start Date');
        //console.log(data['start_date']);
        $scope.completedMissions = data['completed_missions'];
        $scope.totalLikes = data['total_likes'];
        $scope.userProgress = progress;
        $scope.complete = true;
        //$rootScope.removeAjaxLoader();

        $scope.drawProgress(progress);

        //$scope.startMoodMapAni();

        //scope.UserProgress._width = $(".progress").width();
        //scope.UserProgress._height = $(".progress").height();
        //scope.UserProgress._day = day;
        //scope.UserProgress._date = date;
        //scope.UserProgress._progress = progress;
        //scope.UserProgress._completedDays = $scope.completedDays;
        //
        //var canvasProgress = document.getElementById("canvas-progress");
        //var progressInstance = new Processing(canvasProgress, scope.UserProgress);

    };

    $(window).resize(function() {
        $scope.dialProgress = 0;
        $scope.drawProgress();
    })

    $scope.drawProgress = function() {
        $scope.dialProgress = $scope.userProgress;
        if ($(window).width() >= 375) {
            $scope.progressRadius = 75;
        } else {
            $scope.progressRadius = 57;
        }
    }




	/////////////
	/* MoodMap */
	/////////////

	$scope.MoodMap = function (MoodMap) 
	{
      MoodMap.lightBlue = MoodMap.color(47, 143, 188);
      MoodMap.darkBlue = MoodMap.color(24, 82, 110);
      MoodMap.cream = MoodMap.color(242, 208, 141);
      MoodMap.white = MoodMap.color(242, 208, 141);
      MoodMap.title = "MOOD MAP";
      var _w = $scope.MoodMap._width;
      var _h = $scope.MoodMap._height;
      var _moodPoints = $scope.MoodMap._moodPoints;
      var _temp_moodPoints = [];
      var mood_map_x_scroll = 0;

      MoodMap.setup = function()
      {
        MoodMap.size( _w, _h );
        MoodMap.frameRate( 35 );
        MoodMap.background(0,0);

        MoodMap.textFont(MoodMap.createFont("Raleway",30));

        //create empy array same length as _moodPoints
        for(var i=0; i<_moodPoints.length; i++)
        {
          _temp_moodPoints[i] = MoodMap.height;
        }
        
        console.log("moodpoints: "+_moodPoints);
        console.log("MoodMap.height: "+MoodMap.height);
      }

      MoodMap.draw = function()
      {
        MoodMap.background(0,0);
        MoodMap.spacing_h = MoodMap.width/_moodPoints.length;
        MoodMap.spacing_v = (MoodMap.height*.75)/7;
        MoodMap.padding = MoodMap.spacing_h/2;
        MoodMap.moodHigh = new PVector(0, MoodMap.height);
        MoodMap.prevPoints;


         for(var i=0; i<_moodPoints.length; i++)
         {
           //draw points
           MoodMap.noStroke();
           MoodMap.fill(MoodMap.white);
           MoodMap.x = MoodMap.padding+(MoodMap.spacing_h*i);

           var point_final_y_pos = MoodMap.height-(MoodMap.spacing_v*_moodPoints[i]) + 75;
           MoodMap.y = _temp_moodPoints[i] += ((point_final_y_pos-_temp_moodPoints[i])/(8));//animate points with some ease

           MoodMap.ellipse(MoodMap.x, MoodMap.y, 5, 5);

          //draw line
          if(i>0)
          {
            MoodMap.stroke(MoodMap.white);
            MoodMap.strokeWeight(2);
            MoodMap.line(MoodMap.prevPoints.x, MoodMap.prevPoints.y, MoodMap.x, MoodMap.y);
          }

          //check for high point 0 high, 100 low!
          if(MoodMap.y < MoodMap.moodHigh.y)
          {
            MoodMap.moodHigh.x = MoodMap.x;
            MoodMap.moodHigh.y = MoodMap.y;
          }

          //store current points for line points in next loop iteration
           MoodMap.prevPoints = new PVector(MoodMap.x, MoodMap.y);
         }

         //draw high point
         MoodMap.strokeWeight(0);
         MoodMap.stroke(MoodMap.white, 50);
         MoodMap.noFill();
         //MoodMap.ellipse(MoodMap.moodHigh.x, MoodMap.moodHigh.y, 18, 18);


         var num_of_points = $scope.MoodMap._moodPoints.length;
         var orig_y_of_last_point = Math.round(MoodMap.height-(MoodMap.spacing_v*_moodPoints[num_of_points-1]));
         var temp_y_of_last_point = Math.round(_temp_moodPoints[num_of_points-1]);

         //SCROLL DIV
         var x_scroll = mood_map_x_scroll += (MoodMap.width-mood_map_x_scroll)/(num_of_points);
         //$( ".mood-map" ).scrollLeft( x_scroll );


         if( orig_y_of_last_point == temp_y_of_last_point || num_of_points == 0)
         {
           MoodMap.noLoop(); //stop ani
           //ANIMATE EMOJI BARS
           var speed = 1000;
           var one_unit = 10; //as percentage of div width
           $( ".bar1" ).delay( 0 ).animate({ width: one_unit*$scope.MoodMap.bar1_width+"%", overflow: "auto !important"}, speed);
           $( ".bar2" ).delay( 500 ).animate({ width: one_unit*$scope.MoodMap.bar2_width+"%", overflow: "auto !important"}, speed);
           $( ".bar3" ).delay( 1000 ).animate({ width: one_unit*$scope.MoodMap.bar3_width+"%", overflow: "auto !important"}, speed);
           $( ".bar4" ).delay( 1500 ).animate({ width: one_unit*$scope.MoodMap.bar4_width+"%", overflow: "auto !important"}, speed);
           $( ".bar5" ).delay( 2000 ).animate({ width: one_unit*$scope.MoodMap.bar5_width+"%", overflow: "auto !important"}, speed, function(){

                var unix = Math.round(+new Date()/1000);

                //console.log($scope.sessionUser.last_login);

                //alert("callback called");

                //alert(unix - $scope.sessionUser.last_login);


                //if(SessionService.get('moodCheck') == "true"/* && (unix - $scope.sessionUser.last_login) >= 86400*/) {
                //
                //    //alert(parseInt($scope.sessionUser.last_login));
                //
                //
                //
                //
                //        // get the previous day and month
                //
                //        var date = new Date(parseInt($scope.sessionUser.last_login) * 1000),
                //        datevalues = [
                //           date.getFullYear(),
                //           date.getMonth()+1,
                //           date.getDate(),
                //           date.getHours(),
                //           date.getMinutes(),
                //           date.getSeconds(),
                //        ];
                //        //alert(datevalues[3]); //=> [2011, 3, 25, 23, 0, 0]
                //
                //
                //       //alert(date);
                //
                //
                //
                //
                //      //if (SessionService.get('preSurveyCompleted') == 1){
                //      //
                //      //      if (parseInt($scope.sessionUser.last_login) > 0){
                //      //
                //      //
                //      //          if (parseInt(month) > parseInt(datevalues[1])){
                //      //          dropdownService.newDropdown("emotion", 10000, "");
                //      //          }else{
                //      //
                //      //              if (parseInt(day) > parseInt(datevalues[2])){
                //      //                   dropdownService.newDropdown("emotion", 10000, "");
                //      //              }
                //      //
                //      //          }
                //      //
                //      //      }else{
                //      //
                //      //              dropdownService.newDropdown("emotion", 10000, "");
                //      //
                //      //      }
                //      //
                //      //
                //      //
                //      //
                //      //
                //      //      //dropdownService.newDropdown("emotion", 4000000, "");
                //      //}
                //
                //
                //
                //
                //}


            });

           $( ".emoji-usage1" ).html( $scope.MoodMap.bar1_width );
           $( ".emoji-usage2" ).html( $scope.MoodMap.bar2_width );
           $( ".emoji-usage3" ).html( $scope.MoodMap.bar3_width );
           $( ".emoji-usage4" ).html( $scope.MoodMap.bar4_width );
           $( ".emoji-usage5" ).html( $scope.MoodMap.bar5_width );
           
         }
      }

      
    };

    $scope.getRandomMood = function(min, max) {
      return Math.round(min+(Math.random()*max));
    };
    $scope.InitMoodMap = function()
    {
        $scope.MoodMap.bar1_width = 0;
        $scope.MoodMap.bar2_width = 0;
        $scope.MoodMap.bar3_width = 0;
        $scope.MoodMap.bar4_width = 0;
        $scope.MoodMap.bar5_width = 0;
        $scope.MoodMap._moodPoints = new Array();

        //var wellbeingData = angular.fromJson(SessionService.get('moodmap'));
        //$log.log(wellbeingData);

        var arrayLength=wellbeingData.length;
        for(var i=0; i < arrayLength; i++) {
            $scope.MoodMap._moodPoints.push((parseInt(wellbeingData[i].mood,0)+1)*2);

            if(parseInt(wellbeingData[i].mood,0)===1) {
                $scope.MoodMap.bar1_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===2) {
                $scope.MoodMap.bar2_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===3) {
                $scope.MoodMap.bar3_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===4) {
                $scope.MoodMap.bar4_width += 1;
            } else if(parseInt(wellbeingData[i].mood,0)===5) {
                $scope.MoodMap.bar5_width += 1;
            }
        }

		//remove this while $(".mood-data") has no width in pixel value
		//$scope.MoodMap._width = (($(".mood-data").width()*.9)/7)*$scope.MoodMap._moodPoints.length;
		//and use this instead
      	$scope.MoodMap._width = (500/7)*$scope.MoodMap._moodPoints.length;
      	
      	
      	$scope.MoodMap._height = $(".mood-data").height();
    };

    //$scope.initMoodDropdown = function() {
    //    if(SessionService.get('moodCheck') == "true"/* && (unix - $scope.sessionUser.last_login) >= 86400*/) {
    //        var date = new Date(parseInt($scope.sessionUser.last_login) * 1000),
    //            datevalues = [
    //                date.getFullYear(),
    //                date.getMonth()+1,
    //                date.getDate(),
    //                date.getHours(),
    //                date.getMinutes(),
    //                date.getSeconds(),
    //            ];
    //
    //        if (SessionService.get('preSurveyCompleted') == 1){
    //            if (parseInt($scope.sessionUser.last_login) > 0){
    //
    //                if (parseInt(month) > parseInt(datevalues[1])){
    //                    dropdownService.newDropdown("emotion", 10000, "");
    //                }else{
    //                    if (parseInt(day) > parseInt(datevalues[2])){
    //                        dropdownService.newDropdown("emotion", 1000000, "");
    //                    }
    //                }
    //
    //            }else{
    //                dropdownService.newDropdown("emotion", 10000, "");
    //
    //            }
    //
    //            $scope.$on('$routeChangeStart', function(next, current) {
    //                $("#emoicon").remove();
    //
    //                //SessionService.set('moodCheck',false);
    //
    //                dropdownService.dismissDropdown(1);
    //            });
    //        }
    //    }
    //}
    
    $scope.startMoodMapAni = function() {


      $scope.InitMoodMap();
      
      var canvasMoodMap = document.getElementById("mood-map");
      var moodMapInstance = new Processing(canvasMoodMap, $scope.MoodMap);

        //$scope.initMoodDropdown();
    };
    
    /*
     This will update the mood
     */
    $rootScope.mood = $scope.updateMood=function(currentMood) {
        $log.log(currentMood);
        APICallService.updateMood($scope.currentGroup,currentMood).then(function(data){
            $log.log(data);
            //SessionService.unset('moodCheck');
            //$scope.moodCheck=0;
            $("#emoicon").remove();

            $(".mood-map").empty().append("<canvas class='canvas-mood-map' id='mood-map'></canvas>");

            //$scope.InitMoodMap();

            var canvasMoodMap = document.getElementById("mood-map");
            var moodMapInstance = new Processing(canvasMoodMap, $scope.MoodMap);

            location.reload();

        });

        SessionService.set('moodCheck',false);

        dropdownService.dismissDropdown(1);

    };


    if ($routeParams.moodcode){
        $scope.updateMood($routeParams.moodcode);
    }
    
    
    
    
    
    ///////////////////
    /* Photo Gallery */
    ///////////////////
    
    $scope.photoMontage = function () {
            /*var temp = "<div class='brick' style='width:{width}px;'><img src='images/photo/{index}.jpg' width='100%'></div>";
            var temp2 = "<div class='brick' style='width:{width}px;'><img src='{index}' width='100%'></div>";
            if ($scope.photos.length < 5) {
                /*var w = 1, h = 1, html = '', limitItem = 10;
                for (var i = 0; i < limitItem; ++i)
                {
                    w = 1 + 3 * Math.random() << 0;
                    html += temp.replace(/\{width\}/g, w * 150).replace("{index}", i + 1);
                }
                $("#freewall").append(html);
                
                // show this html tag when there is no images to show
                //$('.photo-container').html("<div id='empty-text-align'>Empty !</div>");


            } else {
                $scope.photos.forEach(function(photo){
                    w = 1 + 3 * Math.random() << 0;
                    html += temp2.replace(/\{width\}/g, w * 150).replace("{index}", photo);
                });
                $("#freewall").append(html);
            }
    
            var wall = new freewall("#freewall");
            wall.reset(
                    {
                        selector: '.brick',
                        animate: true,
                        cellW: 150,
                        cellH: 'auto',
                        gutterX: 15,
                        onResize: function ()
                        {
                            wall.fitWidth();
                        }
                    });
    
            var images = wall.container.find('.brick');
            images.find('img').load(function ()
            {
                wall.fitWidth();
            });

            */

            $('.photo-container').html($scope.disabledFeatureMsg);

    
        };
        
        
        
        ///////////////////
        /* Word Cloud    */
        ///////////////////
        
        $scope.displayWordCloud = function () 
        {
        /*
            $('#tagcloud').css({'height': $('.user-data-btm').height() + 'px', 'width': '100%'});
            var w = $('.user-data-btm').width();
            var h = $('.user-data-btm').height();
            var settings = {
                //height of sphere container
                height: h,
                //width of sphere container
                width: w * .8,
                //radius of sphere
                radius: w / 5,
                //rotation speed
                speed: 2,
                //sphere rotations slower
                slower: 0.9,
                //delay between update position
                timer: 2,
                //dependence of a font size on axis Z
                fontMultiplier: 30,
                //tag css stylies on mouse over
                hoverStyle: {
                    border: '',
                    color: ''
                },
                //tag css stylies on mouse out
                mouseOutStyle: {
                    border: '',
                    color: ''
                }
            };
            $('#tagcloud').tagoSphere(settings);

            //console.log(settings);
            */
        };
    
    
        
    
    
});

app.controller('DiceCtrl', function ($scope, $rootScope, $window, $location, $timeout, AuthenticationService, SessionService, FlashService, $http, dropdownService) {
    $scope.currentSelectedGroupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    $scope.headTitle = 'play';
    $scope.headMessage = $scope.currentSelectedGroupDetails.name;
    $scope.user = angular.fromJson(SessionService.get('user'));
    $scope.groupid = SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask = SessionService.get('pendingTask');
    //Redirect the user back to journal page

    //if (SessionService.get('progressPercentage') == 100){
    //    $location.path('/missionCompleted');
    //    dropdownService.newDropdown("notification", 2500, "Fantastic - goal completed!");
    //}else{
    //
    //    if (SessionService.get('numOfDaysPassed') == SessionService.get('taskCompleted')){
    //        //alert("rolling");
    //        //dropdownService.newDropdown("notification", 3000, "Please select a team");
    //    //}else{
    //
    //
    //        if (SessionService.get('pendingTaskDetails')){
    //                dropdownService.newDropdown("notification", 2500, "Please complete pending mission");
    //        }else{
    //                //$location.path('/main');
    //                dropdownService.newDropdown("notification", 2500, "Missions up to date. Roll again tomorrow!");
    //        }
    //
    //
    //    }
    //
    //}


    $scope.setHeader("Roll");
    $scope.setActiveMenu("play");

    if ($scope.groupid) {
        if ($scope.pendingTask) {
            $location.path('/mission');
        }
    } else {
        $location.path('/main');
    }
    //Variables for the dice page
    userid = $scope.user.id;
    groupid = $scope.groupid;
    
    ////console.log("User ID :"+userid);



    
    /**
     * This function will get the task
     * @returns {undefined}
     */
    $scope.getTask = function () {

    };
    
    
    
    $scope.areAllTasksDone = function(){
	      		
	      		
	      		
	      		$http.post('/api/global/areAllTasksDone', {'groupid': $scope.groupid}).
			    success(function(data, status, headers, config) {
			     
			 		////console.log(data);
			 	  	// return something yo.
			 	  	
			 	  	if (data == "false"){
			 	  		
			 	  		$(".top-layer-dice").css("display", "none");
			 	  		
			 	  		
			 	  	}else{
			 	  		
			 	  		//$rootScope.warningRed("All missions have been completed");
                        //dropdownService.newDropdown("warning", 5000, "All missions have been completed");
                        $location.path('/missionCompleted');

			 	  		
			 	  	}
			 		
			 	
			 	});     
			       
	      	
	};
	
	$scope.areAllTasksDone();

    $scope.$on('$viewContentLoaded', function () {
        ////console.log('dice page content loaded');
        $rootScope.contentWrapperLoader();
        init();         //This function is defined in dice.js
        initDiceNum();  //This function is defined in dice.js
        render();       //This function is defined in dice.js
        $timeout(FlashService.clear,5000);
        $rootScope.removeContentWrapperLoader();
    
    });
});


/**
 * This is the mission controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MissionCtrl', function ($scope,$location,$http,SessionService,APICallService, $rootScope) {
    $scope.todayMission = '';
    $scope.didyouknow = '';
    $scope.reference = '';
    $scope.taskid = '';
    $scope.taskno = '';
    $scope.user=angular.fromJson(SessionService.get('user'));
    $scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask=SessionService.get('pendingTask');
    $scope.headTitle='Mission';
    $scope.headMessage='Add a new post';

    $scope.setHeader("Mission");
    $scope.setActiveMenu("play");

    $rootScope.contentWrapperLoader();

    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    
    if (!todayMission && !SessionService.get('pendingTask')) 
    {
        $location.path('/play');
    } else if(SessionService.get('pendingTask')) {
        var task = angular.fromJson(SessionService.get('pendingTaskDetails'));
        console.log("PENDING TASK");
        console.log(task);
        $scope.missionTitle = task.title;
        $scope.todayMission = task.mission;
        $scope.didyouknow = task.didyouknow;
        $scope.reference = task.reference;
        $scope.taskid = task.taskid;
        $scope.taskno = task.taskno;
        console.log($scope.reference);
    } else
    {
        $scope.missionTitle = missionTitle;
        $scope.todayMission = todayMission;
        $scope.didyouknow = didyouknow;
        $scope.reference = reference;
        $scope.taskid = taskid;
        $scope.taskno = score;
        console.log($scope.reference);
    }
    $scope.displayDidyouknow = false;
    $scope.displayReference = false;


    $scope.toggleSection = function(secName) {
        if (secName == "#didyouknowBtn") {
            if ($scope.displayDidyouknow) {
                $scope.scrollToSection(secName);
            }

        } else {
            if ($scope.displayReference) {
                $scope.scrollToSection(secName);
            }
        }
    }

    $scope.scrollToSection = function(secName) {
        var target = $(secName);
        //console.log(target);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            console.log(target);
            $('.scrollable-wrapper').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }

    $rootScope.removeContentWrapperLoader();
    $( '.content-wrapper' ).fadeTo( "slow", 1 );
    // this is the accept mission event, when accept button clicked
    $scope.acceptMission = function () 
    {
        APICallService.acceptMission($scope.user.id,$scope.groupid,taskid).then(function(response){
           SessionService.set('pendingTask',$scope.taskid);
           $scope.pendingTaskDetails={
               title: $scope.missionTitle,
               mission: $scope.todayMission,
               didyouknow: $scope.didyouknow,
               reference: $scope.reference,
               taskno: $scope.taskno,
               taskid: $scope.taskid
           };
           SessionService.set('pendingTaskDetails',angular.toJson($scope.pendingTaskDetails));
           $location.path('/wall');
        },function(response){
            
        });

        /////////////////
        var tempTaskCompleted = parseInt(SessionService.get('taskCompleted')) + 1;
        SessionService.set('taskCompleted', tempTaskCompleted);

        

        
    };

});







/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){
    $scope.setHeader("messages");
    $scope.setActiveMenu("message");

    $scope.headTitle='messages';
    $scope.headMessage='All Messages';

    //$scope.userLogin = SessionService.get('user');
        
    //$scope.userLogin = angular.fromJson($scope.userLogin);
    
    $rootScope.contentWrapperLoader();

    
    $scope.messageListInt = function (){
    	var timer = $interval(function(){
	            
	            $scope.messageList();
	            
	        
	      },5000);
    };
    
    $scope.messageListInt();

    $rootScope.removeContentWrapperLoader();
    $( '.content-wrapper' ).fadeTo( "slow", 1 );
    
    $scope.messageList = function (){
            //$scope.messages = [];

            if (currentRoute == "/messages"){
    	
    	    	$http.post('/api/service/groupmessage/getConversationList').
    		    success(function(data, status, headers, config) {
    		      // this callback will be called asynchronously
    		      // when the response is available

    		      //console.log(data);

                  if (!$scope.messages) {
                      setTimeout(function() {
                          var mesListHeight = $(".collection.messages-list").height();
                          $("#messages-list-wrap").css("height", mesListHeight + "px");
                      }, 1);
                  } else if ($scope.messages && $scope.messages.length != data.length) {
                      var mesListHeight = $(".collection.messages-list").height();
                      $("#messages-list-wrap").css("height", mesListHeight + "px");
                  }

                    $scope.messages = angular.fromJson(data);
                        
                    angular.forEach($scope.messages, function(val,key) {
                        var arrName = JSON.parse(val.members);

                        $scope.messages[key].members = arrName;
                    })

                  if ($scope.messages.length == 0 && $location.path() == "/messages"){
                                $('.messages').html('<div class="empty-content-message">You currently have no messages.<br> To send a message use the NEW MESSAGE buton below.</div>');
                                //console.log($location.path());
                   }
    		      
    		    }).
    		    error(function(data, status, headers, config) {
    		      // called asynchronously if an error occurs
    		      // or server returns response with an error status.
    		    });

            }
    };
    
    $scope.messageList();
    
    $scope.messageView = function(id, un){
    	
    	//SessionService.set("messageid", id);
    	//
    	//SessionService.set("messageusername", un);

        var recipient = [{
            id: id,
            full_name: un
        }]

        SessionService.set("selectedUsers", JSON.stringify(recipient));
    	
    	location.href= "#/message/" + id;
    	
    	
    };

    $scope.humanReadable = function(time) {
        var time = moment(time).fromNow();
        var timePos = time.indexOf("in a minute");

        if (timePos > -1){
            time = "a few seconds ago";
        }

        return time;
    };


    $scope.openMessage = function(id){
        location.href = "#/message/view/"+id;
    };




    $scope.createNewConversation = function(){
        location.href = "#/nmSelectUser";

        //$http.post('/api/service/groupmessage/createNewConversation').
        //success(function(data, status, headers, config) {
        //
        //    conversationID = JSON.parse(data);
        //
        //    location.href = "#/nmSelectUser";
        //
        //});

    };
  
    
});




app.controller('MessageLocationCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){

    // get the message ID from the URL

    var string = location.href.split('/');

    // set the messageid to the session storage

    SessionService.set('messageid', string[5]);

    // redirect user to message view page

    location.href = "#/messageView";


});




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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MessageViewCtrl',function($scope,$location, $http, SessionService, $rootScope, $routeParams){
	$scope.setHeader("Message");
	$scope.setActiveMenu("message");

	$scope.headTitle='View Message';
    $scope.headMessage=SessionService.get("messageusername");
	$scope.selectedUsers = {};

	$scope.$watch(function() {
		return SessionService.get("selectedUsers");
	}, function(newVal, oldVal) {
		$scope.selectedUsers = {};
		$scope.selectedUsers = JSON.parse(newVal);
	});

    var active = 0;

    $rootScope.contentWrapperLoader();

    var notificationFlag = false;

    conversationID = $routeParams.id;

	$('.setting-btn').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: false, // Does not change width of dropdown to that of the activator
			hover: true, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: false, // Displays dropdown below the button
			alignment: 'left' // Displays dropdown with edge aligned to the left of button
		}
	);

    /*$scope.$watch('notificationStatus', function (val){
	    
	    		$http.post('/api/service/groupmessage/updateNotificationStatus', {conversationID : conversationID, status : val}).
			    success(function(data, status, headers, config) {
			      
			     


			      $scope.notificationStatus = data;


			    });


	});
	*/


	$scope.notificationSTT = function(){
			var statusVar = "false";

			if ($scope.notificationStatus == false){
				statusVar = "true";
				$scope.notificationStatus == true;
			} else {
				$scope.notificationStatus == false;
			}

			$http.post('/api/service/groupmessage/updateNotificationStatus', {conversationID : conversationID, st : statusVar}).
			success(function(data, status, headers, config) {

				//$scope.notificationStatus =

			});
	}

    
    
    $scope.retrieveConversation = function(){

    	

    	if (currentRoute == "/message/view/:id"){


    	
		    	$http.post('/api/service/groupmessage/retriveGroupMessage', {conversationID : conversationID}).
			    success(function(data, status, headers, config) {
			      //console.log(data);
			      $scope.messages = data['mlist'];
			      SessionService.set("selectedUsers", data['user_list']);

					var selectedUsers = JSON.parse(data['user_list']);

					angular.forEach($scope.groupUsers, function(userVal,userKey) {
						userVal.checked = false;

						angular.forEach(selectedUsers, function(selectedVal, selectedKey) {
							//console.log("USER ID: " + userVal[0].id + ", SELECTED ID: " + selectedVal.id);

							if (userVal[0].id == selectedVal.id) {
								userVal.checked = true;
							}
						})
					})

			      $scope.notificationStatus = data['status'];


			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			    });

	    }



    };

    $scope.retrieveConversation();

    setInterval(function() {
	    $scope.retrieveConversation();
	}, 5000);

    $rootScope.removeContentWrapperLoader();


    //$scope.openUsersList = function() {
	//	$(".popup-inactive").toggleClass("popup-inactive popup-active");
	//}

	$scope.showDropdown = function() {
		$("#settings-dropdown").toggleClass("hide ");
		$("#invisible-cover").toggleClass("hide ");
	}

	$scope.hideDropdown = function() {
		$("#invisible-cover").addClass("hide");
		$("#settings-dropdown").addClass("hide");
	}

    $scope.sendMessage = function(){




		// get selected user list 

		var selectedUsers = SessionService.get("selectedUsers");

    	var tempMessage = $scope.commentnewtext;

    	$scope.commentnewtext = "";


    	if (tempMessage){
    			$http.post('/api/service/groupmessage/sendGroupMessage', {id : $routeParams['id'], message : tempMessage , userList : selectedUsers, conversationID : conversationID}).
			    success(function(data, status, headers, config) {
			      
			      $scope.retrieveConversation();
			      
			      $scope.commentnewtext = "";

				  $(".private-messages").animate({ scrollTop: 0 }, 'slow');

				  $scope.retrieveConversation();

			     			      
			    });
    	}

    	
		       
    };
    
    


    $scope.humanReadable = function(time) {
                        return moment(time).fromNow();
    };
    
    
    
});

/**
 * Created by John @ Enmasse On 20 Appril 2015
 */
app.controller('GroupMessageCtrl',function($scope,$location,SessionService,APICallService,$log, $rootScope, $http, $timeout){

    $scope.setActiveMenu("message");

    var active_member_stack = [];
    
    $scope.headTitle = 'Group Message';
    $scope.headMessage = 'Group Message';

    $scope.groupid=SessionService.get('currentSelectedGroup');

    $scope.user=SessionService.get('user');
    $scope.user = angular.fromJson($scope.user);


    setInterval(function() {
              $scope.messageList();
              $(".group-message-content-chat-container-chatscreen").scrollTop($(".group-message-content-chat-container-chatscreen")[0].scrollHeight);
    }, 3000);


    $scope.init = function (){

            console.log($scope.user);

            var memberObj = new Object();
                memberObj.uid = $scope.user.id;
                memberObj.name = $scope.user.firstname+' '+$scope.user.lastname;


            active_member_stack.push(memberObj);

            $scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));

            // send request to the server to create the room and send initial data

            if (!SessionService.get("conversationid")){

              $http.post('/api/groupMessage/initRoomData', {gid : $scope.groupid}).
              success(function(data, status, headers, config) {

                      SessionService.set("conversationid", data.roomid);
                      SessionService.set("conversationtitle", data.title);

                      

                      

              });

            }



            

            $scope.title = SessionService.get("conversationtitle");



    };

    $scope.init();


    
    $scope.memberList = function (){
    	
	    	$http.post('/api/groupMessage/memberList', {gid : $scope.groupid}).
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		      
		      
		      
		      $scope.members = angular.fromJson(data);

              var initMember = "";

              jQuery.each($scope.members, function(index, value) {
                   
                   if (this[0].id == $scope.user.id){
                        initMember = this[0].id;
                   }
               
               });

              if (initMember != ""){
                    
                    //alert(initMember);
                    /*$timeout(function() {
                        $("#group-list-item-number-"+initMember).css('background-color', '#1B4C63');
                    }, 500);
                    */
              }




              
		      
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
    };

    $scope.memberList();

    



    $scope.addMemberToList = function(uid, name){


    		
    		// search for the existing user id

    		var searchFlag = false;

        console.log(active_member_stack);
            console.log("++++++");
    		
    		jQuery.each(active_member_stack, function(index, value) {
               console.log(this.name);
               if (this.name == name){
                    searchFlag = true;
               }
               
           });
            

            if (searchFlag == false){
            

                var memberObj = new Object();
                memberObj.uid = uid;
                memberObj.name = name;
        		

        		$("#group-list-item-number-"+uid).css('background-color', '#1B4C63');

        		active_member_stack.push(memberObj);

        		//console.log(active_member_stack);

        		$scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));

                //console.log(active_member_stack.length);




                $('.num-of-members').html(active_member_stack.length);
            }

            // add member to the database


            $http.post('/api/groupMessage/newMember', {roomid :  SessionService.get("conversationid"), newmemberid : memberObj.uid, newmemberfname : memberObj.name , userList : active_member_stack}).
            success(function(data, status, headers, config) {
              
              
                  
                  // retrive the message list

                  $scope.messageList();
                      

                  // end retrive message list

              
  
            });

            // end






    };


    $scope.removeMember = function(uid, name){


                if (active_member_stack.length <= 1){

                    alert("Error !");

                }else{

                    var active_member_stack_temp = [];


                    $("#group-list-item-number-"+uid).css('background-color', '');
                    $("#group-list-member-"+uid).remove();

                    jQuery.each(active_member_stack, function(index, value) {
                       
                       if (this.uid != uid){
                            active_member_stack_temp.push(this);
                       }
                       
                     });

                     active_member_stack  =  active_member_stack_temp;

                     $scope.avtivemembers = angular.fromJson(JSON.stringify(active_member_stack));


                     $('.num-of-members').html(active_member_stack.length);
                 }



                 // add new remove member notification to the database


                 // add member to the database


                $http.post('/api/groupMessage/removeMember', {roomid :  SessionService.get("conversationid"), newmemberid : uid, newmemberfname : name , userList : active_member_stack}).
                success(function(data, status, headers, config) {
                  
                  
                      
                      // retrive the message list

                      $scope.messageList();
                          

                      // end retrive message list

                  
      
                });

                // end

    };


    $scope.sendMessage = function(){

        var tempMessage = $scope.commentnewtext;


        if (tempMessage){
            $http.post('/api/groupMessage/send', {id : SessionService.get("conversationid"), message : tempMessage, userList : active_member_stack}).
            success(function(data, status, headers, config) {
              
              
                  $scope.commentnewtext = "";


                  // retrive the message list

                  $scope.messageList();
                      

                  // end retrive message list

              
  
            });
        }

    };




    $scope.messageList = function(){

        $http.post('/api/groupMessage/messageList', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      $scope.messages = data;

                      $scope.getTheCurrentUserLIst();

        });

    };




    $scope.messageList();

    $scope.humanReadable = function(time) {
                        return moment(time).fromNow();
    };


    $scope.getTheCurrentUserLIst = function(){

        $http.post('/api/groupMessage/getTheCurrentUserLIst', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      

                      
                            $scope.avtivemembers = angular.fromJson(data.userlist);

                            console.log("+++++"+$scope.avtivemembers);

                            /////////////////////

                            var initMember = "";

                            jQuery.each($scope.avtivemembers, function(index, value) {
                                 
                                 //console.log(value['uid']);
                                 $("#group-list-item-number-"+value['uid']).css('background-color', '#1B4C63');
                             
                             });

                            active_member_stack = $scope.avtivemembers;

                            $('.num-of-members').html(active_member_stack.length);
                            //console.log("++++++++++++++");

                            


                            ////////////////////
                      


        });

    };


    $scope.leaveChat = function (){
        
        // send request to the server 
        $http.post('/api/groupMessage/leaveChat', {id : SessionService.get("conversationid")}).
                      success(function(data, status, headers, config) {

                      $scope.avtivemembers = angular.fromJson(data);
                      // retrieving data from the server 

                      active_member_stack = $scope.avtivemembers;

                      location.href="/#/groupMessageList";
                      

        });
    };

    



    
    
});

app.controller('WallCtrl',function($scope,$http,SessionService,APICallService,FlashService,$route, $location, $rootScope, $routeParams, dropdownService, $sce){
    $scope.headTitle='Wall Posts';
    //$scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.posts='';
    $scope.user=SessionService.get('user');
    //$scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.displayLoading=1;
    $scope.loadingData=false;
    $scope.feedbackPopdown=0;
    $scope.pendingTask=SessionService.get('pendingTask');
    var currentActiveDropdown = 0;

    $scope.currentUser=angular.fromJson($scope.user);

    $scope.setHeader("Wall");
    $scope.setActiveMenu("wall");

    if (SessionService.get('progressPercentage') == 100){
                $('.button-gre').html('GOAL COMPLETED!');
                
    }

    $scope.testYoutube = function(link) {
        var youtubeExpression = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/ig;

        return youtubeExpression.test(link);
    }


    $scope.displayPosts=function() {
       //console.log('Display posts called',{groupid: $scope.groupid});

       $rootScope.contentWrapperLoader();
       
       //console.log("Location hash : "+$location.hash());

       //alert($routeParams.postid);
       
       if ($routeParams.postid){
       		//console.log("hash is available !");


       		
       		var result=$http({
	           method: 'POST',
	           url: '/api/group/postByID',
	           data: {postid: $routeParams.postid, groupid: $scope.currentGroup}
	       });
	       
	       result.success(function(data) {
	           //console.log(data);
               $("#team-posts .loading-spinner").hide();
	           $scope.posts=data;
	           $scope.displayLoading=0;
            
	       });
       		
       } else {
       		var result=$http({
	           method: 'POST',
	           url: '/api/group/posts',
	           data: {groupid: $scope.currentGroup}
	       });
	       
	       result.success(function(data) {
	           console.log(data);

               $("#team-posts .loading-spinner").hide();

               if (data.length > 0){

                    $scope.posts= data;

                   for (var i in data) {
                       if (data[i].status && $scope.testYoutube(data[i].status)) {
                           if (data[i].status.indexOf('v=') >= 0) {
                               var vidID = data[i].status.split("v=")[1];
                           } else {
                               var vidID = data[i].status.split(".be/")[1];
                           }

                           $scope.posts[i].status = "<iframe width='560' height='315' class='youtube-player' type='text/html' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";

                       }
                   }

                   var count = $http({
                       method: 'POST',
                       url: '/api/group/countPosts',
                       data: {groupid: $scope.currentGroup}
                   });

                   count.success(function(total) {
                       $scope.totalPosts = total;
                   })
                    
               }else{
                    $('.team-posts').html('<div class="empty-content-message">You currently have no wall posts.<br> To create a new post use the NEW POST buton below.</div>');

               }
               $scope.displayLoading=0;
	       });


       }
       
       
       $rootScope.removeContentWrapperLoader();
        $( '.content-wrapper' ).fadeTo( "slow", 1 );
       
    };
    $scope.likePost=function(post) {
        //console.log('Like post: '+post.id);
        var data={
            postid: post.id,
            type: 'like'
        };

        

        //alert(currentLike);

        if(post.like) {
            data.type='unlike';
            var currentLike = post.likeCount--;
        }else{
            var currentLike = post.likeCount++;
        }
        var response=$http.post('/api/user/post/like',data);
        //console.log(response);
        post.like= !post.like;
    };
    $scope.humanReadable = function(time) {
        //return moment(time).fromNow();
        var time = moment(time).fromNow();
        var timePos = time.indexOf("in a minute");

        if (timePos > -1){
            time = "a few seconds ago";
        }

        return time;

    };

    $scope.showDropdown = function(id) {
        currentActiveDropdown = id;

        $("#dropdown-" + id).toggleClass("hide ");
        $("#invisible-cover").toggleClass("hide ");
    }

    $scope.hideDropdown = function() {
        $("#invisible-cover").addClass("hide");
        $("#dropdown-" + currentActiveDropdown).addClass("hide");
    }

    $scope.zoomImage = function(orImg) {
        $(".popup-inactive").toggleClass("popup-inactive popup-active");
        $("#image-spinner").show();

        var imgWrap = $("#full-image");
        imgWrap.html(orImg);
        var wrapWidth = imgWrap.width();
        var wrapHeight = imgWrap.height();

        setTimeout(function() {
            var img = imgWrap.children();
            var imgWidth = img.width();
            var imgHeight = img.height();

            //console.log(wrapWidth + ',' + wrapHeight + ',' + imgWidth + ',' + imgHeight);

            if (imgWidth < wrapWidth && imgHeight < wrapHeight) {
                imgWrap.addClass("image-normal");
                img.addClass("size-auto");
            } else if (imgWidth >= wrapWidth && imgHeight >= wrapHeight) {
                if (imgWidth >= imgHeight) {
                    img.css("width", "100%");
                } else {
                    img.css("height", "100%");
                }

            } else {
                if (imgWidth <= wrapWidth) {
                    img.addClass("width-auto");
                } else {
                    img.addClass("width-full");
                }

                if (imgHeight <= wrapHeight) {
                    img.addClass("height-auto");
                } else {
                    img.addClass("height-full");
                }
            }

            $("#image-spinner").hide();
            $("#full-image img").show();

            // else {
            //    imgWrap.addClass("image-cropped");
            //    img.addClass("zoomed");
            //}

        }, 1000);
    }

    $scope.$on('$viewContentLoaded', function () {
        setTimeout(function() {
            $scope.displayPosts();
        }, 1000);

        if(SessionService.get('recentMissionCompleted')) {
            $scope.feedbackPopdown=1;
            SessionService.unset('recentMissionCompleted');
        }
    });

    // report post
    $scope.report = function(post_id, user_id, group_id) {





        dropdownService.newDropdown("reportPostConfirmation", 12000, "Tap here to report the post! ");
        postReportIDs['post_id'] = post_id;
        postReportIDs['user_id'] = user_id;
        postReportIDs['group_id'] = group_id;

        console.log(postReportIDs);


         // send http request to the server
          
         

         //alert('a');
    };

    //focus cursor on comment textbox
    $scope.focusComment = function(id) {
        $('#post-' + id + ' .comment-new input').focus();
    }

    // report comment ng-click
    $scope.reportComment = function(post_id, comment_id, user_id, group_id) {

        dropdownService.newDropdown("reportCommentConfirmation", 12000, "Tap here to report the comment!  ");
        commentReportIDs['post_id'] = post_id;
        commentReportIDs['comment_id'] = comment_id;
        commentReportIDs['user_id'] = user_id;
        commentReportIDs['group_id'] = group_id;

        console.log(commentReportIDs);

         
    };


    $scope.loadMoreData=function() {
        
        if(!$routeParams.postid){

              $scope.displayLoading=true;

              var data={
                  groupid: $scope.currentGroup,
                  limitfrom: $scope.posts.length
              };
              if($scope.loadingData===false) {
                  $scope.loadingData=true;
                  $http.post('/api/group/posts',data).then(function(result){
                      angular.forEach(result.data,function(post,key) {

                          if (post.status && $scope.testYoutube(post.status)) {
                              if (post.status.indexOf('v=') >= 0) {
                                  var vidID = post.status.split("v=")[1];
                              } else {
                                  var vidID = post.status.split(".be/")[1];
                              }

                              post.status = "<iframe width='560' height='315' class='youtube-player' type='text/html' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";
                          }


                          $scope.posts.push(post);
                      });
                      $scope.loadingData=false;
                      $scope.displayLoading=false;
                  });
              }

        }
    };
    $scope.addComment = function(event,post) {
        event.preventDefault();

        console.log(post.activecomment);

        //console.log('You are trying to add comment');
        if (post.activecomment != ""){





              var currentUser=angular.fromJson($scope.user);
              var comment = {
                  comment: post.activecomment,
                  user: currentUser,
                  time: moment().fromNow(),
                  user_id: currentUser.id,
                  post_id: post.id
              }
              post.comments.push(comment);
              post.activecomment='';
              APICallService.addComment(comment);


        }
        post.activecomment='';
    };
    $scope.closePopup = function() {
        //console.log('Close');
        $scope.feedbackPopdown=0;
        SessionService.unset('recentMissionCompleted');
        $route.reload();
    };


    $scope.editPost = function(id){

        
        SessionService.set('postedit.id', id);

        location.href= "#/editpost";

    };

    $scope.toggleText = function (id){
        $("#post-mission-" + id).toggleClass("open closed").toggleClass("orange ");
        $("#post-mission-" + id).find('.mission-content').slideToggle();
        $("#post-mission-" + id).find('.mission-title .icon').toggleClass('plus minus');
    };


    $scope.deletePost = function(postid){

        var txt;
        var r = confirm("Are you sure you want to delete !");
        if (r == true) {
            $http.post('/api/post/delete', {postid: postid}).then(function(result){

                      $http({url: 'api/global/taskCompleted', method: 'POST'})
                      .then(function(result){

                                console.log('taskCompleted called !');

                                //alert(result.data);
                                SessionService.set('taskCompleted', result.data);

                       });


                       $( "#post-"+ postid).fadeOut( "slow", function() {
                          // Animation complete.
                        });
            });
        } 


        /*$http.post('/api/post/delete', {postid: postid}).then(function(result){
                   $( "#post-"+ postid).fadeOut( "slow", function() {
                      // Animation complete.
                    });
        });*/
              
    };





});
app.factory('postFactory',function($http){
    return {
        getPosts: $http({
            method: 'POST'
        })
    };
});

//app.directive('cropImage', function() {
//    return {
//        link: function(scope, element, attr) {
//            var imgWrap = element;
//            var wrapWidth = imgWrap.width();
//            var wrapHeight = imgWrap.height();
//
//            setTimeout(function() {
//                var img = imgWrap.children();
//                var imgWidth = img.width();
//                var imgHeight = img.height();
//
//                //console.log(wrapWidth + ',' + wrapHeight + ',' + imgWidth + ',' + imgHeight);
//
//                if (imgWidth < wrapWidth && imgHeight < wrapHeight) {
//                    imgWrap.addClass("image-normal");
//                    img.addClass("size-auto");
//                }
//
//                if (imgWidth > wrapWidth && imgHeight > wrapHeight) {
//                    img.addClass("size-full");
//                }
//
//                if (imgWidth <= wrapWidth) {
//                    img.addClass("width-auto");
//                } else {
//                    img.addClass("width-full");
//                }
//
//                if (imgHeight <= wrapHeight) {
//                    img.addClass("height-auto");
//                } else {
//                    img.addClass("height-full");
//                }
//
//                // else {
//                //    imgWrap.addClass("image-cropped");
//                //    img.addClass("zoomed");
//                //}
//
//            }, 200);
//        }
//    }
//})

/*
 * This is the posts controller which will control all the post activity
 */
app.controller('PostsCtrl', function ($scope,
                                        $rootScope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService, 
                                        dropdownService,
                                        SessionService) {

    $scope.headTitle='posts';
    $scope.headMessage='Add a new post';
    $scope.hideFileUpload=true;
    $scope.user=angular.fromJson(SessionService.get('user'));
    $scope.showPostAs=false;
    $scope.groupid=SessionService.get('currentSelectedGroup');
    $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
    $scope.pendingTask=SessionService.get('pendingTask');
    $scope.imageSrc='';
    $scope.finalTask = "";
    $scope.posting=false;

    $(document).ready(function() {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid && (usingUniWebView == 'true')) {
            $(".post-new .status_text").focusin(function() {
                $(this).css("height","50%");
            }).focusout(function() {
                $(this).css("height","80%");
            })
        }
    })


    //alert('a');

    $scope.moods = [{
        name: "<img src='/images/icon/emoji/fantastic.png' /> <span class='mood-title'>Fantastic</span>",
        code: 5
    }, {
        name: "<img src='/images/icon/emoji/pretty-good.png' /> <span class='mood-title'>Pretty Good</span>",
        code: 4
    }, {
        name: "<img src='/images/icon/emoji/okey.png' /> <span class='mood-title'>Okay</span>",
        code: 3
    }, {
        name: "<img src='/images/icon/emoji/not-great.png' />  <span class='mood-title'>Not Great</span>",
        code: 2
    }, {
        name: "<img src='/images/icon/emoji/terrible.png' /> <span class='mood-title'>Terrible</span>",
        code: 1
    }];

    //alert("a");
    $('#postForm select').material_select();
    
    // last mission detect
    $rootScope.contentWrapperLoader();
    
    $http.post('/api/mission/detectLastMission', {'taskid': $scope.pendingTask,'groupid': $scope.groupid}).
        success(function(data, status, headers, config) {

            $scope.finalTask = data;

        }).
        error(function(data, status, headers, config) {

            // an error ocurred

        });
			    
		$rootScope.removeContentWrapperLoader();	    

    //Set the current task in session service
    $scope.post = {
        status_text: '',
        status_file: '',
        type: $scope.pendingTask ? 'mission' : 'general',
        //general: $scope.pendingTask ? false : true,
        //private: false,
        //mission_completed: $scope.pendingTask ? true : false,
        display_mission: $scope.pendingTask ? true : false,
        all_teams: false,
        mood: ''
    };
    $scope.modalBox = function () {
        $('#post-image-form').click();
        //console.log('modalBox clicked');
    };

    $scope.toggleDisplayMission = function() {
        if ($scope.post.type == 'mission') {
            $scope.post.display_mission = true;
        } else {
            $scope.post.display_mission = false;
        }
    }

    $scope.showPostAsMenu = function () {
        //$scope.postAs=true;
    };
    $scope.param={};
    $scope.file='';
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            $scope.file=args.file;
            $scope.post.status_file=args.file;
            var fileReader=new FileReader();
            fileReader.onload = function(e) {
                $scope.imageSrc=e.target.result;
                $scope.$apply();
            };
            fileReader.readAsDataURL(args.file);
        });
    });
    
    // add new post
    
    $scope.addPost=function(form) {
          //console.log('posts.js: addPost');
        console.log($scope.post);

          // ajax loader starts
        $rootScope.ajaxLoader();
        $scope.post.userid=$scope.user.id;
        $scope.post.groupid=$scope.groupid;
        $scope.post.taskid= $scope.pendingTask ? $scope.pendingTask : 0;
        var postText = $scope.post.status_text.replace(/(\r\n|\n|\r)/gm,"");


        $log.log($scope.post);
          //form.$setPristine();  //TODO: This is to clean the form (will be implemented later)

        var vimeoEx = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;

        if (!$scope.post.status_text){

            dropdownService.newDropdown("warning", 5000, "Please write a message");
            // remove ajax loader out of body
            $rootScope.removeAjaxLoader();

        } else if ($scope.post.status_text && postText.search(vimeoEx) >= 0) {
            dropdownService.newDropdown("warning", 5000, "This post does not support Vimeo");

            $rootScope.removeAjaxLoader();
        } else {

            $scope.posting=true;

            if ($scope.post.mood) {
              $scope.post.mood = $scope.post.mood.code;
          }

          APICallService.addPost($scope.post).then(function(result){
              $scope.posting=false;

              //alert(result.data.exif.Orientation);

                if($scope.post.type == 'mission') {
                  //console.log('Mission completed');
                  SessionService.unset('pendingTask');
                  SessionService.unset('pendingTaskDetails');
                  SessionService.set('recentMissionCompleted',1);
                  SessionService.set('lastCompletedMission',$scope.post.taskid);

                  $http({url: '/api/group/list', method: 'POST'})
                  .then(function(result){

                            // update numberofDaysPasswd session storage
                            SessionService.set('numOfDaysPassed', result.data[0].daysPassed);

                   });


                }
                  ///////////////////////////



                  if ($scope.finalTask == $scope.post.taskid && $scope.post.mission_completed){



                      location.href= "#/wall";

                      setTimeout(function(){ location.href= "#/postsurveyintro"; }, 3000);

                  }else{

                      $location.path('/wall');

                  }

                  //$location.path('/wall');  //TODO: redirect

                  // remove ajax loader out of body
                  $rootScope.removeAjaxLoader();



              },function(result){
                  console.log('An upload error occured writng post');
                    console.log(result)
                    appViews.progressError('An upload error has occurred.<br/>Tap to continue.')
              });


    }
      //$location.path('/wall');  //TODO: redirect
    };

    //$scope.switchPrivate=function() {
    //    if($scope.post.private) {
    //        $scope.post.private=false;
    //        //$scope.post.all_teams=true;
    //    } else {
    //        $scope.post.private=true;
    //        $scope.post.all_teams=false;
    //    }
    //};
    //$scope.switchGeneral=function() {
    //    if($scope.post.general) {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    } else {
    //        $scope.post.general=true;
    //        $scope.post.mission_completed=false;
    //        $scope.post.display_mission=false;
    //    }
    //};
    //$scope.switchComplete=function() {
    //    if($scope.post.mission_completed) {
    //        $scope.post.mission_completed=false;
    //        $scope.post.general=true;
    //        $scope.post.display_mission=false;
    //
    //    } else {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //        $scope.post.display_mission=true;
    //    }
    //};


    $scope.report = function() {
         alert('sss');
    };



    $scope.switchAllteams=function() {
        if($scope.post.all_teams) {
            $scope.post.all_teams=false
        } else {
            $scope.post.all_teams=true;
            $scope.post.private=false;
        }
    };


    $scope.file_changed = function(element, $scope) {
        var photofile  = document.querySelector('input[type=file]').files[0];
        var photoType  =  photofile.type;
        var imgContent =  "";

        if (photoType.indexOf('image') >= 0) {
            var reader  = new FileReader();

            if (photofile) {
                reader.readAsDataURL(photofile);
            }

            reader.onloadend = function () {
                $('.uploaded-image-source').attr('src', reader.result);
                $('.uploaded-image-source').css('display', "block");

                $('.uploaded-images').css('display', "block");

                //$scope.avatar = preview;
                imgContent = reader.result;



            }
        } else {

            // error dropdown notification
            
            dropdownService.newDropdown("warning", 5000, "Please make sure file is picture!");
            

            // remove HTML DOM element from the DOM list

            //$('.status_file').remove();

            // create a new blank input HTML DOM element

            //$('.button-upload').append('<input type="file"  onchange="angular.element(this).scope().file_changed(this)" class="fileUpload status_file" data-file="post.status_file" upload-file ng-hide="hideFileUpload=0" />');

        }

        
    };


    $scope.removePreviewImage = function (){

        $('.uploaded-image-source').attr('src', "");
        $('.uploaded-image-source').css('display', "none");
        $('.uploaded-images').css('display', "none");
        var input = $(".status_file");

        input.replaceWith(input.val('').clone(true));

        $scope.post.status_file = "";

    };




    




});


// edit post controller 
// get the post id, fetch the post information and allow user to submit the edited information to the server


app.controller('PostEditCtrl', function ($scope,
                                        $rootScope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService, 
                                        dropdownService, Upload,
                                        SessionService) {



          $rootScope.contentWrapperLoader();

          $scope.headTitle='posts';
          $scope.headMessage='Edit a post';
          $scope.hideFileUpload=true;
          $scope.user=angular.fromJson(SessionService.get('user'));
          $scope.showPostAs=false;
          $scope.groupid=SessionService.get('currentSelectedGroup');
          $scope.pendingTaskDetails=angular.fromJson(SessionService.get('pendingTaskDetails'));
          $scope.pendingTask=SessionService.get('pendingTask');
          $scope.imageSrc='';
          $scope.finalTask = "";
          var imgContent = "";

    $('#editForm select').material_select();


    $http.post('/api/post/fetchPostByID', {'postid': SessionService.get('postedit.id')}).
          success(function(data, status, headers, config) {
            
              $scope.post = data;
              

              //console.log($scope.post);

              console.log(data);

              if (data.mission_completed == true) {
                  $scope.post.type = 'mission';
              }

              if (data.general == true) {
                  $scope.post.type = 'general'
              }

              if (data.private == true) {
                  $scope.post.type = 'note'
              }

              // put the existing image on the image div if exist

              if (data.image != ''){
                  $('.uploaded-image-source').attr('src', data.image);
                  $('.uploaded-image-source').css('display', "block");

                  $('.uploaded-images').css('display', "block");
              }

              

              // end

              $rootScope.removeContentWrapperLoader();    


              
            
          }).
          error(function(data, status, headers, config) {
            
              // an error ocurred
              alert("An error ocurred !, please try again !");
            
          });


          $scope.file_changed = function(element, $scope) {
            var photofile = document.querySelector('input[type=file]').files[0];
            var photoType =  photofile.type;

            if (photoType.indexOf('image') >= 0) {
                var reader  = new FileReader();

                if (photofile) {
                    reader.readAsDataURL(photofile);
                }

                reader.onloadend = function () {
                    $('.uploaded-image-source').attr('src', reader.result);
                    $('.uploaded-image-source').css('display', "block");

                    $('.uploaded-images').css('display', "block");

                    //$scope.avatar = preview;
                    imgContent = reader.result;
                }
            } else {

                // error dropdown notification
                
                dropdownService.newDropdown("warning", 5000, "Please make sure file is picture!");
                

                // remove HTML DOM element from the DOM list

                $('.status_file').remove();

                // create a new blank input HTML DOM element

                $('.fileUpload').append('<input type="file"  onchange="angular.element(this).scope().file_changed(this)" class="status_file" data-file="post.status_file" upload-file ng-hide="hideFileUpload=0" />');

            }
        };


    $scope.removePreviewImage = function (){

        $('.uploaded-image-source').attr('src', "");
        $('.uploaded-image-source').css('display', "none");
        $('.uploaded-images').css('display', "none");
        var input = $(".status_file");

        input.replaceWith(input.val('').clone(true));

        $scope.post.status_file = '';
        $scope.post.imgContent = '';

    };


              
    //$scope.switchPrivate=function() {
    //    if($scope.post.private) {
    //        $scope.post.private=false;
    //        //$scope.post.all_teams=true;
    //    } else {
    //        $scope.post.private=true;
    //        $scope.post.all_teams=false;
    //    }
    //};
    //$scope.switchGeneral=function() {
    //    if($scope.post.general) {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    } else {
    //        $scope.post.general=true;
    //        $scope.post.mission_completed=false;
    //    }
    //};
    //$scope.switchComplete=function() {
    //    if($scope.post.mission_completed) {
    //        $scope.post.mission_completed=false;
    //        $scope.post.general=true;
    //    } else {
    //        $scope.post.mission_completed=true;
    //        $scope.post.general=false;
    //    }
    //};


    $scope.report = function() {
         alert('sss');
    };



    $scope.switchAllteams=function() {
        if($scope.post.all_teams) {
            $scope.post.all_teams=false
        } else {
            $scope.post.all_teams=true;
            $scope.post.private=false;
        }
    };


    $scope.editPost=function(form) {

      // ajax loader starts
        console.log("ADD LOADER")
      $rootScope.ajaxLoader();

        var postText = $scope.post.status.replace(/(\r\n|\n|\r)/gm,"");
        var vimeoEx = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;


        if (!$scope.post.status){

          dropdownService.newDropdown("warning", 5000, "Please write a message");
          // remove ajax loader out of body
           $rootScope.removeAjaxLoader();


        } else if ($scope.post.status && postText.search(vimeoEx) >= 0) {
            dropdownService.newDropdown("warning", 5000, "This post does not support Vimeo");

            $rootScope.removeAjaxLoader();
        } else {


            // post the form data to the server

            $scope.post.id = SessionService.get('postedit.id');
            //$scope.post.imgContent = imgContent;

            /*
            $http.post('/api/post/submitEditedContent', $scope.post).
            success(function(data, status, headers, config) {
                
            // this is the core function 
                if (data == "OK"){
                    location.href= "#/wall";
                    $rootScope.removeAjaxLoader();
                }
                
            
            });

            */

            var photofile = document.querySelector('input[type=file]').files[0];

            console.log(photofile);


            Upload.http({
                                  method: 'POST',
                                  url: '/api/post/submitEditedContent',
                                  headers: {'Content-Type': undefined},
                                  transformRequest: function (data) {
                                      var formData = new FormData();
                                      formData.append("post", angular.toJson(data.postData));
                                      formData.append("file", data.file);
                                      return formData;
                                  },
                                  data: { postData: $scope.post, file: photofile }
                                })
                                .success(function(data) {
                                    if (data == "OK"){
                                        location.href= "#/wall";
                                        $rootScope.removeAjaxLoader();
                                    }
                                })
                                .progress(function(evt) {
                                  appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                                  //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
                                })
                                .error(function(data, status, headers, config) {

                                    console.log('An error occured writng post');
                                    console.log(data)
                                    appViews.progressError('An error has occurred.<br/>Tap to continue.')

                                });

                                $rootScope.removeContentWrapperLoader();
                                $( '.content-wrapper' ).fadeTo( "slow", 1 );                 


      }
      //$location.path('/wall');  //TODO: redirect
    };





});


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

app.controller('HowtoCtrl', function ($scope, $location, $rootScope) {
    $scope.headTitle = "OAR 21";
    $scope.headMessage = "How to play";
    $rootScope.contentWrapperLoader();

    $scope.setHeader("How To Play");
    $scope.setActiveMenu("none");

    $('.collapsible').collapsible({
        accordion : true
    });

    $scope.HowTo = function (_vid_target, _info_target) {
        var vid = _vid_target;
        var info = _info_target;
        var num_steps = 7;
        var animation_called = false;

        var init = function () {
            vid.addEventListener("timeupdate", function () {
                checkVidPosition();
            }, true);

        }
        init();

        var checkVidPosition = function () {
            var step_width = 100;


            if (vid.currentTime < 10) {
                animateStepsPos(0);
                //console.log("step 1")
            }
            else if (vid.currentTime < 20) {
                animateStepsPos(step_width);
                //console.log("step 2")
            }
            else if (vid.currentTime < 30) {
                animateStepsPos(step_width * 2);
                //console.log("step 3")
            }
            else if (vid.currentTime < 40) {
                animateStepsPos(step_width * 3);
                //console.log("step 4")
            }
            else if (vid.currentTime < 50) {
                animateStepsPos(step_width * 4);
                //console.log("step 5")
            }
            else if (vid.currentTime < 60) {
                animateStepsPos(step_width * 5);
                //console.log("step 6")
            }
            else if (vid.currentTime < 70) {
                animateStepsPos(step_width * 6);
                //console.log("step 7")
            }
        }

        var animateStepsPos = function (_pos) {
            if (!animation_called) {
                animation_called = true;
                info.animate(
                    {
                        marginLeft: "-" + _pos + "%"
                    }, 700, function () {
                        animation_called = false;
                    });
                //info.css("marginLeft", "-"+_pos+"%");
            }
        }
    };
    $scope.$on('$viewContentLoaded',function(){
        var howTo=new $scope.HowTo($(".how-to-play-video")[0], $(".how-to-info"));
    });


    $rootScope.removeContentWrapperLoader();
    $( '.content-wrapper' ).fadeTo( "slow", 1 );
//
// //var howTo = new HowTo($(".how-to-play-video")[0], $(".how-to-info"));
});

// @ John Le
// Notification User Admin Controller


app.controller('NotificationAdminCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        SessionService, $rootScope, $timeout) {
                                        	
				// BEGIN THE MAIN FUNCTION
					$scope.headTitle='Account';
    				$scope.headMessage='Notification settings';

					$scope.setHeader("Notification Settings");
					$scope.setActiveMenu("none");

    				$rootScope.contentWrapperLoader();
    				
    				// RETRIVE CONFIGS INFO FROM SERVER 

    				
    				$http.post('/api/notification/getNotification').
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data.notification);

					      // set checkbox value for chrome push notification
					      
					      if (data.push_notification == "0"){
					      	
					      	$scope.pushnotificationcb = false;
					      	SessionService.set('pushnotificationcb', false);


					      }else{
					      	$scope.pushnotificationcb = true;
					      	SessionService.set('pushnotificationcb', true);
					      }
					      
					      // set checkbox value for normal notification
					      
					      if (data.notification == "0"){
					      	
					      	$scope.notificationcb = false;
					      	SessionService.set('liveAppNotificationSession', false);


					      }else{
					      	$scope.notificationcb = true;
					      	SessionService.set('liveAppNotificationSession', true);
					      }
					      
					      // set checkbox value for email notification
					      
					      
					      if (data.notification_email == "0"){
					      	
					      	$scope.emailnotificationcb = false;
					      }else{
					      	$scope.emailnotificationcb = true;
					      }
					      
					      
					      // set checkbox value for web notification
					      
					      
					      if (data.notification_web == "0"){
					      	
					      	$scope.webnotificationcb = false;
					      }else{
					      	$scope.webnotificationcb = true;
					      }
					      
					      
					});
    				
    				// END RETRIVE CONFIGS INFO FROM SERVER 
					$rootScope.removeContentWrapperLoader();
    				$( '.content-wrapper' ).fadeTo( "slow", 1 );
					

					//alert('sss');

					$scope.notificationcbFunction = function(){


						//alert("a");
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.notificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						////console.log($scope.notificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'normal', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					        if(SessionService.get('liveAppNotificationSession') == "true"){
					        		SessionService.set('liveAppNotificationSession', false);
					        }else{
					        		SessionService.set('liveAppNotificationSession', true);
					        }
					      	
					      
					      
					      //console.log(SessionService.get('liveAppNotificationSession'));
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};
					
					
					
					
					$scope.emailnotificationcbFnction = function(){
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.emailnotificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						//console.log($scope.emailnotificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'email', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};



					$scope.pushnotificationcbFnction = function(){



						var notificationcbStatus = 1;
						
						
						
						if ($scope.pushnotificationcb == true){
							notificationcbStatus = 0;

							

						}else{
							notificationcbStatus = 1;
							//registerForPush();
							//pushUsersDeviceToDB();
						}



						$http.post('/api/notification/setNotification', {'type': 'push', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    });

					    // 


					    /*$timeout(function() {

					    	$http.post('/api/service/updateDeviceStatus', {'status': notificationcbStatus, 'playerID': SessionService.get('playerid')}).
						    success(function(data, status, headers, config) {
						      // this callback will be called asynchronously
						      // when the response is available
						      
						      //SessionService.unset('playerid');
						      
						      //console.log(data);
						      
						    });
					        
					    }, 5000);

						*/
					    






					};
					
					
					
					$scope.webnotificationcbFunction = function(){
						
						
						var notificationcbStatus = 1;
						
						
						
						if ($scope.webnotificationcb == true){
							notificationcbStatus = 0;
						}else{
							notificationcbStatus = 1;
						}
						
						
						//console.log($scope.webnotificationcb);
						
						$http.post('/api/notification/setNotification', {'type': 'web', 'data': notificationcbStatus}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      
					      
					      //console.log(data);
					      
					    }).
					    error(function(data, status, headers, config) {
					      // called asynchronously if an error occurs
					      // or server returns response with an error status.
					    });
					    
						
					};


				// END
				});
				








// @ John Le
// Notification User Admin Controller


app.controller('AccountSettingsCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        $rootScope, AuthenticationService,
                                        SessionService,dropdownService,Upload) {
                                        	
				// BEGIN THE MAIN FUNCTION

					$scope.headTitle='Account';
    				$scope.headMessage='Account settings';
                    $rootScope.contentWrapperLoader();

                    $scope.setHeader("User Settings");
                    $scope.setActiveMenu("none");

                    var userAccount = JSON.parse(SessionService.get("user"));

                    var min = 10000;
                    var max = 30000;

                    $scope.randomIMG = Math.floor(Math.random() * (max - min + 1)) + min;
    				
    				// RETRIVE CONFIGS INFO FROM SERVER 
    				//alert(userAccount);

                    //console.log(userAccount.picture);

                    $scope.userAvatar = userAccount.picture;

                    //$scope.profile.username = userAccount.username;


                    //$scope.profile.firstname = userAccount.firstname;
                    //$scope.profile.lastname = userAccount.lastname;

                    //$scope.profile.email = userAccount.email;

                    //$scope.profile.screenname = userAccount.screenhandle;

                    //$scope.items = ['ACT','JBT','NSW','NT','QLD','SA','TAS','VIC','WA'];
    				
                    //$scope.profile.state = userAccount.state;

                    $("#resetAvatar").css("display", "none");

                    var imgContent = "";
                    var imgType = "";


                    $scope.profile = {
                        username: userAccount.username,
                        firstname: userAccount.firstname,
                        lastname: userAccount.lastname,
                        email: userAccount.email,
                        screenname: userAccount.screenhandle,
                        state: userAccount.state
                        
                    };
                    
                      



                    $scope.populateImageContent = function(obj){

                        //console.log(obj);

                    };



                    $scope.resetAvatar = function(){

                        $("#avatar").attr("src",userAccount['picture']+"?"+$scope.randomIMG);

                        $("#profile img").attr("src",userAccount['picture']+"?"+$scope.randomIMG);
                        ////console.log(userAccount['picture']+"?"+$scope.randomIMG);
                        $("#resetAvatar").css("display", "none");

                        var input = $("#fileInp");

                        input.replaceWith(input.val('').clone(true));

                        imgContent = "";
                        imgType = "";

                    };


                    


                    $scope.file_changed = function(element, $scope) {

                             
                             var photofile = document.querySelector('input[type=file]').files[0];

                             imgType = photofile.type;


                             var reader  = new FileReader();

                             if (photofile) {
                                reader.readAsDataURL(photofile);
                              }

                            reader.onloadend = function () {
                                
                                var preview = $("#avatar").attr("src",reader.result);

                                $("#profile img").attr("src",reader.result);
                                //$scope.avatar = preview;
                                imgContent = reader.result;
                               
                            }

                            $("#resetAvatar").css("display", "block");


                            
                             
                    };

                    var transform = function(data){
                        return $.param(data);
                    }

                    $scope.updateUser = function (post){
                        var passwordCheck = true;
                        var message = '';
                        $scope.errorMessage = '';

                        if (!$scope.profile.firstname) {
                            $scope.errorMessage = "Please enter first name!";
                        } else if (!$scope.profile.lastname) {
                            $scope.errorMessage = "Please enter last name!";
                        } else if (!$scope.profile.email) {
                            $scope.errorMessage = "Please enter email!";
                        } else if ($scope.profile.password && !$scope.profile.confirmpassword) {
                            $scope.errorMessage = "Please confirm new password!";
                        } else if ($.trim($scope.profile.password) != $.trim($scope.profile.confirmpassword)) {
                            $scope.errorMessage = "Passwords did not match!";
                        } else {
                            $rootScope.ajaxLoader();

                            var file = $scope.fileInput;


                            //fd.append('file', file);

                            ////console.log($scope.profile);

                            $scope.profile = {
                                //file: imgContent,
                                fileType: imgType,
                                //username: $scope.profile.username,
                                firstname: $scope.profile.firstname,
                                lastname: $scope.profile.lastname,
                                email: $scope.profile.email,
                                //screenname: $scope.profile.screenname,
                                //state: $scope.profile.state,
                                password: $scope.profile.password

                            };

                            // get file element
                            var photofile = document.querySelector('input[type=file]').files[0];


                            Upload.http({
                                method: 'POST',
                                url: 'api/user/update',
                                headers: {'Content-Type': undefined},
                                transformRequest: function (data) {
                                    var formData = new FormData();
                                    formData.append("post", angular.toJson(data.postData));
                                    formData.append("file", data.file);
                                    return formData;
                                },
                                data: { postData: $scope.profile, file: photofile }
                            })
                                .success(function(data) {

                                    if (data == "OK") {
                                        dropdownService.newDropdown("notification", 2000, "Account settings updated");
                                        dropdownService.newDropdown("notification", 5000, "Please log in");
                                        $("#resetAvatar").css("display", "none");
                                        var input = $("#fileInp");
                                        input.replaceWith(input.val('').clone(true));
                                    } else {
                                        //$rootScope.notificationGreen(data);
                                        dropdownService.newDropdown("notification", 5000, data);
                                    }
                                    // remove ajax loader out of body
                                    $rootScope.removeAjaxLoader();

                                    AuthenticationService.logout();
                                    $location.path("/login");
                                })
                                .progress(function(evt) {
                                    appViews.updateProgress(parseInt(100.0 * evt.loaded / evt.total));
                                    //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
                                })
                        }

                        //if ($scope.profile.password) {
                        //    if (!$scope.profile.confirmpassword) {
                        //        passwordCheck = false;
                        //        $scope.errorMessage = "Please confirm new password!";
                        //    } else {
                        //        if ($.trim($scope.profile.password) != $.trim($scope.profile.confirmpassword)) {
                        //            passwordCheck = false;
                        //            $scope.errorMessage = "Passwords did not match!";
                        //        }
                        //    }
                        //}


                        //if (passwordCheck) {


                            //console.log(post);

                            // ajax loader starts

                        //} else {
                        //    dropdownService.newDropdown("warning", 5000, message);
                        //}


                    }

                    $rootScope.removeContentWrapperLoader();
                    $( '.content-wrapper' ).fadeTo( "slow", 1 );



				// END
				});
				












app.controller('NotificationCtrl', function ($scope,
                                        $location,
                                        $http,
                                        $log,
                                        APICallService,
                                        SessionService, $rootScope, dropdownService) {
                                        	
                                        	
                    //$rootScope.globalNotification("this is a ext call");
                    $scope.headTitle='notification center';
    				$scope.headMessage='Notification Center';
					$scope.setHeader("Notifications");
					$scope.setActiveMenu("notification");
    				$rootScope.contentWrapperLoader();              	
					
					$http.post('/api/notification/getNotificationList').
				    success(function(data, status, headers, config) {
				      // this callback will be called asynchronously
				      // when the response is available
				      
				      $scope.notifications = angular.fromJson(data);
				      
				      ////console.log("type :"+$scope.notifications.type);
				      //console.log($scope.notifications.length);

				      if ($scope.notifications.length == 0){
				      		$('.notifications').append('<div class="empty-content-message">You currently have no notifications</div>');
				      }
				      
				    }).
				    error(function(data, status, headers, config) {
				      // called asynchronously if an error occurs
				      // or server returns response with an error status.
				    });

				    $rootScope.removeContentWrapperLoader();
    				$( '.content-wrapper' ).fadeTo( "slow", 1 );
				    
				    
				    
				    $scope.filterNewRoller = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterNewRoller');
				    	$("#filter-icon-new-roller").attr("src","images/filter-new-roller-active.png");
				    	
				    	
				    };
				    
				    $scope.filterLike = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterLike');
				    	$("#filter-icon-like").attr("src","images/icon/like-active.png");
				    	
				    };
				    
				    $scope.filterComment = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterComment');
				    	$("#filter-icon-comment").attr("src","images/icon/comment-active.png");
				    };

				    $scope.humanReadable = function(time) {
				        return moment(time).fromNow();
				    };
				    
				    
				    $scope.filterMsg = function(obj){
				    	$scope.unsetIcons();
				    	//alert('filterMsg');
				    	$("#filter-icon-message").attr("src","images/icon/nav/message-active.png");
				    };
				    
				    
				    $scope.unsetIcons = function(){

				    	$("#filter-icon-like").attr("src","images/icon/like-inactive.png");
				    	$("#filter-icon-comment").attr("src","images/icon/comment-inactive.png");
				    	$("#filter-icon-message").attr("src","images/icon/nav/message-inactive.png");
				    };

				    $scope.redirectToTarget = function(type, source_id, source_user_id){

						//console.log("sourceid"+source_id);
						//console.log("source_user_id"+source_user_id);
						//console.log("type"+type);


						if (type == "newgroupmessage"){

							location.href= "#/message/view/" + source_id;

						}

						if (type == "message"){
							//SessionService.set("messageid", source_user_id);

							//SessionService.set("messageusername", un);

							location.href= "#/message/" + source_user_id;

							//alert("a");

						}

						if (type == "newlike"){
								//SessionService.set("messageid", source_id);

								//SessionService.set("messageusername", un);

								location.href= "#/wall/"+source_id;

								//alert("a");

						}

						if (type == "newcomment" || type == "newcommentother"){
								//SessionService.set("messageid", source_id);

								//SessionService.set("messageusername", un);

								location.href= "#/wall/"+source_id;

								//alert("a");

						}

				    };



				});



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


app.controller('LegalCtrl',function($scope,$location,SessionService,APICallService,$log){
   
   
   
   
});


app.controller('HowtoOutsideCtrl',function($scope,$location,SessionService,APICallService,$log){
   
   
   
   
});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('MissionCompletedCtrl',function($scope,$location, $http, SessionService,$interval, $rootScope){
    $scope.headTitle='Play';
    $scope.headMessage='All missions accepted';
    
    //$scope.userLogin = SessionService.get('user');
      
      
    //$scope.userLogin = angular.fromJson($scope.userLogin);
    
    
    
    
});

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




app.controller('postNewController',function($scope,$window,$location,AuthenticationService, SessionService,ajaxService){
	
	alert('al');
    
});










app.controller('PostAsCtrl',function($scope,$window,$location,AuthenticationService, SessionService,ajaxService,$rootScope){
	
	//alert('ON');
	//alert($rootScope.recs);
	
	$scope.asPostText = $rootScope.posttext;
	$("#image-post-container").attr('src',postAsImg);
	//alert(postAsImg);
    //alert($scope.asPostText);
});







/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('PreSurveyCtrl',function($scope,$location,SessionService, $http, $rootScope, dropdownService, $timeout){
    $scope.headTitle='pre survey';
    $scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.selectedGroupId=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).id;
    $scope.userid=angular.fromJson(SessionService.get('user')).id;
    $scope.groupDetails = angular.fromJson(SessionService.get('currentSelectedGroupDetails'));
    
    
    
    
    var optionNum = 0;
    var optionCurrent = 0;
    var optionFlag = false;
    var selectedOption = [];


    

    $rootScope.contentWrapperLoader();
    
    // pull the company logo from the database to display on the screen

    console.log($scope.groupDetails.thumbnail);
    
    $scope.logo = decode_base64($scope.groupDetails.thumbnail);
    
    
    
    function decode_base64 (s)
    {
        var e = {}, i, k, v = [], r = '', w = String.fromCharCode;
        var n = [[65, 91], [97, 123], [48, 58], [43, 44], [47, 48]];

        for (var z in n)
        {
            for (i = n[z][0]; i < n[z][1]; i++)
            {
                v.push(w(i));
            }
        }
        for (i = 0; i < 64; i++)
        {
            e[v[i]] = i;
        }

        for (i = 0; i < s.length; i+=72)
        {
            var b = 0, c, x, l = 0, o = s.substring(i, i+72);
            for (x = 0; x < o.length; x++)
            {
                c = e[o.charAt(x)];
                b = (b << 6) + c;
                l += 6;
                while (l >= 8)
                {
                    r += w((b >>> (l -= 8)) % 256);
                }
             }
        }
        return r;
    }

    
	
    
    $http.post('/api/survey/getSurveyList', {'type': 'pre', 'groupid':$scope.selectedGroupId}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available
					      
					      $scope.questions = data;
					      
					      ////console.log(data.length);
					      
					      optionNum = data.length;

                          //alert(optionNum);


                          if (optionNum == 0){
                                $scope.headTitle='TEAM';
                                $scope.template = "/templates/widgets/pre-survey-without-content.html";



                            $http.post('/api/user/survey/completePreSurvey', { groupid: $scope.selectedGroupId, surveyid: 10 }).
                            success(function(data, status, headers, config) {

                                    //alert(data);

                            });



                          }else{
                                $scope.template = "/templates/widgets/pre-survey-with-content.html";
                          }


					      
					    });

	$rootScope.removeContentWrapperLoader();	


    $scope.presurveySwitch = function(){

                          if (optionNum == 0){
                                $location.path('/main');
                          }else{
                                $location.path('/presurvey');
                          }
    };

    
    $scope.saveResponse = function (){


    	// ajax loader starts
        $rootScope.ajaxLoader();
    	
    	if (optionFlag){
			
		    	$.ajax({
		        url: '/api/survey/saveResponse',
		        type: 'post',
		        dataType: 'json',
		        data: $('form#presurveyform').serialize(),
		        success: function(data) {
		                    	
		                    	SessionService.set('preSurveyCompleted', '1');
		                    
		                    	$location.path('/main');

		                    	
		                    	
		                    	
		
		                 }
		    	});

		    	// remove ajax loader out of body
                $rootScope.removeAjaxLoader();

                //$rootScope.notificationGreen("Pre survey completed");
                dropdownService.newDropdown("notification", 5000, "Pre survey completed");

                // remove the top cover

                //$timeout(function() {
                //    $('#footer-disable-buttons').remove();
                //
                //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow-active.svg')");
                //
                //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile-active.svg')");
                //
                //    $('.play-btn').css("background-image", "url('./images/svg/footer-play-active.svg')");
                //
                //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg-active.svg')");
                //
                //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall-active.svg')");
                //
                //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn-active.svg')");
                //
                //}, 3000);


                
    	
    	}else{
    		
    		   // Notification HTML
	      		dropdownService.newDropdown("warning", 3000, "Please answer all questions");

			    // remove ajax loader out of body
                $rootScope.removeAjaxLoader();
    		
    	}
    	
    };
    
    
    $scope.optionSelect = function (id){
    	
    	////console.log(optionNum);
    	
    	var innerFlag = false;
    	
    	for (var i = 0; i < selectedOption.length; i++) {
		    var option = selectedOption[i];
		    
		    ////console.log(option);
		    
		    if (option == id){
		    	
		    	innerFlag = true;
		    	
		    }
		    
		}
    	
    	if (!innerFlag){
    		
    		selectedOption.push(id);
    	}
    	
    	
    	//console.log(selectedOption);
    	////console.log(selectedOption);
    	
    	
    	if (selectedOption.length >= optionNum){
    		
    		
    		
    		//console.log('all options are selected');
    		
    		optionFlag = true;
    		
    	}
    	
    	optionCurrent++;
    	
    };

    ///// disable all the buttons to force user to do the survey


    $scope.$on('$viewContentLoaded', function (FlashService) {


        //$timeout(function() {
        //    $('.footer').append('<div id="footer-disable-buttons"></div>');
        //
        //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow.svg')");
        //
        //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile.svg')");
        //
        //    $('.play-btn').css("background-image", "url('./images/svg/footer-play.svg')");
        //
        //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg.svg')");
        //
        //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall.svg')");
        //
        //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn.svg')");
        //
        //}, 100);

    
        


            
        

    });

    


    // end 


    
    
    
});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('PostSurveyCtrl',function($scope,$location,SessionService, $http, $rootScope, dropdownService, $timeout){
    $scope.headTitle='post survey';
    $scope.headMessage=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).name;
    $scope.selectedGroupId=angular.fromJson(SessionService.get('currentSelectedGroupDetails')).id;
    $scope.userid=angular.fromJson(SessionService.get('user')).id;
    $rootScope.contentWrapperLoader();
    
    var optionNumEx = 0;
    var optionCurrent = 0;
    var optionFlag = false;
    var selectedOptionEx = [];


    $http({
                url: 'api/global/getProgress',
                method: 'POST',
                data: {
                    groupid: $scope.selectedGroupId
                }
            }).then(function(result){
                
                SessionService.set('progressPercentage', result.data);
                
            });





    $http.post('/api/survey/getSurveyList', {'type': 'post', 'groupid':$scope.selectedGroupId}).
					    success(function(data, status, headers, config) {
					      // this callback will be called asynchronously
					      // when the response is available

                          
					      $scope.questions = data;
                          
                          ////console.log(data.length);
                          
                          optionNumEx = data.length;

                          //alert(optionNum);


                          if (optionNumEx == 0){
                                $scope.headTitle='TEAM';
                                $scope.template = "/templates/widgets/post-survey-without-content.html";



                            $http.post('/api/user/survey/completePostSurvey', { groupid: $scope.selectedGroupId, surveyid: 10 }).
                            success(function(data, status, headers, config) {

                                    //alert(data);

                            });



                          }else{
                                $scope.template = "/templates/widgets/post-survey-with-content.html";
                          }


					      
					    });


     $rootScope.removeContentWrapperLoader();   


     $scope.postsurveySwitch = function(){

                           

                          if (optionNumEx == 0){
                                $location.path('/main');
                          }else{
                                $location.path('/postsurvey');
                          }
    };                
    
    $scope.saveResponse = function (){
    	
    	// ajax loader starts
        $rootScope.ajaxLoader();


    	if (optionFlag){
    			
    	
    	$.ajax({
        url: '/api/survey/saveResponse',
        type: 'post',
        dataType: 'json',
        data: $('form#postsurveyform').serialize(),
        success: function(data) {
                    
                        SessionService.set('postSurveyCompleted','1');
                    	$location.path('/main');
                    
                    
                    
                 }
    	});

        // remove ajax loader out of body
        $rootScope.removeAjaxLoader();

         dropdownService.newDropdown("notification", 4000, "Post survey completed");
         dropdownService.newDropdown("notification", 4000, "Fantastic - goal completed!");



         // remove the top cover

                //$timeout(function() {
                //    $('#footer-disable-buttons').remove();
                //
                //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow-active.svg')");
                //
                //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile-active.svg')");
                //
                //    $('.play-btn').css("background-image", "url('./images/svg/footer-play-active.svg')");
                //
                //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg-active.svg')");
                //
                //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall-active.svg')");
                //
                //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn-active.svg')");
                //
                //}, 3000);
    	
    	
    	}else{
    		
    			// Notification HTML
	      		dropdownService.newDropdown("warning", 3000, "Please answer all questions");
                //alert('a');
                $rootScope.removeAjaxLoader();
    		
    	}
    	
    };
    
    
    
    $scope.optionSelect = function (id){
    	
    	////console.logoptionNum);
    	
    	var innerFlag = false;
    	
    	for (var i = 0; i < selectedOptionEx.length; i++) {
		    var option = selectedOptionEx[i];
		    
		    ////console.logoption);
		    
		    if (option == id){
		    	
		    	innerFlag = true;
		    	
		    }
		    
		}
    	
    	if (!innerFlag){
    		
    		selectedOptionEx.push(id);
    	}
    	
    	
    	//console.logselectedOptionEx);
    	////console.logselectedOption);
    	
    	
    	if (selectedOptionEx.length >= optionNumEx){
    		
    		
    		
    		//console.logoptionNumEx);
    		
    		optionFlag = true;
    		
    	}
    	
    	optionCurrent++;
    	
    };



    ///// disable all the buttons to force user to do the survey


    $scope.$on('$viewContentLoaded', function () {


        //$timeout(function() {
        //    $('.footer').append('<div id="footer-disable-buttons"></div>');
        //
        //    $('.prev-btn').css("background-image", "url('./images/svg/footer-back-arrow.svg')");
        //
        //    $('.profile-btn').css("background-image", "url('./images/svg/footer-profile.svg')");
        //
        //    $('.play-btn').css("background-image", "url('./images/svg/footer-play.svg')");
        //
        //    $('.msg-btn').css("background-image", "url('./images/svg/footer-msg.svg')");
        //
        //    $('.team-posts-btn').css("background-image", "url('./images/svg/footer-wall.svg')");
        //
        //    $('.side-nav-btn').css("background-image", "url('./images/svg/side-bar-nav-btn.svg')");
        //
        //}, 200);


        //alert("a");
    
        


            
        

    });

    


    // end 
    
    
});

