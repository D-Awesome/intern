var myApp = angular.module('myApp',[]);

function mainController($scope,$http){
	$scope.formData = {};

	$http.get('/api/comment')
		.success(function(data){
			$scope.comments = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.createComment = function(){
		$http.post('/api/comment',$scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.comments = data;
				console.log('posting comment');
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}

	$scope.deleteComment = function(commentId){
		$http.delete('/api/comment/' + commentId)
			.success(function(data){
				$scope.comments = data;
				console.log('deleting comment');
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	}
}

