var app = angular.module("WifiEducation", ['ngSanitize'])
	.controller('MainController', ['$scope', '$rootScope', '$window', 'wifiEducationData', 'wifiLevel', 'level', function($scope, $rootScope,$window, wifiEducationData, wifiLevel, level) {
		wifiEducationData.success(function(data){
				$scope.wifiEducationData = data;
			});
		$scope.wifiLevel = wifiLevel;
		//$scope.level = $routeParams.level;
		$scope.level = level;
		//$scope.windowW = $window.innerWidth;
		if($window.innerWidth <= 1024){
			$rootScope.isMobile = true;
		}
		else{
			$rootScope.isMobile = false;
		}
		$scope.levelName = $scope.wifiLevel[$scope.level];
		$scope.directories = [
			 {
				elements: 'includes/elements/',
				scenes: 'includes/scenes/',
				directives: 'includes/directives/',
				logo: 'logo.html',
				nav: 'nav.html',
				footer: 'footer.html',
				loader: 'loader.html',
				sign: 'section-sign.html'
			 },
    	];
		$scope.dir = $scope.directories[0];
	}])
	.value("wifiLevel", ["Beginner", "Advanced" ])

/*Directives*/
app.directive('sectionTemplate',['$rootScope', function($rootScope) { 
  return { 
    restrict: 'E', 
    scope: { 
      data: '=',
	  index: '@',
	  ref: '@',
	  sign: '@'
    },
	  link: function($scope, element, attrs) {
          // $rootScope.$apply();
  },
    templateUrl: 'includes/directives/section-template.html'
  };
	
}]);

app.directive('scrollMagic', function($rootScope) { 
  return { 
    restrict: 'A',
	  scope:false,
	link: function($scope, element, attrs) {
		  var watch = $scope.$watch(function() { // Trigger when number of children changes, including by directives like ng-repeat
				return element.children().length;
            }, function() {
                 $scope.$evalAsync(function() { // Wait for templates to render //var children = element.children();
				 	 var children = element.children().length;
					 console.log('children ' + children);
					 
					 if( (children === 9 && $scope.levelName === "Beginner") || (children === 7 && $scope.levelName === "Advanced") ) {
						 console.log("nG Finished");
						UI.render($rootScope.isMobile, $scope.levelName);
					 } 
					
				});
            });
        }
  }; 
});

app.directive('createjs', function() { 
  return { 
    restrict: 'E', 
	  scope:{
		  id: '@'
	  },
    templateUrl: 'includes/directives/create-js.html'
  }
});

				
var UI = {};
UI.loadCanvas = function(){
		for(var i = 0; i<UI.canvasManifesto.length; i++){
				CanvasLoader.init('canvas_'+i, 'animation_container_'+i, 'dom_overlay_container_'+i, UI.canvasManifesto[i].fn, UI.canvasManifesto[i].lib, UI.canvasManifesto[i].special);
			 }
		 UI.scrollMagicScenes(UI.canvasManifesto); // canvasManifesto defined in Beginner and Advanced JS files
	};
UI.render = function(isMobile, levelName){
		 setTimeout(function(){
		 $(function(){
			$('nav, .main-content').fadeIn();
			$('.loader').hide();
			UI.positionIframe(levelName);
			window.addEventListener('resize', function(){UI.positionIframe(levelName)});
			if(!isMobile){
				UI.loadCanvas();
			}
		 });
		}, 1500);
};
UI.positionIframe = function (levelName){
		iw =window.innerWidth;
		iframe = document.getElementById("hero-animation");
		if(levelName === "Advanced"){
			 if(iw > 1840){
				var diff =(iw-1840)/2
				iframe.style.left = diff + 'px';
			}
		}
		else if (levelName === "Beginner"){
			 if(iw > 1500){
				var diff =(iw-1500)/2
				iframe.style.left = diff + 'px';
			}
		}
		
	};
var ScrollMagicScenes={};

UI.scrollMagicScenes = function(canvasManifesto){
	var exportRoot = canvasManifesto;
	var vel = 2;
	var $finalCanvas = $('#canvas_' + String(exportRoot.length-1));
	var controller = new ScrollMagic.Controller();
	$('section .content .graphics-col .animation_container').each(function(index, element){
	
	//console.log('index ' + index);
	//console.log('exportRoot ' + exportRoot.length);/
	var canvas = exportRoot[index].fn;
	var scene = new ScrollMagic.Scene({
        triggerElement: this.children[0],
		triggerHook: 0.6
    })
	/*.addIndicators({
			name: 'canvas animations',
			colorTrigger: 'black',
			colorStart: 'green',
			colorEnd: 'pink'
		})*/
    .addTo(controller)
	.on('start', function (event) {
		//console.log(event.type + ' ' + index + ' ' + event.state);
		 if(index ===  exportRoot.length - 1){
				//vel = 20;   
		   }
		//console.log("index = " + index);
		//console.log("vel = " + vel);
		var direction = event.target.controller().info('scrollDirection');
		//if( $('.wifi-section .content .row .graphics-col').size() )
		if(index < exportRoot.length - 1) {
			if(direction === "FORWARD"){
				scene.on("update", onEnterTick);
				scene.off("update", onLeaveTick);
			}
			else if(direction === "REVERSE"){
				scene.off("update", onEnterTick);
				scene.on("update", onLeaveTick);
			}
		}
		else if(index == exportRoot.length - 1){
			if(direction === "FORWARD"){
				canvas.gotoAndPlay(0);
				$finalCanvas.removeClass('fade-out');
					
			}
			else if(direction === "REVERSE"){
				$finalCanvas.addClass('fade-out');
				canvas.gotoAndStop(0)
			}
		}
	});
var onEnterTick = function(event){
		  
		   //console.log('FORWARD')
		   if(canvas.currentFrame + vel < canvas.totalFrames){
		   	canvas.gotoAndStop(canvas.currentFrame + vel);
		   }
		   else {
			   var diff = canvas.totalFrames - ( canvas.currentFrame + 1 );
			   canvas.gotoAndStop(canvas.currentFrame + diff);
		   }
	};
var onLeaveTick = function(event){
		 // console.log('REVERSE')
		  if(canvas.currentFrame > 0){
		   canvas.gotoAndStop(canvas.currentFrame - vel);
		 }
	}
}); // end for each
	$('.circle-icon').each(function(index, element){
	var scene = new ScrollMagic.Scene({
        triggerElement: this,
		triggerHook: 0.6
    })
	/*.addIndicators({
			name: 'circle icon animation',
			colorTrigger: 'black',
			colorStart: 'green',
			colorEnd: 'pink'
		})*/
	.setClassToggle(this, "fade-slide-left")
    .addTo(controller);
	}); // end for each
	$('.copy-blurbs').each(function(index, element){
	var scene = new ScrollMagic.Scene({
        triggerElement: this,
		triggerHook: 0.6
    })
	/*.addIndicators({
			name: 'copy blurbs animation',
			colorTrigger: 'black',
			colorStart: 'blue',
			colorEnd: 'pink'
		})*/
	.setClassToggle(this, "fade-in")
    .addTo(controller);
	}); // end for each
	
}; // end scrollMagicScenes

