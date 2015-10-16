var app = angular.module('angularBooks', ["ngResource", "ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/books-index.html',
		controller: 'BooksIndexCtrl'
	})
	.when('/books/:id', {
		templateUrl: 'templates/books-show.html',
		controller: 'BooksShowCtrl'
	})

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})

app.service("Book", function($resource) {
	return $resource('http://daretodiscover.herokuapp.com/books/:id', {id: "@_id"} , {
      update: {
        method: 'PUT'
      }
  })
});

app.controller("ResourceController", function($scope, Book) {
	// $scope.book = Book.get({ id: 1376 }, function(data) {
 //      console.log(data);
 //    }); // get() returns a single book

 //    $scope.allBooks = Book.query(function(data) {
 //      console.log(data);
 //    }); //query() returns all the books

    // add a new book
    // $scope.newBook = {"title":"JavaScript: The Good Parts","author":"Douglas Crockford","image":"","release_date":"May 11, 2008"};

    // Book.save($scope.newBook, function(data) {
    //   console.log(data);
    // });

    // delete a book
    // Book.delete({id:1388});
})

app.controller("BooksIndexCtrl", function($scope, Book) {
	$scope.newBook = {}; 
	Book.query(function(data) {
		$scope.books = data;
	});
	$scope.updateBook = function(book) {
		Book.get({id: book.id}, function() {
			Book.update({id: book.id}, book);
		})
        // alert('attempt');
     
	}
})

app.controller("BooksShowCtrl", function($scope, Book, $routeParams) {
	
	Book.get({id: $routeParams.id}, function(response) {
		console.log({id: $routeParams.id});
		console.log($routeParams.id);
		$scope.book = response;
	});
});



// app.controller('BooksShowCtrl', ['$scope', 'Book', '$routeParams', function ($scope, Book, $routeParams) {
//   Book.get({id: $routeParams.id}, function(book) {
//     $scope.book = book;
//   });
// ​
//   $scope.updateBook = function(book){
//   	Book.update({id: book.id}, book);
//   	$scope.bookFormVisible=false;
//   };
// }]);

