describe('accountModule.accountController', function() {
	  
	var $scope, $rootScope, createController, mockAccount, accountService;

	beforeEach(module('accountModule', 'accountService.mock'));

    beforeEach(inject(["$controller", "$rootScope", "accountService",
        function ($controller_, $rootScope_, accountService_) {
            var $controller = $controller_;
            $rootScope = $rootScope_;
            accountService = accountService_;
            $scope = $rootScope.$new();

            createController = function () {
                return $controller('accountCtrl', {
                    '$scope': $scope
                });
            };
        }]));
	  
	  beforeEach(function () {
		  mockAccount = {Name: "06", BillingStreet: "item06", 
        		  BillingCity :"", BillingState:"", BillingPostalCode:""};
	  });
  
	  it('get accounts', function() {
		  //Arrange
		  createController();
		  accountService.getAccounts.defer.resolve(mockAccount);
		  
		  //Act
		  $rootScope.$digest();
			 
	      //Assert
	      expect($scope.accounts).toEqual(mockAccount);
	  });
	  	  
	  it('get account by id', function() {
		  //Arrange
		  createController();
		  accountService.getAccountById.defer.resolve(mockAccount);
		  
		  //Act
		  $scope.getAccountById(1);
		  $rootScope.$digest();
			  
	      //Assert
	      expect($scope.singleAccount).toEqual(mockAccount);
	  });
});