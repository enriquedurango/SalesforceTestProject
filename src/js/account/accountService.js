accountModule.service('accountService', ['$q', function ($q) {
	var DEFAULT_CONTROLLER = "AccountController";
	return {
		getAccountById: getAccountById,
		getAccounts: getAccounts,
		updateAccount: updateAccount,
		getContactsByAccountId : getContactsByAccountId
	};
	
    function getAccountById(id){
    	var d = $q.defer();
    	Visualforce.remoting.Manager.invokeAction(DEFAULT_CONTROLLER + '.getAccountById', id,
    		function(result, event) {
    			d.resolve(result);
    		}
    	);
    	return d.promise;
    }
    
    function getAccounts() {
    	var d = $q.defer();
		Visualforce.remoting.Manager.invokeAction(DEFAULT_CONTROLLER + '.getAccounts',
		    function(result, event) {
				d.resolve(result);
			}
		);
		return d.promise;
	}
    
    function updateAccount(account){
    	var d = $q.defer();
    	Visualforce.remoting.Manager.invokeAction(DEFAULT_CONTROLLER + '.updateAccount', account,
    		function(result, event) {
    			d.resolve(result);
    		}
    	);
    	return d.promise;
    }
    
    function getContactsByAccountId(id){
    	var d = $q.defer();
    	Visualforce.remoting.Manager.invokeAction(DEFAULT_CONTROLLER + '.getContactsByAccountId', id,
    		function(result, event) {
    			d.resolve(result);
    		}
    	);
    	return d.promise;
    }
}]);