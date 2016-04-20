var app = angular.module('myApp', []);

//transfert var local en session
if(localStorage.loginTMP!='' && localStorage.passwordTMP!=''){
	sessionStorage.login=localStorage.loginTMP;
	sessionStorage.password=localStorage.passwordTMP;
	localStorage.loginTMP='';
	localStorage.passwordTMP='';
};

//les parametres
app.controller('param', function($scope,$http) {
	//devices = peripheriques 
	var req = {
		method: 'GET',
		url: 'http://indiarose.azurewebsites.net/api/v1/devices/list',
		headers: {
			'x-indiarose-login': sessionStorage.login,
			'x-indiarose-password':sessionStorage.password
		}, 
	};
	
	$http(req).success(function(data, status){
		if(data.Content==''){
			$scope.dat={'Names':''};   //sinon souci dans x in dat ou names n existe pas 
			$scope.data1=false;
		}else{
			$scope.data1=true;
			$scope.dat=data.Content;
		};
	});
	$scope.parametres=false;
	$scope.collection=false;
	$scope.reinitialiser=false;
	$scope.lectureMots=false;
	$scope.slide=5;  //mettre la valeur de la version
	$scope.lectureCat=false;
	$scope.parametresf=function(){
		$scope.parametres=!$scope.parametres;
		$scope.collection=false;
	};
	$scope.collectionf=function(){
		$scope.collection=!$scope.collection;
		$scope.parametres=false;
	};
	$scope.reinitialiserf=function(){
		$scope.reinitialiser=!$scope.reinitialiser;
		$scope.lectureMots=false;
		$scope.lectureCat=false;
	};
	$scope.lectureMotsf=function(){
		$scope.lectureMots=!$scope.lectureMots;
		$scope.reinitialiser=false;
		$scope.lectureCat=false;
	};
	$scope.lectureCatf=function(){
		$scope.lectureCat=!$scope.lectureCat;
		$scope.reinitialiser=false;
		$scope.lectureMots=false;
	};
});