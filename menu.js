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


if(sessionStorage.login==null){
	alert("vous avez \351t\351 d\351connect\351");
	window.location='pageDeConnection.html';
};

//les parametres
app.controller('param', function($scope,$http) {
	$scope.propriete=false;
	$scope.indiagrame=false;
	$scope.reinitialiser=false;
	$scope.otpion=false;
	$scope.parametres=false;
	$scope.collection=false;

	$scope.prorietef=function(){
		$scope.propriete=!$scope.propriete;
		$scope.reinitialiser=false;
		$scope.indiagrame=false;
		$scope.option=false;
	}

	$scope.indiagramef=function(){
		$scope.indiagrame=!$scope.indiagrame;
		$scope.reinitialiser=false;
		$scope.propriete=false;
		$scope.option=false;
	}

	$scope.reinitialiserf=function(){
		$scope.reinitialiser=!$scope.reinitialiser;
		$scope.propriete=false;
		$scope.indiagrame=false;
		$scope.option=false;
	};
	$scope.optionf=function(){
		$scope.option=!$scope.option;
		$scope.reinitialiser=false;
		$scope.propriete=false;
		$scope.indiagrame=false;
	};


	$scope.parametresf=function(){
		$scope.parametres=!$scope.parametres;
		$scope.collection=false;
		if($scope.dat==null || $scope.dat==''){
			$scope.versionD();
		};
	};

	$scope.collectionf=function(){
		$scope.collection=!$scope.collection;
		$scope.parametres=false;
		if($scope.dat==null || $scope.dat==''){
			$scope.versionD();
		};
	};

	$scope.version=function(){
		$scope.deviceSettings='';
		$scope.policeName='';
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
		$scope.versionCollection=null;
	};

	$scope.afficherVersion=function(){
		$scope.deviceSettings='';
		$scope.policeName='';
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
			$scope.policeName=$scope.deviceSettings.FontName.substring(14); //   /systems/fonts/  =14
		}).error(function(status){
			alert(status.Message);
		});
	};

	$scope.afficherVersionC=function(){
		var req = {
			method: 'GET',
			url: API+'/api/v1/versions/all',
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': $scope.device
			}, 
		};
		$http(req).success(function(data, status){
			for(var i in data.Content){
				if(data.Content[i].Version==$scope.versionCollection){
					$scope.dateCollection=data.Content[i];
				};
			};
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

	$scope.versionD=function(){
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

	$scope.versionC=function(){
		var req = {
			method: 'GET',
			url: API+'/api/v1/versions/all',
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': $scope.device
			}, 
		};
		$http(req).success(function(data, status){
			if(data.Content==''){
				$scope.datC={'Version':''};   
				$scope.dataC=false;
			}else{
				$scope.dataC=true;
				$scope.datC=data.Content;
			};
		}).error(function(status){
			alert(status.Message);
		});
	};





	$scope.afficherArbre=function(){
		var req = {
			method: 'GET',
			url: API+'/api/v1/collection/all/'+$scope.versionCollection,
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': $scope.device
			}, 
		};
		$http(req).success(function(data, status){
			$scope.dataCollection=data.Content;
			$scope.image();

		}).error(function(status){
			alert(status.Message);
		});
	};

	$scope.ImageZ=function(x){
		var req = {
			method: 'GET',
			url: API+'/api/v1/collection/images/'+$scope.dataCollection[x].DatabaseId+'/'+$scope.versionCollection,
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': $scope.device
			}, 
		};
		$http(req).success(function(data, status){
			sessionStorage['ind'+$scope.dataCollection[x].DatabaseId]=data.Content.Content;
		}).error(function(status){
			alert(status.Message);
			return null;
		}); 
	};

	$scope.image=function(){
		for(var x in $scope.dataCollection){
			if($scope.dataCollection[x].HasImage==true){
				$scope.ImageZ(x);
			}else{
				sessionStorage['ind'+$scope.dataCollection[x].DatabaseId]='';
			};
		};
	};



	$scope.getImage = function(champ){
		if (sessionStorage['ind'+champ]==''){
			return 'rouge1.png';
		}else{
			return 'data:image/jpeg;base64,' + sessionStorage['ind'+champ];
		};
	};
});

//filtre qui renvoi true ou false avec un input = true ou 'true'
app.filter('toBoolean', function() {
	return function(input) {
		return input === true || input === 'true';
	};
});






var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("base64textarea").value = btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}