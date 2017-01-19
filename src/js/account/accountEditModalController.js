accountModule.controller('accountEditModalCtrl', ['$scope', '$modalInstance', 'currentAccount', 'accountService', function ($scope, $modalInstance, currentAccount, accountService) {
	$scope.currentAccount = angular.copy(currentAccount);

    $scope.updateAccount = function() {
    	accountService.updateAccount($scope.currentAccount).then(function (result){
    		$scope.updateResult = result;
    		if(result){
    			$modalInstance.close($scope.currentAccount);
    		}
    		
    	});
    };
   
    $scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
    };

}]);