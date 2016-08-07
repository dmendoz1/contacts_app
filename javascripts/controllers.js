angular.module('contactsApp')
.controller('ListController', function($scope) {
	$scope.contacts = [];
})

.controller('LoginController', function($scope, $http, $state) {
	$scope.signUpInfo = {
		username: undefined,
		password: undefined
	}

	$scope.loginInfo = {
		username: undefined,
		password: undefined
	}

	$scope.signUserUp = function() {
		var data = {
			username: $scope.signUpInfo.username,
			password: $scope.signUpInfo.password
		}

		$http.post("scripts/signup.php", data).success(function(response) {
			$("#newUserPopup").fadeIn();
			$("#newUserClose-popup").click(function() {
				$("#newUserPopup").fadeOut();
			});
			$(".popup-container").click(function() {
				$("#newUserPopup").fadeOut();
			});

		}).error(function(error){
			console.error(error);
			localStorage.clear
		});
	};

	$scope.loginUser = function() {
		var data = {
			username: $scope.loginInfo.username,
			password: $scope.loginInfo.password
		}

		$http.post("scripts/login.php", data).success(function(response) {
			if(response == "user not found") {
				$("#login-status").html('user not found. Please try again');
			    $("#login-status").css('color', 'red');
			} else {
				localStorage.setItem("token", JSON.stringify(response.token));
				localStorage.setItem("userId", response.id);
				$state.go("main");
			}
		}).error(function(error){
			console.error(error);
		});
	};
})


.controller('mainController', function($scope, $state, $http, AuthenticationService, $location) {
	//if user is not logged in
	var token;
	if(localStorage.token) {
		token = localStorage.token;
	} else {
		token = "no token";
	}
	AuthenticationService.checkToken(token);

	//Get contacts depending on user
	var data = {
		userId: localStorage.userId
	}
	$http.post("scripts/getContacts.php", data).success(function(response){
		if(response == '') {
			$('#main-page').css('visibility', 'hidden');
			$('#no-contacts').css('visibility', 'visible');
		} else {
			$scope.userContacts = response;
		}
	}).error(function(error){
		console.log(error);
	})

	$scope.fields = ['firstName', 'lastName', 'email', 'phone'];
	$scope.sort =function(field) {
		$scope.sort.field = field;
		$scope.sort.order = !$scope.sort.order;
	};

	$scope.sort.field = 'firstName';
	$scope.sort.order = false;

	$scope.logout = function() {
		var data = {
			token: token
		};

		$http.post('scripts/logout.php', data).success(function() {
			localStorage.clear();
			$state.go("login");
		}).error(function(error){
			console.log(error);
		})
	}
})


.controller('contactDetail', function($scope, $location, $http, $state, $ocLazyLoad) {
	var contactId = $location.search();
	$scope.id = contactId.id;
	var data = {
		id: $scope.id
	}
	$http.get("scripts/contactDetail.php", data).success(function(response) {
		$scope.friend_fn = response.friend_fn;
		$scope.friend_ln = response.friend_ln;
		$scope.friend_email = response.friend_email;
		$scope.friend_phone = response.friend_phone;
	}).error(function(error) {
		console.log(error);
	});

	$scope.delete = function() {
		$('#contactDeletePopup').fadeIn();
		$("#delete-btn").click(function() {
			$http.post("scripts/deleteContact.php", data).success(function(response) {
				if (response == 'successful') {
					$state.go('main');
				} else {
					alert('Sorry, something went wrong.  Please try again.');
				}
			});
		});
		$("#dontdelete-btn").click(function() {
			$('#contactDeletePopup').fadeOut();
		});
	};


})






































