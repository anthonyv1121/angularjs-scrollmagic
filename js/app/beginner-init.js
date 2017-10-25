/*app config*/
app.value("level", 0)
   .factory('wifiEducationData', ['$http', function($http) { 
  return $http.get('js/services/wifiBeginnerData.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(data) { 
              return data; 
            }); 
}]);
UI.canvasManifesto = [
	 {lib:lib1, fn: new lib1.init_lib1()},
	 {lib:lib2, fn: new lib2.init_lib2()},
	 {lib:lib3, fn: new lib3.init_lib3()},
	 {lib:lib4, fn: new lib4.init_lib4()},
	 {lib:lib5, fn: new lib5.init_lib5()},
	 {lib:lib6, fn: new lib6.init_lib6()},
	 {lib:lib7, fn: new lib7.init_lib7()},
	 {lib:lib8, fn: new lib8.init_lib8()},
	 // {lib:lib9, fn: new lib9.init_lib9()},
	 // {lib:lib10, fn: new lib10.init_lib10()},
     // {lib:lib11, fn: new lib11.init_lib11()},
	 {lib:lib12, fn: new lib12.init_lib12()},
	 {lib:lib_final, fn: new lib_final.init_lib_final()}
	];
//var parallaxTl = new TimelineMax();
	//setTimeout(function(){parallaxTl.to('#Beginner-1 header img', 0.4, { y:'-100', ease:Power0.easeNone}, 0.4)}, 3000)


