//618d663af0f1ec88a5a19defa65a2f80d06582a832510b12f475d80870bdb3ab

var app = angular.module('myApp', []);

var API='http://indiarose.azurewebsites.net/';

//transfert var local en session
if(localStorage.loginTMP!='' && localStorage.passwordTMP!=''){
	sessionStorage.login=localStorage.loginTMP;
	sessionStorage.password=localStorage.passwordTMP;
	localStorage.loginTMP='';
	localStorage.passwordTMP='';
};

//les parametres
app.controller('param', function($scope,$http) {
	$scope.propriete=false;

	$scope.parametres=false;
	$scope.collection=false;
	$scope.reinitialiser=false;
	$scope.lectureMots=false;
	$scope.slide=5;  
	$scope.lectureCat=false;



	$scope.collectionf=function(){
		$scope.collection=!$scope.collection;
		$scope.parametres=false;
		$scope.propriete=false;
	};

	$scope.prorietef=function(){
		$scope.propriete=!$scope.propriete;
		$scope.lectureMots=false;
		$scope.lectureCat=false;
		$scope.reinitialiser=false;
	}



	$scope.reinitialiserf=function(){
		$scope.reinitialiser=!$scope.reinitialiser;
		$scope.lectureMots=false;
		$scope.lectureCat=false;
		$scope.propriete=false;
	};
	$scope.lectureMotsf=function(){
		$scope.lectureMots=!$scope.lectureMots;
		$scope.reinitialiser=false;
		$scope.lectureCat=false;
		$scope.propriete=false;
	};
	$scope.lectureCatf=function(){
		$scope.lectureCat=!$scope.lectureCat;
		$scope.reinitialiser=false;
		$scope.lectureMots=false;
		$scope.propriete=false;
	};


	$scope.version=function(){
		var req = {
			method: 'GET',
			url: API+'/api/v1/settings/all',
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device':$scope.device
			}, 
		};
		$http(req).success(function(data, status){
			$scope.dat2=data.Content;
		}).error(function(status){
			alert(status.Message);
		});
		$scope.device2=null;
	};

	$scope.afficherVersion=function(){
		var req = {
			method: 'GET',
			url: API+'/api/v1/settings/get/'+$scope.device2,
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device':$scope.device
			}, 
		};
		$http(req).success(function(data, status){
			$scope.deviceInfo=data.Content;
			$scope.deviceSettings= JSON.parse(data.Content.Settings);
		}).error(function(status){
			alert(status.Message);
		});
	};

	$scope.changeNomD=function(champ1){
		sessionStorage.device=$scope.device;
		var json = {
			'ActualName': sessionStorage.device,
			'NewName': champ1
		};
		var req = {
			method: 'POST',
			url: API+'/api/v1/devices/rename',
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password
			},
			data:json
		};
		sessionStorage.device='';
		$http(req).success(function(data, status) {
			location.reload(); 
		}).error(function(status){
			alert(status.Message);
		});
	};

	$scope.parametresf=function(){
		$scope.parametres=!$scope.parametres;
		$scope.collection=false;
		var req = {
			method: 'GET',
			url: API+'/api/v1/devices/list',
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password
			}, 
		};
		$http(req).success(function(data, status){
			if(data.Content==''){
				$scope.dat={'Names':''};   
				$scope.data1=false;
			}else{
				$scope.data1=true;
				$scope.dat=data.Content;
			};
		}).error(function(status){
			alert(status.Message);
		});
	};
});