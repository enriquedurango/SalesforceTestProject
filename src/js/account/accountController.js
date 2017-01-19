accountModule.controller('accountCtrl', ['$scope', '$modal', 'accountService', function ($scope, $modal, accountService) {
	
	loadAccounts();
	function loadAccounts() {
    	accountService.getAccounts().then(function (result){
    		$scope.accounts = result;
    	});
	}
	
	$scope.singleAccount = '';
	$scope.updateResult = false;
         
    $scope.getAccountById = function(queryID) {
    	accountService.getAccountById(queryID).then(function (result){
    		$scope.singleAccount = result;
    	});
    };
    
    
    $scope.openAccountEditModal = function (account) {
    	var modalScope = $modal.open({
        		templateUrl: 'accountEditModal.html',
                controller: 'accountEditModalCtrl',
                resolve: {
                	currentAccount: function () {
                    	return account;
                   	}
                }
            });
    };
    
    $scope.openAccountDetailsModal = function (account) {
    	var modalScope = $modal.open({
        		templateUrl: 'accountDetailsModal.html',
                controller: 'accountDetailsModalCtrl',
                resolve: {
                	currentAccount: function () {
                    	return account;
                   	}
                }
            });
    };
    
  
}]);
