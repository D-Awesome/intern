var app = angular.module('myApp',['ngResource']);

app.factory('Comments', function($resource){
	return $resource('/api/comment/:commentId');
});

function mainController($scope,Comments){
	$scope.formData = {};
	$scope.comments = Comments.query();

	$scope.createComment = function(){
		Comments.save($scope.item);
		//update locally
		newComment = {content:$scope.item.content,time:new Date()};
		$scope.comments.push(newComment);
		$scope.item = {};
	}

	$scope.deleteComment = function(Id,index){
		Comments.delete({commentId: Id });
		//remove locally
		$scope.comments.splice(index,1);	
		
	}
}