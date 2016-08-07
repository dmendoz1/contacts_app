angular.module('contactsApp', ['ui.router', 'oc.lazyLoad'])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: 'pages/list.html',
			controller: 'mainController'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'pages/login.html',
			controller: 'LoginController'
		})

		.state('new', {
			url: '/new',
			templateUrl: 'pages/new.html',
			controller: 'mainController'
		})

		.state('contactDetail', {
			url: '/main/?id',
			templateUrl: 'pages/contactDetail.html',
			controller: 'contactDetail'
		})

});