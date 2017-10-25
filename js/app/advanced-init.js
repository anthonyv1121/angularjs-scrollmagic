/*app config*/
app.value("level", 1)
   .factory('wifiEducationData', ['$http', function($http) { 
  return $http.get('js/services/wifiAdvancedData.json') 
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
	 {lib:lib_final, fn: new lib_final.init_lib_final()}
	];

