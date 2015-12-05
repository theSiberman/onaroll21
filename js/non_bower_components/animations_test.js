// ///////////////////////////////////
// //
// // USER PROGRESS
// //
// ///////////////////////////////////
// // var UserProgress = function ( P )
// // {
// // 	var _w = UserProgress._width
// // 	var _h = UserProgress._height
// // 	var _day = UserProgress._day;
// // 	var _date = UserProgress._date;
// // 	var _percent = UserProgress._progress;
// // 	var p_count = 0;
// //
// // 	P.lightBlue = P.color(47, 143, 188);
// // 	P.darkBlue = P.color(24, 82, 110);
// // 	P.cream = P.color(242, 208, 141);
// //
// //
// //
// // 	P.setup = function()
// // 	{
// // 	  P.size( _w, _h);
// // 	  P.frameRate( 600 );
// // 	  P.background(0, 0);
// //
// // 	  P.textFont(P.createFont("Raleway",30));
// // 	  console.log("PROGRESS: "+p_count);
// // 	}
// // 	P.draw = function()
// // 	{
// // 		P.background(0, 0);
// // 		//CIRCLE BG
// // 		P.strokeWeight( _h/20 );
// //
// // 		//shadow
// // 		/*P.stroke("black", 100);
// // 		P.fill("black", 100);
// // 		P.ellipse((_w/2)+(_h*.07), (_h/2)+(_h*.05), _h*.8, _h*.8);
// // 		P.filter(P.BLUR, 4);*/
// // 		//bg
// // 		P.stroke(P.darkBlue);
// // 		P.fill(P.lightBlue);
// // 		P.ellipse(_w/2, _h/2, _h*.75, _h*.75);
// //
// //
// // 		//PROG BAR
// // 		//(360/100)*P.random(10,100)
// // 		P.noFill();
// // 		P.strokeWeight( _h/15 );
// // 		P.stroke(P.cream);
// // 		P.strokeCap(P.SQUARE);
// // 		p_count += (_percent-p_count)/80
// // 		P.arc(_w/2, _h/2, _h*.84, _h*.84, P.radians(270), P.radians(270+((360/100)*p_count)));
// // 		P.smooth();
// // 		//P.noLoop();
// //
// //
// // 		//TEXT
// // 		P.maxFontSize = 20/100;
// // 		//day
// // 		P.textSize(P.maxFontSize*(_h*.4));
// // 		P.day_width = P.textWidth(_day);
// // 		P.fill(P.cream);
// // 		P.text(_day, (_w-P.day_width)*.5, _h*.38);
// // 		//date
// // 		P.textSize(P.maxFontSize*(_h*1.2));
// // 		P.date_width = P.textWidth(_date);
// // 		P.text(_date, (_w-P.date_width)*.5, _h*.58);
// // 		//percent progress
// // 		P.textSize(P.maxFontSize*(_h*.6));
// // 		P.prog_str = p_count.toFixed(0)+"%";
// // 		P.percent_width = P.textWidth(P.prog_str);
// // 		P.fill(P.darkBlue);
// // 		P.text(P.prog_str , (_w-P.percent_width)*.5, _h*.8);
// //
// // 		if(Math.round(UserProgress._progress) == p_count.toFixed(0))
// // 		{
// // 			P.noLoop();
// // 			startMoodMapAni();
// // 			console.log("PROGRESS: "+p_count);
// // 		}
// // 	}
// //
// // }
//
//
//
//
//
// ///////////////////////////////////
// //
// // USER MOOD MAP
// //
// ///////////////////////////////////
//
// // var MoodMap = function (P)
// // {
// // 	 /* @pjs preload="images/emoji-1-active.png"; */
// //
// //
// // 	P.lightBlue = P.color(47, 143, 188);
// // 	P.darkBlue = P.color(24, 82, 110);
// // 	P.cream = P.color(242, 208, 141);
// // 	P.white = P.color(255, 255, 255);
// // 	P.title = "MOOD MAP";
// // 	var _w = MoodMap._width;
// // 	var _h = MoodMap._height;
// // 	var _moodPoints = MoodMap._moodPoints;
// // 	var _temp_moodPoints = [];
// // 	var mood_map_x_scroll = 0;
// //
// // 	P.setup = function()
// // 	{
// // 	  P.size( _w, _h );
// // 	  P.frameRate( 600 );
// // 	  P.background(0,0);
// //
// // 	  P.textFont(P.createFont("Raleway",30));
// //
// // 	  //P.e1 = P.loadImage("images/emoji-1-active.png");
// //
// // 	  //create empy array same length as _moodPoints
// // 	  for(var i=0; i<_moodPoints.length; i++)
// // 	  {
// // 	  	_temp_moodPoints[i] = P.height;
// // 	  }
// // 	}
// //
// // 	P.draw = function()
// // 	{
// //
// // 		P.background(0,0);
// // 		//console.log(_temp_moodPoints[0]);
// // 		//TITLE
// // 		/*P.maxFontSize = 20/100;
// // 		P.textSize(P.maxFontSize*(_h*.5));
// // 		P.title_width = P.textWidth(P.title);
// // 		P.fill(P.darkBlue);
// // 		P.text(P.title, 20, 25);*/
// //
// //
// // 		P.spacing_h = P.width/_moodPoints.length;
// // 		P.spacing_v = (P.height*.75)/10;
// // 		P.padding = P.spacing_h/2;
// // 		P.moodHigh = new PVector(0, P.height);
// // 		P.prevPoints;
// //
// //
// //
// // 		//emoji list
// // 		//P.image(P.e1, 0, 0, _h/5, _h/5);
// //
// // 		 for(var i=0; i<_moodPoints.length; i++)
// // 		 {
// // 		 	//draw points
// // 			P.noStroke();
// // 		 	P.fill(P.white);
// // 		 	P.x = P.padding+(P.spacing_h*i);
// //
// // 		 	var point_final_y_pos = P.height-(P.spacing_v*_moodPoints[i]);
// // 		 	P.y = _temp_moodPoints[i] += ((point_final_y_pos-_temp_moodPoints[i])/(5*(i+1)));//animate points with some ease
// //
// // 		 	P.ellipse(P.x, P.y, 14, 14);
// //
// // 			//draw line
// // 			if(i>0)
// // 			{
// // 				P.stroke(P.white);
// // 				P.strokeWeight(3);
// // 				P.line(P.prevPoints.x, P.prevPoints.y, P.x, P.y);
// // 			}
// //
// // 			//check for high point 0 high, 100 low!
// // 			if(P.y < P.moodHigh.y)
// // 			{
// // 				P.moodHigh.x = P.x;
// // 				P.moodHigh.y = P.y;
// // 			}
// //
// // 			//store current points for line points in next loop iteration
// // 		 	P.prevPoints = new PVector(P.x, P.y);
// // 		 }
// //
// //
// // 		 //draw high point
// // 		 P.strokeWeight( 2 );
// // 		 P.stroke(P.white, 120);
// // 		 P.noFill();
// // 		 P.ellipse(P.moodHigh.x, P.moodHigh.y, 18, 18);
// //
// //
// // 		 var num_of_points = MoodMap._moodPoints.length;
// // 		 var orig_y_of_last_point = Math.round(P.height-(P.spacing_v*_moodPoints[num_of_points-1]));
// // 		 var temp_y_of_last_point = Math.round(_temp_moodPoints[num_of_points-1]);
// //
// // 		 //SCROLL DIV
// // 		 var x_scroll = mood_map_x_scroll += (P.width-mood_map_x_scroll)/(40*num_of_points);
// // 		 $( ".mood-map" ).scrollLeft( x_scroll );
// //
// //
// // 		 if( orig_y_of_last_point == temp_y_of_last_point)
// // 		 {
// // 		 	P.noLoop(); //stop ani
// // 		 	//ANIMATE EMOJI BARS
// // 		 	var speed = 1000;
// // 		 	var one_unit = 10; //as percentage of div width
// // 		 	$( ".bar1" ).delay( 0 ).animate({ width: one_unit*MoodMap.bar1_width+"%", overflow: "auto !important"}, speed);
// // 		 	$( ".bar2" ).delay( 500 ).animate({ width: one_unit*MoodMap.bar2_width+"%", overflow: "auto !important"}, speed);
// // 		 	$( ".bar3" ).delay( 1000 ).animate({ width: one_unit*MoodMap.bar3_width+"%", overflow: "auto !important"}, speed);
// // 		 	$( ".bar4" ).delay( 1500 ).animate({ width: one_unit*MoodMap.bar4_width+"%", overflow: "auto !important"}, speed);
// // 		 	$( ".bar5" ).delay( 2000 ).animate({ width: one_unit*MoodMap.bar5_width+"%", overflow: "auto !important"}, speed);
// //
// // 		 	$( ".emoji-usage1" ).html( MoodMap.bar1_width );
// // 		 	$( ".emoji-usage2" ).html( MoodMap.bar2_width );
// // 		 	$( ".emoji-usage3" ).html( MoodMap.bar3_width );
// // 		 	$( ".emoji-usage4" ).html( MoodMap.bar4_width );
// // 		 	$( ".emoji-usage5" ).html( MoodMap.bar5_width );
// // 		 }
// //
// //
// //
// //
// //
// //
// // 	}
// // }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ///////////////////////////////////
// //
// // DICE
// //
// ///////////////////////////////////
// /*
// // Setup DOM elements
// var diceNum
//
// function initDiceNum()
// {
// 	diceNum = document.createElement( 'div' );
// 	diceNum.className = "diceNum";
// 	$(diceNum).css("font-size", String(Math.round(window.innerHeight*.15))+'px');
// 	$(diceNum).css("textAlign", "center");
//
// 	$(".dice-container").append( $(diceNum) );
// }
// //initDiceNum();
//
// function updateInfoTxt()
// {
// 	$( ".info-txt" ).css("display", "none");
// 	$( ".info-txt h1" ).replaceWith( "<h1>TAP AGAIN <br> TO READ YOUR MISSION!</h1>" );
//
// 	$(".info-txt").fadeIn(500);
// }
// function resetInfoTxt()
// {
// 	$( ".info-txt" ).css("display", "none");
// 	$( ".info-txt h1" ).replaceWith( "<h1>TAP DICE TO ROLL</h1>" );
//
// 	$(".info-txt").fadeIn(500);
// }
//
//
//
//
//
//
//
// //init DICE
//
// var PHONE_TYPE = 3; //3 for iPhone3 (slow performance)
//
// var container = document.getElementById("dice-container");
// var WIDTH = window.innerWidth;
// var HEIGHT = window.innerHeight*.6;
//
//
// var camera, scene, renderer;
//
// var dice, plane, diceNum;
//
// var targetRotation = 0;
// var targetRotationOnMouseDown = 0;
//
// var mouseX = 0;
// var mouseXOnMouseDown = 0;
//
//
//
// var colours = [0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8, 0x8cc641, 0xf79421, 0x221d58, 0x0b70b8];
//
// var rolling = false;
// var read_mission = false;
// var spriteSheetUrl = "images/numbers.png";
//
// //init();
// //render();
//
//
// function init()
// {
// 	WIDTH = window.innerWidth;
// 	HEIGHT = window.innerHeight*.6;
//
//
// 	camera = new THREE.PerspectiveCamera( 70, WIDTH/HEIGHT, 1, 1000 );
// 	camera.position.y = 150;
// 	camera.position.z = 450;
//
//
// 	scene = new THREE.Scene();
//
// 	// Dice
//
// 	var geometry = new THREE.IcosahedronGeometry( 200,0 );
// 	geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI / 2 ) );
//
// 	for ( var i = 0; i < geometry.faces.length; i ++ )
// 	{
// 		geometry.faces[ i ].color.setHex( colours[i] );
// 	}
//
// 	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
//
// 	dice = new THREE.Mesh( geometry, material );
// 	dice.position.y = 150;
// 	scene.add( dice );
//
//
// 	//Scene
// 	renderer = new THREE.CanvasRenderer( { alpha: true } );
// 	renderer.setSize( WIDTH, HEIGHT);
//
// 	renderer.sortObjects = false;
// 	renderer.autoClear = true;
// 	renderer.sortElements = false;
//
//
// 	container.appendChild( renderer.domElement );
//
//
// 	container.addEventListener( 'mousedown', onDiceMouseDown, false );
// 	container.addEventListener( 'touchstart', onDiceTouchStart, false );
// }
//
//
// //mouse events
// function onDiceMouseDown( event )
// {
// 	event.preventDefault();
//
// 	if(read_mission)
// 	{
// 		changePage( "#mission" );
// 		read_mission = false;
// 		resetInfoTxt();
// 	}
// 	else roll();
// }
//
// function onDiceTouchStart( event )
// {
//
//     if ( event.touches.length == 1 )
//     {
//         event.preventDefault();
//
//         if(read_mission)
//         {
//         	changePage( "#mission" );
//         	read_mission = false;
//         	resetInfoTxt();
//         }
//         else roll();
//     }
// }
//
//
//
// //roll functions
// var prevRotations;
//
// function roll()
// {
// 	stop();
//
//     hideScore();
//
//     score = generateScore();
//
//
//     var rotations=Math.round(Math.random()*5);
//
//     if(rotations == prevRotations) roll(); //re-roll
//     else
//     {
//         start();
//
// 		diceNum.innerHTML = score;
//
//         console.log(score);
//         //console.log(rotations);
//
//         TweenLite.to(dice.rotation, 3,
//         {
//             y : (293+(360*rotations))*(Math.PI/180),
//             x : (360*rotations)*(Math.PI/180),
//             delay:0,
//             ease : Strong.easeOut,
//             onComplete : stop,
//             overwrite:true
//         });
//         setTimeout(showScore, 1800);
// 		//update info-txt in html
// 		setTimeout(updateInfoTxt, 2500);
//
// 		read_mission = true;
//     }
//
//     prevRotations = rotations;
// }
// function generateScore()
// {
//     return 1+Math.round(Math.random()*19);
// }
// function showScore()
// {
// 	$(diceNum).fadeIn(1000);
// }
// function hideScore()
// {
// 	$(diceNum).css("display", "none");
// }
//
//
//
//
// function animate()
// {
// 	if(rolling)
// 	{
// 		requestAnimationFrame( animate );
// 		render();
// 	}
// }
//
// function render()
// {
//     renderer.render( scene, camera );
//     //console.log("r");
// }
//
// function start()
// {
// 	rolling = true;
// 	animate();
// }
// function stop()
// {
// 	rolling = false; //stop animation looping to save processor
// }
//
//
//
//
//
//
// /////////////////
// // DICE UTILS
// /////////////////
// function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
// {
// 	// note: texture passed by reference, will be updated by the update function.
//
// 	this.tilesHorizontal = tilesHoriz;
// 	this.tilesVertical = tilesVert;
// 	// how many images does this spritesheet contain?
// 	//  usually equals tilesHoriz * tilesVert, but not necessarily,
// 	//  if there at blank tiles at the bottom of the spritesheet.
// 	this.numberOfTiles = numTiles;
// 	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// 	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
//
// 	// how long should each image be displayed?
// 	this.tileDisplayDuration = tileDispDuration;
//
// 	// how long has the current image been displayed?
// 	this.currentDisplayTime = 0;
//
// 	// which image is currently being displayed?
// 	this.currentTile = 0;
//
// 	this.update = function( milliSec )
// 	{
// 		this.currentDisplayTime += milliSec;
// 		while (this.currentDisplayTime > this.tileDisplayDuration)
// 		{
// 			this.currentDisplayTime -= this.tileDisplayDuration;
// 			this.currentTile++;
// 			if (this.currentTile == this.numberOfTiles)
// 			    this.currentTile = 0;
// 			var currentColumn = this.currentTile % this.tilesHorizontal;
//
// 			texture.offset.x = currentColumn / this.tilesHorizontal;
// 			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
// 			texture.offset.y = currentRow / this.tilesVertical;
// 		}
// 	};
//
// 	this.displayNum = function(num)
// 	{
// 		this.currentTile = num;
// 		var currentColumn = this.currentTile % this.tilesHorizontal;
// 		texture.offset.x = currentColumn / this.tilesHorizontal;
// 	}
// }
//
// */
//
//
//
//
//
//
//
//
//
//
// /////////////////
// // PHOTO MONTAGE
// /////////////////
// var PhotoMontage = function()
// {
// 	var temp = "<div class='brick' style='width:{width}px;'><img src='images/photo/{index}.jpg' width='100%'></div>";
// 	var w = 1, h = 1, html = '', limitItem = 10;
// 	for (var i = 0; i < limitItem; ++i)
// 	{
// 		w = 1 + 3 * Math.random() << 0;
// 		html += temp.replace(/\{width\}/g, w*150).replace("{index}", i + 1);
// 	}
// 	$("#freewall").html(html);
//
// 	var wall = new freewall("#freewall");
// 	wall.reset(
// 	{
// 		selector: '.brick',
// 		animate: true,
// 		cellW: 150,
// 		cellH: 'auto',
// 		gutterX: 15,
// 		onResize: function()
// 		{
// 			wall.fitWidth();
// 		}
// 	});
//
// 	var images = wall.container.find('.brick');
// 	images.find('img').load(function()
// 	{
// 		wall.fitWidth();
// 	});
// }
//
//
//
//
//
// /////////////////
// // WORD CLOUD
// /////////////////
// var WordCloud = function()
// {
// 	var w = document.getElementById("tagcloud").offsetWidth;
// 	var h = document.getElementById("tagcloud").offsetHeight;
//
//     var settings = {
//     //height of sphere container
//     height: h,
//     //width of sphere container
//     width: w*.8,
//     //radius of sphere
//     radius: w/4,
//     //rotation speed
//     speed: 2,
//     //sphere rotations slower
//     slower: 0.9,
//     //delay between update position
//     timer: 2,
//     //dependence of a font size on axis Z
//     fontMultiplier: 30,
//     //tag css stylies on mouse over
//     hoverStyle: {
//         border: '',
//         color: ''
//     },
//     //tag css stylies on mouse out
//     mouseOutStyle: {
//         border: '',
//         color: ''
//     }
//     };
//
//
//    $('#tagcloud').tagoSphere(settings);
// }
//
//
//
//
//
//
//
// /////////////////
// // HOW TO PLAY
// /////////////////
// var HowTo = function(_vid_target, _info_target)
// {
// 	var vid = _vid_target;
// 	var info = _info_target;
// 	var num_steps = 7;
// 	var animation_called = false;
//
// 	var init = function()
// 	{
// 		vid.addEventListener("timeupdate", function()
// 		{
// 			checkVidPosition();
// 		}, true);
//
// 	}
// 	init();
//
// 	var checkVidPosition = function()
// 	{
// 		var step_width = 100;
//
//
// 		if(vid.currentTime < 10)
// 		{
// 			animateStepsPos(0);
// 			console.log("step 1")
// 		}
// 		else if(vid.currentTime < 20)
// 		{
// 			animateStepsPos(step_width);
// 			console.log("step 2")
// 		}
// 		else if(vid.currentTime < 30)
// 		{
// 			animateStepsPos(step_width*2);
// 			console.log("step 3")
// 		}
// 		else if(vid.currentTime < 40)
// 		{
// 			animateStepsPos(step_width*3);
// 			console.log("step 4")
// 		}
// 		else if(vid.currentTime < 50)
// 		{
// 			animateStepsPos(step_width*4);
// 			console.log("step 5")
// 		}
// 		else if(vid.currentTime < 60)
// 		{
// 			animateStepsPos(step_width*5);
// 			console.log("step 6")
// 		}
// 		else if(vid.currentTime < 70)
// 		{
// 			animateStepsPos(step_width*6);
// 			console.log("step 7")
// 		}
// 	}
//
// 	var animateStepsPos = function(_pos)
// 	{
// 		if(!animation_called)
// 		{
// 			animation_called = true;
// 			info.animate(
// 			{
// 				marginLeft : "-"+_pos+"%"
// 			},700, function()
// 			{
// 			    animation_called = false;
// 			});
// 			//info.css("marginLeft", "-"+_pos+"%");
// 		}
// 	}
// };
//
// //var howTo = new HowTo($(".how-to-play-video")[0], $(".how-to-info"));
//
//
//
//
//
//
//
// /////////////////////////////
// //JOURNAL SLIDER NAV CONTROL
// /////////////////////////////
// var user_data_btn_array = [".mood-data", ".groups", ".journal-wall-posts", "#freewall", "#tagcloud"];
//
// $( ".slider-icon" ).click(function()
// {
// 	var btn = $(this).attr('class');
// 	for(var i=0; i<user_data_btn_array.length; i++)
// 	{
// 		$( user_data_btn_array[i] ).fadeOut( 0 );
// 	}
// 	var new_content = "";
// 	switch(btn)
// 	{
// 		case "slider-icon slider-icon-0": new_content = ".groups";
// 		break;
// 		case "slider-icon slider-icon-1": new_content = ".mood-data";
// 		break;
// 		case "slider-icon slider-icon-2": new_content = ".journal-wall-posts";
// 		break;
// 		case "slider-icon slider-icon-3": new_content = "#freewall";
// 		break;
// 		case "slider-icon slider-icon-4": new_content = "#tagcloud";
// 										  //WordCloud();
// 		break;
// 	}
//     $( new_content ).fadeIn( 300);
// });
//
// //BUTTONS
// $(".view-mission-btn").click(function()
// {
// 	changePage( "#mission" );
// });
// $(".new-post-btn").click(function()
// {
// 	changePage( "#new-post" );
// });
// $(".post-as-btn").click(function()
// {
// 	changePage( "#post-as" );
// });
// $(".post-btn").click(function()
// {
// 	changePage( "#team-posts" );
// });
//
//
//
// //FOOTER NAV CONTROL
// $(".prev-btn").click(function()
// {
//     history.back();
//     return false;
//  });
// $( ".profile-btn" ).click(function()
// {
//   changePage( "#journal" );
// });
// $( ".play-btn" ).click(function()
// {
//   changePage( "#dice" );
// });
// $(".msg-btn").click(function()
// {
//   changePage( "#messages" );
// });
// $(".team-posts-btn").click(function()
// {
//   changePage( "#team-posts" );
// });
//
//
//
// ///////////////////////
// //
// // PAGE CONTROL
// //
// ///////////////////////
// var changePage = function(_page)
// {
// 	$.mobile.changePage( _page,
// 	{
// 	    transition: "none",
// 	    reverse: false
// 	});
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// /////////////////
// // INIT
// /////////////////
// $(document).ready(function()
// {
// 	//init canvasProgress
// 	//InitUserProgress();
// 	//var canvasProgress = document.getElementById("canvas-progress");
// 	//var progressInstance = new Processing(canvasProgress, UserProgress);
//
// 	//init canvasMoodMap
// 	//InitMoodMap();
// 	//var canvasMoodMap = document.getElementById("mood-map");
// 	//var moodMapInstance = new Processing(canvasMoodMap, MoodMap);
//
// 	/*var photo_montage = new PhotoMontage();
// 	var word_cloud = new WordCloud();*/
//
// });
//
// // if(canvasProgress) canvasProgress = null;
// // var canvasProgress;
// // var progressInstance;
// //
// // function InitUserProgress(progress,day,date)
// // {
// // 	UserProgress._width = $(".progress").width();
// // 	UserProgress._height = $(".progress").height();
// // 	UserProgress._day = day;
// // 	UserProgress._date = date;
// // 	UserProgress._progress = progress;
// // 	canvasProgress = document.getElementById("canvas-progress");
// // 	progressInstance = new Processing(canvasProgress, UserProgress);
// // }
//
// // function startMoodMapAni()
// // {
// // 	InitMoodMap();
// // 	var canvasMoodMap = document.getElementById("mood-map");
// // 	var moodMapInstance = new Processing(canvasMoodMap, MoodMap);
// // }
// // var getRandomMood = function(min, max)
// // {
// // 	return Math.round(min+(Math.random()*max));
// // }
// // function InitMoodMap()
// // {
// // 	MoodMap._moodPoints = [getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// //
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9),
// // 							getRandomMood(1, 9)];
// //
// // 	MoodMap._width = ($(".mood-map").width()/7)*MoodMap._moodPoints.length;
// // 	MoodMap._height = $(".mood-map").height();
// //
// // 	MoodMap.bar1_width = getRandomMood(0, 4);
// // 	MoodMap.bar2_width = getRandomMood(0, 4);
// // 	MoodMap.bar3_width = getRandomMood(0, 4);
// // 	MoodMap.bar4_width = getRandomMood(0, 4);
// // 	MoodMap.bar5_width = getRandomMood(0, 4);
// // }
