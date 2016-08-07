angular.module('contactsApp')
.service('AuthenticationService', ["$http", "$state", function($http, $state){
	this.checkToken = function(token){
		var data = {token: token};
		$http.post("scripts/checkToken.php", data).success(function(response){
			console.log(response);
			if (response === "unauthorized"){
				$state.go("login")
			} else {
				return response;
			}
		}).error(function(error){
			$state.go("login")
		})
		
	}

}]);