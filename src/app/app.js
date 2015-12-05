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
