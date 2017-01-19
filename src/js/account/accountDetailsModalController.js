accountModule.controller('accountDetailsModalCtrl', ['$scope', '$modalInstance', 'currentAccount', 'accountService', function ($scope, $modalInstance, currentAccount, accountService) {
	$scope.currentAccount = currentAccount;

   	loadContacts();
	function loadContacts() {
    	accountService.getContactsByAccountId($scope.currentAccount.Id).then(function (result){
    		$scope.contacts = result;
    	});
	}
   
    $scope.ok = function () {
    	$modalInstance.close();
    	
    };

}]);