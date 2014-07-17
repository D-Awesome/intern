var app = angular.module('myApp',['ngResource']);

app.factory('Comments', function($resource){
	return $resource('/api/comment/:commentId');
});

app.factory('socket',function(){
	var socket = io();
	return socket;
});

function mainController($scope,Comments,socket){
	$scope.formData = {};
	$scope.comments = Comments.query();

	socket.on('a user connected', function(data){
		$scope.userNumber = data;
		$scope.$digest();		
	});

	socket.on('a user disconnected', function(data){
		$scope.userNumber = data;
		$scope.$digest();
	});

	$scope.createComment = function(){
		Comments.save($scope.item,function(data){
			socket.emit('post comment',data);
			$scope.item = {};
		});
	}

	socket.on('post comment', function(data){
		$scope.comments.push(data);
		$scope.$digest();
	});

	$scope.deleteComment = function(Id,index){
		Comments.delete({commentId: Id });
		socket.emit('delete comment',index);
	}

	socket.on('delete comment',function(data){
		$scope.comments.splice(data,1);
		$scope.$digest();
	});
}