var app = angular.module('angularBooks', ['ngResource']);

angular.module('angularBooks').service('Book', function($resource) {
	return $resource('http://daretodiscover.herokuapp.com/books/:id')
})

angular.controller('ResourceController', function($scope, Book) {
	$scope.book = Book.get({id: 200}, function(data) {
		console.log(data);
	})
})