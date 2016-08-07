angular.module('contactsApp')

.directive("navigationBar", function($http, $state, $location) {
	return {
		restrict: 'EA',
		templateUrl: 'pages/navigationBar.html',
		link: function($scope) {
			var token = localStorage.token;
			$scope.isActive = function(viewLocation) {
				return viewLocation === $location.path();
			}
			$scope.logout = function() {
				var data = {
					token: token
				};
				$http.post('scripts/logout.php', data).success(function() {
					localStorage.clear();
					$state.go("login");
				}).error(function(error){
					console.log(error);
				});
			}
    	}
	};
})

.directive('contactFields', function($http, $state, $location) {
	return {
		restrict: 'EA',
		templateUrl: 'pages/contactFields.html',
		link: function($scope) {
			var contactId = $location.search();
			$scope.id = contactId.id;
			var contactId = {
				id: $scope.id
			}

			$http.post("scripts/contactDetail.php", contactId).success(function(response) {
				$scope.friend_fn = response.firstName;
				$scope.friend_ln = response.lastName;
				$scope.friend_email = response.email;
				$scope.friend_phone = response.phone;
			}).error(function(error) {
				console.log(error);
			});

			$scope.update = function() {
				var data = {
					friend_fn: $scope.friend_fn,
					friend_ln: $scope.friend_ln,
					friend_email: $scope.friend_email,
					friend_phone: $scope.friend_phone,
					friend_id: $scope.id
				}
				$http.post("scripts/contactUpdate.php", data).success(function(response) {
					if(response == "successful") {
						$("#contactUpdatePopup").fadeIn();
						$("#updateClose-popup").click(function() {
							$("#contactUpdatePopup").fadeOut();
						});
						$(".popup-container").click(function() {
							$("#contactUpdatePopup").fadeOut();
						});
					} else {
						console.log('something went wrong');
					}
				}).error(function(error) {
					console.log(error);
				});
			};

			$scope.save = function() {
				var data = {
					friend_fn: $scope.friend_fn,
					friend_ln: $scope.friend_ln,
					friend_email: $scope.friend_email,
					friend_phone: $scope.friend_phone,
					user_id: localStorage.userId
				}
				$http.post("scripts/contactNew.php", data).success(function(response) {
					if(response == "successful") {
						$("#newContactPopup").fadeIn();
						$("#newContactClose-popup").click(function() {
							$("#newContactPopup").fadeOut();
						});
						$(".popup-container").click(function() {
							$("#newContactPopup").fadeOut();
						});
					} else {
						console.log('something went wrong');
					}
				}).error(function(error) {
					console.log(error);
				});
			};

		}
	}
})


.directive('usernameVerify', function($http) {
	return {
		restrict: 'A',
		link: function() {
	     	 $('#username').blur(function(){  
			    var username = $('#username').val(); 
			    var data = {
			    	username : username
			    }
			    $http.post("scripts/usernameValidation.php", data).success(function(data) {
			    	if(data == "available") {
			    		if(username !== '') {
				          $("#username-status").html(username + ' is available');
				          $("#username-status").css('color', 'green');
				          $('#username-status').css('visibility', 'visible');
				        }
			        }
			        else {
			          $("#username-status").html(username + ' is already taken');
			          $("#username-status").css('color', 'red');
			           $("#username-status").css('visibility', 'visible');
			          $('#signupBtn').prop('disabled', true);
			        }
			    });
			}); 
		}
	}
})


.directive('pwVerify', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function ($scope, elem, attrs, ngModel) {
			if (!attrs.pwVerify) {
				console.error('pwVerify expects a model as an argument!');
				return;
			}
			$scope.$watch(attrs.pwVerify, function (value) {
                // Only compare values if the second ngModel has a value.
                if (ngModel.$viewValue !== undefined && ngModel.$viewValue !== '') {
                	ngModel.$setValidity('pwVerify', value === ngModel.$viewValue);
                }

            });
			function inputFromUser(value) {
				// Mute the pwVerify error if the second ngModel is empty.
                if (value === undefined || value === '') {
                	ngModel.$setValidity('pwVerify', true);
                	return value;
                }
                var isValid = value === $scope.$eval(attrs.pwVerify);
                ngModel.$setValidity('pwVerify', isValid);
                return isValid ? value : undefined;
			}
			ngModel.$parsers.push(inputFromUser);
		}
	};
});