// Setup DOM elements
var diceNum = '';
var renderer='';
var camera ='';
var scene = '';
var PHONE_TYPE = 3; //3 for iPhone3 (slow performance)
var WIDTH; // = window.innerWidth;
var HEIGHT; // = window.innerHeight * .6;
var dice, plane, diceNum;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var colours = [
        0x8cc641,
        0xf79421,
        0x221d58,
        0x0b70b8,
        0x8cc641,
        0xf79421,
        0x221d58,
        0x0b70b8,
        0x8cc641,
        0xf79421,
        0x221d58,
        0x0b70b8,
        0x8cc641,
        0xf79421,
        0x221d58,
        0x0b70b8,
        0x8cc641,
        0xf79421,
        0x221d58,
        0x0b70b8
    ];
var rolling = false;
var read_mission = false;
var spriteSheetUrl = "images/numbers.png";
var prevRotations;



function initDiceNum()
{
    diceNum = document.createElement('div');
    diceNum.className = "diceNum";
    $(diceNum).css("font-size", String(Math.round(window.innerHeight * .10)) + 'px');
    $(diceNum).css("textAlign", "center");

    $(".dice-container").append($(diceNum));
}

function updateInfoTxt()
{
    $(".info-txt").css("display", "none");
    $(".info-txt h1").replaceWith("<h1>TAP AGAIN <br> TO READ YOUR MISSION!</h1>");

    $(".info-txt").fadeIn(500);
}
function resetInfoTxt()
{
    $(".info-txt").css("display", "none");
    $(".info-txt h1").replaceWith("<h1>TAP DICE TO ROLL</h1>");

    $(".info-txt").fadeIn(500);
}

//init DICE


function init()
{
    var container = document.getElementById("dice-container");
    var _width = $(".dice-container").width();
    var _height = $(".dice-container").height();
    
    camera = new THREE.PerspectiveCamera(70, _width / _height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 450;
    
    scene = new THREE.Scene();
    // Dice

    var geometry = new THREE.IcosahedronGeometry(200, 0);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2));

    for (var i = 0; i < geometry.faces.length; i++)
    {
        geometry.faces[ i ].color.setHex(colours[i]);
    }

    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});

    dice = new THREE.Mesh(geometry, material);
    dice.position.y = 150;
    scene.add(dice);


    //Scene
    renderer = new THREE.CanvasRenderer({alpha: true});
    renderer.setSize(_width, _height);

    renderer.sortObjects = false;
    renderer.autoClear = true;
    renderer.sortElements = false;

    //This fetches the task before the dice has been rolled (to avaiod the delay
    response = generateScore();
    response.done(function(data,statusText,response){
        //console.log(data);
        score=data.taskno;
        missionTitle = data.title.name;
        todayMission = data.title.description;
        didyouknow = data.didyouknow;
        reference = data.reference;
        taskid = data.taskid;
    }).fail(function(data,statusText,response){

    });

    container.appendChild(renderer.domElement);


    container.addEventListener('mousedown', onDiceMouseDown, false);
    container.addEventListener('touchstart', onDiceTouchStart, false);
    
    //reset text if user moves away from dice page and back again
    //if(read_mission) updateInfoTxt();
}

//TODO: move this to dice controller when Ant's back
//mouse events
function onDiceMouseDown(event)
{
    event.preventDefault();

    roll();

    setTimeout(function(){
        window.location.href = "#/mission";
        read_mission = false;
        resetInfoTxt();
    }, 3000);



    //if (read_mission)
    //{
    //    window.location.href = "#/mission";
    //    read_mission = false;
    //    resetInfoTxt();
    //}
    //else
    //    roll();
}

function onDiceTouchStart(event)
{
    //if (event.touches.length === 1)
    //{
    //    event.preventDefault();
    //
    //    if (read_mission)
    //    {
    //        window.location.href= '#/mission';
    //        read_mission = false;
    //        resetInfoTxt();
    //    }
    //    else
    //        roll();
    //}
}

/**
 * TODO: this function should accept the score so that we can move the ajax call
 * out of this script
 * @returns {undefined}
 */
function roll()
{
    stop();

    hideScore();

    var rotations = Math.round(Math.random() * 5);

    if (rotations === prevRotations)
        roll(); //re-roll
    else
    {
        start();
        diceNum.innerHTML = score;
        console.log(score);
        TweenLite.to(dice.rotation, 3,
                {
                    y: (293 + (360 * rotations)) * (Math.PI / 180),
                    x: (360 * rotations) * (Math.PI / 180),
                    delay: 0,
                    ease: Strong.easeOut,
                    onComplete: stop,
                    overwrite: true
                });
        setTimeout(showScore, 1800);
        //update info-txt in html
        //setTimeout(updateInfoTxt, 2500);

        read_mission = true;
    }

    prevRotations = rotations;
}
function generateScore()
{
    var response=$.ajax({
        type: 'POST',
        url: 'api/fetch/currenttask',
        data: JSON.stringify({groupid: groupid, userid: userid}),
        contentType: "application/json",
        dataType: 'json'
    });
    return response;
}

function showScore()
{
    $(diceNum).fadeIn(1000);
}
function hideScore()
{
    $(diceNum).css("display", "none");
}




function animate()
{
    if (rolling)
    {
        requestAnimationFrame(animate);
        render();
    }
}

function render()
{
    renderer.render(scene, camera);
    //console.log("r");
}

function start()
{
    rolling = true;
    animate();
}
function stop()
{
    rolling = false; //stop animation looping to save processor
}






/////////////////
// DICE UTILS
/////////////////
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function (milliSec)
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile === this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;

            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };

    this.displayNum = function (num)
    {
        this.currentTile = num;
        var currentColumn = this.currentTile % this.tilesHorizontal;
        texture.offset.x = currentColumn / this.tilesHorizontal;
    };
}



//Used if user resizes desktop browser window or rotate mobile device using browser to redraw Canvas elements - Dice, progress bar etc by reloading page.
$(window).resize(function() 
{
	var path = location.href.split('/');
	if(path[4] == "play") 
	{
		delay(function(){ location.reload(); }, 500);
	}
});


var delay = (function()
{
  var timer = 0;
  return function(callback, ms)
  {
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

// END DICE SECTION
