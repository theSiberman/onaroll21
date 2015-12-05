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