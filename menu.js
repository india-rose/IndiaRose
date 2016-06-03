var app = angular.module('myApp', []);

var API='http://indiarose.azurewebsites.net/';

	//transfert var local en session
	if(localStorage.loginTMP!='' && localStorage.passwordTMP!=''){
		sessionStorage.login=localStorage.loginTMP;
		sessionStorage.password=localStorage.passwordTMP;
		localStorage.loginTMP='';
		localStorage.passwordTMP='';
	};

	//retour page de connection si deconnection
	if(sessionStorage.login==null){
		alert("vous avez \351t\351 d\351connect\351");
		window.location='pageDeConnection.html';
	};

	//les parametres
	app.controller('param', function($scope,$http) {
		$scope.propriete=false;
		$scope.indiagrame=false;
		$scope.otpion=false;
		$scope.parametres=false;
		$scope.collection=false;
		$scope.optionIndia=false;

		$scope.prorietef=function(){
			$scope.propriete=!$scope.propriete;
			$scope.indiagrame=false;
			$scope.option=false;
		}

		$scope.indiagramef=function(){
			$scope.indiagrame=!$scope.indiagrame;
			$scope.propriete=false;
			$scope.option=false;
		}


		$scope.optionf=function(){
			$scope.option=!$scope.option;
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

		//avoir les differentes settings d un device
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

		//les information des settings propre a une version d un device
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

		//avoir toutes les version d un device 
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

		//changer le nom d un device
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

		//avoir la liste des devices
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

		//abvoir toutes les verisons d un device
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
					//on recupere la derniere version (la premiere a sortir)
					for(var x in data.Content){
						sessionStorage.VersionFinal=data.Content[x].Version;
						break;
					};
				};
			}).error(function(status){
				alert(status.Message);
			});
		};

		//avoir toutes les collection d un device 
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

		//avoir une image 
		$scope.ImageZ2=function(x){
			var req = {
				method: 'GET',
				url: API+'/api/v1/collection/images/'+x+'/'+$scope.versionCollection,
				headers: {
					'x-indiarose-login': sessionStorage.login,
					'x-indiarose-password':sessionStorage.password,
					'x-indiarose-device': $scope.device
				}, 
			};
			$http(req).success(function(data, status){
				$scope.IMAGE=data.Content.Content;
			}).error(function(status){
				alert(status.Message);
				return null;
			}); 
		};

		//avoir le son d un indiagram
		$scope.MusiqueZ2=function(x){
			var req = {
				method: 'GET',
				url: API+'/api/v1/collection/sounds/'+x+'/'+$scope.versionCollection,
				headers: {
					'x-indiarose-login': sessionStorage.login,
					'x-indiarose-password':sessionStorage.password,
					'x-indiarose-device': $scope.device
				}, 
			};
			$http(req).success(function(data, status){
				$scope.MUSIQUE=data.Content.Content;
			}).error(function(status){
				alert(status.Message);
				return null;
			}); 
		};

		//avoir les images d une collection
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

		//affecter les images d une collection a une var sessionstorage
		$scope.image=function(){
			for(var x in $scope.dataCollection){
				if($scope.dataCollection[x].HasImage==true){
					$scope.ImageZ(x);
				}else{
					sessionStorage['ind'+$scope.dataCollection[x].DatabaseId]='';
				};
				if($scope.dataCollection[x].Children!=''){
					$scope.ImageFils($scope.dataCollection[x].Children);
				};
			};
		};

		//avoir image des fils
		$scope.ImageFils = function(champ){
			for(var i in champ){
				if(champ[i].Children!=''){
					$scope.ImageFils(champ[i].Children);
				}else{
					if(champ[i].HasImage==true){
						$scope.ImageZ(i);
					}else{
						sessionStorage['ind'+champ[i].DatabaseId]='';
					};
				};
			};
		};

		//pouvoir afficher l image grace au src
		$scope.getImage = function(champ){
			if (sessionStorage['ind'+champ]==''){
				return 'rouge1.png';
			}else{
				return 'data:image/jpeg;base64,' + sessionStorage['ind'+champ];
			};
		};

		//pouvoir afficher l image grace a base 64
		$scope.getImage2 = function(champ){
			if(champ=='' || champ==null){
				return 'rouge1.png';
			}else{
				return 'data:image/jpeg;base64,' + champ;
			};
		};

		//pouvoir afficher le son grace a la base 64
		$scope.getSounds2 = function(champ){
			if (champ=='' || champ==null){
				return '';
			}else{
				return 'data:audio/mp3;base64,' + champ;
			};
		};

		//avoir les fils de l india selectionner
		$scope.avoirIndia=function(champ){
			for(var i in $scope.dataCollection){
				if(champ==$scope.dataCollection[i].DatabaseId){
					$scope.nomPere=$scope.dataCollection[i].Text;
					$scope.dataCollectionFilsChoisi=$scope.dataCollection[i];
				}else{
					$scope.recherche(champ,$scope.dataCollection[i].Children);
				};
			};
		};

		//parcoure la branche du fils
		$scope.recherche=function(champ,champ2){
			for(var i in champ2){
				if(champ==champ2[i].DatabaseId  && champ2[i].Children!=''){
					$scope.nomPere=champ2[i].Text;
					$scope.dataCollectionFilsChoisi=champ2[i];
				}else{
					$scope.recherche(champ,champ2[i].Children);
				};
			};
		};

		//afficher les information d un indiagram
		$scope.option=function(champ){
			if(champ!=$scope.IndiagramOption){
				$scope.optinIndia=true;
			}else{
				$scope.optinIndia=!$scope.optinIndia;
			};
			if($scope.optinIndia){
				$scope.IndiagramOption=champ;
				if(champ.HasImage){
					$scope.ImageZ2(champ.DatabaseId);
				}else{
					$scope.IMAGE='';
				};
				if(champ.HasSound){
					$scope.MusiqueZ2(champ.DatabaseId);
				}else {

				};
			};
		};

		//changement de page pour la modification de la derniere collection
		$scope.modifierCollection=function(){
			window.location="modificationCollection.html";
			sessionStorage.device=$scope.device;
		};
});










	//modifier la collection (derniere)
	app.controller('modificationCollection', function($scope,$http) {
		$scope.afficher=false;
		//affiche le contenue de la derniere collection
		$scope.arbreCollection=function(){
			if($scope.afficher==false){
				$scope.afficher=true;
				if(localStorage.close==true || localStorage.close=="true" || localStorage.close==null){
					localStorage.close=false;
					var req = {
						method: 'POST',
						url: API+'/api/v1/versions/create',
						headers: {
							'x-indiarose-login': sessionStorage.login,
							'x-indiarose-password':sessionStorage.password,
							'x-indiarose-device': sessionStorage.device
						}, 
					};
					$http(req).success(function(data, status){
					}).error(function(status){
						alert(status.Message);
					});
				};
				var req = {
					method: 'GET',
					url: API+'/api/v1/collection/all/'+sessionStorage.VersionFinal,
					headers: {
						'x-indiarose-login': sessionStorage.login,
						'x-indiarose-password':sessionStorage.password,
						'x-indiarose-device': sessionStorage.device
					}, 
				};
				$http(req).success(function(data, status){
					$scope.dataCollection=data.Content;
					$scope.image();

				}).error(function(status){
					alert(status.Message);
				});
			};
		};

	//avoir les images d une collection
	$scope.ImageZ=function(x){
		var req = {
			method: 'GET',
			url: API+'/api/v1/collection/images/'+$scope.dataCollection[x].DatabaseId+'/'+sessionStorage.VersionFinal,
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': sessionStorage.device
			}, 
		};
		$http(req).success(function(data, status){
			sessionStorage['ind'+$scope.dataCollection[x].DatabaseId]=data.Content.Content;
		}).error(function(status){
			alert(status.Message);
			return null;
		}); 
	};

	//avoir le son d un indiagram
	$scope.MusiqueZ=function(x){
		var req = {
			method: 'GET',
			url: API+'/api/v1/collection/sounds/'+$scope.dataCollection[x].DatabaseId+'/'+sessionStorage.VersionFinal,
			headers: {
				'x-indiarose-login': sessionStorage.login,
				'x-indiarose-password':sessionStorage.password,
				'x-indiarose-device': sessionStorage.device
			}, 
		};
		$http(req).success(function(data, status){
			sessionStorage['indM'+$scope.dataCollection[x].DatabaseId]=data.Content.Content;
		}).error(function(status){
			alert(status.Message);
			return null;
		}); 
	};

		//affecter les images d une collection a une var sessionstorage
		$scope.image=function(){
			for(var x in $scope.dataCollection){
				if($scope.dataCollection[x].HasImage==true){
					$scope.ImageZ(x);
				}else{
					sessionStorage['ind'+$scope.dataCollection[x].DatabaseId]='';
				};
				if($scope.dataCollection[x].HasSound==true){
					$scope.MusiqueZ(x);
				}else{
					sessionStorage['indM'+$scope.dataCollection[x].DatabaseId]='';
				};
				if($scope.dataCollection[x].Children!=''){
					$scope.ImageFils($scope.dataCollection[x].Children);
				};
			};
		};

		//avoir image des fils
		$scope.ImageFils = function(champ){
			for(var i in champ){
				if(champ[i].Children!=''){
					$scope.ImageFils(champ[i].Children);
				}else{
					if(champ[i].HasImage==true){
						$scope.ImageZ(i);
					}else{
						sessionStorage['ind'+champ[i].DatabaseId]='';
					};
					if(champ[i].HasSound==true){
						$scope.MusiqueZ(i);
					}else{
						sessionStorage['indM'+champ[i].DatabaseId]='';
					};
				};
			};
		};

		//pouvoir afficher l image grace au src
		$scope.getImage = function(champ){
			if (sessionStorage['ind'+champ]==''){
				return 'rouge1.png';
			}else{
				return 'data:image/jpeg;base64,' + sessionStorage['ind'+champ];
			};
		};

		//avoir les fils de l india selectionner
		$scope.avoirIndia=function(champ){
			for(var i in $scope.dataCollection){
				if(champ==$scope.dataCollection[i].DatabaseId){
					$scope.nomPere=$scope.dataCollection[i].Text;
					$scope.dataCollectionFilsChoisi=$scope.dataCollection[i];
				}else{
					$scope.recherche(champ,$scope.dataCollection[i].Children);
				};
			};
		};

		//parcoure la branche du fils
		$scope.recherche=function(champ,champ2){
			for(var i in champ2){
				if(champ==champ2[i].DatabaseId  && champ2[i].Children!=''){
					$scope.nomPere=champ2[i].Text;
					$scope.dataCollectionFilsChoisi=champ2[i];
				}else{
					$scope.recherche(champ,champ2[i].Children);
				};
			};
		};

		//affiche les options de l indigram selectionner
		$scope.option=function(champ){
			$scope.ajouterIndiagram=false;
			$scope.nomIndia=champ.Text;
			$scope.india=champ;
			$scope.optionIndia=true;
			$scope.categoryOUI=champ.IsCategory;
			$scope.categoryNON=!champ.IsCategory;
			$scope.categoryOUI1=champ.IsEnabled;
			$scope.categoryNON1=!champ.IsEnabled;
			$scope.positionIndia=champ.Position;
			$scope.nomImage="Nom de l image";
			$scope.nomMusique="Nom de la musique";
		};

		//special checkbox
		$scope.changementCategoryOUI=function(){
			$scope.categoryOUI=true;
			$scope.categoryNON=false;
		};
		$scope.changementCategoryNON=function(){
			$scope.categoryNON=true;
			$scope.categoryOUI=false;
		};
		$scope.changementCategoryOUI1=function(){
			$scope.categoryOUI1=true;
			$scope.categoryNON1=false;
		};
		$scope.changementCategoryNON1=function(){
			$scope.categoryNON1=true;
			$scope.categoryOUI1=false;
		};

		//transformation d un fichier en base64
		var handleFileSelect = function(evt) {
			var files = evt.target.files;
			var file = files[0];
			if (files && file) {
				var reader = new FileReader();
				reader.onload = function(readerEvt) {
					var binaryString = readerEvt.target.result;
					$scope.ImageBASE = (btoa(binaryString));
				};
				reader.readAsBinaryString(file);
			}
		};

		var handleFileSelect2 = function(evt) {
			var files = evt.target.files;
			var file = files[0];
			if (files && file) {
				var reader = new FileReader();
				reader.onload = function(readerEvt) {
					var binaryString = readerEvt.target.result;
					$scope.MusiqueBASE=(btoa(binaryString));
				};
				reader.readAsBinaryString(file);
			}
		};

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
			document.getElementById('filePicker2').addEventListener('change', handleFileSelect2, false);
		} else {
			alert('la transformation de votre fichier en base64 n\' est pas accept\351 par votre navigateur.');
		}

		//fermer la version 
		$scope.save=function(){
			var req = {
				method: 'POST',
				url: API+'/api/v1/versions/close/'+(parseInt(sessionStorage.VersionFinal)+1),
				headers: {
					'x-indiarose-login': sessionStorage.login,
					'x-indiarose-password':sessionStorage.password,
					'x-indiarose-device': sessionStorage.device
				}, 
			};
			$http(req).success(function(data, status){
				localStorage.close=true;
				window.location="menu.html";
			}).error(function(status){
				alert(status.Message);
			});
		};

		//modifie l indiagram
		$scope.modifierIndia=function(champ){
			$scope.ajouterIndiagram=false;
			var json={
				"Id": champ.DatabaseId,
				"Version": (parseInt(sessionStorage.VersionFinal)+1),
				"Text": $scope.nomIndia,
				"ParentId": champ.ParentId,
				"Position": $scope.positionIndia,
				"IsEnabled": $scope.categoryOUI1,
				"IsCategory": $scope.categoryOUI
			};
			var req = {
				method: 'POST',
				url: API+'/api/v1/collection/indiagrams/update',
				headers: {
					'x-indiarose-login': sessionStorage.login,
					'x-indiarose-password':sessionStorage.password,
					'x-indiarose-device': sessionStorage.device
				}, 
				data:json
			};
			$http(req).success(function(data, status){
				$scope.optionIndia=false;
			}).error(function(status){
				alert(status.Message);
			});
			if($scope.ImageBASE!=null){
				var json={
					"Filename": $scope.nomImage,
					"Content": $scope.ImageBASE,
				};
				var req = {
					method: 'POST',
					url: API+'/api/v1/collection/images/'+champ.DatabaseId+'/'+(parseInt(sessionStorage.VersionFinal)+1),
					headers: {
						'x-indiarose-login': sessionStorage.login,
						'x-indiarose-password':sessionStorage.password,
						'x-indiarose-device': sessionStorage.device
					}, 
					data:json
				};
				$http(req).success(function(data, status){
				}).error(function(status){
					alert(status.Message);
				});
			};
			if($scope.MusiqueBASE!=null){
				var json={
					"Filename": $scope.nomMusique,
					"Content": $scope.MusiqueBASE,
				};
				var req = {
					method: 'POST',
					url: API+'/api/v1/collection/sounds/'+champ.DatabaseId+'/'+(parseInt(sessionStorage.VersionFinal)+1),
					headers: {
						'x-indiarose-login': sessionStorage.login,
						'x-indiarose-password':sessionStorage.password,
						'x-indiarose-device': sessionStorage.device
					}, 
					data:json
				};
				$http(req).success(function(data, status){
				}).error(function(status){
					alert(status.Message);
				});
			};
		};

		//new india save
		$scope.saveNewIndia=function(){
			var json={
				"Id": -1,
				"Version": (parseInt(sessionStorage.VersionFinal)+1),
				"Text": $scope.nomIndia2,
				"ParentId": $scope.IdParent,
				"Position": 0,
				"IsEnabled": true,
				"IsCategory": false
			};
			var req = {
				method: 'POST',
				url: API+'/api/v1/collection/indiagrams/update',
				headers: {
					'x-indiarose-login': sessionStorage.login,
					'x-indiarose-password':sessionStorage.password,
					'x-indiarose-device': sessionStorage.device
				}, 
				data:json
			};
			$http(req).success(function(data, status){
				$scope.ajouterIndiagram=false;
			}).error(function(status){
				alert(status.Message);
			});
		};

		//ajouter une indiagram
		$scope.AjouterIndia=function(champ){
			if(champ==null){
				$scope.IdParent=-1;
			} else {
				$scope.IdParent=champ;
			};
			$scope.optionIndia=false;
			$scope.ajouterIndiagram=true;
		};


	});



	//filtre qui renvoi true ou false avec un input = true ou 'true'
	app.filter('toBoolean', function() {
		return function(input) {
			return input === true || input === 'true';
		};
	});


