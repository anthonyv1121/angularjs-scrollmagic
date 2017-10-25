var CanvasLoader = {};
CanvasLoader.canvas,CanvasLoader.stage, CanvasLoader.exportRoot, CanvasLoader.lib, CanvasLoader.anim_container, CanvasLoader.dom_overlay_container;

CanvasLoader.init = function(canvas, anim_container, dom_overlay_container, exportRoot, lib) {
	createjs.MotionGuidePlugin.install();
	CanvasLoader.canvas = document.getElementById(canvas);
	CanvasLoader.anim_container = document.getElementById(anim_container);
	CanvasLoader.dom_overlay_container = document.getElementById(dom_overlay_container);
	CanvasLoader.handleComplete(exportRoot, lib);
}
CanvasLoader.handleComplete =function(exportRoot, lib) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	CanvasLoader.exportRoot = exportRoot;
	CanvasLoader.lib = lib;
	CanvasLoader.stage = new createjs.Stage(CanvasLoader.canvas);
	CanvasLoader.stage.addChild(CanvasLoader.exportRoot);	
	//Registers the "tick" event listener.
		    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = CanvasLoader.lib.properties.width, h = CanvasLoader.lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			CanvasLoader.canvas.width = w*pRatio*sRatio;			
			CanvasLoader.canvas.height = h*pRatio*sRatio;
			//CanvasLoader.canvas.style.width = CanvasLoader.dom_overlay_container.style.width = CanvasLoader.anim_container.style.width =  w*sRatio+'px';				
			//CanvasLoader.canvas.style.height = CanvasLoader.anim_container.style.height = CanvasLoader.dom_overlay_container.style.height = h*sRatio+'px';
			CanvasLoader.canvas.style.width =  w*sRatio+'px';				
			CanvasLoader.canvas.style.height = h*sRatio+'px';
			CanvasLoader.stage.scaleX = pRatio*sRatio;			
			CanvasLoader.stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;		
		}
	}
	makeResponsive(false,'both',false,1);	
	CanvasLoader.fnStartAnimation();
}// JavaScript Document
CanvasLoader.fnStartAnimation = function() {
	createjs.Ticker.setFPS(CanvasLoader.lib.properties.fps);
	createjs.Ticker.addEventListener("tick", CanvasLoader.stage);
}




